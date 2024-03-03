import React from 'react'
import Image from 'next/image'
import Button from '@/components/button'
import { ITransactionResponse } from '@/hooks/profile/useProfileFetcher'

interface HistoryCardProps {
  history: ITransactionResponse
}

export default function HistoryCard({
  history
}: HistoryCardProps): React.ReactNode {
  return (
    <article className="flex flex-col bg-white rounded-xl shadow-lg overflow-hidden w-[393px]">
      <figure className="relative w-full h-[268px]">
        <Image
          src={history.package.thumbnail}
          alt={history.package.name}
          width={461}
          height={308}
        />
      </figure>

      <div className="flex flex-col p-4">
        <div className="flex items-center mb-4">
          <Image
            src={'/assets/icons/yellow-star.svg'}
            alt="Yellow Star"
            height={20}
            width={20}
          />

          <p className="text-heading-5 text-gray-70 ml-1">
            {history.package.rating} ({history.package.reviewers} Reviews)
          </p>
        </div>

        <p className="text-heading-3 text-gray-100 font-label font-bold">
          {history.package.name}
        </p>
        <p className="text-heading-4 text-gray-70 mb-4">
          {history.package.country}
        </p>

        <div className="flex justify-between gap-3">
          <Button
            isFullWidth
            isOutlined
            // v-on:click="detailClickHandler(history?.Package?.id)"
          >
            Lihat detail
          </Button>
        </div>
      </div>
    </article>
  )
}
