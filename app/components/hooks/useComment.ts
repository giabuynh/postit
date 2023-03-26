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
    async (data: CommentProps) => axios.post('/api/posts/addComment', { data }),
    {
      onError,
      onSuccess: () => {
        onSuccess()
        queryClient.invalidateQueries(['detail-post'])
      }
    }
  )
}