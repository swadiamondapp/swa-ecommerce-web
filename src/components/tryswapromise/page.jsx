import React from 'react'
import Image from 'next/image'

const SwaPromise = () => {
  return (
    <div className='w-full h-[540px] bg-[#F8F4E9]'>
      <div className='max-w-container h-full mx-auto bg-[#F8F4E9] relative'>
        

      <div className='w-[680px] text-start absolute top-[119.63px] left-[8.41px]'>
        <p className='text-[56px] font-playfair font-[500]'>
           swa promise
        </p>
        <p className='text-[20px] mt-3 font-[400] text-[#334155] leading-[32px]'>
            With timeless charm and radiant grace, Preity <br /> Zinta embodies the spirit of our jewellery — where <br /> every diamond tells a story, 

        </p>
      </div>
      <Image 
                  src="/try/diaRing.svg" 
                  width={337.94} 
                  height={203.12} 
                  alt="ring"
                  className="absolute bottom-0 -left-[6.24]"
                />

          

          <div className='w-[736px] h-[416px] absolute flex flex-col top-[51.89px] left-[872.41px]'>
            <div className='w-[736px] h-[208px] bg-lime-300'>
                <div className='w-[160px] h-full text-center'>
                    <div className='w-[160px] h-[160px] bg-white rounded-full relative mb-1'>

                    </div>
                    <p className='text-[14px] font-[400] leading-[32px]'>200+ store & <br />hfjhjwhfjhwjf</p>

                </div>

            </div>
            <div className='w-[736px] h-[208px] bg-teal-400'>

            </div>
          </div>


      </div>
    </div>
  )
}

export default SwaPromise