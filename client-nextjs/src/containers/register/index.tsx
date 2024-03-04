import { Toaster } from 'react-hot-toast'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Formik, Form } from 'formik'
import useRegisterForm from '@/hooks/register/useRegisterForm'
import Layout from '@/components/layout'
import Button from '@/components/button'
import Input from '@/components/input'

export default function RegisterContainer(): React.ReactNode {
  const { initialValues, onSubmit, validate } = useRegisterForm()

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

          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validate={validate}
          >
            {({ isSubmitting, errors, status }) => (
              <Form className="flex flex-col mt-8">
                <Input
                  label="Full Name"
                  type="text"
                  name="fullName"
                  placeholder="Enter your Fullname"
                  className="mb-6"
                  error={errors['fullName']}
                />

                <Input
                  label="Email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="mb-6"
                  error={errors['email']}
                />

                <Input
                  label="Password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  error={errors['password']}
                />

                <span className="text-heading-5 font-label font-bold w-full text-center text-xs text-red-100 my-3">
                  {status}
                </span>

                {isSubmitting ? (
                  <Button
                    type="submit"
                    isFullWidth
                    isDisabled
                    className="text-white"
                  >
                    Registering...
                  </Button>
                ) : (
                  <Button type="submit" isFullWidth className="text-white">
                    Register
                  </Button>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Toaster />
    </Layout>
  )
}
