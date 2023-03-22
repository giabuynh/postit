'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { MyPostType } from '../types/MyPost'
import EditPost from './EditPost'

const fetchMyPosts = async () => {
  const respones = await axios.get('/api/posts/myPosts')
  return respones.data
}

export default function MyPosts() {
  const { data, isLoading } = useQuery<MyPostType>({
    queryFn: fetchMyPosts,
    queryKey: ['my-posts'],
  })

  if (isLoading) return <h1>Loading...</h1>
  console.log(data)
  return (
    <div>
      {data?.Post?.map((post) => (
        <EditPost
          id={post.id}
          key={post.id}
          avatar={data.image}
          name={data.name}
          title={post.title}
          Comment={post.Comment} />
      ))}
    </div>
  )
}