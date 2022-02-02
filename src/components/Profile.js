import { useState, useEffect } from "react";
import profilePic from "../images/ppic.png";

const Profile = () => {
  return (
    <div className="profile component-padding">
      <div className="profile-content">
        <div className="prof-pic">
          <img src={profilePic} alt="" />
        </div>
        <div className="details">
          <h1>Justice Towett</h1>
          <p>@justicetowett</p>
        </div>
        <div className="profile-foot">
          <button className="logout-btn btn">
            <i className="fa fa-refresh"></i> Refresh Feed
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
