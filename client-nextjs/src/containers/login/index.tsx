import React from 'react'
import Image from 'next/image'
import Layout from '@/components/layout'
import Button from '@/components/button'
import Input from '@/components/input'

export default function LoginContainer(): React.ReactNode {
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
          <p className="text-heading-3 font-label font-extrabold">Login</p>

          <div className="flex mt-3">
            <p className="text-heading-5 text-gray-50 font-semibold">
              Don't have an account?
            </p>
            <a
              href="#"
              className="text-heading-5 text-blue-100 font-semibold ml-2 hover:underline"
            >
              Sign up here
            </a>
          </div>

          <form className="flex flex-col mt-8">
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
            />

            <a
              href="#"
              className="text-heading-5 text-blue-100 font-semibold mt-8 mb-4 hover:underline"
            >
              Forgot your password?
            </a>

            <Button>Login</Button>
          </form>
        </div>
      </div>
    </Layout>
  )
}
