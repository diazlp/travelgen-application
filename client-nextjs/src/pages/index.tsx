import React, { useEffect } from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { usePackageStore, useCategoryStore } from '@/libs/store'
import { Package, Category } from '@/libs/types/interface'
import { fetchCategories, fetchPackages } from '@/libs/utils'
import HomeContainer from '@/containers/home'

interface HomePageProps {
  packages: Package[]
  categories: Category[]
}

export const getStaticProps: GetStaticProps = async () => {
  const [packages, categories] = await Promise.all([
    fetchPackages(),
    fetchCategories()
  ])

  return {
    props: {
      packages,
      categories
    }
  }
}

export default function HomePage({
  packages,
  categories
}: HomePageProps): React.ReactNode {
  useEffect(() => {
    usePackageStore.getState().setPackages(packages)
  }, [packages])

  useEffect(() => {
    useCategoryStore.getState().setCategories(categories)
  }, [categories])

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
