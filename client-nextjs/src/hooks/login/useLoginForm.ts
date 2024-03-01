import { useState, useEffect } from 'react'
import { FormikConfig } from 'formik'

interface FormValues {
  email: string
  password: string
}

const useLoginForm = (): FormikConfig<FormValues> => {
  const [initialValues] = useState<FormValues>({
    email: '',
    password: ''
  })

  const onSubmit = async (
    values: FormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      // Example: Make API call to login endpoint
      const response = await fetch('https://example.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
      if (!response.ok) {
        throw new Error('Failed to log in')
      }
      // Handle successful login
      console.log('Login successful')
    } catch (error: any) {
      console.error('Error logging in:', error.message)
    }
    setSubmitting(false)
  }

  const validate = (values: FormValues): Partial<FormValues> => {
    const errors: Partial<FormValues> = {}

    // Email validation
    if (!values.email) {
      errors.email = 'Email is required'
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      errors.email = 'Invalid email address'
    }

    // Password validation
    if (!values.password) {
      errors.password = 'Password is required'
    }

    return errors
  }

  useEffect(() => {
    // Example: Fetch initial data when component mounts
    const fetchData = async () => {
      try {
        const response = await fetch('https://example.com/initialData')
        const data = await response.json()
        console.log('Initial data:', data)
      } catch (error: any) {
        console.error('Error fetching initial data:', error.message)
      }
    }
    fetchData()
  }, []) // Run only once when component mounts

  return {
    initialValues,
    onSubmit,
    validate
  }
}

export default useLoginForm
