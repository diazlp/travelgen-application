import React from 'react'
import Link from 'next/link'
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
            <Link href="/">
              <Image
                src={'/assets/travelgen-header-logo.png'}
                className="cursor-pointer select-none"
                alt="Travelgen Header Logo"
                placeholder="empty"
                height={48}
                width={182}
                priority
              />
            </Link>

            {/* <Search /> */}
          </div>

          <div className="flex items-center gap-5">
            <Navigation />
            <Link href="/login">
              <Button className="w-[190px]">Login</Button>
            </Link>
          </div>
        </div>
      </Container>
    </header>
  )
}
