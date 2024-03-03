import { useState } from 'react'
import { FormikHelpers } from 'formik'
import useProfileFetcher from './useProfileFetcher'

interface FormValues {
  fullName: string
  location: string
  biography: string
}

const useUpdateProfile = () => {
  const { profile: profileData, mutate } = useProfileFetcher()
  const [initialValues, setInitialValues] = useState<FormValues>({
    fullName: profileData.full_name,
    location: profileData.profile.location,
    biography: profileData.profile.biography
  })

  const onSubmit = async (
    values: FormValues,
    {
      setSubmitting,
      callback
    }: FormikHelpers<FormValues> & { callback: () => void }
  ): Promise<any> => {
    try {
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...values,
          full_name: values.fullName
        })
      })

      if (!response.ok) {
        throw new Error('Something went wrong')
      }

      setInitialValues(values)
      await mutate()
    } catch (error: any) {
      // Empty statement block
    } finally {
      callback()
      setSubmitting(false)
    }
  }

  return { initialValues, onSubmit }
}

export default useUpdateProfile
