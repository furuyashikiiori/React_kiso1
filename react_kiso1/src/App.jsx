import React from "react";
import "./App.css";
import ThreadList from "./components/ThredList.jsx";

function App() {
  return (
    <div className="container">
      <h1>新着スレッド</h1>
      <ThreadList />
    </div>
  );
}

export default App;
