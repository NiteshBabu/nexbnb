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
  const [isFetching, setIsFetching] = useState(false)
  // const [currentPage, setCurrentPage] = useState(1)
  // const [pageCount, setPageCount] = useState<number | null>(null)
  // const [hasNextPage, setHasNextPage] = useState(false)
  // const [hasPrevPage, setHasPrevPage] = useState(false)
  const searchParams = useSearchParams()
  const search = searchParams.get('category')
  const pathname = usePathname()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())

      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )
  return (
    <Scroller className="my-5 py-2 no-scrollbar container">
      {filterList.map((filterIcon) => (
        <ScrollItem key={filterIcon.id}>
          <Link
            key={filterIcon.id}
            href={
              pathname + '?' + createQueryString('category', filterIcon.name)
            }
            className={cn(
              search === filterIcon.name
                ? 'border-b-2 border-black pb-2 flex-shrink-0'
                : 'opacity-70 flex-shrink-0',
              'flex flex-col gap-y-3 items-center'
            )}
          >
            <div className="relative w-5 h-5">
              <Icon icon={filterIcon.icon} className="h-5 w-5" />
            </div>
            <small className="text-[13px]">{filterIcon.title}</small>
          </Link>
        </ScrollItem>
      ))}
    </Scroller>
  )
}

export default FilterList
