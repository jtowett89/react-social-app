import thumb from '../images/ppic.png';
import React, { useState, useEffect } from 'react';

const SingleFeed = (props) => {
  let allUsers = props.allUsers;
  let feedOwnerId = props.ownerId;
  allUsers.map((user) => {});
  const [ownerId, setOwnerId] = useState(10000000000);
  const [comment, setComment] = useState('');
  const handleChange = (e) => {
    e.target.name === 'comment' && setComment(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    setOwnerId(feedOwnerId);
  });
  return (
    <div className="newsfeed-single">
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img className="feed-thumb" src={thumb} alt="" />
      </div>
      <div style={{ width: '100%' }}>
        <div className="newsfeed-body">
          <p>{props.feed}</p>
        </div>
        <div className="newsfeed-controls">
          <a className="like-btn">
            <i className="fa fa-thumbs-up"></i> 12
          </a>
          <a className="comment-btn">
            <i className="fa fa-comments"></i> 0
          </a>
          <br />
          <br />
          <form onSubmit={handleSubmit} style={{ display: 'inline' }}>
            <input
              style={{
                width: '75% ',
                borderBottomRightRadius: '0px ',
                borderTopRightRadius: '0px ',
              }}
              onChange={handleChange}
              name="comment"
              type="text"
              value={comment}
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
