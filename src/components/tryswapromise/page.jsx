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

          

          <div className='w-[736px] h-[451px] absolute flex flex-col top-[51.89px] left-[872.41px] gap-y-[15px]'>
            <div className='w-[736px] h-[208px]  flex flex-row justify-between text-[#334155]'>
                <div className='w-[160px] h-full text-center '>
                    <div className='w-[160px] h-[160px] bg-white rounded-full relative mb-2'>
                        <Image 
                                  src="/try/storelogo.svg" 
                                  width={66.16} 
                                  height={64} 
                                  className='absolute top-[41.69px]  left-[46.92px]'
                                  alt="storelogo"
                                />

                    </div>
                    <p className='text-[14px] font-[400] leading-[20px]'>200+ store</p>

                </div>
                 <div className='w-[160px] h-full text-center'>
                    <div className='w-[160px] h-[160px] bg-white rounded-full relative mb-2'>
                        <Image 
                                  src="/try/exchange.svg" 
                                  width={55.97} 
                                  height={64} 
                                  className='absolute top-[48px]  left-[52.02px]'
                                  alt="exchange"
                                />

                    </div>
                    <p className='text-[14px] font-[400] leading-[20px]'>Life time exchange & <br />buy back</p>

                </div>
                 <div className='w-[160px] h-full text-center'>
                    <div className='w-[160px] h-[160px] bg-white rounded-full relative mb-2'>
                        <Image 
                                  src="/try/delivery.svg" 
                                  width={64} 
                                  height={37.88} 
                                  className='absolute top-[61.06px]  left-[48px]'
                                  alt="delivery"
                                />

                    </div>
                    <p className='text-[14px] font-[400] leading-[32px]'>Free shipping</p>

                </div>
                 <div className='w-[160px] h-full text-center'>
                    <div className='w-[160px] h-[160px] bg-white rounded-full relative mb-2'>
                        <Image 
                                  src="/try/moneyBack.svg" 
                                  width={61.08} 
                                  height={64}
                                  className='absolute top-[48px]  left-[49.46px]' 
                                  alt="moneyBack"
                                />

                    </div>
                    <p className='text-[14px] font-[400] leading-[32px]'>30 Day money back</p>

                </div>

            </div>
            <div className='w-[736px] h-[228px]  flex flex-row justify-between text-[#334155]'>
               <div className='w-[160px] h-full text-center  '>
                    <div className='w-[160px] h-[160px] bg-white rounded-full relative mb-2'>
                        <Image 
                                  src="/try/vedioconsultaion.svg" 
                                  width={70.4} 
                                  height={64} 
                                  className='absolute top-[48px]  left-[44.8px]' 
                                  alt="vedioconsultaion"
                                />

                    </div>
                    <p className='text-[14px] font-[400] leading-[20px]'>Personalized video <br />consultation</p>

                </div>
                 <div className='w-[160px] h-full text-center '>
                    <div className='w-[160px] h-[160px] bg-white rounded-full relative mb-2'>
                        <Image 
                                  src="/try/home.svg" 
                                  width={49.78} 
                                  height={64} 
                                  className='absolute top-[48px]  left-[55.11px]' 
                                  alt="arrow"
                                />

                    </div>
                    <p className='text-[14px] font-[400] leading-[20px]'>Try at home <br />service</p>

                </div>
                 <div className='w-[160px] h-full text-center '>
                    <div className='w-[160px] h-[160px] bg-white rounded-full relative mb-2'>
                        <Image 
                                  src="/try/Bis.svg" 
                                  width={92.44} 
                                  height={64} 
                                  className='absolute top-[43.76px]  left-[33.78px]' 
                                  alt="arrow"
                                />

                    </div>
                    <p className='text-[14px] font-[400] leading-[20px]'>BIS Hallmark, IGI, GIA</p>

                </div>
                 <div className='w-[160px] h-full text-center '>
                    <div className='w-[160px] h-[160px] bg-white rounded-full relative mb-2'>
                        <Image 
                                  src="/try/refund.svg" 
                                  width={70.6} 
                                  height={64} 
                                  className='absolute top-[48px]  left-[44.7px]' 
                                  alt="arrow"
                                />

                    </div>
                    <p className='text-[14px] font-[400] leading-[20px]'>100% Refund <br />Return with 30 days <br />of delivery</p>

                </div>

            </div>
          </div>


      </div>
    </div>
  )
}

export default SwaPromise