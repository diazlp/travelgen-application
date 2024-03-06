import { create } from 'zustand'
import { Package } from '../types/interface'

interface CheckoutModalState {
  visible: boolean
  data: Package | null
  quantity: number
  showModal: (data: Package) => void
  closeModal: () => void
  incrementQuantity: () => void
  decrementQuantity: () => void
}

const useCheckoutModalStore = create<CheckoutModalState>((set) => ({
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

export default useCheckoutModalStore
