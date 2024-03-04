import React, { InputHTMLAttributes } from 'react'
import { Field } from 'formik'

interface InputProps {
  name: InputHTMLAttributes<HTMLInputElement>['name']
  type: InputHTMLAttributes<HTMLInputElement>['type']
  className?: string
}

export default function ProfileInput({
  name,
  type,
  className
}: InputProps): React.ReactNode {
  return (
    <Field
      type={type}
      name={name}
      className={`text-center w-full focus:outline-none ${className}`}
    />
  )
}
