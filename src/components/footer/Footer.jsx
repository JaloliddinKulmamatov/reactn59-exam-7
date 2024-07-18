import React from "react";
import "./footer.css"; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h3>GameGeek</h3>
            <p>About Us</p>
            <p>Contact Us</p>
          </div>
          <div className="col-md-4">
            <h3>Links</h3>
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Games</a>
              </li>
              <li>
                <a href="#">Community</a>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h3>Follow Us</h3>
            <ul className="social-links">
              <li>
                <a href="#">
                  <i className="fab fa-facebook-f"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="copyright">
          <p>&copy; 2023 GameGeek. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
