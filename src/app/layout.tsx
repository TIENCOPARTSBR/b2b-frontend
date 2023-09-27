import './globals.scss'
import React from "react";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'B2B - Encoparts',
  description: 'Sistema b2b da empresa encoparts',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
