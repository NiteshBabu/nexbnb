import Card from '@/components/HotelListings/HotelListingsCard'
import Pagination from '../Pagination/Paginaton'
import { Skeleton } from '../ui/skeleton'
import { getHotelsListings } from '@/lib/getHotelListings'
import { NoItem } from '../NoItem'
import { Suspense } from 'react'

async function HotelListings({
  category,
  per_page,
  page_no,
  country,
  guests,
  bedrooms,
  bathrooms,
}) {
  const { hotels, totalPage } = await getHotelsListings(
    category,
    per_page,
    page_no,
    country,
    guests,
    bedrooms,
    bathrooms
  )

  if (hotels.length <= 0) {
    return (
      <NoItem
        title="Oops! No listings found for this category"
        description="Please try something else 😃"
      />
    )
  }
  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center min-h-screen">
        <Suspense fallback={<ListingSkeleton />}>
          {hotels.map((hotel) => (
            <Card key={hotel.id} hotel={hotel} />
          ))}
        </Suspense>
      </div>
      <Pagination
        page_no={page_no}
        per_page={per_page}
        category={category}
        totalPage={totalPage}
      />
    </div>
  )
}

export default HotelListings

const ListingSkeleton = () => {
  return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((_, indx) => (
    <div key={indx} className="flex flex-col h-full w-full">
      <Skeleton className="w-full h-[250px]" />

      <div className="flex justify-between py-2">
        <Skeleton className="w-9/12 h-5" />
        <Skeleton className="w-2/12 h-5" />
      </div>
      <Skeleton className="w-full h-10 my-1" />
      <Skeleton className="w-1/3 h-5 my-1" />
    </div>
  ))
}
