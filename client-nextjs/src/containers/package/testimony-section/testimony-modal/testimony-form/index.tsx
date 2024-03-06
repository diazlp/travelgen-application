import React from 'react'
import { Formik, Form, Field } from 'formik'
import useTestimonyForm from '@/hooks/testimony/useTestimonyForm'
import Button from '@/components/button'

export default function TestimonyForm(): React.ReactNode {
  const { initialValues, onSubmit, validate } = useTestimonyForm()

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validate}
    >
      {({ isSubmitting, errors, status }) => (
        <Form className="flex flex-col gap-2">
          <label
            htmlFor={'rating'}
            className={`relative text-heading-5 font-label font-bold w-full`}
          >
            <div>Rating</div>

            <Field
              as="select"
              name="rating"
              className="p-2 my-1 w-full border border-gray-70 rounded-lg text-heading-5 text-gray-50 focus:outline-none focus:ring-blue-100 focus:border-blue-100 focus:text-primary-black"
            >
              <option value="">Select a rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Field>

            <span className="text-heading-5 font-label font-bold text-red-100">
              {errors['rating']}
            </span>
          </label>

          <label
            htmlFor={'review'}
            className={`relative text-heading-5 font-label font-bold w-full`}
          >
            <div>Review</div>

            <Field
              as="textarea"
              name="review"
              className="p-2 my-1 w-full border border-gray-70 rounded-lg text-heading-5 text-gray-50 focus:outline-none focus:ring-blue-100 focus:border-blue-100 focus:text-primary-black"
            />
            <span className="text-heading-5 font-label font-bold text-red-100">
              {errors['review']}
            </span>
          </label>

          <span className="text-heading-5 font-label font-bold w-full text-center text-xs text-red-100 mt-3">
            {status}
          </span>

          <div className="flex justify-end">
            {isSubmitting ? (
              <Button isDisabled className="text-white w-28">
                Submitting..
              </Button>
            ) : (
              <Button type="submit" className="text-white w-28">
                Submit
              </Button>
            )}
          </div>
        </Form>
      )}
    </Formik>
  )
}
