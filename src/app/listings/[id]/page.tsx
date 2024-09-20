import { createReservation } from '../../../lib/actions'
import { CategoryShowcase } from '../../../components/HomeListing/CategoryShowcase'
import { ReservationSubmitButton } from '../../../components/SubmitButtons'
import { useCountries } from '../../../hooks/useCountries'
import { Button } from '../../../components/ui/button'
import { Separator } from '../../../components/ui/separator'
import Image from 'next/image'
import Link from 'next/link'
import { currentUser } from '@clerk/nextjs/server'
import { HomeMap } from '../../../components/HomeListing/HomeMap'
import { getHotelById } from '../../../lib/getHotelListings'
import { SelectCalender } from '../../../components/HomeListing/SelectCalender'
import prisma from '@/lib/db'

async function getData(homeid: string) {
  return await prisma.home.findFirst({
    where: {
      id: homeid,
    },
    include: {
      User: {
        select: {
          id: true,
          firstName: true,
          profileImage: true,
        },
      },
      Location: {
        select: {
          id: true,
          city: true,
          lat: true,
          lng: true,
        },
      },
    },
  })
}

export default async function HomePage({
  params: { id },
}: {
  params: { id: string }
}) {
  const data = await getData(id)
  const user = await currentUser()

  if (data && typeof data.photos === 'string') {
    data.photos = data?.photos.split(',')
  }

  return (
    <div className="container mx-auto mt-10 mb-12">
      <h1 className="font-medium text-2xl mb-5">{data?.name}</h1>
      <div className="relative h-[550px]">
          <Image
            alt="Image of Home"
            src={
              data?.photos[0].startsWith('http')
                ? data.photos[0] + '&img_q=highq'
                : `https://vsrkqzplyltvsnlliazh.supabase.co/storage/v1/object/public/nexbnb/${data.photos[0]}`
            }
            fill
            className="rounded-lg h-full object-cover w-full"
          />
      </div>

      <div className="flex justify-between gap-x-24 mt-8">
        <div className="w-2/3">
          <h3 className="text-xl font-medium">
            {data?.country} - {data?.title}
          </h3>
          <div className="flex gap-x-2 text-muted-foreground">
            <p>{data?.guests} Guests .</p>
            <p>{data?.bedrooms} Bedrooms .</p>
            {data?.bathrooms} Bathrooms
          </div>
          <Separator className="my-5" />

          <div className="flex items-center mt-5">
            <img
              src={
                data?.User?.profileImage ??
                'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'
              }
              alt="User Profile"
              className="w-11 h-11 rounded-full"
            />
            <div className="flex flex-col ml-4">
              <h3 className="">
                Hosted by{' '}
                <span className="font-bold">{data?.User?.firstName}</span>
              </h3>
            </div>
          </div>

          <Separator className="my-5" />
          <div className="grid gap-2">
            <h3 className="text-xl font-medium">Property Description</h3>
            <p>{data?.description}</p>
          </div>
          <Separator className="my-5" />
          <CategoryShowcase categoryName={data.categoryName as string} />

          <HomeMap latLang={[data.Location.lat, data.Location.lng]} />
        </div>

        <form action={createReservation}>
          <input type="hidden" name="homeId" value={id} />
          <input type="hidden" name="userId" value={user?.id} />

          <SelectCalender
            reservation={[
              {
                startDate: new Date(),
                endDate: new Date(),
              },
            ]}
          />

          {user?.id ? (
            <ReservationSubmitButton />
          ) : (
            <Button className="w-full" asChild>
              <Link href="/api/auth/login">Make a Reservation</Link>
            </Button>
          )}
        </form>
      </div>
    </div>
  )
}
