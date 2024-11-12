import React, { useState } from "react";
import "./dashboard.css";
import { Button } from "@mui/material";
import Dashboard_Comp from "../../Components/Dashboard_Comp";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [tabValue, setTabValue] = useState("1");
  const [value, setValue] = useState(1);
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleLogout = () => {
    const token = localStorage.getItem("token");
    if (token) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <div className="dashboard">
      <header className="dsb-header">
        <nav>
          <h1>weStream</h1>
          <Button variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        </nav>
      </header>
      <div className="dsb-section">
        {value === 1 ? (
          <Dashboard_Comp
            tabValue={tabValue}
            handleTabChange={handleTabChange}
          />
        ) : (
          ""
        )}
        {value === 2 ? (
          <Dashboard_Comp
            tabValue={tabValue}
            handleTabChange={handleTabChange}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Dashboard;
