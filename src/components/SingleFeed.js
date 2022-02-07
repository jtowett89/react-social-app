import thumb from '../images/ppic.png';

const SingleFeed = (props) => {
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
      <div>
        <div className="newsfeed-body">
          <p>{props.feed}</p>
        </div>
        <div className="newsfeed-controls">
          <a className="like-btn">
            <i className="fa fa-thumbs-up"></i> Like
          </a>
          <a className="comment-btn">
            <i className="fa fa-comments"></i> Comment
          </a>
        </div>
      </div>
    </div>
  );
};

export default SingleFeed;
