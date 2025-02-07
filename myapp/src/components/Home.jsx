import React from "react";
import { useNavigate } from "react-router-dom";
import "./Styles/Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h2>Welcome to Our App</h2>
      <div className="button-group">
        <button onClick={() => navigate("/login")} className="home-button">Login</button>
        <button onClick={() => navigate("/register")} className="home-button">Register</button>
      </div>
    </div>
  );
};

export default Home;
