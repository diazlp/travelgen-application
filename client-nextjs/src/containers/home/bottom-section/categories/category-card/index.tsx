import React from 'react'
import Image from 'next/image'
import { Category } from '@/libs/types/interface'

export default function CategoryCard({
  data
}: {
  data: Category
}): React.ReactNode {
  return (
    <article className="flex flex-col w-[182px]">
      <figure className="relative w-full h-[179px] rounded-xl overflow-hidden mb-5">
        <Image
          src={data.thumbnail}
          alt={data.name}
          className="object-cover object-center"
          fill
          sizes="400px"
          loading="lazy"
        />
      </figure>

      <p className="text-heading-3 text-gray-100 font-bold">{data.name}</p>
    </article>
  )
}
