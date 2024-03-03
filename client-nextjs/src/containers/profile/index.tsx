import React, { Fragment } from 'react'
import Layout from '@/components/layout'
import useProfileFetcher from '@/hooks/profile/useProfileFetcher'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import TopSection from './top-section'
import BottomSection from './bottom-section'

export default function ProfileContainer(): React.ReactNode {
  const { profile: profileData, loading } = useProfileFetcher()

  return (
    <Layout>
      {loading ? (
        <div className="my-40 flex justify-center">
          <AiOutlineLoading3Quarters size={50} className="animate-spin w-100" />
        </div>
      ) : (
        <Fragment>
          <TopSection profileData={profileData} />
          <BottomSection profileData={profileData} />
        </Fragment>
      )}
    </Layout>
  )
}
