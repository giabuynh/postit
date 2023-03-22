'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Image from 'next/image'

import Post from '@/app/components/Post'
import AddComment from '@/app/components/AddComment'
import { PostType, CommentType } from '@/app/types/Post'

type URL = {
  params: {
    slug: string
  }
}

const fetchDetails = async (slug: string) => {
  const response = await axios.get(`/api/posts/${slug}`)
  return response.data
}

export default function PostDetail(url: URL) {
  const { data, isLoading } = useQuery<PostType>({
    queryFn: () => fetchDetails(url.params.slug),
    queryKey: ['detail-post']
  })

  if (isLoading) return 'Loading...'
  console.log(data)

  return (
    <div>
      <Post
        avatar={data?.user?.image}
        id={data?.id}
        name={data?.user?.name}
        postTitle={data?.title}
        comments={data?.Comment} />
      <AddComment postId={data?.id} />
      {data?.Comment?.map((comment) => (
        <div
          key={comment.id}
          className='my-6 p-8 bg-white rounded-md'>
          <div className='flex items-center gap-2'>
            <Image width={24} height={24} src={comment?.user?.image} alt='avatar' />
            <h3 className='font-bold'>{comment?.user?.name}</h3>
            <h2 className='text-sm'>{comment?.createdAt}</h2>
          </div>
          <div className='py-4'>{comment.message}</div>
        </div>
      ))}
    </div>
  )
}