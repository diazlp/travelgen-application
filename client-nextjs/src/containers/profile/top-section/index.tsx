import React, { Fragment, useState } from 'react'
import Image from 'next/image'
import { IUserResponse } from '@/hooks/profile/useProfileFetcher'
import Button from '@/components/button'
import UpdateForm from './update-form'

import backgroundImage from '/public/assets/home/bromo.jpg'

interface TopSectionProps {
  profileData: IUserResponse
}

export default function TopSection({
  profileData
}: TopSectionProps): React.ReactNode {
  const [isUpdateProfile, setIsUpdateProfile] = useState<boolean>(false)

  return (
    <div className="h-[650px] flex flex-col gap-20 select-none">
      <section className="relative">
        <Image
          src={backgroundImage}
          alt="Profile Backgound Image"
          className="relative top-0 right-0 object-cover h-[300px]"
          priority
        />

        <div className="flex absolute bottom-0 right-1/2 translate-y-1/2 translate-x-1/2">
          <figure className="h-28 w-28 object-center">
            <Image
              src={profileData.profile.avatar}
              alt={profileData.full_name}
              className="rounded-full shadow-lg object-cover object-center"
              fill
            />
          </figure>
        </div>
      </section>

      <section className="flex flex-col items-center text-center font-sans gap-3">
        {isUpdateProfile ? (
          <UpdateForm setIsUpdateProfile={setIsUpdateProfile} />
        ) : (
          <Fragment>
            <h1 className="font-bold text-3xl text-primary-black">
              {profileData.full_name}
            </h1>
            <p className="text-gray-70 font-bold">
              {profileData.profile.location}
            </p>
            <p className="mt-2 text-gray-70 font-medium w-[405px]">
              {profileData.profile.biography}
            </p>
            <Button
              type="button"
              className="w-[178px] bg-white border border-gray-50 text-gray-50 text-heading-5 hover:border-blue-100 hover:text-blue-100"
              props={{
                onClick: () => setIsUpdateProfile(true)
              }}
            >
              Edit Profile
            </Button>
          </Fragment>
        )}
      </section>
    </div>
  )
}
