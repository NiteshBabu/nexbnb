'use client'
import React, { useCallback, useState } from 'react'
import { ScrollItem, Scroller } from '../ui/scroller'
import filterList from '../../data/filters.json'
import { Icon } from '@iconify/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Skeleton } from '../ui/skeleton'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'

function FilterList() {
  const router = useRouter()

  // const pageItemCount = 8
  // const [currentPage, setCurrentPage] = useState(1)
  // const [pageCount, setPageCount] = useState<number | null>(null)
  // const [hasNextPage, setHasNextPage] = useState(false)
  // const [hasPrevPage, setHasPrevPage] = useState(false)
  const searchParams = useSearchParams()
  const category = searchParams.get('category')
  const pathname = usePathname()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set('page_no', '1')
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  return (
    <div className="sticky top-[91px] z-50 ">
      <Scroller className="py-5 no-scrollbar container bg-white">
        {filterList.map((filterIcon) => (
          <ScrollItem key={filterIcon.id}>
            <Link
              key={filterIcon.id}
              href={`${pathname}?${createQueryString(
                'category',
                filterIcon.name
              )}`}
              className={cn(
                category === filterIcon.name
                  ? 'border-b-2 border-black pb-2 flex-shrink-0'
                  : 'opacity-70 flex-shrink-0',
                'flex flex-col gap-y-3 items-center'
              )}
            >
              <div className="relative w-5 h-5">
                <Icon icon={filterIcon.icon} className="h-5 w-5" />
              </div>
              <small className="text-[13px] text-center">
                {filterIcon.title}
              </small>
            </Link>
          </ScrollItem>
        ))}
      </Scroller>
    </div>
  )
}

export default FilterList
