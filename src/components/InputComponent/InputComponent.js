import React from "react";
import "../Sidebar/Sidebar.css";
import "./InputComponent.css";
import { ArrowLeftOutlined } from "@ant-design/icons";

const InputComponent = (props) => {
  const { selectedNode, setSelectedNode, modifyNodeslist } = props;

  return (
    <div className="sidebar input-container">
      <div className="input-container-top">
        <ArrowLeftOutlined
          className="back-arrow"
          onClick={() => setSelectedNode(null)}
        />
        <div className="header-div">
          <div style={{ fontSize: "large" }}>Message</div>
        </div>
      </div>

      <div className="input-container-bottom">
        <label className="text-container">
          <div style={{ marginBottom: "1vh" }}>Text:</div>
          <textarea
            rows={4}
            cols={40}
            onChange={(e) => modifyNodeslist(e.target.value)}
            placeholder="Enter text message here"
            value={selectedNode.data.value}
          />
        </label>
      </div>
    </div>
  );
};

export default InputComponent;
