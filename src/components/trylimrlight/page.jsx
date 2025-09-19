import React from 'react'
import Image from 'next/image';



const articles = [
  {
    title: "3 simple tips to care for and store your jewllwey",
    description:
      "Jewellery is more than just an accessory — it’s an investment, a memory, and often a symbol of love. Whether it’s a sparkling diamond ring, a gold chain, or a pair of delicate earrings, proper care can keep your jewellery looking new for years.",
    date: "23.05.25",
    time: "08:20 pm",
  },
  {
    title: "How to choose the right ring for weddings",
    description:
      "Jewellery is more than just an accessory — it’s an investment, a memory, and often a symbol of love. Whether it’s a sparkling diamond ring, a gold chain, or a pair of delicate earrings, proper care can keep your jewellery looking new for years.",
    date: "23.05.25",
    time: "08:20 pm",
  },
  {
    title: "3 simple tips to care for and store your jewllwey",
    description:
      "Jewellery is more than just an accessory — it’s an investment, a memory, and often a symbol of love. Whether it’s a sparkling diamond ring, a gold chain, or a pair of delicate earrings, proper care can keep your jewellery looking new for years.",
    date: "23.05.25",
    time: "08:20 pm",
  },
];




const Limelight = () => {
  return (
    <div className='w-full h-[876px] bg-white'>
        <div className= 'max-w-container mx-auto bg-white relative'>
            <div className="max-w-4xl mx-auto px-4 py-12 absolute top-[64.83px] left-[8.41px]">
      <h2 className="text-[56px] font-playfair  mb-8">In the Limelight</h2>
     <Image src="/try/Horizontalline.svg" className='pb-[24.78px]' width={923} height={885}/>
      

      <div className="space-y-[24px]">
        {articles.map((article, idx) => (
          <div
            className="  w-[653px] "
            key={idx}
          >
            <h3 className="text-[24px]  leading-[32px] font-bold">
              {article.title}
            </h3>
            <p className="text-[16px] leading-[24px] font-[400]">
              {article.description}
            </p>
            <p className="text-[16px] leading-[32px] mt-3 pb-[2px]">
              {article.date} | {article.time}
            </p>
            <Image src="/try/Horizontalline.svg" className='pt-[24px]' width={923} height={885}/>
      
          </div>
        ))}
      </div>
    </div>
     <Image src="/try/limelightring.svg" className='absolute top-[163.24px] left-[955.41px]' width={653} height={647.94}/>

        </div>
    </div>
  )
}

export default Limelight



