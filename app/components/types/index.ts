export type UserType = {
  id: string,
  name: string,
  image: string,
  email: string,
  emailVerified: any,
}

export type CommentType = {
  id: string,
  message: string,
  createdAt: string,
  postId: string,
  userId: string
  user?: UserType
}

// object in fetch all posts
export type PostType = {
  id: string,
  title: string,
  published: boolean,
  createdAt: string,
  updatedAt: string,
  userId: string,
  user?: UserType,
  comments?: CommentType[]
}

// object in fetch my posts
export type MyPostType = {
  id: string,
  email: string,
  emailVerified: any,
  image: string,
  name: string,
  posts: PostType[]
}