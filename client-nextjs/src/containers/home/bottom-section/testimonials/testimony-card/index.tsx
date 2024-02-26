import React from 'react'
import Image from 'next/image'
import { Testimony } from '@/libs/types/interface'
import Rating from './rating'

export default function TestimonyCard({
  data
}: {
  data: Testimony
}): React.ReactNode {
  return (
    <article className="flex flex-col bg-white rounded-xl shadow w-[288px] h-[281px] p-4">
      <div className="flex mb-4">
        <figure className="relative rounded-full overflow-hidden h-16 w-16 mr-3">
          <Image
            src={data.photo}
            alt={data.fullName}
            className="object-cover object-center"
            fill
            sizes="400px"
            loading="lazy"
          />
        </figure>

        <div className="flex flex-col">
          <p className="text-heading-4 text-gray-100 font-label font-bold mb-1">
            {data.fullName}
          </p>
          <p className="text-heading-5 text-gray-50 font-bold">
            {data.location}
          </p>
        </div>
      </div>

      <div className="flex gap-1 align-center flex-row">
        <Rating rating={data.rating} />
      </div>

      <p className="text-heading-5 text-gray-70 my-4 min-h-[80px]">
        {data.review.length <= 140
          ? data.review
          : `${data.review.slice(0, 145)}...`}
      </p>
      <p className="text-heading-5 text-gray-100 font-bold">
        {data.destination}
      </p>
      <p className="text-heading-6 text-gray-50">
        {new Date(data.checkoutDate).toLocaleDateString('id-ID')}
      </p>
    </article>
  )
}
