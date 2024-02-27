import Head from 'next/head'
import LoginContainer from '@/containers/login'

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>TravelGen | Login</title>
      </Head>
      <LoginContainer />
    </>
  )
}
