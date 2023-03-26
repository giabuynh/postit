'use client'

import { AxiosError } from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useAddPost } from './hooks/usePost'

let postToastId: string //? why it has to be declared as global scope

export default function CreatePost() {
  const [title, setTitle] = useState('')
  const [isDisable, setIsDisable] = useState(false)

  // let toastPostID: string //? declare here cannot be recognized in toast.error (.success)
  // Create a post
  const onError = (error: any) => {
    if (error instanceof AxiosError)
      toast.error(error?.response?.data?.message, { id: postToastId })
    setIsDisable(false)
  }
  const onSuccess = (data: any) => {
    toast.success('Post has been made 🔥', { id: postToastId })
    setTitle('')
    setIsDisable(false)
  }
  const { mutate } = useAddPost({ onError, onSuccess })

  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsDisable(true)
    postToastId = toast.loading('Creating your post', { id: postToastId })
    mutate(title)
  }

  return (
    <form onSubmit={submitPost} className='bg-white my-8 p-8 rounded-md'>
      <div className='flex flex-col my-4'>
        <textarea
          name='title'
          value={title}
          placeholder="What's on your mind?"
          onChange={(e) => setTitle(e.target.value)}
          className='p-4 text-lg rounded-md my-2 bg-gray-200' />
      </div>
      <div className={`flex items-center justify-between gap-2`}>
        <p className={`font-bold text-sm ${title.length > 300 ? 'text-red-700' : 'text-gray-700'}`}>
          {`${title.length}/300`}
        </p>
        <button
          disabled={isDisable}
          type='submit'
          className='text-sm bg-sky-500 text-white py-2 px-6 rounded-xl disabled:opacity-25'>
          Create a post
        </button>
      </div>
    </form>
  )
}