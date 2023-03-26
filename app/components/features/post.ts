import axios from 'axios'

// Fetch all posts
export const getAllPosts = async () => {
  const response = await axios.get('/api/posts/getPosts')
  return response.data
}

// Fetch my posts
export const getMyPosts = async () => {
  const respones = await axios.get('/api/posts/myPosts')
  return respones.data
}

// Fetch post detail
export const getPostDetail = async (slug: string) => {
  const response = await axios.get(`/api/posts/${slug}`)
  return response.data
}

//! Deprecated. Create a post
export const createPost = async (title: string) => {
  const response = await axios.post('/api/posts/addPost', { title })
  return response.data
}