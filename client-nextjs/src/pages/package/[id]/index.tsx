import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { Package } from '@/libs/types/interface'
import PackageContainer from '@/containers/package'

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(
    `${process.env.BASE_API_URL}/v1.0/package/find-all`
  )
  const data: Package[] = await response.json()
  const params = data.map(({ id }) => ({ params: { id: id.toString() } }))

  return {
    paths: params,
    fallback: false // Redirect user to "404 Page" for a non-existent page
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const response = await fetch(
    `${process.env.BASE_API_URL}/v1.0/package/find-one/${params?.id}`
  )
  const data: Package = await response.json()

  return {
    props: {
      packageData: data
    }
  }
}

export default function PackagePage({
  packageData
}: {
  packageData: Package
}): React.ReactNode {
  return (
    <>
      <Head>
        <title>{`TravelGen | ${packageData.name}`}</title>
        <meta name="description" content={packageData.description} />
      </Head>
      <PackageContainer packageData={packageData} />
    </>
  )
}
