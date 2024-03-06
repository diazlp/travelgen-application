import { create } from 'zustand'
import { Package } from '../types/interface'

export enum ProfileModalType {
  Password = 'password',
  Verification = 'verification'
}

interface CheckoutModalState {
  visible: boolean
  data: Package | null
  quantity: number
  showModal: (data: Package) => void
  closeModal: () => void
  incrementQuantity: () => void
  decrementQuantity: () => void
}

interface ProfileModalState {
  visible: boolean
  type: ProfileModalType
  showModal: (data: ProfileModalType) => void
  closeModal: () => void
}

interface PackageStore {
  packages: Package[] | null
  setPackages: (data: Package[]) => void
}

export const usePackageStore = create<PackageStore>((set) => ({
  packages: null,
  setPackages: (data: Package[]) => set({ packages: data })
}))

export const useCheckoutModalStore = create<CheckoutModalState>((set) => ({
  visible: false,
  data: null,
  quantity: 0,
  showModal: (data: Package) => set({ visible: true, data, quantity: 1 }),
  closeModal: () => set({ visible: false, data: null, quantity: 0 }),
  incrementQuantity: () =>
    set((prevState) => ({ ...prevState, quantity: prevState.quantity + 1 })),
  decrementQuantity: () =>
    set((prevState) => ({
      ...prevState,
      quantity: Math.max((prevState.quantity as number) - 1, 1)
    }))
}))

export const useProfileModalStore = create<ProfileModalState>((set) => ({
  visible: false,
  type: ProfileModalType.Password,
  showModal: (type: ProfileModalType) => set({ visible: true, type }),
  closeModal: () => set({ visible: false, type: ProfileModalType.Password })
}))

export const conditionalRenderModal = (condition: boolean, data: Package) => {
  return condition
    ? useCheckoutModalStore.getState().showModal(data)
    : useProfileModalStore.getState().showModal(ProfileModalType.Verification)
}
