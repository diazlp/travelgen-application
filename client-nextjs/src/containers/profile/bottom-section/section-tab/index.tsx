import React from 'react'

export default function SectionTab({
  children
}: {
  children: React.ReactNode | string
}): React.ReactNode {
  return (
    <button
      type="button"
      className="font-bold hover:border-blue-100 hover:text-blue-100 focus:text-blue-100 focus:underline"
    >
      {children}
    </button>
  )
}
