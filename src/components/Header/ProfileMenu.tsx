import React from 'react'
import { Icon } from '@iconify/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import Link from 'next/link'

type Props = {}

const ProfileMenu = (props: Props) => {
  const user = {

  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="rounded-full border px-2 py-2 lg:px-4 lg:py-2 flex items-center gap-x-3">
          {/* <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5" /> */}
          <Icon icon="svg-spinners:3-dots-bounce" />
          <Icon icon="gg:profile" className="w-6 h-6" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {user ? (
          <>
            <DropdownMenuItem>
              <form action={'createHomewithId'} className="w-full">
                <button type="submit" className="w-full text-start">
                  NexBnB your Home
                </button>
              </form>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/my-homes" className="w-full">
                My Listings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/favorites" className="w-full">
                My Favorites
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/reservations" className="w-full">
                My Reservations
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem>Register</DropdownMenuItem>
            <DropdownMenuItem>Login</DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProfileMenu
