import React, { useState, useEffect } from "react";
const Profile = (props) => {
  const [photo, setPhoto] = useState(
    "http://joeto.zerone.co.ke/images/user.jpg"
  );
  useEffect(() => {
    setPhoto(props.userDetails.user.photo);
  }, props.userDetails.user.photo);
  return (
    <div className="profile component-padding">
      <div className="profile-content">
        {props.userDetails.user.email !== null ? (
          <>
            <div className="prof-pic">
              <img src={photo} alt="" />
            </div>
            <div className="details">
              <h1>
                {props.userDetails.user.name !== null
                  ? props.userDetails.user.name
                  : ""}
              </h1>
              <p>
                {props.userDetails.user.email !== null
                  ? props.userDetails.user.email
                  : ""}
              </p>
            </div>
          </>
        ) : (
          ""
        )}
        <div className="profile-foot">
          <button onClick={props.setLogout} className="logout-btn">
            <i className="fa fa-sign-out"></i> Log Out
          </button>
          <button
            onClick={props.showFriends}
            className="sidebar-open logout-btn"
          >
            <i className="fa fa-users"></i> Show Friends
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
