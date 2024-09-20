import { createReservation } from '../../../lib/actions'
import { CategoryShowcase } from '../../../components/HomeListing/CategoryShowcase'
import { ReservationSubmitButton } from '../../../components/SubmitButtons'
import prisma from '../../../lib/db'
import { useCountries } from '../../../hooks/useCountries'
import { Button } from '../../../components/ui/button'
import { Separator } from '../../../components/ui/separator'
import Image from 'next/image'
import Link from 'next/link'
import { unstable_noStore as noStore } from 'next/cache'
import { currentUser } from '@clerk/nextjs/server'
import { HomeMap } from '../../../components/HomeListing/HomeMap'
import { SelectCalender } from '../../../components/HomeListing/SelectCalender'

async function getData(homeid: string) {
  noStore()
  const data = await prisma.home.findUnique({
    where: {
      id: homeid,
    },
    select: {
      photos: true,
      description: true,
      guests: true,
      bedrooms: true,
      bathrooms: true,
      title: true,
      categoryName: true,
      price: true,
      country: true,
      User: {
        select: {
          profileImage: true,
          firstName: true,
        },
      },
      Reservation: {
        select: {
          id: true,
          startDate: true,
          endDate: true,
        },
      },
    },
  })

  // await new Promise((resolve) => setTimeout(resolve, 5000));
  return data
}

export default async function HomePage({
  params: { id },
}: {
  params: { id: string }
}) {
  const data = await getData(id)
  const { getCountryByCountryCode } = useCountries()
  const country = getCountryByCountryCode(data?.country as string)
  const user = await currentUser()

  return (
    <div className="container mx-auto mt-10 mb-12">
      <h1 className="font-medium text-2xl mb-5">{data?.title}</h1>
      <div className="relative h-[300px] md:h-[550px]">
        <Image
          alt="Image of Home"
          src={`https://vsrkqzplyltvsnlliazh.supabase.co/storage/v1/object/public/nexbnb/${data?.photos?.split(",")[0]}`}
          fill
          className="rounded-lg h-full object-cover w-full"
        />
      </div>

      <div className="flex justify-between gap-x-24 mt-8 flex-col md:flex-row">
        <div className="w-full md:w-2/3">
          <h3 className="text-xl font-medium">
            {country?.flag} {country?.label} / {country?.region}
          </h3>
          <div className="flex gap-x-2 text-muted-foreground">
            <p>{data?.guests} Guests</p> * <p>{data?.bedrooms} Bedrooms</p> *{' '}
            {data?.bathrooms} Bathrooms
          </div>

          <div className="flex items-center mt-6">
            <img
              src={
                data?.User?.profileImage ??
                'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'
              }
              alt="User Profile"
              className="w-11 h-11 rounded-full"
            />
            <div className="flex flex-col ml-4">
              <h3 className="font-medium">Hosted by {data?.User?.firstName}</h3>
              <p className="text-sm text-muted-foreground">Host since 2015</p>
            </div>
          </div>

          <Separator className="my-7" />
          <div className="grid gap-2">
            <h3 className="text-xl font-medium">Property Description</h3>
            <p>{data?.description}</p>
          </div>
          <Separator className="my-5" />
          <CategoryShowcase categoryName={data?.categoryName as string} />
          <HomeMap locationValue={country?.countryCode as string} />
        </div>

        <form action={createReservation} className=''>
          <input type="hidden" name="homeId" value={id} />
          <input type="hidden" name="userId" value={user?.id} />

          <SelectCalender reservation={data?.Reservation} />

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
