import React from 'react'
import { IoMdClose } from 'react-icons/io'
import { ProfileModalType, useProfileModalStore } from '@/libs/store'
import ChangePasswordForm from './change-password'
import VerifyEmailForm from './verify-email'

export default function ProfileModal(): React.ReactNode {
  const profileModal = useProfileModalStore()

  if (profileModal.visible) {
    return (
      <div className="fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center bg-black bg-opacity-70 animate-fadeInModal">
        <div
          className="border rounded-xl shadow-lg bg-white w-11/12 md:max-w-md mx-auto z-50 overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col py-4 text-left px-6">
            <div className="flex justify-between items-center">
              <p className="text-2xl font-bold text-gray-70">
                {profileModal.type === ProfileModalType.Password
                  ? 'Change Password'
                  : 'Email Verification Code:'}
              </p>
              <IoMdClose
                className="cursor-pointer z-50"
                onClick={profileModal.closeModal}
              />
            </div>
            {profileModal.type === ProfileModalType.Password ? (
              <ChangePasswordForm />
            ) : (
              <VerifyEmailForm />
            )}
          </div>
        </div>
      </div>
    )
  }
}
