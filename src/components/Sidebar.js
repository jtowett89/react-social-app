import { useState, useEffect } from "react";
import thumb from "../images/ppic.png";

const Sidebar = () => {
  return (
    <div className="sidebar component-padding">
      <div className="sidebar-content">
        <h3 className="sidebar-heading">Friends</h3>
        <div className="friend-single">
          <img src={thumb} alt="" />
          <p>Justice Towett</p>
        </div>
        <div className="friend-single">
          <img src={thumb} alt="" />
          <p>Emmery Towett</p>
        </div>
        <div className="friend-single">
          <img src={thumb} alt="" />
          <p>Joseph Towett</p>
        </div>
        <div className="friend-single">
          <img src={thumb} alt="" />
          <p>Justice Towett</p>
        </div>
        <div className="friend-single">
          <img src={thumb} alt="" />
          <p>Emmery Towett</p>
        </div>
        <div className="friend-single">
          <img src={thumb} alt="" />
          <p>Joseph Towett</p>
        </div>
        <div className="friend-single">
          <img src={thumb} alt="" />
          <p>Justice Towett</p>
        </div>
        <div className="friend-single">
          <img src={thumb} alt="" />
          <p>Emmery Towett</p>
        </div>
        <div className="friend-single">
          <img src={thumb} alt="" />
          <p>Joseph Towett</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
