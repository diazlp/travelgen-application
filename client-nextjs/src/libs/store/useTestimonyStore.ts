import { create } from 'zustand'
import { Testimony } from '../types/interface'

interface TestimonyStore {
  testimonies: Testimony[] | null
  setTestimonies: (data: Testimony[]) => void
}

const useTestimonyStore = create<TestimonyStore>((set) => ({
  testimonies: null,
  setTestimonies: (data: Testimony[]) => set({ testimonies: data })
}))

export default useTestimonyStore
