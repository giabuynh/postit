'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Post from '@/app/components/Post'
import Comment from '@/app/components/Comment'
import AddComment from '@/app/components/AddComment'
import { useGetPostDetail } from '@/app/components/hooks/usePost'

type URL = {
  params: {
    slug: string
  }
}

export default function PostDetail(url: URL) {
  const { isLoading, error, data } = useGetPostDetail(url)

  if (error) return (
    <div>Error!!</div>
  )
  if (isLoading) return 'Loading...'
  console.log(data)

  return (
    <div>
      <Post
        key={data?.id}
        id={data?.id}
        title={data?.title}
        avatar={data?.user?.image}
        author={data?.user?.name}
        Comment={data?.Comment} />

      <AddComment postId={data?.id} />

      {data?.Comment?.map((comment) => (
        <Comment
          key={comment?.id}
          message={comment?.message}
          author={comment?.user?.name}
          avatar={comment?.user?.image}
          createdAt={comment?.createdAt} />
      ))
      }
    </div >
  )
}