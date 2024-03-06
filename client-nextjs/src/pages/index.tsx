import React, { useEffect } from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import {
  usePackageStore,
  useCategoryStore,
  useTestimonyStore
} from '@/libs/store'
import { Package, Category, Testimony } from '@/libs/types/interface'
import { fetchCategories, fetchPackages, fetchTestimonies } from '@/libs/utils'
import HomeContainer from '@/containers/home'

interface HomePageProps {
  packages: Package[]
  categories: Category[]
  testimonies: Testimony[]
}

export const getStaticProps: GetStaticProps = async () => {
  const [packages, categories, testimonies] = await Promise.all([
    fetchPackages(),
    fetchCategories(),
    fetchTestimonies()
  ])

  return {
    props: {
      packages,
      categories,
      testimonies
    },
    revalidate: 60
  }
}

export default function HomePage({
  packages,
  categories,
  testimonies
}: HomePageProps): React.ReactNode {
  useEffect(() => {
    usePackageStore.getState().setPackages(packages)
  }, [packages])

  useEffect(() => {
    useCategoryStore.getState().setCategories(categories)
  }, [categories])

  useEffect(() => {
    useTestimonyStore.getState().setTestimonies(testimonies)
  }, [testimonies])

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
