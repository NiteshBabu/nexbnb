import { useEffect, useState } from "react";
import Card from "@/components/HotelListings/HotelListingsCard";
import Pagination from "../Pagination/Paginaton";
import FilterList from "./FilterList";
import { Skeleton } from "../ui/skeleton";
import useHotels from "./hooks/useHotels";
import useFilter from "./hooks/useFilter";
import { getHotelsListings } from "@/lib/getHotelListings";

// const hotels: IHotel[] = JSON.parse(hotelsJson)
// const hotels: IHotel[] = await getHotelsListings()
// const hotelsJson = hotelsJso.slice(0, 30)
async function HotelListings({ category, per_page, page_no }) {
  let { hotels, totalPage } = await getHotelsListings(
    category,
    per_page,
    page_no
  );

  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-items-center">
        {/* {isFetching
          ? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((_, indx) => (
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
          : hotels
              ?.slice(
                (currentPage - 1) * pageItemCount,
                currentPage * pageItemCount
              )
              .map((hotel) => {
                return (
                  <Card key={hotel.id} hotel={hotel} isFetching={isFetching} />
                );
            })} */}
        {hotels.map((hotel) => (
          <Card key={hotel.id} hotel={hotel} />
        ))}
      </div>
      <Pagination
        page_no={page_no}
        per_page={per_page}
        category={category}
        totalPage={totalPage}
      />
    </div>
  );
}

export default HotelListings;
