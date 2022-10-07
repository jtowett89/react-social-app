import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Navigation from "./components/Navigation";
import Profile from "./components/Profile";
import Newsfeed from "./components/Newsfeed";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import "./App.css";
import loadingImg from "./images/loader.gif";
import cogoToast from "cogo-toast";

const App = () => {
  // start state variables
  const [fetchedUsersData, setFetchedUsersData] = useState({});
  const [fetchedFeedsData, setFetchedFeedsData] = useState([]);
  const [loggedInState, setLoggedInState] = useState(null);
  const [photo, setPhoto] = useState(
    "http://joeto.zerone.co.ke/images/user.jpg"
  );
  const [isLoading, setIsLoading] = useState(true);
  const [fetchedLikesData, setFetchedLikesData] = useState([]);
  const [fetchedCommentsData, setFetchedCommentsData] = useState([]);
  const [userDetails, setUserDetails] = useState({
    accessToken: "",
    user: {
      id: 0,
      name: "",
      email: "",
      password: "",
      photo: "http://joeto.zerone.co.ke/images/user.jpg",
      friends: [],
    },
  });
  //end state variables

  // let baseUrl = "http://localhost:3004";
  let baseUrl = "https://justice-json-server-database.herokuapp.com";
  let userId;
  let loggedInUserDetails = localStorage.getItem("userDetails");
  loggedInUserDetails !==
    JSON.stringify({
      accessToken: "",
      user: {
        id: 0,
        name: "",
        email: "",
        password: "",
        photo: "http://justice.zerone.co.ke/images/user.jpg",
        friends: [],
      },
    }) && loggedInUserDetails !== null
    ? (userId = JSON.parse(loggedInUserDetails).user.id)
    : (userId = 0);

  //Show all feeds from everyone
  const showAllFeeds = () => {
    //Get feeds data
    fetch(baseUrl + "/feeds")
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

        setFetchedFeedsData(filteredFeeds);
        console.info("Info: (All Feeds Data) " + JSON.stringify(feedsArray));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error: " + error);
      });
  };

  //Showing feeds from a single friend
  const showFriendFeeds = (id) => {
    document.getElementById("sidebar").classList.remove("no-left"); //hide sidebar for mobile

    document
      .getElementById("newsfeed")
      .scrollIntoView({ block: "start", behavior: "smooth" }); //scroll to newsfeed section in mobile

    //Get feeds data
    fetch(baseUrl + "/feeds")
      .then((res) => res.json())
      .then((returnedData) => {
        let data = returnedData.slice().sort((a, b) => b.id - a.id);
        console.log("OwnerID: " + data.ownerId);
        let feedsArray = [];
        let filteredFeeds = [];
        for (var i in data) feedsArray.push(data[i]);
        feedsArray.map((feedItem) => {
          feedItem.ownerId === id && filteredFeeds.push(feedItem);
        });
        setFetchedFeedsData(filteredFeeds);
        console.info(
          "Info : (All Friend's Feeds Data) " + JSON.stringify(feedsArray)
        );
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error: " + error);
      });
  };

  //Get random user images
  const fetchPics = () => {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((data) => {
        let randomPics = data;
        console.log("Random Pics: " + JSON.stringify(data));
        let userPhoto =
          randomPics.data.memes[
            Math.floor(Math.random() * randomPics.data.memes.length)
          ].url;
        setPhoto(userPhoto);
        console.log("Random Pic is: " + userPhoto);
      });
  };

  //Fetch Users
  const fetchUsers = () => {
    fetch(baseUrl + "/users")
      .then((res) => res.json())
      .then((returnedData) => {
        let data = returnedData.slice().sort((a, b) => b.id - a.id);
        setFetchedUsersData(data);
        console.info("Info: " + fetchedUsersData);

        // setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error: " + error);
      });
  };

  //Get Feeds
  const fetchFeeds = () => {
    fetch(baseUrl + "/feeds")
      .then((res) => res.json())
      .then((returnedData) => {
        let data = returnedData.slice().sort((a, b) => b.id - a.id);
        setFetchedFeedsData(JSON.parse(JSON.stringify(data)));
        console.info("Info: " + fetchedFeedsData);

        // setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error: " + error);
      });
  };

  //Get comments
  const fetchComments = () => {
    fetch(baseUrl + "/comments")
      .then((res) => res.json())
      .then((returnedData) => {
        let data = returnedData.slice().sort((a, b) => b.id - a.id);
        setFetchedCommentsData(data);
        console.info(
          "Info: (Comments Data Returned) " +
            JSON.stringify(fetchedCommentsData)
        );

        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  };

  //Get likes
  const fetchLikes = () => {
    fetch(baseUrl + "/likes")
      .then((res) => res.json())
      .then((returnedData) => {
        let data = returnedData.slice().sort((a, b) => b.id - a.id);
        setFetchedLikesData(JSON.parse(JSON.stringify(data)));
        console.info("Info: " + fetchedLikesData);

        // setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error: " + error);
      });
  };

  //Post Feed
  const postFeed = (currentUserId, feed) => {
    fetch(baseUrl + "/feeds", {
      method: "POST",
      body: JSON.stringify({
        ownerId: currentUserId,
        feed: feed,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Returned Data: " + data);
        fetchFeeds();
        fetchComments();
        fetchLikes();
        return;
      })
      .catch((error) => {
        console.log("Error: " + error);
        return;
      });
  };

  //Post a comment
  const postComment = (
    e,
    commentString,
    feedId,
    currentUserId,
    ownerName,
    currentUserName,
    feed
  ) => {
    postFeed(currentUserId, feed);

    fetch(baseUrl + "/comments", {
      method: "POST",
      body: JSON.stringify({
        ownerId: currentUserId,
        comment: commentString,
        feedId: feedId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.info("Info: (Posted Comment Data) " + JSON.stringify(data));

        fetchFeeds();
        fetchComments();
        fetchLikes();
        // alert("Comment Posted Successfully");
        cogoToast.success("Comment Posted Successfully");
        return;
      })
      .catch((error) => {
        console.log("Error: " + error);
        return;
      });
  };

  const handleComment = (
    e,
    commentString,
    feedId,
    currentUserId,
    ownerName,
    currentUserName
  ) => {
    e.preventDefault();
    let feed = currentUserName + " commented on " + ownerName + "'s feed";
    if (commentString.length < 2) {
      // alert("Your comment needs at least 2 characters");
      cogoToast.warn("Your comment needs at least 2 characters");
      return;
    } else {
      postComment(
        e,
        commentString,
        feedId,
        currentUserId,
        ownerName,
        currentUserName,
        feed
      );
    }
  };

  //Like a post
  const postLike = (
    e,
    feedId,
    currentUserId,
    ownerName,
    currentUserName,
    feed
  ) => {
    postFeed(currentUserId, feed);

    fetch(baseUrl + "/likes", {
      method: "POST",
      body: JSON.stringify({
        likerId: currentUserId,
        feedId: feedId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.info("Info: (Posted Like Data) " + JSON.stringify(data));

        fetchFeeds();
        fetchComments();
        fetchLikes();
        return;
      })
      .catch((error) => {
        console.error("Error: " + error);
        return;
      });
  };

  const handleLike = (e, feedId, currentUserId, ownerName, currentUserName) => {
    e.preventDefault();
    let feed = currentUserName + " liked " + ownerName + "'s feed";
    postLike(e, feedId, currentUserId, ownerName, currentUserName, feed);

    // alert("Feed Liked Successfully");
    cogoToast.success("Feed Liked Successfully");
  };

  //Login
  const setLogin = (email, password) => {
    //Authenticate Login credentials
    fetch(baseUrl + "/login", {
      method: "POST",
      cache: "default",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user.email !== "") {
          localStorage.setItem("isLoggedIn", "true");
          setLoggedInState(localStorage.getItem("isLoggedIn"));
          localStorage.setItem("userDetails", JSON.stringify(data));
          setUserDetails(data);
          console.info("Info: (Returned Data) " + JSON.stringify(data));
        } else {
          console.warn("Warning: Invalid Email and/or password");
          // alert("Invalid Email and/or password");
          cogoToast.error("Invalid Email and/or password");
        }
      })
      .catch((error) => {
        // alert("Invalid Email and/or password");
        cogoToast.error("Invalid Email and/or password");
        console.error("Error: " + error);
      });
  };

  //User registration
  const setRegistration = (name, email, password) => {
    let friendsArray = [];

    let allUsersData = fetchedUsersData;

    let friendsData = [
      {
        id: 1,
        friendId: 54,
      },
      {
        id: 2,
        friendId: 63,
      },
      {
        id: 3,
        friendId: 1,
      },
      {
        id: 4,
        friendId: 9,
      },
      {
        id: 5,
        friendId: 59,
      },
      {
        id: 6,
        friendId: 60,
      },
      {
        id: 6,
        friendId: 58,
      },
    ];
    console.log(JSON.stringify(friendsData));
    const request = fetch(baseUrl + "/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        photo: photo,
        friends: friendsData,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user.email !== "") {
          setUserDetails(data);
          localStorage.setItem("userDetails", JSON.stringify(data));
          localStorage.setItem("isLoggedIn", "true");
          setLoggedInState(localStorage.getItem("isLoggedIn"));

          console.info("Info (AccessToken): " + data.accessToken);
        } else {
          console.error("Error: " + data);
          // alert(data);
          cogoToast.error(data);
        }
      })
      .catch((error) => {
        console.log("Error: " + error);
        // alert("Email already in use");
        cogoToast.error("Email already in use");
      });

    console.log("The request: " + request);
  };

  const setLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    setLoggedInState(localStorage.getItem("isLoggedIn"));
    localStorage.setItem(
      "userDetails",
      JSON.stringify({
        accessToken: "",
        user: {
          id: 0,
          name: "",
          email: "",
          password: "",
          photo: "http://justice.zerone.co.ke/images/user.jpg",
          friends: [],
        },
      })
    );
    setUserDetails({
      accessToken: "",
      user: {
        id: 0,
        name: "",
        email: "",
        password: "",
        photo: "http://justice.zerone.co.ke/images/user.jpg",
        friends: [],
      },
    });
  };

  //show and hide friends on mobole
  const showFriends = () => {
    document.getElementById("sidebar").classList.add("no-left");
  };
  const hideFriends = () => {
    document.getElementById("sidebar").classList.remove("no-left");
  };

  useEffect(() => {
    setLoggedInState(localStorage.getItem("isLoggedIn"));
    const personDetails = localStorage.getItem("userDetails");
    console.log("Current Details: " + personDetails);

    //set user details on load
    if (
      personDetails !==
      JSON.stringify({
        accessToken: "",
        user: {
          id: 0,
          name: "",
          email: "",
          password: "",
          photo: "http://justice.zerone.co.ke/images/user.jpg",
          friends: [],
        },
      })
    ) {
      setUserDetails(JSON.parse(personDetails));
    }
    fetchUsers();
    fetchFeeds();
    fetchComments();
    fetchLikes();
    fetchPics();
  }, []);
  return (
    <>
      {isLoading ? (
        <div
          className="loading"
          style={{ position: "absolute", display: isLoading ? "flex" : "none" }}
        >
          <img src={loadingImg} alt="" />
        </div>
      ) : (
        <>
          {loggedInState === "true" &&
          userDetails !==
            {
              accessToken: "",
              user: {
                id: 0,
                name: "",
                email: "",
                password: "",
                photo: "http://joeto.zerone.co.ke/images/user.jpg",
                friends: [],
              },
            } &&
          userDetails !== null ? (
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
                  handleLike={handleLike}
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
