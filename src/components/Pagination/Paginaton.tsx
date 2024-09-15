"use client";
import {
  Pagination as BasePagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter } from "next/navigation";

export default function Pagination({ page_no, per_page, category, totalPage }) {
  const router = useRouter();
  return (
    <BasePagination className="my-5">
      <PaginationContent>
        {page_no > 1 && (
          <PaginationItem>
            <PaginationPrevious
              onClick={() =>
                router.push(
                  `?category=${category}&per_page=8&page_no=${+page_no - 1}`
                )
              }
            />
          </PaginationItem>
        )}
        {page_no - 2 > 0 && (
          <PaginationItem>
            <PaginationLink
              onClick={() => {
                router.push(
                  `?category=${category}&per_page=10&page_no=${+page_no - 1}`
                );
              }}
            >
              {+page_no - 1}
            </PaginationLink>
          </PaginationItem>
        )}
        {page_no - 3 > 0 && (
          <>
            <PaginationItem>
              <PaginationLink
                onClick={() => {
                  router.push(`?category=${category}&per_page=10&page_no=${1}`);
                }}
              >
                {1}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                onClick={() => {
                  router.push(
                    `?category=${category}&per_page=10&page_no=${+page_no - 1}`
                  );
                }}
              >
                {page_no - 1}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        <PaginationItem>
          <PaginationLink isActive>{page_no}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            onClick={() => {
              router.push(
                `?category=${category}&per_page=10&page_no=${+page_no + 1}`
              );
            }}
          >
            {+page_no + 1}
          </PaginationLink>
        </PaginationItem>
        {totalPage - page_no > 0 && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                onClick={() =>
                  router.push(
                    `?category=${category}&per_page=8&page_no=${totalPage}`
                  )
                }
              >
                {totalPage}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  router.push(
                    `?category=${category}&per_page=8&page_no=${+page_no + 1}`
                  )
                }
              />
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </BasePagination>
  );
}
// export default function Pagination({ currentPage, setCurrentPage, pageCount }:
//     { currentPage: number, setCurrentPage: Dispatch<SetStateAction<number>>, pageCount: number }) {
//     return <BasePagination className="my-5">
//         <PaginationContent >
//             {
//                 currentPage - 1 > 0 &&
//                 <>
//                     <PaginationItem>
//                         <PaginationPrevious onClick={() => setCurrentPage((current: number) => current - 1)} />
//                     </PaginationItem>

//                     {
//                         currentPage > 3 &&
//                         <>
//                             <PaginationItem>
//                                 <PaginationLink onClick={() => setCurrentPage((current: number) => 1)} >1</PaginationLink>
//                             </PaginationItem>
//                             <PaginationItem>
//                                 <PaginationEllipsis />
//                             </PaginationItem>
//                         </>
//                     }
//                     <PaginationItem>
//                         {

//                             currentPage - 2 > 0 &&
//                             <PaginationLink onClick={() => setCurrentPage((current: number) => current - 2)} >{currentPage - 2}</PaginationLink>
//                         }
//                         <PaginationLink onClick={() => setCurrentPage((current: number) => current - 1)} >{currentPage - 1}</PaginationLink>
//                     </PaginationItem>
//                 </>
//             }
//             <PaginationItem>
//                 <PaginationLink isActive >{currentPage}</PaginationLink>
//             </PaginationItem>
//             {
//                 currentPage + 1 <= pageCount &&
//                 <>
//                     <PaginationItem>
//                         <PaginationLink onClick={() => setCurrentPage((current: number) => current + 1)} >{currentPage + 1}</PaginationLink>
//                     </PaginationItem>
//                     <PaginationItem>
//                         <PaginationLink onClick={() => setCurrentPage((current: number) => current + 2)} >{currentPage + 2}</PaginationLink>
//                     </PaginationItem>
//                     {
//                         pageCount - currentPage > 3 &&
//                         <PaginationEllipsis />
//                     }
//                     <PaginationItem>
//                         <PaginationLink onClick={() => setCurrentPage((current: number) => pageCount)} >{pageCount}</PaginationLink>
//                     </PaginationItem>
//                     <PaginationItem>
//                         <PaginationNext onClick={() => setCurrentPage((current: number) => current + 1)} />
//                     </PaginationItem>
//                 </>
//             }

//         </PaginationContent>
//     </BasePagination>
// }
