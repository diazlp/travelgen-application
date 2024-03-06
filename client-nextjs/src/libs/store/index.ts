import { Package } from '../types/interface'

import usePackageStore from './usePackageStore'
import useCategoryStore from './useCategoryStore'
import useCheckoutModalStore from './useCheckoutModalStore'
import useProfileModalStore, { ProfileModalType } from './useProfileModalStore'

const conditionalRenderModal = (condition: boolean, data: Package) => {
  return condition
    ? useCheckoutModalStore.getState().showModal(data)
    : useProfileModalStore.getState().showModal(ProfileModalType.Verification)
}

export {
  usePackageStore,
  useCategoryStore,
  useCheckoutModalStore,
  useProfileModalStore,
  ProfileModalType,
  conditionalRenderModal
}
