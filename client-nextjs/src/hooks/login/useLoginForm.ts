import { useState } from 'react'
import { FormikConfig } from 'formik'
import { signIn } from 'next-auth/react'
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
      const credentialSignIn = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false
      })

      if (credentialSignIn?.status !== 200) {
        setStatus(credentialSignIn?.error)
      } else {
        router.push('/')
      }
    } catch (error: any) {
      setStatus('Something went wrong')
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

  return {
    initialValues,
    onSubmit,
    validate
  }
}

export default useLoginForm
