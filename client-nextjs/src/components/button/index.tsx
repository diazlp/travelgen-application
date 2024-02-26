import React from 'react'
import styles from './Button.module.css'

export default function Button({
  children,
  className,
  isFullWidth,
  isOutlined
}: {
  children: React.ReactNode
  className?: string
  isFullWidth?: boolean
  isOutlined?: boolean
}): React.ReactNode {
  return (
    <button
      className={`${styles.button} ${className} ${
        isFullWidth ? styles.fullWidth : ''
      } ${isOutlined ? styles.outlined : ''}`}
    >
      {children}
    </button>
  )
}
