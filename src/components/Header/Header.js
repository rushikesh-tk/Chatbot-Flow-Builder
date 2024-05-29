import React from "react";
import "./Header.css";
import { DeleteTwoTone, SaveTwoTone } from "@ant-design/icons";

const Header = ({ saveFlow, deleteFlow }) => {
  return (
    <div className="header-bar">
      <button
        className="save-btn"
        style={{ color: "red" }}
        onClick={deleteFlow}
      >
        <div style={{ marginRight: "0.5vw" }}>Delete Flow</div>
        <DeleteTwoTone />
      </button>

      <button className="save-btn" onClick={saveFlow}>
        <div style={{ marginRight: "0.5vw" }}>Save Changes</div>
        <SaveTwoTone />
      </button>
    </div>
  );
};

export default Header;
