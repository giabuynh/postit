'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import Toggle from './Toggle'
import { useDeletePost } from './hooks/usePost'

type EditProps = {
  postId: string,
  title: string,
  author: string,
  avatar: string,
  Comment?: {
    id: string,
    postId: string,
    userId: string
  }[]
}

let deleteToastId: string

export default function EditPost({ postId, title, author, avatar, Comment }: EditProps) {
  const [toggle, setToggle] = useState(false)

  // Delete post
  const onError = (error: any) => {
    if (error instanceof AxiosError)
      toast.error(error?.response?.data?.message, { id: deleteToastId })
  }
  const onSuccess = (data: any) => {
    toast.success('Post has been deleted', { id: deleteToastId })
  }
  let { mutate } = useDeletePost({ onError, onSuccess })

  //TODO: Edit post
  // {mutate} = useEditPost({onError, onSuccess})

  const deletePost = async () => {
    deleteToastId = toast.loading('Deleting your post', { id: deleteToastId })
    mutate(postId)
  }
  // TODO: Edit post
  // const editPostasync () => {
  //   editToastId = toast.loading('Updating your post', {id: editToastId})
  // }

  return (
    <>
      <div className='bg-white my-8 p-8 rounded-lg'>
        <div className='flex items-center gap-2'>
          <Image width={32} height={32} src={avatar} alt='avatar' className='rounded-full' />
          <h3 className='font-bold text-gray-700'>{author}</h3>
        </div>
        <div className='my-8'>
          <p className='break-all'>{title}</p>
        </div>
        <div className='flex gap-4 cursor-pointer items-center'>
          <Link href={`/post/${postId}`} >
            <p className='text-sm font-bold text-gray-700'>
              {Comment?.length} Comments
            </p>
          </Link>

          <button onClick={() => { setToggle(true) }}
            className='text-sm font-bold text-red-500'>
            Delete
          </button>
        </div>
      </div>
      {toggle && <Toggle deletePost={deletePost} setToggle={setToggle} />}
    </>
  )
}