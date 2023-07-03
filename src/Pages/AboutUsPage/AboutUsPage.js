import React,{useState,useEffect} from 'react'
import AboutUs from '../../components/AboutUs/AboutUs'
import Features from '../../components/Features/Features'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import Classes from './AboutUsPage.module.css'
import axios from 'axios';
import * as Urls from '../../Urls' 
function AboutUsPage() {
  const [cartCount,setCartCount] = useState('')
  const token = localStorage.getItem('swaToken')
  useEffect(()=>{
    if(token !== null){
      axios
      .get(Urls.cart,{ headers: {"Authorization" : 'Token '+token} })
      .then((response1) => {
        if(response1.data.results.message === 'cart is empty'){
            setCartCount('')
        }
        else{
            setCartCount(response1.data.results.count)
            
        }
      })
      .catch((error) => {
        console.log(error);
      });

    }
   
  },[])
  return (
    <div>
        <Header countCartItems={cartCount}/>
        <div className={Classes.Features}>
            <AboutUs/>
          <Features />
        </div>
        <Footer/>
      
    </div>
  )
}

export default AboutUsPage
