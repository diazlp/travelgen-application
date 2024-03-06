import React, { Fragment } from 'react'
import { usePackageStore } from '@/libs/store'
import { Package } from '@/libs/types/interface'
import PackageCard from './package-card'

export default function Packages(): React.ReactNode {
  const packages = usePackageStore((state) => state.packages)

  if (!packages?.length) {
    return <></>
  }

  return (
    <Fragment>
      <h3 className="text-heading-3 text-white font-label font-bold pt-14 mb-1">
        Popular Holiday Bundles
      </h3>
      <p className="text-heading-4 text-white mb-4">
        Top selections by our customers
      </p>

      <div className="flex justify-between">
        {packages
          .filter(({ is_promo }: Package) => !is_promo)
          .map((data: Package) => (
            <PackageCard data={data} key={data.id} />
          ))}
      </div>
    </Fragment>
  )
}
