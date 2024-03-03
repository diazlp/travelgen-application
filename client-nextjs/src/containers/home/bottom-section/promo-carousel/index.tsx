import React, { Fragment } from 'react'
import Image from 'next/image'
import Carousel from 'react-multi-carousel'
import { promos } from '@/libs/constants'
import { Package } from '@/libs/types/interface'
import PromoCard from './promo-card'

export default function PromoCarousel(): React.ReactNode {
  return (
    <Fragment>
      <h3 className="text-heading-3 text-white font-label font-bold pt-14 mb-4">
        Best Prices
      </h3>

      <Carousel
        className="py-5 select-none"
        containerClass="carousel-container"
        arrows
        centerMode={false}
        draggable
        swipeable
        customRightArrow={
          <button
            type="button"
            aria-label="Go to next slide"
            className="absolute z-50 right-0 opacity-50 hover:opacity-100"
          >
            <Image
              src="/assets/icons/right-arrow-rounded.svg"
              alt="carousel-right-arrow"
              height={75}
              width={75}
            />
          </button>
        }
        customLeftArrow={
          <button
            type="button"
            aria-label="Go to previous slide"
            className="absolute z-50 left-0 opacity-50 hover:opacity-100"
          >
            <Image
              src="/assets/icons/left-arrow-rounded.svg"
              alt="carousel-left-arrow"
              height={75}
              width={75}
            />
          </button>
        }
        partialVisible
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 720
            },
            items: 2,
            partialVisibilityGutter: 100
          }
        }}
      >
        {promos.map((promo: Package) => {
          return <PromoCard data={promo} key={promo.id} />
        })}
      </Carousel>
    </Fragment>
  )
}
