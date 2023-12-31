import './globals.scss'
import { Inter } from 'next/font/google'
import Header from './components/Header/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Spotify Clone',
  description: 'Brief Spotify Clone',
}

const RootLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Header />{children}
      </body>
    </html>
  )
}

export default RootLayout;