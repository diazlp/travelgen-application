import React from 'react'
import Image from 'next/image'
import headerPhoto from '/public/assets/home/header.png'
import Button from '@/components/button'
import Container from '@/components/container'
import TopInfo from './top-info'

export default function TopSection(): React.ReactNode {
  return (
    <Container>
      <div className="flex flex-col mb-10">
        <div className="flex justify-between">
          <div className="flex flex-col pt-[112px] pb-[58px]">
            <div className="flex flex-col mb-[174px]">
              <h1 className="text-heading-2 font-bold font-label text-gray-100 w-[500px] mb-8">
                Explore the Beautiful World with a Single Touch
              </h1>

              <p className="text-heading-3 text-gray-70 w-[526px] mb-7">
                Embark on the beautiful world with just one touch by booking
                your ticket through TravelGen. You'll receive the best service
                for your holiday travels anywhere, anytime
              </p>

              <Button className="w-[190px]">See Packages</Button>
            </div>
          </div>

          <Image
            src={headerPhoto}
            alt="Travelgen Header Photo"
            objectFit="contain"
            className="absolute top-0 right-0 mt-[85px]"
          />
        </div>
        <div className="flex gap-40 mx-auto">
          <TopInfo label="+30" subLabel="Countries" />
          <TopInfo label="+1500" subLabel="Lodges" />
          <TopInfo label="+100" subLabel="Destinations" />
          <TopInfo label="+50.000" subLabel="Customers" />
        </div>
      </div>
    </Container>
  )
}
