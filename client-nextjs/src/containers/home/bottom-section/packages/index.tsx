import React, { Fragment } from 'react'
import { packages } from '@/libs/constants'
import { Package } from '@/libs/types/interface'
import PackageCard from './package-card'

export default function Packages(): React.ReactNode {
  return (
    <Fragment>
      <h3 className="text-heading-3 text-white font-label font-bold pt-14 mb-1">
        Popular Holiday Bundles
      </h3>
      <p className="text-heading-4 text-white mb-4">
        Top selections by our customers
      </p>

      <div className="flex justify-between">
        {packages.map((data: Package) => {
          return <PackageCard data={data} key={data.id} />
        })}
      </div>
    </Fragment>
  )
}
