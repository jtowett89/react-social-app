import React, { useState, useEffect } from 'react';
import SingleFeed from './SingleFeed';

const Newsfeed = (props) => {
  let feedsData = props.newsFeedData;
  console.log('Feeds Data Newsfeed Component' + feedsData);
  return (
    <div id="newsfeed" className="newsfeed component-padding">
      <div className="newsfeed-content">
        <h2 className="newsfeed-heading">
          <span>
            <i className="fa fa-comments-o"></i> News Feed
          </span>{' '}
          <button onClick={props.showAll} className="newsfeed-btn ml-auto">
            <i className="fa fa-refresh"></i> Show All Feeds
          </button>
        </h2>
        {feedsData.map((feed) => {
          return (
            <SingleFeed
              key={feed.id}
              ownerId={feed.ownerId}
              feed={feed.feed}
              id={feed.id}
              allUsers={props.allUsers}
              currentUser={props.userDetails}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Newsfeed;
