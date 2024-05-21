import React from "react";

import profile from "../../Assets/userprofile.png";
import Classes from "../SwaWallet/SwaWallet.module.css";

const Profile = () => {
  return (
    <div>
      <div className={Classes.mainContianerProfile}>
        <div className="container">
          <div className={Classes.ProfileCard}>
            <h3>Edit profile</h3>
            <img src={profile} />
            <p className={Classes.UploadPhotoProfile}>Upload photo</p>
            <div className={Classes.ProfileForms}>
              <div className={Classes.ProfileNames}>
                <label>Full Name</label>
                <input />
              </div>
              <div className={Classes.ProfileMails}>
                <label>Email</label>
                <div className={Classes.VerifyProfilebtn}>
                  <input />
                  <button>VERIFY</button>
                </div>
              </div>
              <div className={Classes.ProfileMobile}>
                <label>Mobile Number</label>
                <input />
              </div>
            </div>
            <div className={Classes.ParentProfileBtn}>
              <button className={Classes.ProfileCancelbtn}>Cancel</button>
              <button className={Classes.ProfileSaveChangeBtn}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
