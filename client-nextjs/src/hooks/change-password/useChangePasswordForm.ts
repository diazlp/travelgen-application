import { useState } from 'react'
import { FormikHelpers } from 'formik'

interface FormValues {
  password: string
}

const useChangePasswordForm = () => {
  const [initialValues] = useState<FormValues>({
    password: ''
  })

  const onSubmit = async (
    values: FormValues,
    {
      setSubmitting,
      setStatus,
      callback
    }: FormikHelpers<FormValues> & { callback: () => void }
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
        throw new Error('Something went wrong')
      }

      callback()
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
