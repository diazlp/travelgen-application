import React from 'react'
import { Testimony } from '@/libs/types/interface'
import TestimonyCard from './testimony-card'

export default function TestimonySection({
  data
}: {
  data: Testimony[]
}): React.ReactNode {
  if (!data.length) {
    return <></>
  }

  return (
    <section className="py-14">
      <h3 className="text-heading-3 font-label font-bold mb-6">
        Customer Testimonies
      </h3>

      <div className="grid grid-cols-4">
        {data.map((testimony: Testimony) => (
          <TestimonyCard data={testimony} key={testimony._id} />
        ))}
      </div>
    </section>
  )
}
