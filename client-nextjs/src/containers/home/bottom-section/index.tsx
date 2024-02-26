import React from 'react'
import styles from './BottomSection.module.css'
import Container from '@/components/container'
import PromoCarousel from './promo-carousel'
import 'react-multi-carousel/lib/styles.css'
import Packages from './packages'
import Categories from './categories'

export default function BottomSection(): React.ReactNode {
  return (
    <section className={styles.section}>
      <Container>
        <PromoCarousel />
        <Packages />
        <Categories />
      </Container>
    </section>
  )
}
