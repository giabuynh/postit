import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

import prisma from '../../../prisma/client'

// const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    // Fetch all posts
    try {
      const data = await prisma.post.findMany({
        include: {
          user: true,
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
      return res.status(200).json(data)
    }
    catch (err) {
      return res.status(403).json({ err: 'Error has occured when fetching posts' })
    }
  }
}