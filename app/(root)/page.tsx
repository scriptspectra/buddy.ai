import Categories from '@/components/Categories';
import SearchInput from '@/components/SearchInput'
import db from '@/lib/db'
import React from 'react'

const page = async () => {
  const categories = await db.category.findMany();

  return (
    <div className='h-full p-4 space-y-2 text-white md:pl-24 py-0 my-0'>
      <SearchInput />
      <Categories data={categories} />
    </div>
  )
}

export default page