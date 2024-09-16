'use client'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  useUser,
} from '@clerk/nextjs'
import Image from 'next/image'

type Props = {}

const ProfileMenu = (props: Props) => {
  const { user, isSignedIn, isLoaded } = useUser()
  console.log(user)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="rounded-full border px-2 py-2 lg:px-4 lg:py-2 flex items-center gap-x-3">
          {/* <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5" /> */}
          <Icon icon="svg-spinners:3-dots-bounce" />
          {isSignedIn && isLoaded  ? (
            <Image
              src={user.imageUrl}
              alt={user.fullName || "Profile Pic"}
              width={30}
              height={30}
              className='rounded-full'
            />
          ) : (
            <Icon icon="gg:profile" className="w-6 h-6" />
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {isSignedIn ? (
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
            <DropdownMenuItem>
              <SignOutButton />
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem>
              <SignInButton />
            </DropdownMenuItem>
            <DropdownMenuItem>
              <SignUpButton>New User ? Sign Up</SignUpButton>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProfileMenu
