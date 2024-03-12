import React from 'react'
import { useSession } from 'next-auth/react'
import { Package, Testimony } from '@/libs/types/interface'
import { IoIosAdd } from 'react-icons/io'
import { useTestimonyModalStore } from '@/libs/store'
import Button from '@/components/button'
import TestimonyCard from './testimony-card'
import TestimonyModal from './testimony-modal'
import useTestimonyFetcher from '@/hooks/testimony/useTestimonyFetcher'

export default function TestimonySection({
  packageData
}: {
  packageData: Package
}): React.ReactNode {
  const { data: session } = useSession()
  const showTestimonyModal = useTestimonyModalStore((state) => state.showModal)
  const { testimonies } = useTestimonyFetcher(packageData.name)

  return (
    <section className="py-14">
      <h3 className="text-heading-3 font-label font-bold">
        Customer Testimonies
      </h3>
      {session?.user ? (
        <Button
          isOutlined
          className="flex items-center mb-6 hover:text-white hover:bg-blue-100"
          props={{
            onClick: () => showTestimonyModal(packageData)
          }}
        >
          <IoIosAdd /> Add Testimony
        </Button>
      ) : null}
      {testimonies?.length ? (
        <div className="grid grid-cols-4">
          {testimonies.map((testimony: Testimony) => (
            <TestimonyCard data={testimony} key={testimony._id} />
          ))}
        </div>
      ) : packageData.testimonies.length ? (
        <div className="grid grid-cols-4">
          {packageData.testimonies.map((testimony: Testimony) => (
            <TestimonyCard data={testimony} key={testimony._id} />
          ))}
        </div>
      ) : (
        <p className="text-heading-4 text-blue-100 text-center font-bold font-label my-20 select-none">
          Nothing to show here
        </p>
      )}

      <TestimonyModal />
    </section>
  )
}
