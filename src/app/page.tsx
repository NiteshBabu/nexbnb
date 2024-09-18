import FilterList from '@/components/HotelListings/FilterList'
import HotelListings from '@/components/HotelListings/HotelListings'

type Props = {
  searchParams: Record<string, string>
}

export default function Home({
  searchParams: { category, per_page, page_no },
}: Props) {
  return (
    <>
      <FilterList />
      <div className="container">
        <HotelListings
          category={category || 'all'}
          per_page={per_page || 8}
          page_no={page_no || 1}
        />
      </div>
    </>
  )
}
