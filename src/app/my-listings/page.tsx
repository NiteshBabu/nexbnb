import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import prisma from '../../lib/db'
import Card from '../../components/HomeListing/HomeListingCard'
import { NoItem } from '@/components/NoItem'

export default async function MyListings() {
  const user = await currentUser()

  if (!user) redirect('/')

  const homes = await prisma.home.findMany({
    where: {
      userId: user.id,
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
    },
    orderBy: {
      createdAT: 'desc',
    },
    include: {
      Favorite: {
        where: {
          userId: user.id,
        },
      },
    },
  })

  return (
    <section className="container my-5">
      <h2 className="text-3xl font-semibold tracking-tight my-5">
        My Listings
      </h2>

      {!homes.length ? (
        <NoItem
          title="No Home In Your Listings"
          description="Please create some first"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 my-5">
          {homes.map((home) => (
            <Card
              home={home}
              userId={user.id}
             
            />
          ))}
        </div>
      )}
    </section>
  )
}
