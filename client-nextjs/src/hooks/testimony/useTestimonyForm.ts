import { useState } from 'react'
import { FormikHelpers } from 'formik'
import { useTestimonyModalStore } from '@/libs/store'
import useTestimonyFetcher from './useTestimonyFetcher'

interface FormValues {
  rating: number
  review: string
}

const useTestimonyForm = () => {
  const { data: packageData, closeModal: closeTestimonyModal } =
    useTestimonyModalStore()
  const { mutate } = useTestimonyFetcher(packageData?.name as string)
  const [initialValues] = useState<FormValues>({
    rating: 0,
    review: ''
  })

  const onSubmit = async (
    values: FormValues,
    { setSubmitting, setStatus }: FormikHelpers<FormValues>
  ) => {
    try {
      const response = await fetch('/api/testimony', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...values,
          destination: packageData?.name
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
      closeTestimonyModal()
    } catch (error: any) {
      setStatus(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  const validate = (values: FormValues): Partial<FormValues> => {
    const errors: Partial<FormValues> = {}

    // Review validation
    if (!values.review) {
      errors.review = 'Review is required'
    }

    // Rating validation
    if (!values.rating) {
      errors.rating = 'Rating is required' as any
    } else if (values.rating < 1 || values.rating > 5) {
      errors.rating = 'Rating must be between 1 and 5' as any
    }

    return errors
  }

  return {
    initialValues,
    onSubmit,
    validate
  }
}

export default useTestimonyForm
