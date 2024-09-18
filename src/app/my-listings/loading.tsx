import { SkeltonCard } from '../../components/SkeletonCard'

export default function Loading() {
  return (
    <section className="container my-5">
      <h2 className="text-3xl font-semibold tracking-tight my-5">
        My Listings
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 my-5">
        <SkeltonCard />
        <SkeltonCard />
        <SkeltonCard />
        <SkeltonCard />
        <SkeltonCard />
        <SkeltonCard />
        <SkeltonCard />
        <SkeltonCard />
        <SkeltonCard />
        <SkeltonCard />
        <SkeltonCard />
        <SkeltonCard />
      </div>
    </section>
  )
}
