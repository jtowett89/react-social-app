import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Navigation from './components/Navigation';
import Profile from './components/Profile';
import Newsfeed from './components/Newsfeed';
// import SingleFeed from './components/SingleFeed';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import './App.css';
import loadingImg from './images/loader.gif';

const App = () => {
  // const apiKey = process.env.REACT_APP_ZERAKI_API_KEY;
  let baseUrl = 'http://localhost:3004';
  let userId;
  if (localStorage.getItem('userDetails') !== '') {
    userId = JSON.parse(localStorage.getItem('userDetails')).user.id;
  } else {
    userId = 1000000000000;
  }

  const [fetchedUsersData, setFetchedUsersData] = useState({});
  const [fetchedFeedsData, setFetchedFeedsData] = useState([]);
  const [loggedInState, setLoggedInState] = useState('false');
  const [errorMsg, setErroroMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchedLikesData, setFetchedLikesData] = useState([]);
  const [fetchedCommentsData, setFetchedCommentsData] = useState([]);
  const [userDetails, setUserDetails] = useState({
    accessToken: '',
    user: {
      id: 10000000000,
      name: '',
      email: '',
      password: '',
      photo: 'http://justice.zerone.co.ke/images/user.jpg',
      friends: [],
    },
  });

  const showAllFeeds = () => {
    fetch(baseUrl + '/feeds')
      .then((res) => res.json())
      .then((returnedData) => {
        let data = returnedData.slice().sort((a, b) => b.id - a.id);
        let feedsArray = [];
        let filteredFeeds = [];
        let filteredFeedsByFriends = [];
        let usersFriends = [];

        for (var i in data) feedsArray.push(data[i]);
        feedsArray.map((feedItem) => {
          filteredFeeds.push(feedItem);
        });
        // userDetails.map((like) => {});
        // filteredFeeds.map((feed) => {
        //   if (feed) {
        //   }
        // });
        setFetchedFeedsData(filteredFeeds);
        console.info('All Feeds Data: ' + JSON.stringify(feedsArray));
        setIsLoading(false);
      })
      .catch((error) => {
        setErroroMsg(error);
        console.log('Error: ' + error);
      });
  };

  const showFriendFeeds = (id) => {
    document.getElementById('sidebar').classList.remove('no-left');
    document
      .getElementById('newsfeed')
      .scrollIntoView({ block: 'start', behavior: 'smooth' });
    fetch(baseUrl + '/feeds')
      .then((res) => res.json())
      .then((returnedData) => {
        let data = returnedData.slice().sort((a, b) => b.id - a.id);
        console.log('OwnerID: ' + data.ownerId);
        let feedsArray = [];
        let filteredFeeds = [];
        for (var i in data) feedsArray.push(data[i]);
        feedsArray.map((feedItem) => {
          feedItem.ownerId === id && filteredFeeds.push(feedItem);
        });
        setFetchedFeedsData(filteredFeeds);
        console.info("All Friend's Feeds Data: " + JSON.stringify(feedsArray));
        setIsLoading(false);
      })
      .catch((error) => {
        setErroroMsg(error);
        console.log('Error: ' + error);
      });
  };

  const postComment = () => {};

  const handleComment = (e) => {
    e.preventDefault();
    postComment();
  };

  const setLogin = (email, password) => {
    fetch('http://localhost:3004/login', {
      method: 'POST',
      mode: 'cors',
      cache: 'default',
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user.email !== '') {
          localStorage.setItem('isLoggedIn', 'true');
          setLoggedInState(localStorage.getItem('isLoggedIn'));
          localStorage.setItem('userDetails', JSON.stringify(data));
          setUserDetails(data);
          console.log('Returned Data: ' + JSON.stringify(data));
        } else {
          console.error('Error: ' + JSON.stringify(data));
          alert('Invalid Email and/or password');
        }
      })
      .catch((error) => {
        alert('Invalid Email and/or password');
        console.error('Error: ' + error);
      });
  };

  const setRegistration = (name, email, password) => {
    let photo = 'http://justice.zerone.co.ke/images/user.jpg';

    let randomPics = [];

    const fetchPics = () => {
      fetch('https://api.imgflip.com/get_memes') //call to URL
        .then((response) => response.json()) //turn promise into JS object
        .then((data) => {
          randomPics.push(data);
          let myArray = randomPics.data.memes;
          photo = myArray[Math.floor(Math.random() * myArray.length)].url;
        });
    };
    fetchPics();

    const request = fetch(baseUrl + '/register', {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        photo: photo,
        friends: [],
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user.email !== '') {
          console.log(data.user.email);
          localStorage.setItem('isLoggedIn', 'true');
          setLoggedInState(localStorage.getItem('isLoggedIn'));
          localStorage.setItem('userDetails', JSON.stringify(data));
          setUserDetails(data);

          console.info('AccessToken: ' + data.accessToken);
        } else {
          console.error('Error: ' + data);
        }
      })
      .catch((error) => {
        console.log('Error: ' + error);
      });

    console.log('The request: ' + request);
  };

  const setLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.setItem('userDetails', '');
    setLoggedInState(localStorage.getItem('isLoggedIn'));
    // console.log(loggedInState);
  };
  const showFriends = () => {
    document.getElementById('sidebar').classList.add('no-left');
  };
  const hideFriends = () => {
    document.getElementById('sidebar').classList.remove('no-left');
  };

  useEffect(() => {
    setLoggedInState(localStorage.getItem('isLoggedIn'));
    const personDetails = localStorage.getItem('userDetails');
    console.log('Current Details: ' + personDetails); //////////////////
    if (personDetails !== '') {
      setUserDetails(JSON.parse(personDetails)); //set user details on load
    } else {
      setUserDetails({
        accessToken: '',
        user: {
          name: '',
          email: '',
          password: '',
          photo: 'http://www.musicteacher.info/user/img/default/user.png',
          friends: [],
        },
      });
    }

    fetch(baseUrl + '/users')
      .then((res) => res.json())
      .then((returnedData) => {
        let data = returnedData.slice().sort((a, b) => b.id - a.id);
        setFetchedUsersData(JSON.parse(JSON.stringify(data)));
        console.info('Info: ' + fetchedUsersData);

        // setIsLoading(false);
      })
      .catch((error) => {
        setErroroMsg(error);
        console.log('Error: ' + error);
      });

    fetch(baseUrl + '/feeds')
      .then((res) => res.json())
      .then((returnedData) => {
        let data = returnedData.slice().sort((a, b) => b.id - a.id);
        setFetchedFeedsData(JSON.parse(JSON.stringify(data)));
        console.info('Info: ' + fetchedFeedsData);

        // setIsLoading(false);
      })
      .catch((error) => {
        setErroroMsg(error);
        console.log('Error: ' + error);
      });

    fetch(baseUrl + '/likes')
      .then((res) => res.json())
      .then((returnedData) => {
        let data = returnedData.slice().sort((a, b) => b.id - a.id);
        setFetchedLikesData(JSON.parse(JSON.stringify(data)));
        console.info('Info: ' + fetchedLikesData);

        setIsLoading(false);
      })
      .catch((error) => {
        setErroroMsg(error);
        console.log('Error: ' + error);
      });

    fetch(baseUrl + '/comments')
      .then((res) => res.json())
      .then((returnedData) => {
        let data = returnedData.slice().sort((a, b) => b.id - a.id);
        setFetchedCommentsData(JSON.parse(JSON.stringify(data)));
        console.info('Info: ' + fetchedCommentsData);

        setIsLoading(false);
      })
      .catch((error) => {
        setErroroMsg(error);
        console.log('Error: ' + error);
      });
  }, []);
  return (
    <>
      {isLoading ? (
        <div
          className="loading"
          style={{ position: 'absolute', display: isLoading ? 'flex' : 'none' }}
        >
          <img src={loadingImg} alt="" />
        </div>
      ) : (
        <>
          {loggedInState === 'true' ? (
            <>
              <Navigation
                userDetails={userDetails}
                showFriends={showFriends}
                setLogout={setLogout}
              />
              <div className="row">
                <Profile
                  userDetails={userDetails}
                  showFriends={showFriends}
                  setLogout={setLogout}
                />
                <Newsfeed
                  handleComment={handleComment}
                  userDetails={userDetails}
                  allUsers={fetchedUsersData}
                  newsFeedData={fetchedFeedsData}
                  showAll={showAllFeeds}
                  likes={fetchedLikesData}
                  comments={fetchedCommentsData}
                />
                <Sidebar
                  showFriendFeeds={showFriendFeeds}
                  fetchedUsersData={fetchedUsersData}
                  userDetails={userDetails}
                  hideFriends={hideFriends}
                />
              </div>
              <Footer />
            </>
          ) : (
            <Login setRegistration={setRegistration} setLogin={setLogin} />
          )}
        </>
      )}
    </>
  );
};

export default App;
