import React from "react";
import Flow from "./components/Flow/Flow";
import { ReactFlowProvider } from "reactflow";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import "./App.css";

const App = () => {
  return (
    <div className="app-main">
      <ReactFlowProvider>
        <Header />
        <div className="layout-main">
          <Flow />
          <Sidebar />
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default App;
