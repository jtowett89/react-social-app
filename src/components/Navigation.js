import React, { useState, useEffect } from "react";
import logo from "../images/logo.png";

const Navigation = (props) => {
  return (
    <div className="navigation">
      <div className="logo">
        <a href="/">
          <img src={logo} className="logo-img" alt="" />
        </a>
      </div>
      <div className="nav-right">
        <div className="profile-thumb">
          <a onClick={props.showFriends} className="nav-show-friends nav-links">
            <i className="fa fa-users"></i>
          </a>
          <a onClick={props.setLogout} className="nav-links">
            <span className="btn-logout-nav">
              <i className="fa fa-sign-out"></i> Sign Out
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
