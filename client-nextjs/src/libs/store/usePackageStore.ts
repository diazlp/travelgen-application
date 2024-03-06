import { create } from 'zustand'
import { Package } from '../types/interface'

interface PackageStore {
  packages: Package[] | null
  setPackages: (data: Package[]) => void
}

const usePackageStore = create<PackageStore>((set) => ({
  packages: null,
  setPackages: (data: Package[]) => set({ packages: data })
}))

export default usePackageStore
