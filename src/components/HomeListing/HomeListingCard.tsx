import {
  Card as BaseCard,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel'
import { HeartIcon, StarIcon } from '@heroicons/react/24/outline'
import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'
import Link from 'next/link'
import { addToFavorite, DeleteFromFavorite } from '@/lib/actions'
import { AddToFavoriteButton, DeleteFromFavoriteButton } from '../SubmitButtons'

export async function Card({ home, booking, pathName, userId }) {
  if (typeof home.photos === 'string') {
    home.photos = home.photos.split(',')
  }
  const favoriteId = home.Favorite.find((h) => h.homeId === home.id)?.id
  const isInFavoriteList = (home.Favorite.length as number) > 0 ? true : false

  return (
    <BaseCard className="border-none shadow-none w-full">
      <CardContent className="p-0 pb-4 relative ">
        {userId && (
          <div className="z-20 absolute top-2 right-2">
            {isInFavoriteList ? (
              <form action={DeleteFromFavorite}>
                <input type="hidden" name="favoriteId" value={favoriteId} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathName" value={pathName} />
                <DeleteFromFavoriteButton />
              </form>
            ) : (
              <form action={addToFavorite}>
                <input type="hidden" name="homeId" value={home.id} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathName" value={pathName} />
                <AddToFavoriteButton />
              </form>
            )}
          </div>
        )}
        {/* <Button className="absolute z-20 right-0 top-2  border-none bg-transparent shadow-none rounded-full hover:bg-transparent">
          <HeartIcon
            className=" h-6 w-6 hover:fill-[#555] transition-all ease-in-out duration-300"
            fill="#999"
            stroke="white"
          />
        </Button> */}
        <Carousel className="w-full" orientation="horizontal">
          <CarouselContent>
            {home.photos.map((pic) => (
              <CarouselItem
                key={pic}
                className="aspect-square max-h-[250px] md:max-h-[100%] "
              >
                {/* <Image className="rounded-lg" src="https://placehold.co/600x600.png?text=Nitesh+Babu" width={600} height={600} /> */}
                <Image
                  className="rounded-lg h-full object-cover "
                  src={
                    pic.startsWith('http')
                      ? pic
                      : `https://vsrkqzplyltvsnlliazh.supabase.co/storage/v1/object/public/nexbnb/${pic}`
                  }
                  loading="lazy"
                  fill
                  alt={pic}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 top-1/2" size="icon" />
          <CarouselNext className="right-0 top-1/2" size="icon" />
        </Carousel>
      </CardContent>
      <Link href={`/my-listings/${home.id}`} className="w-full">
        <CardTitle className="py-1 flex justify-between align-middle flex-wrap gap-2">
          <span className="">{home.name || home.title}</span>
        </CardTitle>
        <CardDescription className="p-0 pt-1">
          {home.location}
          <span className="line-clamp-4">{home.description}</span>
          {booking && (
            <span className="font-semibold">
              {booking.startDate.toLocaleDateString()} -{' '}
              {booking.endDate.toLocaleDateString()}
            </span>
          )}
        </CardDescription>
        <CardFooter className="p-0 pt-2">
          <span className="font-semibold">${home.price}</span>/night
        </CardFooter>
      </Link>
    </BaseCard>
  )
}
export default Card
