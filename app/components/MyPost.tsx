'use client'

import EditPost from './EditPost'
import { useGetMyPosts } from './hooks/usePost'

export default function MyPosts() {
  const { isLoading, error, data } = useGetMyPosts()

  if (error) return (
    <div>Error!!</div>
  )
  if (isLoading) return <h1>Loading...</h1>
  console.log(data)

  return (
    <div>
      {data?.posts?.map((post) => (
        <EditPost
          key={post?.id}
          postId={post?.id}
          avatar={data?.image}
          author={data?.name}
          title={post?.title}
          comments={post?.comments} />
      ))}
    </div>
  )
}