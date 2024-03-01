import { useState, useEffect } from 'react'
import { FormikConfig, useFormik, FormikBag } from 'formik'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

interface FormValues {
  email: string
  password: string
}

const useLoginForm = (): FormikConfig<FormValues> => {
  const router = useRouter()
  const [initialValues] = useState<FormValues>({
    email: '',
    password: ''
  })

  const { data: session } = useSession()

  const onSubmit = async (
    values: FormValues,
    {
      setSubmitting,
      setStatus
    }: { setSubmitting: (isSubmitting: boolean) => void; setStatus: any }
  ) => {
    try {
      // Example: Make API call to login endpoint
      // const response = await fetch('https://example.com/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(values)
      // })
      // if (!response.ok) {
      //   throw new Error('Failed to log in')
      // }

      const credentialSignIn = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false
      })
      console.log(credentialSignIn, '<<< woi')

      if (credentialSignIn?.status !== 200) {
        setStatus(credentialSignIn?.error)
      } else {
        router.push('/')
      }
    } catch (error: any) {
      console.error('Error logging in:', error.message)
    } finally {
      setSubmitting(false)
    }
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

export default useLoginForm
