import React,{useEffect,useState} from 'react'
import { Steps } from 'antd'
import Classes from './TrackOrder.module.css'
import axios from 'axios'
import * as Urls from '../../../Urls'
const TrackOrder = (props) => {
  const [doctStatus,setDoctStatus] = useState([])
  useEffect(()=>{
 
       
          axios
          .get(Urls.track+'?DocketNo='+props.doctNum)
          .then((response1) => {
            let doctStatus = [...doctStatus]
            if(response1.data.IsSuccess === true){
              for(let i=0;i<response1.data.DocketTrackList.length;i++){
                doctStatus.push({title:response1.data.DocketTrackList[i].DocketStatus,description:response1.data.DocketTrackList[i].Time})
              }
              setDoctStatus(doctStatus)
            }
               console.log(response1);
              
          })
          .catch((error) => {
            console.log(error);
          });

  },[])
  return (

    <div className='container'>
      <div className='row'>

        <div className='col-md-4'>
          
          <Steps
            progressDot
            current={doctStatus.length}
            direction="vertical"
            items={doctStatus}
          />
        </div>
       
     
      </div>
      {/* <div className={Classes.HelpContact}>
        <p className={Classes.NeedHelp}>Need help</p>
        <input type='submit' className={Classes.ContactUs} value='Contact Us' />
      </div> */}

    </div>

  )
}

export default TrackOrder
