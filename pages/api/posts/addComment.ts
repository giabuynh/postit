import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'

import prisma from '../../../prisma/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const session = await getServerSession(req, res, authOptions)
      if (!session)
        return res.status(401).json({ message: 'Please sign in to make a comment' })

      // Get user
      const prismaUser = await prisma.user.findUnique({
        where: { email: session?.user?.email || '' }
      })

      //Get title
      const { message, postId } = req.body.data
      console.log(message, postId);

      // Validate title
      if (!message.length)
        return res.status(404).json({ message: 'Please enter some text' })
      if (message.length > 300)
        return res.status(404).json({ message: 'Please write a shorter comment' })

      // Add comment
      const result = await prisma.comment.create({
        data: {
          message,
          postId,
          userId: prismaUser?.id || ''
        }
      })

      console.log('addcomment')
      console.log(result)

      return res.status(200).json(result)
    }
    catch (err) {
      return res.status(403).json({ message: 'Error has occured when making a comment' })
    }
  }
}