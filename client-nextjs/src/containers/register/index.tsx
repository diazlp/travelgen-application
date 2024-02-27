import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '@/components/layout'
import Button from '@/components/button'
import Input from '@/components/input'

export default function RegisterContainer(): React.ReactNode {
  return (
    <Layout noFooter>
      <div className="flex justify-between">
        <div>
          <Image
            src={'/assets/auth/bg-auth.png'}
            alt="Travelgen Login"
            className="relative left-0 -z-10 object-contain object-left"
            fill
            priority
          />
        </div>

        <div className="flex-1 flex flex-col absolute left-[60%] top-[55%] -translate-y-1/2 min-w-[393px]">
          <p className="text-heading-3 font-label font-extrabold">Register</p>

          <div className="flex mt-3">
            <p className="text-heading-5 text-gray-50 font-semibold">
              Already have an account?
            </p>
            <Link
              href="/login"
              className="text-heading-5 text-blue-100 font-semibold ml-2 hover:underline"
            >
              Sign in here
            </Link>
          </div>

          <form className="flex flex-col mt-8">
            <Input
              label="Full Name"
              type="text"
              name="FullName"
              placeholder="Enter your Fullname"
              className="mb-6"
            />

            <Input
              label="Email"
              type="email"
              name="Email"
              placeholder="Enter your email"
              className="mb-6"
            />

            <Input
              label="Password"
              type="password"
              name="Password"
              placeholder="Enter your password"
              className="mb-6"
            />

            <Button type="submit" isFullWidth>
              Register
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  )
}
