'use client'

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'

let toastCommentID: string

type Comment = {
  postId: string,
  message: string
}

export default function AddComment({ postId }) {
  const [message, setMessage] = useState('')
  const [isDisable, setIsDisable] = useState(false)
  const queryClient = useQueryClient()

  const { mutate } = useMutation(
    async (data: Comment) => axios.post('/api/posts/addComment', { data }),
    {
      onError: (error) => {
        console.log(error)
        if (error instanceof AxiosError)
          toast.error(error?.response?.data?.message, { id: toastCommentID })
        setIsDisable(false)
      },
      onSuccess: (data) => {
        console.log(data)
        toast.success('Added your comment 👍', { id: toastCommentID })
        setMessage('')
        setIsDisable(false)
        queryClient.invalidateQueries(['detail-post'])
      }
    }
  )

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsDisable(true)
    toastCommentID = toast.loading('Adding your comment', { id: toastCommentID })
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
          className='p-4 text-lg rounded-md my-2'
          onChange={(e) => { setMessage(e.target.value) }}
        />
      </div>
      <div className='flex items-center gap-2'>
        <button
          type='submit'
          disabled={isDisable}
          className='text-sm bg-rose-500 text-white py-2 px-6 rounded-xl disabled:opacity-25'
        >
          Add Comment 🚀
        </button>
        <p className={`font-bold ${message.length > 300} ? text-red-700 : text-gray-700`}>
          {`${message.length}/300`}
        </p>
      </div>
    </form>
  )
}
