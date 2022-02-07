// import thumb from '../images/ppic.png';
import React, { useState, useEffect } from 'react';

const SingleFeed = (props) => {
  let allUsers = props.allUsers;
  let feedOwnerId = props.ownerId;
  let feedId = props.feedId;

  const [ownerId, setOwnerId] = useState(10000000000);
  const [comments, setComments] = useState([]);
  const [commentInputState, setCommentInputState] = useState('');
  const [userName, setUserName] = useState('');
  const [feedLikes, setFeedLikes] = useState(0);
  const [feedCommentsNumber, setFeedCommentsNumber] = useState(0);
  const [ownerPhoto, setOwnerPhoto] = useState(
    'http://justice.zerone.co.ke/images/user.jpg'
  );
  const [likes, setLikes] = useState(0);

  let likesCount = 0;
  let commentsCount = 0;
  let commentStrings = [];

  const userPhoto = () => {
    allUsers.map((user) => {
      if (user.id === feedOwnerId) {
        setOwnerPhoto(user.photo);
        console.log(user.phpto);
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
      if (comment.feedId === feedId) {
        commentStrings.push(comment.comment);
        commentsCount++;
      }
    });
    setComments(commentStrings);
    setFeedCommentsNumber(commentsCount);
  };

  const handleChange = (e) => {
    e.target.name === 'comment' && setCommentInputState(e.target.value);
  };

  useEffect(() => {
    setOwnerId(feedOwnerId);
    userPhoto();
    currentLikes();
    currentCommentsNumber();
  }, []);
  return (
    <div className="newsfeed-single">
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img className="feed-thumb" src={ownerPhoto} alt="" />
      </div>
      <div style={{ width: '100%' }}>
        <div className="newsfeed-body">
          <p>{props.feed}</p>
        </div>
        <div className="newsfeed-controls">
          <a className="like-btn">
            <i className="fa fa-thumbs-up"></i> {feedLikes}
          </a>
          <a className="comment-btn">
            <i className="fa fa-comments"></i> {feedCommentsNumber}
          </a>
          <br />
          <br />
          <div style={{ marginLeft: '1.5em', width: 'calc(100%-1.5em)' }}>
            <small style={{ marginBottom: '.8em' }} className="zeraki-blue">
              <b>Comments</b>
            </small>
            <br />
            {comments.map((comment) => {
              return <p>{comment}</p>;
            })}
          </div>
          <br />
          <br />
          <form onSubmit={props.handleComment} style={{ display: 'inline' }}>
            <input
              style={{
                width: '75% ',
                borderBottomRightRadius: '0px ',
                borderTopRightRadius: '0px ',
              }}
              onChange={handleChange}
              name="comment"
              type="text"
              value={commentInputState}
            />
            <button
              className="logout-btn"
              style={{
                borderBottomLeftRadius: '0px ',
                borderTopLeftRadius: '0px ',
                fontSize: '1em',
                marginLeft: '0%',
                width: '25%',
                height: '3em',
                marginBottom: '0 !important',
                paddingRight: '0.5em',
                paddingLeft: '0.5em',
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
