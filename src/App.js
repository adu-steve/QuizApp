import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Frontend from "./FrontPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Frontend />} />
      </Routes>
    </Router>
  );
};

export default App;
