import React,{useState,useEffect} from 'react'  
import Header from "../../components/HeaderNew/Header";
import Footer from '../../components/Footer/Footer'
import TermsAndConditions from '../../components/TermsAndConditions/TermsAndConditions'
import axios from 'axios';
import * as Urls from '../../Urls' 

function TermsAndConditionsPage() {
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
        <TermsAndConditions/>
        <Footer/>
      
    </div>
  )
}

export default TermsAndConditionsPage
