import { formatCurrency } from '@/lib/formatters'
import Image from 'next/image'
import React from 'react'
import AddtoCartButton from './AddtoCartButton'

export default function MenuItem({bestSeller}:any) {
  return (
            <li className='p-6 rounded-lg text-center group hover:bg-gray-50 hover:shadow-md hover:shadow-black/25 transition-all'>
              <div className='relative w-48 h-48 mx-auto'>
              <Image src={bestSeller.image}
              alt={bestSeller.title}
              className='object-cover rounded-md'
              fill
              />
              </div>
              <div className='flex items-center justify-between mb-4 px-5 pt-3'>
                <h4 className='font-semibold text-xl my-'>{bestSeller.title}</h4>
                <strong className='text-accent'>{formatCurrency(bestSeller.basePrice)}</strong>
              </div>
              <div>
                <p className='text-gray-500 text-sm line-clamp-3 text-center'>{bestSeller.description}</p>
              </div>
              <div className='flex justify-center items-center'>
              <AddtoCartButton bestSeller={bestSeller}/></div>


            </li>
  )
}
