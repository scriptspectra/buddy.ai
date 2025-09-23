"use client";

import { cn } from '@/lib/utils';
import { Category } from '@prisma/client'
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import qs from "query-string"
import { url } from 'inspector';
import { on } from 'process';

interface CategoriesProps {
    data: Category[];
}

const Categories = ({
    data,
}: CategoriesProps) => {
  const router = useRouter()
  const SearchParams = useSearchParams()

  const categoryId = SearchParams.get("categoryId")

  const onClick = (id: string | undefined) => {
    const query = { categoryId: id };

    const url = qs.stringifyUrl({
      url: window.location.href,
      query,
    }, { skipNull: true })

    router.push(url)
  }

  return (
    <div className='w-full  overflow-x-auto space-x-2 flex p-1'>
      <button
        onClick={() => onClick(undefined)}
        className={cn(`
          flex
          items-centertext-center
          text-shadow-xs
          md:text-sm
          px-2
          md:px-4
          py-2
          md:py-3
          rounded-md
          bg-primary/10
          hover:opacity-75
          transition
          `,
          !categoryId ? "bg-primary/25" : "bg-primary/10"
        )}
      >
        Newest
      </button>

          { data.map((item) => (
            <button
              onClick={() => {onClick(item.id)}}
              className={cn(`
                flex
                items-centertext-center
                text-shadow-xs
                md:text-sm
                px-2
                md:px-4
                py-2
                md:py-3
                rounded-md
                bg-primary/10
                hover:opacity-75
                transition
                `,
              item.id === categoryId ? "bg-primary/25" : "bg-primary/10"
            )}
            >
              { item.name }
            </button>            
          )) }

    </div>
  )
}

export default Categories