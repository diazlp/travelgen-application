import { create } from 'zustand'
import { Category } from '../types/interface'

interface CategoryStore {
  categories: Category[] | null
  setCategories: (data: Category[]) => void
}

const useCategoryStore = create<CategoryStore>((set) => ({
  categories: null,
  setCategories: (data: Category[]) => set({ categories: data })
}))

export default useCategoryStore
