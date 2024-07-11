import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ThreadList from "./components/ThreadList.jsx";
import Header from "./components/Header.jsx";
import CreateThread from "./components/CreateThread.jsx";
import PostList from "./components/PostList.jsx";

function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<ThreadList />} />
          <Route path="/threads/new" element={<CreateThread />} />
          <Route path="/threads/:threadId" element={<PostList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
