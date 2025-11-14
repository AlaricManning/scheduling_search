import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Scheduling Constraint Translator',
  description: 'Natural language to structured constraints',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* THIS KILLS THE FAVICON REQUEST FOREVER */}
      <head>
        <link rel="icon" href="data:," />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}