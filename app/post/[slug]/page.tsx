'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import Post from '@/app/components/Post'
import { PostType } from '@/app/types/Post'

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

  return (
    <div>
      <Post
        avatar={data?.user?.image}
        id={data?.id}
        name={data?.user?.name}
        postTitle={data?.title}
        comments={data?.Comment} />
    </div>
  )
}