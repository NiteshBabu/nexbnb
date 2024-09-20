import { Skeleton } from '../../../components/ui/skeleton'

export default function Loading() {
  return (
    <div className="container mx-auto mt-10 mb-12">
      <Skeleton className="h-10 mb-5 text-2xl w-2/5" />
      <Skeleton className="relative h-[550px]" />

      <div className="flex justify-between gap-x-24 mt-8">
        <div className="w-2/3">
          <Skeleton className="h-10" />

          <div className="flex items-center mt-5 gap-4">
            <Skeleton className="w-11 h-11 rounded-full" />
            <Skeleton className="h-5 w-1/3" />
          </div>
          <div className="flex items-center mt-5 gap-4">
            <Skeleton className="w-11 h-11 rounded-full" />
            <Skeleton className="h-5 w-1/3" />
          </div>
          <Skeleton className="h-1/2 w-full mt-5" />
        </div>
        <Skeleton className="h-80 w-1/3" />
      </div>
    </div>
  )
}
