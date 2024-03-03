import React from 'react'

interface AvatarItemProps {
  children: React.ReactNode | string
  className?: string
  props?: any
}

export default function AvatarItem({
  children,
  className,
  props
}: AvatarItemProps): React.ReactNode {
  return (
    <div
      className={`flex flex-row gap-2 items-center hover:text-blue-100 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
