import { create } from 'zustand'
import { Package } from '../types/interface'

interface TestimonyModalStore {
  visible: boolean
  data: Package | null
  showModal: (data: Package) => void
  closeModal: () => void
}

const useTestimonyModalStore = create<TestimonyModalStore>((set) => ({
  visible: false,
  data: null,
  showModal: (data: Package) => set({ visible: true, data }),
  closeModal: () => set({ visible: false })
}))

export default useTestimonyModalStore
