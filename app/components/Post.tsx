'use client'

import { GoHeart } from 'react-icons/go'
import Image from 'next/image';
import Link from 'next/link';

type Post = {
  id?: string,
  title?: string,
  avatar?: string,
  author?: string,
  comments?: object[]
}

// TODO: Reaction post

export default function Post({ author, avatar, id, title, comments }: Post) {
  return (
    <div className='bg-white my-8 p-8 rounded-lg'>
      <div className='flex items-center gap-2'>
        <Image className='rounded-full'
          width={32}
          height={32}
          src={avatar || ''}
          alt='avatar' />
        <h3 className='font-bold text-gray-700'>{author}</h3>
      </div>
      <div className='my-8'>
        <p className='break-all'>{title}</p>
      </div>
      <div className='flex gap-4 cursor-pointer items-center'>
        <Link href={`/post/${id}`} >
          <p className='text-sm font-bold text-gray-700'>
            {comments?.length} Comments
          </p>
        </Link>
        {/* <GoHeart className='text-red-500 text-xl' /> */}
      </div>
    </div>
  )
}