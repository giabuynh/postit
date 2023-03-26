'use client'

import { useState } from 'react'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useAddComment } from './hooks/useComment'

let commentToastId: string

type CommentProps = {
  postId: string,
}

export default function AddComment({ postId }: CommentProps) {
  const [message, setMessage] = useState('')
  const [isDisable, setIsDisable] = useState(false)

  // Add comment
  const onError = (error: any) => {
    if (error instanceof AxiosError)
      toast.error(error?.response?.data?.message, { id: commentToastId })
    setIsDisable(false)
  }
  const onSuccess = (data: any) => {
    toast.success('Added your comment 👍', { id: commentToastId })
    setMessage('')
    setIsDisable(false)
  }
  const { mutate } = useAddComment({ onError, onSuccess })

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsDisable(true)
    commentToastId = toast.loading('Adding your comment', { id: commentToastId })
    mutate({ message, postId })
  }

  return (
    <form onSubmit={submitComment} className='my-8'>
      <h3>Add a comment</h3>
      <div className='flex flex-col my-2'>
        <input
          type='text'
          name='title'
          value={message}
          className='p-4 rounded-md my-2'
          placeholder='Share your opinion'
          onChange={(e) => { setMessage(e.target.value) }}
        />
      </div>
      <div className='flex items-center gap-2'>
        <button
          type='submit'
          disabled={isDisable}
          className='text-sm bg-sky-500 text-white py-2 px-6 rounded-xl disabled:opacity-25'
        >
          Send 🚀
        </button>
        <p className={`font-bold  ${message.length > 300 ? 'text-red-700' : 'text-gray-700'}`}>
          {`${message.length}/300`}
        </p>
      </div>
    </form>
  )
}
