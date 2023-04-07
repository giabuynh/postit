import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'

import prisma from '../../../prisma/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    try {
      const session = await getServerSession(req, res, authOptions)
      if (!session)
        return res.status(401).json({ message: 'Please sign in to delete a comment' })

      const prismaUser = await prisma.user.findUnique({
        where: { email: session?.user?.email || '' }
      })

      const commentId = req.body
      const result = await prisma.comment.delete({
        where: {
          id: commentId,
          userId: prismaUser?.id
        }
      })

      return res.status(200).json(result)
    }
    catch (err) {
      return res.status(403).json({ message: 'Error has occured when deleting a comment' })
    }
  }
}