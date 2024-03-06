import React from 'react'
import { testimonies } from '@/libs/constants'
import TestimonyCard from './testimony-card'

export default function TestimonySection(): React.ReactNode {
  return (
    <section className="py-14">
      <h3 className="text-heading-3 font-label font-bold mb-6">
        Customer Testimonies
      </h3>

      <div className="flex justify-between">
        {testimonies.map((testimony) => (
          <TestimonyCard data={testimony} key={testimony.id} />
        ))}
      </div>
    </section>
  )
}
