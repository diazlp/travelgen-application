import React, { ButtonHTMLAttributes } from 'react'
import { FaGoogle } from 'react-icons/fa6'

interface ButtonProps {
  children: React.ReactNode | string
  className?: string
  isFullWidth?: boolean
  isOutlined?: boolean
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  variant?: 'primary' | 'google'
  isDisabled?: boolean
  props?: {
    [key: string]: any
  }
}

export default function Button({
  children,
  className,
  isFullWidth,
  isOutlined,
  type,
  variant = 'primary',
  isDisabled = false,
  props
}: ButtonProps): React.ReactNode {
  return (
    <button
      type={type}
      className={`
        p-2 h-[45px] font-label font-bold rounded-md
        ${isFullWidth ? 'w-100' : ''} 
        ${isOutlined ? 'bg-white text-blue-100 border border-blue-100' : ''}
        ${variant === 'primary' ? 'bg-blue-100' : 'bg-red-100'}
        ${isDisabled ? 'bg-blue-30 cursor-not-allowed' : null}
        ${className}
        `}
      {...props}
    >
      {variant === 'google' && <FaGoogle color="white" size={20} />}

      {children}
    </button>
  )
}
