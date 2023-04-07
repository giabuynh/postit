'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { useDeletePost, useUpdatePost } from './hooks/usePost'
import Toggle from './modals/Toggle'

type EditProps = {
  postId: string,
  title: string,
  author: string,
  avatar: string,
  comments?: {
    id: string,
    postId: string,
    userId: string
  }[]
}

let deleteToastId: string
let editToastId: string
let toastId: string

export default function EditPost({ postId, title, author, avatar, comments }: EditProps) {
  const [toggle, setToggle] = useState(false)
  const [toggleType, setToggleType] = useState('')
  const [postTitle, setPostTitle] = useState(title)
  const [isDisable, setIsDisable] = useState(false)
  const data = {
    postTitle,
    setPostTitle,
    isDisable,
    setIsDisable
  }

  // Delete or Update post
  const onError = (error: any) => {
    if (error instanceof AxiosError)
      toast.error(error?.response?.data?.message, { id: toastId })
  }
  const onSuccess = (data: any) => {
    setToggle(false)
    toast.success(`Post has been ${toggleType === 'del' ? 'deleted' : 'updated'}`, { id: toastId })
  }
  const { mutate: mutateDel } = useDeletePost({ onError, onSuccess })
  const { mutate: mutateUpd } = useUpdatePost({ onError, onSuccess })

  const deletePost = async () => {
    toastId = toast.loading('Deleting your post', { id: toastId })
    mutateDel(postId)
  }

  const editPost = async (e: React.FormEvent) => {
    e.preventDefault()
    toastId = toast.loading('Updating your post', { id: toastId })
    mutateUpd({ postId, postTitle })
  }

  return (
    <>
      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0.8 }}
        transition={{ ease: 'easeOut' }}
        className='bg-white my-8 p-8 rounded-lg'
      >
        {/* Author */}
        <div className='flex items-center gap-2'>
          <Image width={32} height={32} src={avatar} alt='avatar' className='rounded-full' />
          <h3 className='font-bold text-gray-700'>{author}</h3>
        </div>
        {/* Content */}
        <div className='my-8'>
          <p className='break-all'>{title}</p>
        </div>
        {/* Comments & Actions */}
        <div className='flex gap-4 cursor-pointer items-center'>
          <Link href={`/post/${postId}`} >
            <p className='text-sm font-bold text-gray-700'>
              {comments?.length} Comments
            </p>
          </Link>
          <button onClick={() => { setToggle(true); setToggleType('del') }}
            className='text-sm font-bold text-red-500'>
            Delete
          </button>
          <button onClick={() => { setToggle(true); setToggleType('edit') }}
            className='text-sm font-bold text-gray-700'>
            Edit
          </button>
        </div>
      </motion.div>
      {
        toggle && <Toggle
          target='post'
          toggleType={toggleType}
          action={toggleType === 'del' ? deletePost : editPost}
          setToggle={setToggle}
          data={toggleType === 'edit' && data} />
      }
    </>
  )
}

