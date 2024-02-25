import React from 'react'
import { FaSearch } from 'react-icons/fa'

export default function Search(): React.ReactNode {
  return (
    <form className="flex items-center ml-8">
      <input
        type="text"
        placeholder="Category | Location"
        className="border border-gray-50 px-4 py-3 rounded-l-md text-sm text-gray-50"
      />
      <button
        className="flex justify-center items-center bg-blue-100 border border-blue-100 text-white text-xl rounded-r-md h-[46px] w-[46px]"
        type="submit"
      >
        <FaSearch />
      </button>
    </form>
  )
}
