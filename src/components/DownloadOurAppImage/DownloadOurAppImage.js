import React from 'react'
import DownloadOurApp from '../../Assets/DownloadOurApp.png'
import Classes from './DownloadOurApp.module.css'
import Gplay from '../../Assets/Gplay.png'
import AppStore from '../../Assets/AppStore.png'

function DownloadOurAppImage() {
  return (
    <div>
       <div className={Classes.Web}>
      <div className={Classes.ImageContainer}>
       <h3 className={Classes.Head}>Download Our App</h3>
       <p>Download our application and get exciting offers of your<br/> first purchase.</p>
       <div className={Classes.AppLink}>
        <a href='https://apps.apple.com/us/app/swadiamonds/id1616133385'>
        <img className={Classes.AppStore} src={AppStore} alt='' />
        </a>
       <a href='https://play.google.com/store/apps/details?id=com.swadiamondsapp'> 
       <img className={Classes.Gplay} src={Gplay} alt='' />
       </a>
       </div>
      </div>
      </div>
      <div className={Classes.Mob}>
      <div className={Classes.ImageContainerMob}>
       <h3 className={Classes.Head}>Download Our App</h3>
       <p>Download our application and get exciting offers of your first purchase.</p>
       <div className={Classes.AppLink}>
        <a href='https://apps.apple.com/us/app/swadiamonds/id1616133385'>
        <img className={Classes.AppStore} src={AppStore} alt='' />
        </a>
       <a href='https://play.google.com/store/apps/details?id=com.swadiamondsapp'> 
       <img className={Classes.Gplay} src={Gplay} alt='' />
       </a>
       </div>
      </div>
      </div>

    </div>
   
   
  )
}

export default DownloadOurAppImage
