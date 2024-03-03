import React from 'react'
import { IUserResponse } from '@/hooks/profile/useProfileFetcher'
import Container from '@/components/container'
import SectionTab from './section-tab'
import HistoryCard from './history-card'

interface BottomSectionProps {
  profileData: IUserResponse
}

export default function BottomSection({
  profileData
}: BottomSectionProps): React.ReactNode {
  return (
    <Container>
      <section className="flex flex-col select-none">
        <div className="flex flex-row gap-14 justify-center text-gray-70 cursor-pointer">
          <SectionTab>Travel Histories</SectionTab>
          {/* <SectionTab>Favorites</SectionTab> */}
        </div>

        <div>
          {!profileData.transactions.length ? (
            <p className="text-heading-4 text-blue-100 text-center font-bold font-label my-40">
              You have never traveled with us
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-10 my-10">
              {profileData.transactions.map((transaction) => (
                <HistoryCard history={transaction} />
              ))}
            </div>
          )}
        </div>
      </section>
    </Container>
  )
}
