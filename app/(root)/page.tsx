import Categories from '@/components/Categories';
import Companions from '@/components/Companions';
import SearchInput from '@/components/SearchInput'
import db from '@/lib/db'
import React from 'react'

interface RootPageProps {
  searchParams: {
    categoryId: string,
    name: string,
  }
}

const RootPage = async ({
  searchParams,
}: RootPageProps) => {
  const data = await db.companion.findMany({
    where: {
      categoryId: searchParams.categoryId,
      name: {
        search: searchParams.name,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: {
          messages: true,
        }
      }
    }
  })

  const categories = await db.category.findMany();

  return (
    <div className='h-full p-4 space-y-2 text-white md:pl-24 py-0 my-0'>
      <SearchInput />
      <Categories data={categories} />
      <Companions data={data} />
    </div>
  )
}

export default RootPage