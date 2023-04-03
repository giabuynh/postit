import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { PostType, MyPostType } from '../types'
import { getAllPosts, getMyPosts, getPostDetail } from '../features/post'
import { MutationProps } from './index'

type URL = {
  params: {
    slug: string
  }
}

export const useGetAllPosts = (keyword?: any) => {
  return useQuery<PostType>({
    queryFn: getAllPosts,
    queryKey: ['posts', keyword] // to manage query caching -> not cache post when navigate.
  })
}

export const useGetMyPosts = (keyword?: any) => {
  return useQuery<MyPostType>({
    queryFn: getMyPosts,
    queryKey: ['my-posts', keyword],
  })
}

export const useGetPostDetail = (url: URL, keyword?: any,) => {
  return useQuery<PostType>({
    queryFn: () => getPostDetail(url.params.slug),
    queryKey: ['detail-post', keyword]
  })
}

export const useAddPost = ({ onError, onSuccess }: MutationProps) => {
  const queryClient = useQueryClient()

  return useMutation(
    async (title: string) =>
      await axios.post('/api/posts/addPost', { title }),
    {
      onError,
      onSuccess: () => {
        onSuccess()
        queryClient.invalidateQueries(['posts'])
      },
    }
  )
}

export const useDeletePost = ({ onError, onSuccess }: MutationProps) => {
  const queryClient = useQueryClient()

  return useMutation(
    async (postId: string) => await axios.delete('/api/posts/deletePost', { data: postId }),
    {
      onError,
      onSuccess: () => {
        onSuccess()
        queryClient.invalidateQueries(['my-posts'])
      }
    }
  )
}

export const useUpdatePost = ({ onError, onSuccess }: MutationProps) => {
  const queryClient = useQueryClient()

  return useMutation(
    async (data: any) => await axios.put('/api/posts/updatePost', { data }),
    {
      onError,
      onSuccess: () => {
        onSuccess()
        queryClient.invalidateQueries(['my-posts'])
      }
    }
  )
}
