import { useState } from 'react'
import { FormikHelpers } from 'formik'
import { useProfileModalStore } from '@/libs/store'

interface FormValues {
  password: string
}

const useChangePasswordForm = () => {
  const closeProfileModal = useProfileModalStore((state) => state.closeModal)
  const [initialValues] = useState<FormValues>({
    password: ''
  })

  const onSubmit = async (
    values: FormValues,
    { setSubmitting, setStatus }: FormikHelpers<FormValues>
  ) => {
    try {
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
      const data = await response.json()

      if (!response.ok) {
        if (data.message) {
          throw new Error(data.message)
        } else {
          throw new Error('Something went wrong')
        }
      }

      closeProfileModal()
    } catch (error: any) {
      setStatus(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  const validate = (values: FormValues): Partial<FormValues> => {
    const errors: Partial<FormValues> = {}

    // Password validation
    if (!values.password) {
      errors.password = 'Password is required'
    }

    return errors
  }

  return {
    initialValues,
    onSubmit,
    validate
  }
}

export default useChangePasswordForm
