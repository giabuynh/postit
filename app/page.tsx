'use client'

import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

import AddPost from './components/AddPost'
import Post from './components/Post'
import { PostType } from './types/Post'

// Fetch all post
const allPosts = async () => {
  const response = await axios.get('/api/posts/getPosts')
  return response.data
}

export default function Home() {
  const { data, error, isLoading } = useQuery<PostType>({
    queryFn: allPosts,
    queryKey: ['posts'], // to manage query caching -> not cache post when navigate.
  })

  if (error) return error
  if (isLoading) return 'Loadding...'
  console.log(data)

  return (
    <main>
      <AddPost />
      {data?.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          name={post.user.name}
          avatar={post.user.image}
          postTitle={post.title}
          comments={post.Comment} />
      ))}
    </main>
  )
}
