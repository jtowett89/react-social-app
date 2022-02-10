import React, { useState } from "react";
import logo from "../images/logo.png";
import loading from "../images/loader.gif";

const Login = (props) => {
  let returnedValidationText = "";
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const [nameReg, setNameReg] = useState("");
  const [emailAddressReg, setEmailAddressReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const [loader, setLoader] = useState(false);
  const [loginOrRegistration, setLoginOrRegistration] = useState("login");

  const toggleForms = () => {
    setLoginOrRegistration(
      loginOrRegistration === "login" ? "registration" : "login"
    );
  };

  const handleChange = (e) => {
    const [name, email, password] = e.target.name;

    if (e.target.name === "email") {
      setEmailAddress(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else if (e.target.name === "name_reg") {
      setNameReg(e.target.value);
    } else if (e.target.name === "email_reg") {
      setEmailAddressReg(e.target.value);
    } else if (e.target.name === "password_reg") {
      setPasswordReg(e.target.value);
    }
  };

  const handleLogin = (e) => {
    setLoader(true);
    e.preventDefault();

    if (validateLoginInputs(emailAddress, password)) {
      console.log("Email: " + emailAddress + ", Password: " + password);
      props.setLogin(emailAddress, password);
      setLoader(false);
    } else {
      alert(returnedValidationText);
      setLoader(false);
    }
  };
  const handleRegistration = (e) => {
    setLoader(true);
    e.preventDefault();

    if (validateRegInputs(nameReg, emailAddressReg, passwordReg)) {
      console.log(
        "Name: " +
          nameReg +
          ", Email: " +
          emailAddressReg +
          ", Password: " +
          passwordReg
      );
      props.setRegistration(nameReg, emailAddressReg, passwordReg);
      setLoader(false);
    } else {
      alert(returnedValidationText);
      setLoader(false);
    }
  };

  function validateLoginInputs(email, password) {
    let emailRegExp =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegExp.test(email)) {
      returnedValidationText = "Invalid Email Address";
      return false;
    } else if (password.length < 6) {
      returnedValidationText =
        "Your password should have at least 6 characters";
      return false;
    } else if (
      password.includes("'") ||
      password.includes("`") ||
      password.includes('"')
    ) {
      returnedValidationText =
        "Your password should not contain the special characters (\",',`)";
      return false;
    } else {
      return true;
    }
  }
  function validateRegInputs(name, email, password) {
    let emailRegExp =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (name.length < 2) {
      returnedValidationText = "Your name should have at least 2 characters";
      return false;
    } else if (!emailRegExp.test(email)) {
      returnedValidationText = "Invalid Email Address";
      return false;
    } else if (password.length < 6) {
      returnedValidationText =
        "Your password should have at least 6 characters";
      return false;
    } else if (
      password.includes("'") ||
      password.includes("`") ||
      password.includes('"')
    ) {
      returnedValidationText =
        "Your password should not contain the characters (\",',`)";
      return false;
    } else {
      return true;
    }
  }

  return (
    <div className="login-body">
      <div className="loader" style={{ display: loader ? "flex" : "none" }}>
        <img src={loading} alt="" />
      </div>
      {loginOrRegistration === "login" ? (
        <div className="login-widget">
          <img src={logo} className="login-logo" />
          <br />
          <br />
          <h1 className="text-center text-white">User Login</h1>
          <br />
          <br />
          <form onSubmit={handleLogin}>
            <label>Email</label>
            <input
              id="email"
              type="text"
              name="email"
              onChange={handleChange}
              value={emailAddress}
              placeholder="Email"
            />
            <label>Password</label>
            <input
              id="password"
              type="password"
              name="password"
              onChange={handleChange}
              value={password}
              placeholder="Password"
            />
            <br />
            <p className="text-center" style={{ color: "#fff" }}>
              Don't have an account?{" "}
              <a style={{ textDecoration: "underline" }} onClick={toggleForms}>
                Register an account
              </a>
            </p>
            <br />
            <button className="login-btn">
              <i className="fa fa-sign-in"></i> Login
            </button>
          </form>
        </div>
      ) : (
        <div className="login-widget">
          <img src={logo} className="login-logo" />
          <br />
          <br />
          <h1 className="text-center text-white">User Registration</h1>
          <br />
          <br />
          <form onSubmit={handleRegistration}>
            <label>Name</label>
            <input
              id="name_reg"
              type="text"
              name="name_reg"
              onChange={handleChange}
              value={nameReg}
              placeholder="Name"
            />

            <label>Email</label>
            <input
              id="email_reg"
              type="text"
              name="email_reg"
              onChange={handleChange}
              value={emailAddressReg}
              placeholder="Email"
            />
            <label>Password</label>
            <input
              id="password_reg"
              type="password"
              name="password_reg"
              onChange={handleChange}
              value={passwordReg}
              placeholder="Password"
            />
            <br />
            <p className="text-center" style={{ color: "#fff" }}>
              Already have an account?{" "}
              <a style={{ textDecoration: "underline" }} onClick={toggleForms}>
                Login
              </a>
            </p>
            <br />
            <button className="login-btn">
              <i className="fa fa-edit"></i> Register
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
