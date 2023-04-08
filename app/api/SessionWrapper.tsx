'use client'

import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

interface Props {
  children?: ReactNode,
  session?: Session
}

const SessionWrapper = ({ children }: Props) => (
  <SessionProvider>
    {children}
  </SessionProvider>
)

export default SessionWrapper