const Profile = (props) => {
  return (
    <div className="profile component-padding">
      <div className="profile-content">
        {props.userDetails.user.email !== null && (
          <>
            <div className="prof-pic">
              <img src={props.userDetails.user.photo} alt="" />
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
