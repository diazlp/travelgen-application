import React, { InputHTMLAttributes, useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import useChangePasswordForm from '@/hooks/change-password/useChangePasswordForm'
import Button from '@/components/button'

enum InputType {
  Text = 'text',
  Password = 'password'
}

export default function ChangePasswordForm(): React.ReactNode {
  const { initialValues, onSubmit, validate } = useChangePasswordForm()
  const [hidePassword, setHidePassword] = useState<boolean>(false)
  const [inputType, setInputType] =
    useState<InputHTMLAttributes<HTMLInputElement>['type']>('password')

  const togglePasswordVisibility = (): void => {
    setHidePassword((prevState) => !prevState)

    if (inputType === InputType.Password && !hidePassword) {
      setInputType(InputType.Text)
    } else {
      setInputType(InputType.Password)
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, errors, status }) => (
        <Form>
          <label
            htmlFor={'password'}
            className={`relative text-heading-5 font-label font-bold w-full `}
          >
            <Field
              type={inputType}
              name={'password'}
              placeholder={'Enter new password'}
              className="h-3 p-6 my-6 w-full border border-gray-70 mb-6 rounded-lg text-heading-5 text-gray-50 focus:outline-none focus:ring-blue-100 focus:border-blue-100 focus:text-primary-black"
            />

            <button
              type="button"
              className="absolute h-7 w-7 right-0 -translate-x-1/2 -translate-y-1/2 top-[50%]"
              onClick={togglePasswordVisibility}
            >
              {hidePassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </label>

          <span className="text-heading-5 font-label font-bold text-red-100 ml-3">
            {errors['password'] || status}
          </span>

          <div className="flex justify-end">
            {isSubmitting ? (
              <Button isDisabled className="text-white w-28">
                Sending...
              </Button>
            ) : (
              <Button type="submit" className="text-white w-28">
                Send
              </Button>
            )}
          </div>
        </Form>
      )}
    </Formik>
  )
}
