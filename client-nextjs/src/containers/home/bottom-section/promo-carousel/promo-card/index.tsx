import React from 'react'
import Image from 'next/image'
import Button from '@/components/button'
import { Package } from '@/libs/types/interface'

export default function PromoCard({
  data
}: {
  data: Package
}): React.ReactNode {
  return (
    <article className="bg-white shadow-lg rounded-xl overflow-hidden w-[500px] h-[312px] flex">
      <figure className="relative w-[212px] h-full">
        <Image
          src={data.thumbnail}
          alt={data.name}
          className="object-cover object-center"
          fill
          sizes="400px"
          loading="lazy"
        />
      </figure>

      <div className="flex-1 flex flex-col justify-center p-4">
        <p className="text-heading-4 text-gray-100 font-label font-bold">
          {data.name}
        </p>
        <p className="text-heading-4 text-gray-70 mb-4">{data.country}</p>

        <div className="flex gap-1">
          <p className="text-heading-5 text-gray-70 line-through">
            IDR {data.price.toLocaleString('id-ID')}
          </p>
          <p className="text-heading-5 text-red-100 font-bold">10%</p>
        </div>

        <p className="text-[16px] font-bold text-gray-100 mb-4">
          IDR {(data.price - data.price * 0.1).toLocaleString('id-ID')}
        </p>

        <p className="text-heading-5 text-gray-70 mb-4">
          {data.description.length <= 75
            ? data.description
            : `${data.description.slice(0, 78)}...`}
        </p>

        <p className="text-heading-5 text-gray-50 mb-4">
          Departure: {new Date(data.departureDate).toLocaleDateString('id-ID')}
        </p>

        <div className="flex justify-between gap-3">
          <Button isFullWidth isOutlined className="text-heading-5">
            See detail
          </Button>
          <Button isFullWidth className="text-heading-5">
            Order
          </Button>
        </div>
      </div>
    </article>
  )
}
