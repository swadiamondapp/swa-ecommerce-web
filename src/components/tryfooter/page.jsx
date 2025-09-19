import React from 'react'

const TFooter = () => {
  return (
    <div className='w-full h-[964px] bg-[#07060B]'>
        <div className='w-full h-full bg-[#07060B]'>

          

      <div className="border-b border-gray-800 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-[56px] text-white font-playfair mb-8 tracking-wide">
            Subscribe to our news letter
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mx-auto">
            <input
              type="email"
              placeholder="EMAIL*"
             
              className=" px-3 py-1 bg-white text-black text-sm font-medium placeholder-gray-500 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 w-[506px] h-[56px] "
            />
            <button
             
              className="bg-teal-600 hover:bg-teal-700  text-white font-semibold rounded-xl flex justify-center w-[161px] h-[56px] transition-colors duration-200 flex items-center gap-2 whitespace-nowrap"
            >
              SUBSCRIBE
              {/* <ArrowRight size={16} /> */}
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="border-b border-gray-800 py-12">
       
          <div className="flex flex-row justify-around items-center text-white">
            <div className="flex items-center gap-4">
              {/* <Truck size={32} className="text-gray-400" /> */}
              <span className="text-[16px] leading-[24px] tracking-[0.08rem]">FREE SHIPPING</span>
            </div>
            <div className="flex items-center gap-4">
              {/* <RotateCcw size={32} className="text-gray-400" /> */}
              <span className="text-[16px] leading-[24px] tracking-[0.08rem]">100% REFUND</span>
            </div>
            <div className="flex items-center gap-4">
              {/* <Award size={32} className="text-gray-400" /> */}
              <span className="text-[16px] leading-[24px] tracking-[0.08rem]">100% CERTIFIED JEWELLERY</span>
            </div>
            <div className="flex items-center gap-4">
              {/* <RefreshCw size={32} className="text-gray-400" /> */}
              <span className="text-[16px] leading-[24px] tracking-[0.08rem]">LIFE TIME EXCHANGE & BUYBACK</span>
            </div>
          </div>
       
      </div>

      {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  h-[346.64px]">
            {/* General Info */}
            <div className='flex flex-col items-end  border-r border-gray-800'>
                
<div className='flex flex-col text-start pr-28 pt-6 h-full'> 
  <h3 className="text-sm font-semibold tracking-wider mb-6 text-gray-300">GENERAL INFO</h3>
  <ul className="space-y-1 pl-0">
    <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Faq</a></li>
    <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">contact us</a></li>
    <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">about us</a></li>
    <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">privacy policy</a></li>
    <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">return policy</a></li>
    <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">terms & conditions</a></li>
    <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">outlets</a></li>
  </ul>
</div>
              
            </div>

            {/* Quick Links */}
            <div className='flex flex-col items-start pt-6 pl-12   border-r-2 border-gray-800 h-full'>
                
              <h3 className="text-sm font-semibold tracking-wider  text-gray-300">QUICK LINKS</h3>
              <div className="flex justify-start ">
                <div  className='mr-40'>
                  <ul className="space-y-2 pl-0 list-none ">
                  <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Offers</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Earrings</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Devotional</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Bangle</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Bracelet</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">platinum</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Solitaire</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Pendant</a></li>
                </ul>
                </div>
                <div>
                     <ul className="space-y-2 pl-0 list-none">
                  <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Rings</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Nose Pin</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Couple band</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Nacklace</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Navaratna</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Clip bangle</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Pendant with chain</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">kids</a></li>
                </ul>

                </div>
               
               
              </div>
            </div>

            {/* Contact Us */}
            <div className='flex flex-col items-start pt-6 pl-20   border-r-2 border-gray-800 h-full'>
              <h3 className="text-sm font-semibold tracking-wider mb-6 text-gray-300">CONTACT US</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  {/* <MapPin size={18} className="text-gray-400 mt-1 flex-shrink-0" /> */}
                  <div className="text-sm text-gray-300 leading-relaxed">
                    Ground Floor, 7/688E, Al Wahad, Chenguvaty,<br />
                    Kerala, 676501
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {/* <Phone size={18} className="text-gray-400 flex-shrink-0" /> */}
                  <div className="text-sm text-gray-300">
                    Toll Free Number : 1800 257 8600
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {/* <Mail size={18} className="text-gray-400 flex-shrink-0" /> */}
                  <div className="text-sm text-gray-300">
                    info@swadiamonds.com
                  </div>
                </div>
              </div>
            </div>
          </div>
        

      {/* Bottom Section with Logo and Description */}
      <div className="border-t border-gray-800 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          {/* Logo */}
          <div className="mb-8">
            <div className="text-4xl font-light tracking-wider text-white">
              <span className="text-white">S</span>
              <span className="text-teal-500">W</span>
              <span className="text-white">A</span>
            </div>
            <div className="text-xs tracking-widest text-gray-400 mt-2">DIAMONDS</div>
          </div>
          
          {/* Description */}
          <p className="text-sm text-gray-400 leading-relaxed max-w-4xl mx-auto">
            Concept of SWA Diamonds came into being from CAPESTONE Ventures Pvt Ltd, a leading name in wholesale diamond 
            jewellers market, that does business with prominent retail jewellers. Many retail jewellers who deal only in gold jewellery 
            are reluctant to add diamond jewellery to their stock due to certain factors
          </p>
        </div>
      </div>
    

        </div>
    </div>
  )
}

export default TFooter