import Head from 'next/head'
import ProfileContainer from '@/containers/profile'

export default function ProfilePage() {
  return (
    <>
      <Head>
        <title>TravelGen | Profile</title>
      </Head>
      <ProfileContainer />
    </>
  )
}
