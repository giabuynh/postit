export type CommentType = {
  createdAt?: string,
  id: string,
  postId: string,
  usesrId: string,
  message: string,
  user: {
    email: string,
    id: string,
    image: string,
    name: string
  }
}

export type PostType = {
  id: string,
  title: string,
  updatedAt?: string,
  user: {
    email: string,
    id: string,
    image: string,
    name: string
  },
  Comment: CommentType[]
}
