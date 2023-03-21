'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'

import Toggle from './Toggle'

type EditProps = {
  id: string,
  avatar: string,
  name: string,
  title: string,
  Comment?: {
    id: string,
    postId: string,
    userId: string
  }[]
}

let toastDeleteID: string

export default function EditPost({ avatar, id, name, title, Comment }: EditProps) {
  const [toggle, setToggle] = useState(false)
  const queryClient = useQueryClient()

  // Delete post
  const { mutate } = useMutation(
    async (id: string) => await axios.delete('/api/posts/deletePost', { data: id }),
    {
      onError: (error) => {
        if (error instanceof AxiosError)
          toast.error(error?.response?.data?.message, { id: toastDeleteID })
      },
      onSuccess: (data) => {
        toast.success('Post has been deleted', { id: toastDeleteID })
        // setToggle(false); // Redundant
        queryClient.invalidateQueries(['my-posts'])
      }
    }
  )

  const deletePost = async () => {
    toastDeleteID = toast.loading('Deleting your post', { id: toastDeleteID })
    mutate(id)
  }

  return (
    <>
      <div className='bg-white my-8 p-8 rounded-lg'>
        <div className='flex items-center gap-2'>
          <Image width={32} height={32} src={avatar} alt='avatar' className='rounded-full' />
          <h3 className='font-bold text-gray-700'>{name}</h3>
        </div>
        <div className='my-8'>
          <p className='break-all'>{title}</p>
        </div>
        <div className='flex gap-4 cursor-pointer items-center'>
          <p className='text-sm font-bold text-gray-700'>
            {Comment?.length} Comments
          </p>
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