import React, { useState, useEffect } from "react";
import "./navbar.scss";

function Navbar() {
  const [show, handleShow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);
  return (
    <div className={`nav ${show && "nav-black"}`}>
      <img
        className="nav-logo"
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="Netflix Logo"
      />
      <img
        className="user-logo"
        alt="User Icon"
        src="https://startupcan.ch/wp-content/uploads/2019/04/profile-pictures-avatars-9.png"
      />
    </div>
  );
}

export default Navbar;
