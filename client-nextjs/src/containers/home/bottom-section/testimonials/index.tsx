import React, { Fragment } from 'react'
import { useTestimonyStore } from '@/libs/store'
import TestimonyCard from './testimony-card'

export default function Testimonials(): React.ReactNode {
  const testimonies = useTestimonyStore((state) => state.testimonies)

  if (!testimonies?.length) {
    return <></>
  }

  return (
    <Fragment>
      <h3 className="text-heading-3 font-label font-bold pt-14 mb-1">
        Customer Testimonies
      </h3>
      <p className="text-heading-4 mb-4">
        What they think about our package service
      </p>

      <div className="flex justify-between">
        {testimonies.map((testimony) => (
          <TestimonyCard data={testimony} key={testimony._id} />
        ))}
      </div>
    </Fragment>
  )
}
