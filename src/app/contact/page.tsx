import Contact from '@/components/Contact'
import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact | Pizza Store',
}
export default function ContactPage() {
  return (
    <main>
      <div className='flex flex-col items-center justify-center text-center px-4 min-h-[calc(100vh-200px)]'>
                <Contact/>
      </div>
    </main>
  )
}
