import React from 'react'
import Image from 'next/image'

const Ringcomponet = () => {
  return (
    <>
    <div className='w-full h-[540px] bg-[#F5FFFD]'>
        <div className='max-w-container mx-auto h-full relative'>
            <div className='absolute top-[101.68px] left-[143.41px]'>
                <p className='text-[56px] font-medium font-playfair'>
                    Queen elizabath <br />coral Ring
                </p>
                <p className='text-[20px] leading-[32px]'>
                    With timeless charm and radiant grace, Preity <br /> Zinta embodies the spirit of our jewellery — where <br /> every diamond tells a story, 
                </p>

                <div className='pt-[56.18px] flex flex-row'>
                            <button className="flex items-center gap-2 bg-[#002D31] text-white px-6 py-3 rounded-lg  mr-7 ">
                              ADD TO CART
                              <Image 
                                src="/try/RightARRow.svg" 
                                width={24} 
                                height={24} 
                                alt="arrow"
                              />
                            </button>

                    <p className='text-2xl font-bold py-3  '>
₹ 75000
                    </p>
                </div>
            </div>
           
        </div>
    </div>
     <div className='w-full h-[540px] bg-[#FFFFFF]'>
        <div className='max-w-container mx-auto h-full'>
           
        </div>
    </div>
    </>
  )
}

export default Ringcomponet