import { Routes } from '@/constants/enums'
import React from 'react'
import MainHeading from '../main-heading'

export default function About() {
  return (
    <section className='section-gap' id={Routes.ABOUT}>
      <div className='container text-center'>
        <MainHeading subTitle='Our Story' title='About Us' />
        <div className='text-accent max-w-md mx-auto mt-4 flex flex-col gap-4'>
<p>At our pizzeria, we’re passionate about crafting the perfect slice. Every pizza starts with hand-tossed dough made fresh daily, layered with our signature sauce and premium ingredients.</p>
<p>We believe great food brings people together. Whether you’re grabbing a quick lunch or enjoying a family dinner, our warm atmosphere and friendly service make every visit memorable.</p>
<p>Locally owned and operated, we take pride in serving our community with love, flavor, and a dedication to quality. Come taste the difference in every bite!</p>
        </div>
      </div>
    </section>
  )
}
