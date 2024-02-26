import React from 'react'
import styles from './BottomSection.module.css'
import Container from '@/components/container'
import PromoCarousel from './promo-carousel'
import Packages from './packages'
import Categories from './categories'
import Testimonials from './testimonials'

import 'react-multi-carousel/lib/styles.css'

export default function BottomSection(): React.ReactNode {
  return (
    <section className={styles.section}>
      <Container>
        <PromoCarousel />
        <Packages />
        <Categories />
        <Testimonials />
      </Container>
    </section>
  )
}
