import { Roboto } from 'next/font/google'

import './globals.css'
import Nav from './auth/Nav'
import QueryWrapper from './api/QueryWrapper'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
})

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={`mx-4 md:mx-48 xl:mx-96 ${roboto.variable} font-sans bg-gray-200`}>
        <QueryWrapper>
          <Nav />
          {/* children load from page.tsx */}
          {children}
        </QueryWrapper>
      </body>
    </html>
  )
}
