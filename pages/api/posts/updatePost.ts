import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'

import prisma from '../../../prisma/client'
import { after } from 'node:test'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method === 'PUT') {
    console.log('put')
    const session = await getServerSession(req, res, authOptions)
    if (!session)
      return res.status(401).json({ message: 'Please sign in to update a post' })

    console.log(session)

    // Update post
    try {
      // ! Check author
      const prismaUser = await prisma.user.findUnique({
        where: { email: session?.user?.email || '' }
      })
      console.log(prismaUser)
      const { postId, postTitle } = req?.body?.data
      const result = await prisma.post.update({
        where: {
          id: postId || '',
          usesrId: prismaUser?.user?.id
        },
        data: {
          title: postTitle
        },
        after: {

        }
      })

      return res.status(200).json(result)
    }
    catch (err) {
      return res.status(403).json({ err: 'Error has occured when updating a post' })
    }
  }
}