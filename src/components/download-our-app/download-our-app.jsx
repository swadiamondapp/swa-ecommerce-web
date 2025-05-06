import Classes from "./download-our-app.module.css";

function DownloadOurAppImage() {
  return (
    <div className="container newarrivalContainer">
      <div className={Classes.Web}>
        <div className={Classes.ImageContainer}>
          <h3 className={Classes.Head}>Download Our App</h3>
          <p>
            Download our application and get exciting offers of your
            <br /> first purchase.
          </p>
          <div className={Classes.AppLink + " d-flex justify-content-start"}>
            <a href="https://apps.apple.com/us/app/swadiamonds/id1616133385">
              <img className={Classes.AppStore} src={'/Assets/AppStore.png'} alt="AppStore" />
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.swadiamondsapp">
              <img className={Classes.Gplay} src={'/Assets/Gplay.png'} alt="Gplay" />
            </a>
          </div>
        </div>
      </div>
      <div className={Classes.Mob}>
        <div className={Classes.ImageContainerMob}>
          <h3 className={Classes.Head}>Download Our App</h3>
          <p>
            Download our application and get exciting offers of your first
            purchase.
          </p>
          <div className={Classes.AppLink}>
            <a href="https://apps.apple.com/us/app/swadiamonds/id1616133385">
              <img className={Classes.AppStore} src={'/Assets/AppStore.png'} alt="AppStore" />
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.swadiamondsapp">
              <img className={Classes.Gplay} src={'/Assets/Gplay.png'} alt="Gplay" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DownloadOurAppImage;
