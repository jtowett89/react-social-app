import React, { Component } from "react";
import Navigation from "./components/Navigation";
import Profile from "./components/Profile";
import Newsfeed from "./components/Newsfeed";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import "./App.css";

const App = () => {
  return (
    <>
      <Navigation />
      <div className="row">
        <Profile />
        <Newsfeed />
        <Sidebar />
      </div>
      <Footer />
    </>
  );
};

export default App;
