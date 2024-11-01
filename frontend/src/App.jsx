import React from "react";
import {BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./Routes/index.jsx";
import { UserProvider } from "./Context/UserContext";

function App() {
  return (
    <Router>
      <UserProvider>
        <AppRoutes />
      </UserProvider>
    </Router>
  );
}

export default App;
