import React from 'react'
import Image from 'next/image'
import { IUserResponse } from '@/hooks/profile/useProfileFetcher'
import Container from '@/components/container'

interface BottomSectionProps {
  profileData: IUserResponse
  loading: boolean
}

export default function BottomSection({
  profileData,
  loading
}: BottomSectionProps): React.ReactNode {
  return (
    <Container>
      <div className="flex flex-row gap-14 justify-center text-gray-70 cursor-pointer">
        <button
          type="button"
          className="font-bold hover:border-blue-100 hover:text-blue-100 focus:text-blue-100 focus:underline"
        >
          Riwayat Perjalanan
        </button>
        <button
          type="button"
          className="font-bold hover:border-blue-100 hover:text-blue-100 focus:text-blue-100 focus:underline"
        >
          Favorit
        </button>
      </div>
    </Container>
  )
}
