import FriendSingle from "./FriendSingle";

const Sidebar = (props) => {
  const populateData = () => {
    const allData = props.fetchedUsersData;
    const friends = props.userDetails.user.friends;
    let friendsArray = [];
    console.log("Friends: " + props.userDetails.user.friends);

    friends.forEach((friend) => {
      const friendId = friend.friendId;
      for (let i = 0; i < allData.length; i++) {
        if (allData[i].id === friendId) {
          friendsArray.push(
            <FriendSingle
              showFriendFeeds={props.showFriendFeeds}
              key={allData[i].id}
              friendId={allData[i].id}
              name={allData[i].name}
              photo={allData[i].photo}
            />
          );
        }
      }
    });
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
