import React,{useEffect,useState} from 'react'
import Header from "../../components/HeaderNew/Header";
import Features from '../../components/Features/Features'
import Footer from '../../components/Footer/Footer'
import Rating from '../../components/Rating/Rating'
import Classes from './RateAndReview.module.css'
import axios from "axios";
import * as Urls from '../../Urls'

function RateAndReview(props) {
    const [cartCount,setCartCount] = useState('')
    const token = localStorage.getItem('swaToken')
    useEffect(()=>{
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

    },[])
   
    return (
        <div>
           
         <div className={Classes.BgColour}>
            <Header countCartItems={cartCount}/>
           <div className={Classes.Margin}>
                <Rating proid={props.location.state.data}/>
                </div>
                <div className={Classes.Features}>
                <Features />
                </div>
            </div>
            
            <Footer />
            
        </div>
    )
}

export default RateAndReview
