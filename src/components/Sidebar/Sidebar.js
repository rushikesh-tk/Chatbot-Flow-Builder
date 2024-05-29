import React from "react";
import "./Sidebar.css";
import { MessageTwoTone } from "@ant-design/icons";

const DraggableNode = (props) => {
  const { onDragStart, nodeType } = props;
  return (
    <div
      className="dndnode input"
      onDragStart={(event) => onDragStart(event, nodeType)}
      draggable
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <MessageTwoTone style={{ fontSize: "3vh", color: "#0041d0" }} />
      <div className="msg-text">Message</div>
    </div>
  );
};

const Sidebar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="sidebar">
      <aside style={{ width: "100%" }}>
        <DraggableNode onDragStart={onDragStart} nodeType="text" />
      </aside>
      {/* Later we can add more components like this by defining 
          more type of nodes and make it more extensible */}
    </div>
  );
};

export default Sidebar;
