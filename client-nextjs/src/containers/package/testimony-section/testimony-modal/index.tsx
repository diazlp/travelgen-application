import React from 'react'
import { IoMdClose } from 'react-icons/io'
import { useTestimonyModalStore } from '@/libs/store'
import TestimonyForm from './testimony-form'

export default function TestimonyModal(): React.ReactNode {
  const testimonyModal = useTestimonyModalStore()

  if (testimonyModal.visible) {
    return (
      <div className="fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center animate-fadeInModal bg-black bg-opacity-70">
        <div
          className="border rounded-xl shadow-lg bg-white w-11/12 md:max-w-md mx-auto z-50 overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col py-4 text-left px-6">
            <div className="flex justify-between items-center mb-3">
              <p className="text-2xl font-bold text-gray-70">
                Share your adventure
              </p>
              <IoMdClose
                className="cursor-pointer z-50"
                onClick={testimonyModal.closeModal}
              />
            </div>
            <TestimonyForm />
          </div>
        </div>
      </div>
    )
  }
}
