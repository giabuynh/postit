import { useQueryClient, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { MutationProps } from '.'

type CommentProps = {
  postId: string,
  message: string
}

export const useAddComment = ({ onError, onSuccess }: MutationProps) => {
  const queryClient = useQueryClient()

  return useMutation(
    async (data: CommentProps) => await axios.post('/api/posts/addComment', { data }),
    {
      onError,
      onSuccess: () => {
        onSuccess()
        queryClient.invalidateQueries(['detail-post'])
      }
    }
  )
}

export const useDeleteComment = ({ onError, onSuccess }: MutationProps) => {
  const queryClient = useQueryClient()

  return useMutation(
    async (commentId: string) => await axios.delete('/api/comments/deleteComment', { data: commentId }),
    {
      onError,
      onSuccess: () => {
        onSuccess()
        queryClient.invalidateQueries(['detail-post'])
      }
    }
  )
}