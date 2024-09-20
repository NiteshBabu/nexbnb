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
import { IHotel } from '@/types'
import { HeartIcon, StarIcon } from '@heroicons/react/24/outline'
import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'
import { getBlurredUrl } from '@/lib/getImages'
import Link from 'next/link'
import { addToFavorite, DeleteFromFavorite } from '@/lib/actions'
import { AddToFavoriteButton, DeleteFromFavoriteButton } from '../SubmitButtons'

export async function Card({ hotel, userId, pathName }: { hotel: IHotel }) {
  // const photos = hotel.photos.split(',')
  // const imagesWithBlurData = await getBlurredUrl([{url : photos[0]}])
  // hotel.photos = [{
  //   url : imagesWithBlurData[0].url,
  //   blurredDataUrl : imagesWithBlurData[0].blurredDataUrl
  // }]
  // console.log(hotel);

  if (typeof hotel.photos === 'string') {
    hotel.photos = hotel.photos.split(',')
  }
  const favoriteId = hotel?.Favorite?.find((h) => h.hotelId === hotel.id)?.id
  const isInFavoriteList = (hotel?.Favorite?.length as number) > 0 ? true : false

  return (
    <BaseCard className="border-none shadow-none w-full">
      <CardContent className="p-0 pb-4 relative ">
        {userId && (
          <div className="z-20 absolute top-2 right-2">
            {isInFavoriteList ? (
              <form action={DeleteFromFavorite}>
                <input type="hidden" name="favoriteId" value={favoriteId} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathName" value={pathName ?? "/"} />
                <DeleteFromFavoriteButton />
              </form>
            ) : (
              <form action={addToFavorite}>
                <input type="hidden" name="homeId" value={hotel.id} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathName" value={pathName ?? "/"} />
                <AddToFavoriteButton />
              </form>
            )}
          </div>
        )}
        <Carousel className="w-full" orientation="horizontal">
          <CarouselContent>
            {/* <Image className="rounded-lg" src="https://placehold.co/600x600.png?text=Nitesh+Babu" width={600} height={600} /> */}

            {hotel.photos.map((pic) => (
              <CarouselItem
                key={pic.id}
                className="aspect-square max-h-[250px] md:max-h-[100%] "
              >
                {pic.blurredDataUrl ? (
                  <Image
                    className="rounded-xl w-full  object-cover aspect-square"
                    src={pic.url}
                    height={350}
                    width={350}
                    loading="lazy"
                    alt={pic.id}
                    placeholder="blur"
                    blurDataURL={pic.blurredDataUrl}
                  />
                ) : (
                  <Image
                    className="rounded-xl w-full  object-cover aspect-square"
                    src={
                      pic.startsWith('http')
                        ? pic
                        : `https://vsrkqzplyltvsnlliazh.supabase.co/storage/v1/object/public/nexbnb/${pic}`
                    }
                    height={350}
                    width={350}
                    loading="lazy"
                    alt={pic.id}
                  />
                )}
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 top-1/2" size="icon" />
          <CarouselNext className="right-0 top-1/2" size="icon" />
        </Carousel>
      </CardContent>
      <Link href={`/listings/${hotel.id}`}>
        <CardTitle className="py-1 flex justify-between align-middle flex-wrap gap-2">
          <span className="w-9/12">{hotel.name || hotel.title}</span>
          <span>
            {hotel.rating || (Math.random() * 3 + 2).toFixed(1)}
            <StarIcon
              className="w-5 inline -mt-1 "
              fill="hotpink"
              stroke="none"
            />
          </span>
        </CardTitle>
        <CardDescription className="p-0">
          {hotel.country}
          {hotel.location?.code}
          <br />
          {/* {(Math.random() * 1000).toFixed()} kilometres away */}
          {/* {formatDate(hotel.context?.checkin)} -{' '}
          {formatDate(hotel.context?.checkout)} */}
        </CardDescription>
        <CardFooter className="p-0 pt-1">
          <p>
            <span className="font-semibold">${hotel.price}</span>/night
          </p>
        </CardFooter>
      </Link>
    </BaseCard>
  )
}
export default Card

const formatDate = (date: string) => {
  return `${new Date(date).getDate()} ${new Date(date).toLocaleString(
    'default',
    { month: 'short' }
  )}`
}
