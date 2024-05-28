import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header-bar">
      <button
        className="save-btn"
        onClick={() => console.log("clickedddd....")}
      >
        Save Changes
      </button>
    </div>
  );
};

export default Header;
