import Head from 'next/head'
import RegisterContainer from '@/containers/register'

export default function RegisterPage() {
  return (
    <>
      <Head>
        <title>TravelGen | Register</title>
      </Head>
      <RegisterContainer />
    </>
  )
}
