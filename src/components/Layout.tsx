import React, { ReactNode } from 'react'
import { NewHeader } from '@/components/NewHeader'
import { Footer } from '@/components/Footer'
import { usePageTracking } from '@/hooks/useAnalytics'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  usePageTracking()

  return (
    <div className="min-h-screen flex flex-col">
      <NewHeader />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}

