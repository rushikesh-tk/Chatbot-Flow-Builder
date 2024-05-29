import React, { useCallback, useEffect } from "react";
import "./TextNode.css";
import { Handle, Position } from "reactflow";
import { MessageTwoTone, WhatsAppOutlined } from "@ant-design/icons";

function TextNode({ data, isConnectable }) {
  return (
    <div className="text-updater-node">
      <div className="node-header">
        <div className="left-side-header">
          <MessageTwoTone
            style={{
              marginLeft: "0.5vw",
              marginRight: "0.5vw",
            }}
          />
          <div className="header-text">Send Message</div>
        </div>

        <WhatsAppOutlined style={{ marginRight: "0.5vw" }} />
      </div>

      <div className="node-body">{data.value}</div>
      <Handle
        type="source"
        position={Position.Left}
        id="a"
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        position={Position.Right}
        id="b"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default TextNode;
