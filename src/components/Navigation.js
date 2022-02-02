import thumb from "../images/user.jpg";
import logo from "../images/logo.png";

const Navigation = () => {
  return (
    <div className="navigation">
      <div className="logo">
        <img src={logo} className="logo-img" />
      </div>
      <div className="nav-right">
        <div className="profile-thumb">
          <img src={thumb} className="profile-thumb-img" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Navigation;
