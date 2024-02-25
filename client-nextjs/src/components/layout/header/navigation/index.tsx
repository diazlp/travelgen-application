import React from 'react'
import Link from 'next/link'
import NavigationItem from './nav-item'

export default function Navigation(): React.ReactNode {
  return (
    <nav className="flex items-center gap-5">
      <NavigationItem label="Home" href="/" />
      <NavigationItem label="Contact" href="/" />
      <NavigationItem label="Package" href="/" />
      <NavigationItem label="Testimonies" href="/" />
    </nav>
  )
}
