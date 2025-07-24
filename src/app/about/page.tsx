import About from '@/components/About'
import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | Pizza Store',
}

export default function AboutPage() {
  return (
    <main>
      <About/>
    </main>
  )
}
