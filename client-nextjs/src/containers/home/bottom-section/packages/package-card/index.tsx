import React from 'react'
import Image from 'next/image'
import { Package } from '@/libs/types/interface'
import Button from '@/components/button'

export default function PackageCard({
  data
}: {
  data: Package
}): React.ReactNode {
  return (
    <article className="flex flex-col bg-white rounded-xl shadow-lg overflow-hidden w-[393px]">
      <figure className="relative w-full h-[268px]">
        <Image
          src={data.thumbnail}
          alt={data.name}
          className="object-cover object-center"
          fill
          sizes="400px"
          loading="lazy"
        />
      </figure>

      <div className="flex flex-col p-4">
        <div className="flex items-center mb-4">
          <Image
            src={'/assets/icons/yellow-star.svg'}
            alt="Yellow Star"
            height={20}
            width={20}
          />

          <p className="text-heading-5 text-gray-70 ml-1">
            {data.rating} ({data.reviewers} Review)
          </p>
        </div>
        <p className="text-heading-4 text-gray-70 mb-4">{data.country}</p>

        <p className="text-heading-3 text-gray-100 font-bold mb-4">
          IDR {data.price.toLocaleString('id-ID')}
        </p>

        <p className="text-heading-5 text-gray-70 mb-4">{data.description}</p>

        <div className="flex justify-between gap-3">
          <Button isFullWidth isOutlined className="text-heading-5 text-white">
            See Detail
          </Button>
          <Button isFullWidth className="text-heading-5 text-white">
            Order
          </Button>
        </div>
      </div>
    </article>
  )
}
