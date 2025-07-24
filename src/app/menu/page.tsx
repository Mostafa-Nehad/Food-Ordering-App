import Menu from '@/components/menu'
import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Menu | Pizza Store',
}
export default function MenuPage() {
  return (
    <div>
      <div className='container mt-5'>
      <div className='text-center mb-4'>
            <Menu/>
      </div>
      </div>
    </div>
  )
}
