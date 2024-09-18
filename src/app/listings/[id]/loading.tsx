import { Skeleton } from '../../../components/ui/skeleton'
import { SkeltonCard } from '../../components/SkeletonCard'

export default function Loading() {
  return (
    <div className="container mx-auto mt-10 mb-12">
      <Skeleton className="h-5 mb-5 text-2xl w-2/5" />
      <Skeleton className="relative h-[550px]" />

      <div className="flex justify-between gap-x-24 mt-8">
        <div className="w-2/3">
          <Skeleton className="h-4" />
        </div>

        <div className="flex gap-x-2 text-muted-foreground">
          <Skeleton className="h-2 w-full" />
        </div>

        <div className="flex items-center mt-6">
          <Skeleton className="w-11 h-11 rounded-full" />
          <div className="flex flex-col ml-4">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
