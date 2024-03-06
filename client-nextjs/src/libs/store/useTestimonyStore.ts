import { create } from 'zustand'
import { Testimony } from '../types/interface'

interface TestimonyModalStore {
  testimonies: Testimony[] | null
  setTestimonies: (data: Testimony[]) => void
}

const useTestimonyModalStore = create<TestimonyModalStore>((set) => ({
  testimonies: null,
  setTestimonies: (data: Testimony[]) => set({ testimonies: data })
}))

export default useTestimonyModalStore
