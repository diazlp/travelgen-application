import Layout from '@/components/layout'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Layout>
      <div className="text-yellow-70 font-label text-2xl font-bold">Hello!</div>
    </Layout>
  )
}
