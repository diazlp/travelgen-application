import React from 'react'
import { Package } from '@/libs/types/interface'
import Layout from '@/components/layout'
import Container from '@/components/container'
import MainSection from './main-section'
import InfoSection from './info-section'
import TestimonySection from './testimony-secion'

const dummyPackage: Package = {
  id: 1,
  name: 'Colloseum, Rome',
  country: 'Italy',
  price: 20000000,
  thumbnail:
    'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  images: [
    'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    'https://images.unsplash.com/photo-1601107587199-92a148ff7555?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
    'https://images.unsplash.com/photo-1548585744-d530258a20e4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    'https://images.unsplash.com/photo-1548585742-1df49e753a83?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=877&q=80'
  ],
  description:
    'Explore the Colosseum in Rome, Italy, with this inclusive package featuring airfare, 5-night accommodation, guided tours, meals, transportation, and snorkeling adventures.',
  departure_date: '2024-08-19',
  rating: 4.6,
  reviewers: 1242,
  is_promo: false,
  created_at: '2024-03-05',
  updated_at: '2024-03-05'
}

export default function PackageContainer(): React.ReactNode {
  return (
    <Layout>
      <Container>
        <MainSection data={dummyPackage} />
        <InfoSection />
        <TestimonySection />
      </Container>
    </Layout>
  )
}
