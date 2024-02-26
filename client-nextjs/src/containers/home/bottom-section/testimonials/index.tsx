import { testimonies } from '@/libs/constants'
import React, { Fragment } from 'react'
import TestimonyCard from './testimony-card'

export default function Testimonials(): React.ReactNode {
  return (
    <Fragment>
      <h3 className="text-heading-3 font-label font-bold pt-14 mb-1">
        Customers Testimonies
      </h3>
      <p className="text-heading-4 mb-4">
        What they think about our package service
      </p>

      <div className="flex justify-between">
        {testimonies.map((testimony) => {
          return <TestimonyCard data={testimony} key={testimony.id} />
        })}
      </div>
    </Fragment>
  )
}
