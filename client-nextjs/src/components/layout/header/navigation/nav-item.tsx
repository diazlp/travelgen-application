import Link from 'next/link'
import React from 'react'

export default function NavigationItem({
  label,
  href
}: {
  label: string
  href: string
}): React.ReactNode {
  return (
    <Link
      href={href}
      className="text-heading-4 text-gray-70 font-label font-bold hidden md:block"
    >
      {label}
    </Link>
  )
}
