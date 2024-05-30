import React from "react";
import "./App.css";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import ThreadList from "./conponents/ThredList.jsx";
import Header from "./conponents/Header.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <header>
          <Header />
        </header>
        <body>
          <Switch>
            <h1>新着スレッド</h1>
            <Route path="/" element={<ThreadList />} />
          </Switch>
        </body>
      </div>
    </BrowserRouter>
  );
}

export default App;
