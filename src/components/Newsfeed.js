// import React, { useState, useEffect } from 'react';
import SingleFeed from "./SingleFeed";

const Newsfeed = (props) => {
  let feedsData = props.newsFeedData;
  console.log("Feeds Data Newsfeed Component" + feedsData);
  return (
    <div id="newsfeed" className="newsfeed component-padding">
      <div className="newsfeed-content">
        <h2 className="newsfeed-heading">
          <span>
            <i className="fa fa-comments-o"></i> News Feed
          </span>{" "}
          <button onClick={props.showAll} className="newsfeed-btn ml-auto">
            <i className="fa fa-refresh"></i> Show All
          </button>
        </h2>
        {feedsData.length > 0 ? (
          feedsData.map((feed) => {
            return (
              <SingleFeed
                handleComment={props.handleComment}
                handleLike={props.handleLike}
                key={feed.id}
                ownerId={feed.ownerId}
                feed={feed.feed}
                feedId={feed.id}
                allUsers={props.allUsers}
                currentUser={props.userDetails}
                likes={props.likes}
                comments={props.comments}
              />
            );
          })
        ) : (
          <div>
            <h1>Oooops!! Seems like this user has no posts yet.</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Newsfeed;
