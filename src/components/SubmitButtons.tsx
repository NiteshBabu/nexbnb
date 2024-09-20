'use client'

import { Button } from '@/components/ui/button'
import { HeartIcon } from '@heroicons/react/24/outline'
import { Icon } from '@iconify/react'
import { useFormStatus } from 'react-dom'

export function NewListingSubmit() {
  const { pending } = useFormStatus()
  return (
    <>
      {pending ? (
        <Button disabled size="lg">
          Please Wait
        </Button>
      ) : (
        <Button type="submit" size="lg">
          Next
        </Button>
      )}
    </>
  )
}

export function AddToFavoriteButton() {
  const { pending } = useFormStatus()
  return (
    <>
      {pending ? (
        <Icon icon="eos-icons:loading" className="h-6 w-6" fill="#555" />
      ) : (
        <Button
          size="icon"
          className="border-none bg-transparent shadow-none rounded-full hover:bg-transparent-none"
          type="submit"
        >
          <HeartIcon
            className=" h-6 w-6 hover:fill-[#555] transition-all ease-in-out duration-300"
            fill="#999"
            stroke="white"
          />
        </Button>
      )}
    </>
  )
}

export function DeleteFromFavoriteButton() {
  const { pending } = useFormStatus()
  return (
    <>
      {pending ? (
        <Icon icon="eos-icons:loading" className="h-6 w-6" fill="#ec4589" />
      ) : (
        <Button
          size="icon"
          className="border-none bg-transparent shadow-none rounded-full hover:bg-transparent"
          type="submit"
        >
          <HeartIcon
            className=" h-6 w-6  transition-all ease-in-out duration-300"
            fill="#E21C49"
            stroke="white"
          />
        </Button>
      )}
    </>
  )
}

export function ReservationSubmitButton() {
  const { pending } = useFormStatus()

  return (
    <>
      {pending ? (
        <Button className="w-full" disabled>
          {/* <Loader2 className="w-4 h-4 animate-spin mr-2" /> Please wait... */}
        </Button>
      ) : (
        <Button className="w-full" type="submit">
          Make a Reservation!
        </Button>
      )}
    </>
  )
}
