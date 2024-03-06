import React, { Fragment } from 'react'
import { useCategoryStore } from '@/libs/store'
import CategoryCard from './category-card'

export default function Categories(): React.ReactNode {
  const categories = useCategoryStore((state) => state.categories)

  if (!categories?.length) {
    return <></>
  }

  return (
    <Fragment>
      <h3 className="text-heading-3 text-gray-100 font-label font-bold pt-14 mb-8">
        Destination Categories
      </h3>

      <div className="flex justify-between">
        {categories.map((category) => (
          <CategoryCard data={category} key={category._id} />
        ))}
      </div>
    </Fragment>
  )
}
