import React from 'react'
import Image from 'next/image'


const Worldrec = () => {
  return (
<div className="relative w-full h-[778px]">
  {/* Background Video */}
  {/* <video
    src="/try/worldrecvedio.mp4"
    autoPlay
    loop
    
    muted
    playsInline
    className="w-full h-full object-cover"
  /> */}

  {/* Black overlay */}
  <div className="absolute inset-0 z-10 bg-black/70" />

  {/* Content container */}
  <div className="absolute inset-0 z-20 flex items-center justify-center">
    <div className="relative w-full h-full max-w-container mx-auto">
      <Image
        src="/try/worldrecring.svg"
        width={1058}
        height={737}
        alt="ring"
        className="absolute top-[248.71px] left-[279.41px]"
      />

      <Image
        src="/try/worldreclogo.svg"
        width={174.46}
        height={174.46}
        alt="ring"
        className="absolute top-[44.97px] left-[1462.15px]"
      />
 



    <div className='text-center text-[#F8F4E9] absolute   top-[44.97px]  left-[414.41px]'>
        <p className='text-[56px] font-[500] font-playfair'>
Guinness world record
        </p>
        <p className='p-3'>
            Its design draws inspiration from the pink oyster mushroom, a symbol of immortality and longevity, and it features 41 <br /> unique mushroom-shaped petals adorned with diamonds The ring weighs

        </p>
    </div>


    </div>
  </div>
</div>





  )
}

export default Worldrec
