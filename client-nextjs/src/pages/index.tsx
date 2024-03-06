import React, { useEffect } from 'react'
import Head from 'next/head'
import { usePackageStore } from '@/libs/store'
import { Package } from '@/libs/types/interface'
import HomeContainer from '@/containers/home'

export async function getStaticProps() {
  const response = await fetch(
    `${process.env.BASE_API_URL}/v1.0/package/find-all`
  )
  const data = await response.json()

  return {
    props: {
      packages: data
    }
  }
}

export default function HomePage({
  packages
}: {
  packages: Package[]
}): React.ReactNode {
  const storeGeneratedPackages = usePackageStore((state) => state.setPackages)

  useEffect(() => {
    storeGeneratedPackages(packages)
  }, [storeGeneratedPackages, packages])

  return (
    <>
      <Head>
        <title>TravelGen Web</title>
      </Head>
      <HomeContainer />
    </>
  )
}
