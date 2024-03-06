import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function NoPage(): React.ReactNode {
  return (
    <div className="h-screen w-screen bg-white flex items-center font-label">
      <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700 gap-40">
        <div className="max-w-md">
          <div className="text-heading-1 font-dark font-bold">404</div>
          <p className="text-heading-2 md:text-3xl font-medium leading-normal">
            Oops. Seems like you have strayed off your destination page.
          </p>
          <p className="mb-8">
            Let&apos;s get back from the beginning, shall we?
          </p>

          <Link
            href="/"
            className="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-100 active:bg-blue-100"
          >
            Back to Home
          </Link>
        </div>
        <div className="max-w-lg align-middle">
          <Image
            src={'/assets/travelgen-footer-logo.png'}
            alt="Travelgen Footer Logo"
            height={280}
            width={280}
          />
        </div>
      </div>
    </div>
  )
}
