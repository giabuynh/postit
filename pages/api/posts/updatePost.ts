import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import prisma from '../../../prisma/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method === 'PUT') {
    // Update post
    try {
      const { postId, postTitle } = req?.body?.data
      const session = await getServerSession(req, res, authOptions)
      if (!session)
        return res.status(401).json({ message: 'Please sign in to update a post' })
      const prismaUser = await prisma.user.findUnique({
        where: { email: session?.user?.email || '' }
      })

      // Validate postTitle
      if (!postTitle.length)
        return res.status(403).json({ message: 'Please do not leave this empty' })
      if (postTitle.length > 300)
        return res.status(403).json({ message: 'Please write a shorter post' })

      const result = await prisma.post.update({
        where: {
          id: postId,
          userId: prismaUser?.id
        },
        data: {
          title: postTitle
        }
      })

      return res.status(200).json(result)
    }
    catch (err) {
      return res.status(403).json({ message: 'Error has occured when updating a post' })
    }
  }
}