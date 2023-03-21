import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import { PrismaClient } from '@prisma/client'

import prisma from '../../../prisma/client'

// const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions)
    if (!session)
      return res.status(401).json({ message: 'Please sign in to make a post' })

    const title: string = req.body.title
    const prismaUser = await prisma.user.findUnique({
      where: { email: session?.user?.email }
    })

    // Validate title
    if (!title.length)
      return res.status(403).json({ message: 'Please do not leave this empty' })
    if (title.length > 300)
      return res.status(403).json({ message: 'Please write a shorter post' })

    try {
      const result = await prisma.post.create({
        data: {
          title,
          userId: prismaUser.id
        }
      })

      return res.status(200).json(result)
    }
    catch (err) {
      return res.status(403).json({ err: 'Error has occured when making a post' })
    }
  }
}