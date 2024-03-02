import { useState, useEffect } from 'react'
import { FormikConfig } from 'formik'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

interface FormValues {
  fullName: string
  email: string
  password: string
}

const useRegisterForm = (): FormikConfig<FormValues> => {
  const router = useRouter()
  const [initialValues] = useState<FormValues>({
    fullName: '',
    email: '',
    password: ''
  })

  const onSubmit = async (
    values: FormValues,
    {
      setSubmitting,
      setStatus
    }: {
      setSubmitting: (isSubmitting: boolean) => void
      setStatus: (status: any) => void
    }
  ) => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
      const data = await response.json()

      if (!response.ok) {
        if (data.code === 'P2002') {
          throw new Error('Email already exists')
        } else {
          throw new Error('Something went wrong')
        }
      }

      toast.promise(
        new Promise((resolve) => setTimeout(resolve, 1000)),
        {
          loading: 'Sending verification email',
          success: () => `Verification email has been sent.`,
          error: () => ''
        },
        {
          position: 'bottom-right',
          success: {
            style: {
              background: 'green',
              color: '#fff'
            },
            duration: 3000
          }
        }
      )

      setTimeout(() => router.push('/login'), 3000)
    } catch (error: any) {
      setStatus(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  const validate = (values: FormValues): Partial<FormValues> => {
    const errors: Partial<FormValues> = {}

    // Full Name validation
    if (!values.fullName) {
      errors.fullName = 'Full Name is required'
    }

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
    // const fetchData = async () => {
    //   try {
    //     const response = await fetch('https://example.com/initialData')
    //     const data = await response.json()
    //     console.log('Initial data:', data)
    //   } catch (error: any) {
    //     console.error('Error fetching initial data:', error.message)
    //   }
    // }
    // fetchData()
  }, []) // Run only once when component mounts

  return {
    initialValues,
    onSubmit,
    validate
  }
}

export default useRegisterForm
