import React, { Fragment } from 'react'
import { categories } from '@/libs/constants'
import CategoryCard from './category-card'

export default function Categories(): React.ReactNode {
  return (
    <Fragment>
      <h3 className="text-heading-3 text-gray-100 font-label font-bold pt-14 mb-8">
        Destination Categories
      </h3>

      <div className="flex justify-between">
        {categories.map((category) => {
          return <CategoryCard data={category} key={category.id} />
        })}
      </div>
    </Fragment>
  )
}
