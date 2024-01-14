import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ClerkProvider, auth } from '@clerk/nextjs';
import ModalProvider from './providers/modal-provider';
import { ToasterProvider } from './providers/toast-provider';
import { redirect } from 'next/navigation';
import { fetchUser } from '@/lib/actions/user.actions';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Weather Tracker',
  description: 'App created for park rangers',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = auth();

  if (!userId) redirect('/sign-in');

  
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ToasterProvider />
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
