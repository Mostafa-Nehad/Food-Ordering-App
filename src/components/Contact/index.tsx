import { Routes } from '@/constants/enums'
import React from 'react'
import MainHeading from '../main-heading'

export default function Contact() {
  return (
    <section
      id={Routes.CONTACT}
      className='flex flex-col items-center justify-center py-10 text-center px-4'
    >
      <div className='container'>
        <MainHeading subTitle='Get In Touch' title='Contact Us' />
        <div className='mt-4'>
          <a
            href='mailto:mostafanehad1995@gmail.com'
            className='text-2xl md:text-4xl text-accent block'
          >
            mostafanehad1995@gmail.com
          </a>
        </div>
        <div className='mt-3'>
          <a
            href='tel:+201286952365'
            className='text-2xl md:text-4xl underline text-accent block'
          >
            +201286952365
          </a>
        </div>
      </div>
    </section>
  )
}
