import React from 'react'

export default function SectionTab({
  children
}: {
  children: React.ReactNode | string
}): React.ReactNode {
  return (
    <button
      type="button"
      className="font-bold text-blue-100 underline hover:text-blue-100 focus:text-blue-100 focus:underline"
    >
      {children}
    </button>
  )
}
