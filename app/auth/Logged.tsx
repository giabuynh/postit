'use client'

import Image from 'next/image'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

type User = {
  name?: string,
  image: string,
  email?: string,
}

export default function Logged({ image }: User) {
  return (
    <li className='flex gap-8 items-center'>
      <button onClick={() => signOut()}
        className='bg-gray-700 text-white text-sm px-6 py-2 rounded-md'>
        Sign out
      </button>
      {/* render folder @app/dashboard */}
      <Link href={'/dashboard'}>
        <Image
          width={64}
          height={64}
          src={image}
          alt='avatar'
          className='w-14 rounded-full'
          priority />
      </Link>
    </li>
  )
}
