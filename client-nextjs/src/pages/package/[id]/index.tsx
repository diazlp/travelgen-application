import React from 'react'
import Head from 'next/head'
import PackageContainer from '@/containers/package'

export default function PackagePage(): React.ReactNode {
  return (
    <>
      <Head>
        <title>TravelGen | Package</title>
      </Head>
      <PackageContainer />
    </>
  )
}
