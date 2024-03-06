import React from 'react'
import { Package } from '@/libs/types/interface'
import Layout from '@/components/layout'
import Container from '@/components/container'
import MainSection from './main-section'
import InfoSection from './info-section'
import TestimonySection from './testimony-section'

export default function PackageContainer({
  packageData
}: {
  packageData: Package
}): React.ReactNode {
  return (
    <Layout>
      <Container>
        <MainSection data={packageData} />
        <InfoSection />
        <TestimonySection packageData={packageData} />
      </Container>
    </Layout>
  )
}
