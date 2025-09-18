import React from 'react'
import Image from 'next/image'


const TopSellingCollection = () => {
  return (
<div className='w-full h-[1080px] bg-[#F8F4E9]'>
  <Image 
    src="/try/ambasedorbaner.svg" 
    className='w-screen h-[412.54px] object-cover' 
    width={1920} 
    height={412.54}
  />

   <div className='max-w-container mx-auto h-[667.46px]  relative'>
    <Image src="/try/ambasedor.svg" className='absolute left-[731.96px] bottom-0 z-10' width={876.46} height={802.97}/>

     <div className='-top-[305.41px] absolute left-[8.41px]'>
        <p className='text-white text-[18px] font-extralight leading-[24px] tracking-[8%] pb-[28.21px]'>TOP SELLING COLLECTION</p>
        <div  className='flex flex-row justify-between w-[587.08px] h-[160.65px]'>
                <Image src="/try/favRing2.svg" className='' width={176.92} height={160.65}/>
                <Image src="/try/favRing.svg" className='' width={176.92} height={160.65}/>
                <Image src="/try/newchain.svg" className='' width={176.92} height={160.65}/>

        </div>
     </div>



    </div>
</div>
  )
}

export default TopSellingCollection