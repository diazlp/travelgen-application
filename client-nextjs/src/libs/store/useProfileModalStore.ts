import { create } from 'zustand'

export enum ProfileModalType {
  Password = 'password',
  Verification = 'verification'
}

interface ProfileModalState {
  visible: boolean
  type: ProfileModalType
  showModal: (data: ProfileModalType) => void
  closeModal: () => void
}

const useProfileModalStore = create<ProfileModalState>((set) => ({
  visible: false,
  type: ProfileModalType.Password,
  showModal: (type: ProfileModalType) => set({ visible: true, type }),
  closeModal: () => set({ visible: false, type: ProfileModalType.Password })
}))

export default useProfileModalStore
