'use client'

import { format } from 'date-fns'
import Image from 'next/image'
import { useState } from 'react'
import { BsXLg } from 'react-icons/bs'
import Toggle from './modals/Toggle'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useDeleteComment } from './hooks/useComment'

type CommentProps = {
  commentId: string,
  message: string,
  author?: string,
  avatar?: string,
  createdAt: string
}

let toastId: string

export default function Comment({ commentId, message, author, avatar, createdAt }: CommentProps) {
  const [toggle, setToggle] = useState(false)

  const onError = (error: any) => {
    if (error instanceof AxiosError)
      toast.error(error?.response?.data?.message, { id: toastId })
  }
  const onSuccess = (data: any) => {
    setToggle(false)
    toast.success('Comment has been deleted', { id: toastId })
  }
  const { mutate } = useDeleteComment({ onError, onSuccess })

  const deleteComment = async () => {
    toastId = toast.loading('Deleting your comment', { id: toastId })
    mutate(commentId)
  }

  return (
    <>
      <div key={commentId} className='relative my-6 p-8 bg-white rounded-md'>
        <div className='absolute top-0 right-0 m-3'>
          <BsXLg
            className='text-gray-400 text-xs cursor-pointer'
            onClick={() => setToggle(true)}
          />
        </div>
        <div className='flex items-center gap-2'>
          <Image width={24} height={24} src={avatar || ''} alt='avatar' />
          <h3 className='font-bold'>{author}</h3>
          <h2 className='text-sm text-gray-500'>{format(Date.parse(createdAt), 'hh:mm:ss dd-MM-yyyy')}</h2>
        </div>
        <div className='py-4'>{message}</div>
      </div>
      {
        toggle &&
        <Toggle
          target='comment'
          toggleType='del'
          setToggle={setToggle}
          action={deleteComment}
        />
      }
    </>

  )
}