import React, { InputHTMLAttributes, useState } from 'react'
import { Field } from 'formik'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

interface InputProps {
  name: InputHTMLAttributes<HTMLInputElement>['name']
  type: InputHTMLAttributes<HTMLInputElement>['type']
  label: string
  placeholder: string
  className?: string
  error?: any
}

enum InputType {
  Email = 'Email',
  Text = 'text',
  Password = 'password'
}

export default function Input({
  name,
  type,
  label,
  placeholder,
  className,
  error
}: InputProps): React.ReactNode {
  const [hidePassword, setHidePassword] = useState<boolean>(false)
  const [inputType, setInputType] =
    useState<InputHTMLAttributes<HTMLInputElement>['type']>(type)

  const togglePasswordVisibility = (): void => {
    setHidePassword((prevState) => !prevState)

    if (type === InputType.Password && !hidePassword) {
      setInputType(InputType.Text)
    } else {
      setInputType(InputType.Password)
    }
  }

  return (
    <label
      htmlFor={name}
      className={`relative text-heading-5 font-label font-bold w-full ${className}`}
    >
      <div className="mb-3">{label}</div>

      <Field
        type={inputType}
        name={name}
        placeholder={placeholder}
        className={`appearance-none font-light border rounded-lg border-gray-70 text-heading-5 py-3 px-4 w-full focus:outline-none focus:ring-blue-100 focus:border-blue-100 ${
          error ? 'border border-red-100' : ''
        }`}
      />

      {type === InputType.Password ? (
        <button
          type="button"
          className={`absolute h-7 w-7 right-0 -translate-x-1/2 -translate-y-1/2 ${
            error ? 'top-[55%]' : 'top-[70%]'
          }`}
          onClick={togglePasswordVisibility}
        >
          {hidePassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
        </button>
      ) : null}

      <span className="text-xs text-red-100 ml-3">{error}</span>
    </label>
  )
}
