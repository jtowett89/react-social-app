const FriendSingle = (props) => {
  let friendId = props.friendId;
  return (
    <div
      onClick={() => {
        props.showFriendFeeds(friendId);
      }}
      className="friend-single"
    >
      <img
        style={{ height: "3em", width: "3em", border: "2px solid #efefef" }}
        src={props.photo}
        alt=""
      />
      <p>{props.name}</p>
    </div>
  );
};

export default FriendSingle;
