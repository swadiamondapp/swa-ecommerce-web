import React from 'react'
import Classes from './TopDemanded.module.css'
import { useHistory } from 'react-router-dom'

const TopDemanded = (props) =>{
    const history = useHistory()
    const seeAllHandler = (type) =>{
        history.push({pathname:'/new_arrivel',state:{data:type}})
    }
    return (
        <div>
            <div className={Classes.TopDemnd}>
                <div className={Classes.TopDemanded}>
                    <p className={Classes.MainText}>Top Demanded Items</p>
                    {/* <p className={Classes.SubText}>234 New item added</p> */}
                </div>
                <p className={Classes.seeAll} onClick={()=>seeAllHandler('top')}>See all</p>
            </div>
          
            <div className={Classes.Products}>
                <div className='container'>
                    <div className='row'>
                       {props.children}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default TopDemanded
