import React, { useEffect, useState } from "react";
import Flow from "./components/Flow/Flow";
import { ReactFlowProvider } from "reactflow";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import "./App.css";
import InputComponent from "./components/InputComponent/InputComponent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialNodes = [];
const initialEdges = [];

const App = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const modifyNodeslist = (value) => {
    if (!selectedNode) {
      return;
    }

    const updatedNodes = nodes.map((node) => {
      if (node.id === selectedNode.id) {
        node.data.value = value;
      }
      return node;
    });

    setNodes(updatedNodes);
  };

  const checkFlowValidation = () => {
    const sourceNodes = new Set(edges.map((edge) => edge.source));
    const targetNodes = new Set(edges.map((edge) => edge.target));

    const nodesWithoutConnections = nodes.reduce((acc, node) => {
      if (!sourceNodes.has(node.id) && !targetNodes.has(node.id)) {
        acc.push(node);
      }
      return acc;
    }, []);

    return nodesWithoutConnections.length > 0 ? false : true;
  };

  const saveFlow = () => {
    if (!checkFlowValidation()) {
      toast("More than one node without source and target connections", {
        type: "error",
      });
    } else if (nodes.length == 0) {
      toast("No flow created", {
        type: "error",
      });
    } else {
      localStorage.setItem("flowChart", JSON.stringify({ nodes, edges }));
      toast("Flow chart saved successfullly", { type: "success" });
    }
  };

  const deleteFlow = () => {
    if (nodes.length == 0) {
      toast("No flow present to delete", { type: "info" });
    } else {
      localStorage.removeItem("flowChart");
      setNodes([]);
      setEdges([]);
      toast("Flow chart deleted successfullly", { type: "success" });
    }
  };

  useEffect(() => {
    let flowChart = localStorage.getItem("flowChart");

    if (flowChart) {
      const { nodes, edges } = JSON.parse(flowChart);
      setNodes(nodes);
      setEdges(edges);
    }
  }, [nodes]);

  return (
    <ReactFlowProvider>
      <div className="dndflow">
        <Header saveFlow={saveFlow} deleteFlow={deleteFlow} />
        <div className="layout-main">
          <Flow
            selectedNode={selectedNode}
            setSelectedNode={setSelectedNode}
            nodes={nodes}
            setNodes={setNodes}
            edges={edges}
            setEdges={setEdges}
          />
          {selectedNode ? (
            <InputComponent
              selectedNode={selectedNode}
              setSelectedNode={setSelectedNode}
              modifyNodeslist={modifyNodeslist}
            />
          ) : (
            <Sidebar />
          )}
        </div>
      </div>
      <ToastContainer />
    </ReactFlowProvider>
  );
};

export default App;
