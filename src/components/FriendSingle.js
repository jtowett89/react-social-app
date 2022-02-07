const FriendSingle = (props) => {
  let friendId = props.friendId;
  return (
    <div
      onClick={() => {
        props.showFriendFeeds(friendId);
      }}
      className="friend-single"
    >
      <img src={props.photo} alt="" />
      <p>{props.name}</p>
    </div>
  );
};

export default FriendSingle;
