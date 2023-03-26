'use client'

import AddPost from './components/AddPost'
import Post from './components/Post'
import { PostType } from './components/types/index'
import { useGetAllPosts } from './components/hooks/usePost'

export default function Home() {
  const { isLoading, error, data } = useGetAllPosts()

  if (error) return error
  if (isLoading) return 'Loading...'

  return (
    <main>
      <AddPost />
      {data?.map((post: PostType) => (
        <Post
          key={post.id}
          id={post.id}
          author={post.user.name}
          avatar={post.user.image}
          title={post.title}
          Comment={post.Comment} />
      ))}
    </main>
  )
}
