import Layout from '@/components/layout'
import useProfileFetcher from '@/hooks/profile/useProfileFetcher'
import React from 'react'
import TopSection from './top-section'
import BottomSection from './bottom-section'

export default function ProfileContainer(): React.ReactNode {
  const { profile: profileData, loading } = useProfileFetcher()

  return (
    <Layout>
      <TopSection profileData={profileData} loading={loading} />
      <BottomSection profileData={profileData} loading={loading} />
    </Layout>
  )
}
