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

export async function Card({
  home,
}: {
  home
}) {

  return (
    <Link href={`/my-listings/${home.id}`} className="w-full">
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
              {home.photos.split(",").map((photo) => (
                <CarouselItem
                  key={photo}
                  className="aspect-square max-h-[250px] md:max-h-[100%] "
                >
                  {/* <Image className="rounded-lg" src="https://placehold.co/600x600.png?text=Nitesh+Babu" width={600} height={600} /> */}
                  <Image
                    className="rounded-lg h-full object-cover "
                    src={`https://vsrkqzplyltvsnlliazh.supabase.co/storage/v1/object/public/nexbnb/${photo}`}
                    loading="lazy"
                    fill
                    alt={photo}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 top-1/2" size="icon" />
            <CarouselNext className="right-0 top-1/2" size="icon" />
          </Carousel>
        </CardContent>
        <CardTitle className="py-1 flex justify-between align-middle flex-wrap gap-2">
          <span className="w-9/12">{home.title}</span>
        </CardTitle>
        <CardDescription className="p-0">
          {home.location}
          <span className="line-clamp-4">
            {home.description}
          </span>
        </CardDescription>
        <CardFooter className="p-0 pt-1">
            <span className="font-semibold">${home.price}</span>/night
        </CardFooter>
      </BaseCard>
    </Link>
  )
}
export default Card
