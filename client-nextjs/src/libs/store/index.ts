import { Package } from '../types/interface'

import usePackageStore from './usePackageStore'
import useCategoryStore from './useCategoryStore'
import useTestimonyStore from './useTestimonyStore'
import useCheckoutModalStore from './useCheckoutModalStore'
import useProfileModalStore, { ProfileModalType } from './useProfileModalStore'
import useTestimonyModalStore from './useTestimonyModalStore'

const conditionalRenderModal = (condition: boolean, data: Package) => {
  return condition
    ? useCheckoutModalStore.getState().showModal(data)
    : useProfileModalStore.getState().showModal(ProfileModalType.Verification)
}

export {
  usePackageStore,
  useCategoryStore,
  useTestimonyStore,
  useCheckoutModalStore,
  useProfileModalStore,
  useTestimonyModalStore,
  ProfileModalType,
  conditionalRenderModal
}
