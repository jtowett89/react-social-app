import React, { useState, useEffect } from "react";

const SingleFeed = (props) => {
  let allUsers = props.allUsers;
  let feedOwnerId = props.ownerId;
  let feedId = props.feedId;
  let currentUserId = props.currentUser.user.id;
  let currentUserName = props.currentUser.user.name;

  const [ownerId, setOwnerId] = useState(10000000000);
  const [comments, setComments] = useState([]);
  const [commentInputState, setCommentInputState] = useState("");
  const [userName, setUserName] = useState("");
  const [feedLikes, setFeedLikes] = useState(0);
  const [feedCommentsNumber, setFeedCommentsNumber] = useState(0);
  const [ownerPhoto, setOwnerPhoto] = useState(
    "http://justice.zerone.co.ke/images/user.jpg"
  );
  const [ownerName, setOwnerName] = useState("");

  let likesCount = 0;
  let commentsCount = 0;
  let commentStrings = [];

  const ownerPhotoString = () => {
    allUsers.map((user) => {
      if (user.id === feedOwnerId) {
        setOwnerPhoto(user.photo);
      }
    });
  };

  const ownerNameString = () => {
    allUsers.map((user) => {
      if (user.id === feedOwnerId) {
        setOwnerName(user.name);
      }
    });
  };

  const currentLikes = () => {
    props.likes.map((like) => {
      if (like.feedId === feedId) {
        likesCount++;
      }
    });
    setFeedLikes(likesCount);
  };

  const currentCommentsNumber = () => {
    props.comments.map((comment) => {
      let ownerID = comment.ownerId;
      if (comment.feedId === feedId) {
        let commentOwner = "";
        allUsers.map((user) => {
          if (user.id === ownerID) {
            commentOwner = user.name;
          }
        });
        commentStrings.push(commentOwner + ": " + comment.comment);
        commentsCount++;
      }
    });
    setComments(commentStrings);
    setFeedCommentsNumber(commentsCount);
  };

  const handleChange = (e) => {
    e.target.name === "comment" && setCommentInputState(e.target.value);
  };

  useEffect(() => {
    setOwnerId(feedOwnerId);
    ownerPhotoString();
    ownerNameString();
    currentLikes();
    currentCommentsNumber();
    setUserName(currentUserName);
  }, []);
  return (
    <div className="newsfeed-single">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <img className="feed-thumb" src={ownerPhoto} alt="" />
      </div>
      <div style={{ width: "100%" }}>
        <div className="newsfeed-body">
          <p>{props.feed}</p>
        </div>
        <div className="newsfeed-controls">
          <a
            className="like-btn"
            onClick={(e) => {
              e.preventDefault();
              props.handleLike(
                e,
                feedId,
                currentUserId,
                ownerName,
                currentUserName
              );
              currentLikes();
            }}
          >
            <i className="fa fa-thumbs-up"></i> {feedLikes}
          </a>
          <a className="comment-btn">
            <i className="fa fa-comments"></i> {feedCommentsNumber}
          </a>
          <br />
          <br />
          <div style={{ marginLeft: "1.5em", width: "calc(100%-1.5em)" }}>
            {comments.length > 0 && (
              <>
                <p style={{ marginBottom: "-0.5em" }}>
                  <small className="zeraki-blue">
                    <b>Comments</b>
                  </small>
                </p>
                <br />
              </>
            )}

            {comments.map((comment, index) => {
              return (
                <p id={index} style={{ marginBottom: "1em" }} key={index}>
                  {comment}
                </p>
              );
            })}
          </div>
          <br />
          <br />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              props.handleComment(
                e,
                commentInputState,
                feedId,
                currentUserId,
                ownerName,
                currentUserName
              );
            }}
            style={{ display: "inline" }}
          >
            <input
              style={{
                width: "75% ",
                borderBottomRightRadius: "0px ",
                borderTopRightRadius: "0px "
              }}
              placeholder="Comment..."
              onChange={handleChange}
              name="comment"
              type="text"
              value={commentInputState}
            />
            <button
              className="logout-btn"
              style={{
                borderBottomLeftRadius: "0px ",
                borderTopLeftRadius: "0px ",
                fontSize: "1em",
                marginLeft: "0%",
                width: "25%",
                height: "3em",
                marginBottom: "0 !important",
                paddingRight: "0.5em",
                paddingLeft: "0.5em"
              }}
            >
              <i className="fa fa-send"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SingleFeed;
