import React from "react";
import "./App.css";
import ThreadList from "./components/ThredList.jsx";
import Header from "./components/Header.jsx";

function App() {
  return (
    <div className="container">
      <header>
        <Header />
      </header>
      <body>
        <h1>新着スレッド</h1>
        <ThreadList />
      </body>
    </div>
  );
}

export default App;
