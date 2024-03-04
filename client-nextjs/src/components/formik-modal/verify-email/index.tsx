import React from 'react'
import { Formik, Form, Field } from 'formik'
import useVerifyEmailForm from '@/hooks/verify-email/useVerifyEmailForm'
import Button from '@/components/button'
import { ModalType } from '..'

interface VerifyEmailFormProps {
  setModalState: React.Dispatch<
    React.SetStateAction<{ visible: boolean; type?: ModalType }>
  >
}

export default function VerifyEmailForm({
  setModalState
}: VerifyEmailFormProps): React.ReactNode {
  const { initialValues, onSubmit, validate } = useVerifyEmailForm()

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={(values, formikHelpers) =>
        onSubmit(values, {
          ...formikHelpers,
          callback: () => setModalState({ visible: false })
        })
      }
    >
      {({ isSubmitting, errors, status }) => (
        <Form>
          <Field
            type={'text'}
            name={'verificationCode'}
            placeholder={'Enter verification code'}
            className="h-3 p-6 my-6 w-full border border-gray-70 mb-6 rounded-lg text-heading-5 text-gray-50 focus:outline-none focus:ring-blue-100 focus:border-blue-100 focus:text-primary-black"
          />

          <span className="text-heading-5 font-label font-bold text-red-100 ml-3">
            {errors['verificationCode'] || status}
          </span>

          <div className="flex justify-end">
            {isSubmitting ? (
              <Button isDisabled className="text-white w-28">
                Verifying..
              </Button>
            ) : (
              <Button type="submit" className="text-white w-28">
                Verify
              </Button>
            )}
          </div>
        </Form>
      )}
    </Formik>
  )
}
