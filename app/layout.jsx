import { Roboto } from 'next/font/google'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import './globals.css'
import Nav from './auth/Nav'
import QueryWrapper from './api/QueryWrapper'
import SessionWrapper from './api/SessionWrapper'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
})

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions)

  return (
    <html lang='en'>
      <body className={`mx-4 md:mx-48 xl:mx-96 ${roboto.variable} font-sans bg-gray-200`}>

        <QueryWrapper>
          <Nav />
          {/* children load from page.tsx */}
          <SessionWrapper session={session}>
            {children}
          </SessionWrapper>
        </QueryWrapper>

      </body>
    </html >
  )
}
