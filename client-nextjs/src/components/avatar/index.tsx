import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { signOut } from 'next-auth/react'
import useProfileFetcher from '@/hooks/profile/useProfileFetcher'
import { CiUser } from 'react-icons/ci'
import { IoMdLogOut } from 'react-icons/io'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import AvatarItem from './avatar-item'

export default function Avatar(): React.ReactNode {
  const { profile: profileData, loading } = useProfileFetcher()
  const router = useRouter()

  if (loading) {
    return <AiOutlineLoading3Quarters className="animate-spin" />
  }

  return (
    <div className="group inline-block select-none">
      <figure className="rounded-full overflow-hidden h-11 w-11 cursor-pointer select-none group inline-block">
        <Image
          alt={profileData.full_name}
          src={profileData.profile.avatar}
          className="h-full object-cover w-full"
          width={36}
          height={36}
          priority
        />
      </figure>
      <ul className="bg-white border shadow-lg rounded-sm cursor-pointer transform scale-0 group-hover:scale-100 group-hover:-translate-x-3/4 group-hover:translate-y-1 absolute transition duration-300 ease-in-out origin-top min-w-56 z-10">
        <li className="px-5 py-2 flex flex-row gap-3 items-center">
          <figure className="rounded-full overflow-hidden h-10 w-10 cursor-pointer select-none group inline-block">
            <Image
              alt={profileData.full_name}
              src={profileData.profile.avatar}
              className="h-full object-cover w-full"
              width={36}
              height={36}
              priority
            />
          </figure>
          <div className="flex flex-col gap-1 font-sans">
            <p className="font-bold text-sm">{profileData.full_name}</p>
            <p className="text-xs text-gray-30">{profileData.email}</p>
          </div>
        </li>
        <hr />
        <li className="flex flex-col py-4 px-5 gap-4  font-sans text-md">
          <AvatarItem
            props={{
              onClick: () => router.push('/profile')
            }}
          >
            <CiUser />
            Account Details
          </AvatarItem>
          <AvatarItem
            props={{
              onClick: async () => {
                await signOut({ redirect: false })
                router.push('/login')
              }
            }}
          >
            <IoMdLogOut />
            Logout
          </AvatarItem>
        </li>
      </ul>
    </div>
  )
}
