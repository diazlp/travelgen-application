import React, { Fragment } from 'react'
import Image from 'next/image'
import { Package } from '@/libs/types/interface'
import { FaShareAlt } from 'react-icons/fa'
import { CiHeart } from 'react-icons/ci'
import Breadcrumb from './breadcrumb'

export default function MainSection({
  data
}: {
  data: Package
}): React.ReactNode {
  return (
    <Fragment>
      <Breadcrumb data={data} />

      <section className="flex w-full px-2">
        <figure className="md:w-1/2 px-4 mb-8 md:mb-8">
          <Image
            src={data.thumbnail}
            alt={data.name}
            className="rounded-xl shadow-md w-full h-full"
            width={400}
            height={200}
            priority
          />
        </figure>
        <div className="grid grid-cols-2 md:w-1/2 items-center">
          {data.images.map((image, index) => (
            <figure className="px-4 mb-8" key={index}>
              <Image
                src={image}
                alt={image}
                className="rounded-xl shadow-md h-[172px] w-[288px]"
                width={300}
                height={180}
              />
            </figure>
          ))}
        </div>
      </section>

      <section className="flex font-label px-6 justify-between mb-24">
        <div className="flex flex-col">
          <p className="font-bold text-heading-3">{data?.name}</p>
          <p className="text-gray-70 font-medium text-heading-4">
            {data?.country}
          </p>
        </div>
        <div className="flex flex-col gap-6 font-bold text-heading-4">
          <div className="flex gap-2 align-center">
            <Image
              src={'/assets/icons/yellow-star.svg'}
              alt="Yellow Star"
              height={20}
              width={20}
            />
            <p>
              {data?.rating} ({data?.reviewers} Review)
            </p>
          </div>
          <div className="flex gap-3 align-center items-center justify-end text-heading-4 font-bold">
            <FaShareAlt size={20} />
            <p>Share</p>
            <CiHeart size={20} />
            <p>Save</p>
          </div>
        </div>
      </section>
    </Fragment>
  )
}
