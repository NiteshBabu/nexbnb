import Link from 'next/link'
import ProfileMenu from './ProfileMenu'
import Image from 'next/image'

type Props = {}

const Header = (props: Props) => {
  return (
    <header className="">
      <nav className="w-full border-b">
        <div className="flex items-center justify-between container mx-auto px-5 lg:px-10 py-5">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/logo.png"
                alt="logo"
                className="w-10"
                width={500}
                height={500}
              />
              <p className="text-primary font-extrabold text-lg tracking-wider hidden md:block">
                nexbnb
              </p>
            </Link>
          <ProfileMenu />
        </div>
      </nav>
    </header>
  )
}

export default Header
