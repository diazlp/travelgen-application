import React from 'react'

export default function Container({
  children,
  size = 'xl'
}: {
  children: React.ReactNode
  size?: string
}): React.ReactNode {
  return (
    <div
      className={`${
        size === 'xl' ? 'max-w-screen-xl' : 'max-w-screen-lg'
      } mx-auto`}
    >
      {children}
    </div>
  )
}
