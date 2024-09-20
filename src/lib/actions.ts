'use server'

import prisma from './db'
import supabase from './supabase'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function createNexbnbHome({ userId }: { userId: string }) {
  const data = await prisma.home.findFirst({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAT: 'desc',
    },
  })

  if (data === null) {
    const data = await prisma.home.create({
      data: {
        userId: userId,
      },
    })
    return redirect(`/new-listing/${data.id}/structure`)
  } else if (!data.addedCategory) {
    return redirect(`/new-listing/${data.id}/structure`)
  } else if (!data.addedDescription) {
    return redirect(`/new-listing/${data.id}/description`)
  } else if (!data.addedLocation) {
    return redirect(`/new-listing/${data.id}/address`)
  }

  await prisma.home.create({
    data: {
      userId: userId,
    },
  })
  return redirect(`/new-listing/${data.id}/structure`)
}

export async function createCategoryPage(formData: FormData) {
  const categoryName = formData.get('categoryName') as string
  
  const homeId = formData.get('homeId') as string
  const data = await prisma.home.update({
    where: {
      id: homeId,
    },
    data: {
      categoryName: categoryName,
      addedCategory: true,
    },
  })

  return redirect(`/new-listing/${homeId}/description`)
}

export async function CreateDescription(formData: FormData) {
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const price = formData.get('price')
  const imageFile = formData.get('image') as File
  const homeId = formData.get('homeId') as string

  const guestNumber = formData.get('guest') as string
  const roomNumber = formData.get('room') as string
  const bathroomsNumber = formData.get('bathroom') as string

  const { data: imageData } = await supabase.storage
    .from('nexbnb')
    .upload(`${imageFile.name}-${+new Date()}`, imageFile, {
      cacheControl: '2592000',
      contentType: 'image/png',
    })

  await prisma.home.update({
    where: {
      id: homeId,
    },
    data: {
      title: title,
      description: description,
      price: Number(price),
      bedrooms: roomNumber,
      bathrooms: bathroomsNumber,
      guests: guestNumber,
      photos: imageData?.path,
      addedDescription: true,
    },
  })

  return redirect(`/new-listing/${homeId}/address`)
}

export async function createLocation(formData: FormData) {
  const homeId = formData.get('homeId') as string
  const countryCode = formData.get('countryCode') as string
  const {getCountryByCountryCode} = useCountries()
  const country = getCountryByCountryCode(countryCode)
  await prisma.home.update({
    where: {
      id: homeId,
    },
    data: {
      addedLocation: true,
      country: countryCode,
      Location : {
        create : {
          code: countryCode,
          lat:  country?.latLang[0],
          lng:  country?.latLang[1]
        }
      }
    },
  })
  return redirect('/')
}

export async function addToFavorite(formData: FormData) {
  const homeId = formData.get('homeId') as string
  const userId = formData.get('userId') as string
  const pathName = formData.get('pathName') as string

  const data = await prisma.favorite.create({
    data: {
      homeId: homeId,
      userId: userId,
    },
  })

  revalidatePath(pathName)
}

}
