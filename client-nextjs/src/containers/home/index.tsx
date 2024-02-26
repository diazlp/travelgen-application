import Layout from '@/components/layout'
import React from 'react'
import TopSection from './top-section'
import BottomSection from './bottom-section'

export default function HomeContainer(): React.ReactNode {
  return (
    <Layout>
      <TopSection />
      <BottomSection />
    </Layout>
  )
}
