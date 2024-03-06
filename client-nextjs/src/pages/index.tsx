import React, { useEffect } from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { usePackageStore } from '@/libs/store'
import { Package } from '@/libs/types/interface'
import HomeContainer from '@/containers/home'

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(
    `${process.env.BASE_API_URL}/v1.0/package/find-all`
  )
  const data: Package[] = await response.json()

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
        <meta
          name="description"
          content="Embark on an exciting journey with our Travel Agent application! Discover and order custom travel packages tailored to your preferences, all at the touch of a button"
        />
        <meta name="author" content="Diaz Linggaputra" />
      </Head>
      <HomeContainer />
    </>
  )
}
