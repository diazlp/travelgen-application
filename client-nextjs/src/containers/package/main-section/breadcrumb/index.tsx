import React from 'react'
import { Package } from '@/libs/types/interface'
import { IoIosArrowForward } from 'react-icons/io'

export default function Breadcrumb({
  data
}: {
  data: Package
}): React.ReactNode {
  return (
    <section className="py-6 pl-6 flex flex-row items-center select-none font-sans">
      <div>Home</div>
      <IoIosArrowForward />
      <div>Package</div>
      <IoIosArrowForward />
      <div>{data.country}</div>
      <IoIosArrowForward />
      <div>{data.name?.split(', ')[1]}</div>
      <IoIosArrowForward />
      <div className="underline text-blue-100 font-bold">
        {data.name?.split(', ')[0]}
      </div>
    </section>
  )
}
