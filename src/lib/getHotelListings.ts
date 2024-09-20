import { currentUser } from '@clerk/nextjs/server'
import hotelsJson from '../data/hotels.json'
import prisma from './db'

export const getHotelsListings = async (
  category,
  per_page,
  page_no,
  country,
  guests,
  bedrooms,
  bathrooms
) => {

  const user = await currentUser()

  let hotels = await prisma.home.findMany({
    where: {
      categoryName: category === 'all' ? undefined : category,
      Location: {
        code: country ?? undefined,
      },
    },
    include : {
      Favorite : {
        where : {
          userId : user?.id ?? null
        }
      }
    }
  })
  // let hotels = hotelsJson.filter((hotel) =>
  //   category === 'all' ? hotel : hotel.category === category
  // )

  const totalPage = Math.ceil(hotels.length / per_page)
  hotels = hotels.slice((page_no - 1) * per_page, page_no * per_page)

  return {
    hotels,
    totalPage,
  }
}

export const getHotelById = async (id: string) => {
  return prisma.home.findFirst({
    where: {
      id,
    },
  })
  // return hotelsJson.find((hotel) => hotel.id === id)
}
