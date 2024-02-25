import Layout from '@/components/layout'
import Head from 'next/head'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>TravelGen Web</title>
      </Head>
      <Layout>
        <div className="text-yellow-70 font-label text-2xl font-bold">
          Hello!
        </div>
      </Layout>
    </>
  )
}
