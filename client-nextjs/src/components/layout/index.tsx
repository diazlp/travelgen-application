import React, { Fragment } from 'react'
import Header from './header'
import Footer from './footer'

export default function Layout({
  children
}: {
  children: React.ReactNode
}): React.ReactNode {
  return (
    <Fragment>
      <Header />
      {children}
      <Footer />
    </Fragment>
  )
}
