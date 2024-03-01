import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Formik, Form } from 'formik'
import useLoginForm from '@/hooks/login/useLoginForm'
import Layout from '@/components/layout'
import Button from '@/components/button'
import FormikInput from '@/components/formik-input'

export default function LoginContainer(): React.ReactNode {
  const { initialValues, onSubmit, validate } = useLoginForm()

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
            <Link
              href="/register"
              className="text-heading-5 text-blue-100 font-semibold ml-2 hover:underline"
            >
              Sign up here
            </Link>
          </div>

          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validate={validate}
          >
            {({ isSubmitting, errors, status }) => (
              <Form className="flex flex-col mt-8">
                <FormikInput
                  label="Email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="mb-6"
                  error={errors['email']}
                />
                <FormikInput
                  label="Password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  error={errors['password']}
                />

                <span className="text-heading-5 font-label font-bold w-full text-center text-xs text-red-100 mt-3">
                  {status}
                </span>

                <a
                  href="#"
                  className="text-heading-5 text-blue-100 font-semibold mt-8 mb-4 hover:underline"
                >
                  Forgot your password?
                </a>

                {isSubmitting ? (
                  <Button type="submit" isFullWidth isDisabled>
                    Logging in...
                  </Button>
                ) : (
                  <Button type="submit" isFullWidth>
                    Login
                  </Button>
                )}
              </Form>
            )}
          </Formik>

          <div className="flex items-center gap-5 opacity-60">
            <div className="flex-1 h-[0.05rem] bg-gray-500"></div>
            <p className="text-heading-5 text-gray-50 my-4">or login with</p>
            <div className="flex-1 h-[0.05rem] bg-gray-500"></div>
          </div>

          <Button
            variant="google"
            className="flex items-center gap-2 justify-center"
          >
            Google
          </Button>
        </div>
      </div>
    </Layout>
  )
}
