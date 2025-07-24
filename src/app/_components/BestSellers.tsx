import MainHeading from '@/components/main-heading'
import Menu from '@/components/menu'
import React from 'react'

export default function BestSellers() {






  return (
    <section>
          <div className='container'>
      <div className='text-center mb-4'>
              <MainHeading title='Our Best Sellers' subTitle='CheckOut'/>
      </div>
      <Menu limit={3}/>


    </div>
    </section>
  )
}
