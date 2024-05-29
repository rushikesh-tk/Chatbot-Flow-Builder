import React, { useCallback, useState, useRef, useEffect } from "react";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Controls,
  MiniMap,
  Background,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";
import TextNode from "../TextNode/TextNode";
import { toast } from "react-toastify";

const rfStyle = {
  backgroundColor: "#ffffff",
};

// const initialNodes = [
//   {
//     id: "node-1",
//     type: "textUpdater",
//     position: { x: 0, y: 0 },
//     data: { value: 123 },
//   },
//   {
//     id: "node-2",
//     // type: "input",
//     // targetPosition: "top",
//     position: { x: 0, y: 200 },
//     data: { label: "node 2" },
//   },
//   {
//     id: "node-3",
//     // type: "input",
//     // targetPosition: "top",
//     position: { x: 200, y: 200 },
//     data: { label: "node 3" },
//   },
// ];

// const initialEdges = [
//   { id: "edge-1", source: "node-1", target: "node-2", sourceHandle: "a" },
//   { id: "edge-2", source: "node-1", target: "node-3", sourceHandle: "b" },
//   { id: "edge-3", source: "node-1", target: "node-3", sourceHandle: "b" },
// ];

const nodeTypes = { text: TextNode };

let id = 1;
const getId = () => `${id++}`; // to assign new id to every node

const Flow = (props) => {
  const { selectedNode, setSelectedNode, nodes, setNodes, edges, setEdges } =
    props;
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (connection) => {
      setEdges((eds) => {
        if (eds && eds.some((e) => e.source === connection.source)) {
          // checking if source is connected to another node
          toast("Source node is already connected to another node", {
            type: "error",
          });
          return eds;
        } else if (eds && eds.some((e) => e.target === connection.target)) {
          // checking if target is connected to any other node
          return addEdge({ ...connection }, eds);
        } else {
          return addEdge({ ...connection }, eds);
        }
      });
    },
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const node_id = getId();

      const newTempNode = {
        id: node_id,
        type,
        position,
        data: {
          value: `${type} message ${node_id}`,
          onClick: () => onNodeClick(null, { id: node_id }), // onclick event to keep track on selected node
        },
      }; // creating new node to add in the node list

      setNodes((nds) => nds.concat(newTempNode));
    },
    [reactFlowInstance]
  );

  const onNodeClick = (_, node) => setSelectedNode(node);

  useEffect(() => {
    console.log("node=>>>>>", nodes);
  }, [nodes]);

  return (
    <div style={{ height: "90vh", width: "75%" }} ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        style={rfStyle}
        onNodeClick={onNodeClick}
        onPaneClick={() => setSelectedNode(null)}
        onEdgeClick={() => setSelectedNode(null)}
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={2} />
      </ReactFlow>
    </div>
  );
};

export default Flow;
