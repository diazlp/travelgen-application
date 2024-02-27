import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Button from '@/components/button'
import Container from '@/components/container'
import InfoItem from './info-item'

import headerPhoto1 from '/public/assets/home/header-1.png'
import headerPhoto2 from '/public/assets/home/header-2.png'
import headerPhoto3 from '/public/assets/home/header-3.png'
import headerPhoto4 from '/public/assets/home/header-4.png'
import headerPhoto5 from '/public/assets/home/header-5.png'
import headerPhoto6 from '/public/assets/home/header-6.png'

export default function TopSection(): React.ReactNode {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
  const [fadeIn, setFadeIn] = useState<boolean>(true)

  const headerPhotos = [
    headerPhoto1,
    headerPhoto2,
    headerPhoto3,
    headerPhoto4,
    headerPhoto5,
    headerPhoto6
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % headerPhotos.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

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

          {headerPhotos.map((photo, index) => (
            <Image
              key={index}
              src={photo}
              alt="Travelgen Header Photo"
              className={`absolute top-0 right-0 mt-[85px] object-contain ${
                index === currentImageIndex ? 'animate-fadeInHeader' : 'hidden'
              }`}
            />
          ))}
        </div>
        <div className="flex gap-40 mx-auto">
          <InfoItem label="+30" subLabel="Countries" />
          <InfoItem label="+1500" subLabel="Lodges" />
          <InfoItem label="+100" subLabel="Destinations" />
          <InfoItem label="+50.000" subLabel="Customers" />
        </div>
      </div>
    </Container>
  )
}
