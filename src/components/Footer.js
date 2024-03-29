const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div className="footer component-padding">
      <div className="footer-content">
        <p>&copy; {year} Justice Social App. All rights reserved</p>
      </div>
    </div>
  );
};

export default Footer;
