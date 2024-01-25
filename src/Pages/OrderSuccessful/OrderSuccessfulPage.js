import Footer from '../../components/Footer/Footer'
import React from 'react'
import Header from "../../components/HeaderNew/Header";
import success from '../../Assets/sucesLarge.png'
import Classes from './OrderSuccessful.module.css'
import {BsFillCheckCircleFill} from 'react-icons/bs'

function OrderSuccessfulPage() {
  return (
    <div>
      <Header/>
      <div className={Classes.Successful}>
      <div className={Classes.SuccessText}  >
        <img src={success} alt='suces' />
        {/* <BsFillCheckCircleFill className={Classes.Image} size={200} color='rgb(182, 191, 199)'/> */}
        <p className={Classes.OrderSuccessful}>Order placed sucessfully</p>
        </div>
        </div>
      <Footer/>
    </div>
  )
}

export default OrderSuccessfulPage
