import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Hero = () => {
  return (
    <div className="relative w-full h-[990px] overflow-hidden  ">
  <div className="absolute top-10 left-10 w-[600px] h-[600px] rounded-full bg-cyan-200/60 blur-3xl animate-float"></div>
  <div className="absolute right-0 top-20 w-[700px] h-[700px] rounded-full bg-cyan-200/60 blur-3xl animate-float delay-1000"></div>
  <div className="absolute bottom-0 left-1/3 w-[800px] h-[800px] rounded-full bg-cyan-200/60 blur-3xl animate-float delay-2000"></div>
  <Image src="/try/girlHero.svg" className='absolute left-28 top-28' width={563} height={885}/>
</div>

  )
}

export default Hero