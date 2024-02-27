import Head from 'next/head'
import HomeContainer from '@/containers/home'

export default function HomePage() {
  return (
    <>
      <Head>
        <title>TravelGen Web</title>
      </Head>
      <HomeContainer />
    </>
  )
}
