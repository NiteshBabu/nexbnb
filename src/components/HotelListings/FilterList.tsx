"use client";
import React, { useState } from "react";
import { ScrollItem, Scroller } from "../ui/scroller";
import filterIcons from "../../data/filters.json";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton";

function FilterList() {
  const router = useRouter();

  // const pageItemCount = 8
  const [isFetching, setIsFetching] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1)
  // const [pageCount, setPageCount] = useState<number | null>(null)
  // const [hasNextPage, setHasNextPage] = useState(false)
  // const [hasPrevPage, setHasPrevPage] = useState(false)

  return (
    <>
      <Scroller className="my-5 py-2">
        {filterIcons.map((filterIcon) => (
          <ScrollItem
            key={filterIcon.id}
            className="flex flex-col items-center gap-1 cursor-pointer min-w-[150px]"
            onClick={() => {
              router.push(`?category=${filterIcon.name}&per_page=8&page_no=1`);
              setIsFetching(true);
              setTimeout(() => setIsFetching(false), 10000);
            }}
          >
            <Icon icon={filterIcon.icon} className="h-10 w-20" />
            <small>
              {filterIcon.name
                .split("_")
                .map((item) => {
                  return item.charAt(0).toUpperCase() + item.slice(1);
                })
                .join(" ")}
            </small>
          </ScrollItem>
        ))}
      </Scroller>
      {/* {isFetching && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
          {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((_, indx) => (
            <div key={indx} className="flex flex-col h-full w-full">
              <Skeleton className="w-full h-[250px]" />

              <div className="flex justify-between py-2">
                <Skeleton className="w-9/12 h-5" />
                <Skeleton className="w-2/12 h-5" />
              </div>
              <Skeleton className="w-full h-10 my-1" />
              <Skeleton className="w-1/3 h-5 my-1" />
            </div>
          ))}
        </div>
      )} */}
    </>
  );
}

export default FilterList;
