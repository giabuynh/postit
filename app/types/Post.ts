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
  Comment: {
    createdAt?: string,
    id: string,
    postId: string,
    usesrId: string,
    User: {
      email: string,
      id: string,
      image: string,
      name: string
    }[]
  }
}