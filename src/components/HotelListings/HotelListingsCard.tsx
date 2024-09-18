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

export async function Card({
  hotel,
  isFetching,
}: {
  hotel: IHotel
  isFetching: boolean
}) {
  // const imagesWithBlurData = await getBlurredUrl([hotel.pictures.contextual[0]])
  // hotel.pictures.contextual[0] = imagesWithBlurData[0]
  if (isFetching) {
    return (
      <div className="flex flex-col h-full w-full">
        <Skeleton className="w-full h-[250px]" />

        <div className="flex justify-between py-2">
          <Skeleton className="w-9/12 h-5" />
          <Skeleton className="w-2/12 h-5" />
        </div>
        <Skeleton className="w-full h-10 my-1" />
        <Skeleton className="w-1/3 h-5 my-1" />
      </div>
    )
  }
  
  return (
    <BaseCard className="border-none shadow-none w-full">
      <CardContent className="p-0 pb-4 relative ">
        <Button className="absolute z-20 right-0 top-2  border-none bg-transparent shadow-none rounded-full hover:bg-transparent">
          <HeartIcon
            className=" h-6 w-6 hover:fill-[#555] transition-all ease-in-out duration-300"
            fill="#999"
            stroke="white"
          />
        </Button>
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
                    src={pic}
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
          <span className="w-9/12">{hotel.name}</span>
          <span>
            {(Math.random() * 5).toPrecision(2)}
            <StarIcon
              className="w-5 inline -mt-1 "
              fill="hotpink"
              stroke="none"
            />
          </span>
        </CardTitle>
        <CardDescription className="p-0">
          {hotel.country}
          {hotel.location?.code} kilometres away
          <br></br>
          {formatDate(hotel.context?.checkin)} -{' '}
          {formatDate(hotel.context?.checkout)}
        </CardDescription>
        <CardFooter className="p-0 pt-1">
          <p>
            <span className="font-semibold">{hotel.price}</span> night
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
