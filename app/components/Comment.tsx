'use client'

import Image from 'next/image'

type CommentProps = {
  id?: string,
  message?: string,
  author?: string,
  avatar?: string,
  createdAt?: string
}

export default function Comment({ id, message, author, avatar, createdAt }: CommentProps) {
  return (
    <div
      key={id}
      className='my-6 p-8 bg-white rounded-md'>
      <div className='flex items-center gap-2'>
        <Image width={24} height={24} src={avatar || ''} alt='avatar' />
        <h3 className='font-bold'>{author}</h3>
        <h2 className='text-sm'>{createdAt}</h2>
      </div>
      <div className='py-4'>{message}</div>
    </div>
  )
}