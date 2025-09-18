import React from 'react'
import Image from 'next/image'

const Newcollection = () => {
  return (
    <div className='w-full h-[1080px] bg-white'>
        <div className='max-w-container mx-auto h-full bg-white relative'>
            <Image src="/try/girlnewcollection.svg" className='absolute left-[8.41px] top-[144.86px]' width={512} height={790.28}/>
            <Image src="/try/decorenewcollection.svg" className='absolute left-[1276.18px] top-0' width={390.36} height={473.22}/>
            <div className='absolute top-[184.88px] left-[565.01px]'> 
                <p className='text-[#918676] text-[20px] font-[400] leading-[24px] tracking-[0.08em]'>
                   FIND YOUR NEW COLLECTION
                </p>
                <p className='text-[56px] font-[500] font-playfair '> 
                   New Arrival 
                </p>
            </div>
      <div className="absolute top-[847.19px] left-[555.28px]">
  <a 
    href="/" 
    className="flex flex-row items-center gap-2 w-[168px] underline underline-offset-4 !underline h-[30px] text-[#000000] text-[18px] leading-[24px] tracking-[0.06em] hover:text-[#2c2c2c] transition underline underline-offset-4"
  >
    VIEW MORE
    <Image 
      src="/try/rightarrowblack.svg" 
      width={24} 
      height={24} 
      alt="arrow"
    />
  </a>
</div>

          


        </div>
    </div>
  )
}

export default Newcollection