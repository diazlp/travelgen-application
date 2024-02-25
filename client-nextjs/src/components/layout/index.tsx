import React, { Fragment } from 'react'
import Header from './header'

export default function Layout({
  children
}: {
  children: React.ReactNode
}): React.ReactNode {
  return (
    <Fragment>
      <Header></Header>
      {children}
      <footer></footer>
    </Fragment>
  )
}
