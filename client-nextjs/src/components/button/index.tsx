import React, { ButtonHTMLAttributes } from 'react'
import { FaGoogle } from 'react-icons/fa6'
import styles from './Button.module.css'

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
        ${styles.button} 
        ${className}
        ${isFullWidth ? styles.fullWidth : ''} 
        ${isOutlined ? styles.outlined : ''}
        ${variant === 'primary' ? 'bg-blue-100' : 'bg-red-100'}
        ${isDisabled ? 'bg-blue-30 cursor-not-allowed' : null}
        `}
      {...props}
    >
      {variant === 'google' && <FaGoogle color="white" size={20} />}

      {children}
    </button>
  )
}
