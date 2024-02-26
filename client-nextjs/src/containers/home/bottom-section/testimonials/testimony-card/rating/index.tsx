import Image from 'next/image'
import React from 'react'

export default function Rating({
  rating
}: {
  rating: number
}): React.ReactNode {
  return (
    <div className="flex gap-1 align-center">
      {Array.from({ length: Math.min(rating, 5) }).map((_, index) => (
        <Image
          key={index}
          src={'/assets/icons/yellow-star.svg'}
          alt="Yellow Star"
          height={20}
          width={20}
        />
      ))}
    </div>
  )
}
