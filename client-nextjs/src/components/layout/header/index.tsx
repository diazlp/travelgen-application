import React from 'react'
import Image from 'next/image'
import Container from '../../container'
import Search from './search'
import Navigation from './navigation'
import Button from '@/components/button'

export default function Header(): React.ReactNode {
  return (
    <header className="h-[85px] bg-white shadow-lg p-4">
      <Container>
        <div className="flex justify-between items-center text-black">
          <div className="flex items-center">
            <Image
              src={'/assets/travelgen-header-logo.png'}
              className="cursor-pointer select-none"
              alt="Travelgen Header Logo"
              // placeholder="blur"
              height={48}
              width={182}
            />

            <Search />
          </div>

          <div className="flex items-center gap-5">
            <Navigation />
            <Button className="w-[190px]">Login</Button>
          </div>
        </div>
      </Container>
    </header>
  )
}
