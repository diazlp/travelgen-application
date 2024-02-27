import React, { Fragment } from 'react'
import Header from './header'
import Footer from './footer'

export default function Layout({
  children,
  noFooter = false
}: {
  children: React.ReactNode
  noFooter?: boolean
}): React.ReactNode {
  return (
    <Fragment>
      <Header />
      {children}
      {noFooter ? null : <Footer />}
    </Fragment>
  )
}
