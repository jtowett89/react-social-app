import React, { useState, useEffect } from 'react';
import FriendSingle from './FriendSingle';

const Sidebar = (props) => {
  const [friendData, setFriendData] = useState([]);

  const populateData = () => {
    const allData = props.fetchedUsersData;
    const friends = props.userDetails.user.friends;
    let friendsArray = [];

    friends.forEach((friend) => {
      const friendId = friend.friendId;
      allData.forEach((item) => {
        if (item.id === friendId) {
          friendsArray.push(
            <FriendSingle
              showFriendFeeds={props.showFriendFeeds}
              key={item.id}
              friendId={item.id}
              name={item.name}
              photo={item.photo}
            />
          );
        }
      });
    });
    // setFriendData(friendsArray);
    return friendsArray.map((single) => {
      return single;
    });
  };

  return (
    <div id="sidebar" className="sidebar component-padding">
      <div className="sidebar-content">
        <div className="sidebar-heading-wrap">
          <h3 className="sidebar-heading">Following</h3>
          <a onClick={props.hideFriends} className="ml-auto sidebar-close">
            <i className="fa fa-times"></i> Close
          </a>
        </div>
        {populateData()}
      </div>
    </div>
  );
};

export default Sidebar;
