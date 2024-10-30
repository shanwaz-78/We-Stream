import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./Routes/index.jsx";

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
