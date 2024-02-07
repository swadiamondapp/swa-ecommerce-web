import React from 'react'
import SlideData from '../../Assets/Banner.png'
import Classes from './Banner.module.css'
import Carousel from 'react-bootstrap/Carousel';

 const IndividualIntervalsExample = (props) =>{
  return (
    <Carousel>
      {props.banners.map((item,index)=>{
        return(
          <Carousel.Item interval={2000} key={index}>
              <img
                className={Classes.SlideImage}
                src={item.corousal_image}
                alt={item.corousal_name}
              />
           </Carousel.Item>
          )})}
     </Carousel>
  );
}

export default IndividualIntervalsExample;