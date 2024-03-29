import { useState } from 'react'
import { FormikHelpers } from 'formik'
import useProfileFetcher from '../profile/useProfileFetcher'
import { useProfileModalStore } from '@/libs/store'

interface FormValues {
  verificationCode: string
}

const useVerifyEmailForm = () => {
  const closeProfileModal = useProfileModalStore((state) => state.closeModal)
  const { mutate } = useProfileFetcher()
  const [initialValues] = useState<FormValues>({
    verificationCode: ''
  })

  const onSubmit = async (
    values: FormValues,
    { setSubmitting, setStatus }: FormikHelpers<FormValues>
  ) => {
    try {
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          verification_code: values.verificationCode
        })
      })
      const data = await response.json()

      if (!response.ok) {
        if (data.message) {
          throw new Error(data.message)
        } else {
          throw new Error('Something went wrong')
        }
      }

      await mutate()
      closeProfileModal()
    } catch (error: any) {
      setStatus(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  const validate = (values: FormValues): Partial<FormValues> => {
    const errors: Partial<FormValues> = {}

    // Verification Code validation
    if (!values.verificationCode) {
      errors.verificationCode = 'Verification Code is required'
    }

    return errors
  }

  return {
    initialValues,
    onSubmit,
    validate
  }
}

export default useVerifyEmailForm
