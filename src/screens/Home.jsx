import React from "react";
import { useHistory } from "react-router-dom";
import "./Home.css";
import LoadingOverlay from "./LoadingOverlay";

const Home = () => {
  const history = useHistory();
  const handleOrder = () => {
    history.push("/order");
  };
  return (
    <div className="home-root">
      <img src="/images/iteration-1-images/logo.svg" alt="Pizza Logo" />
      <h1 className="cool-text">KOD ACIKTIRIR<br /> PİZZA, DOYURUR</h1>
      <button className="btn" onClick={handleOrder}>ACIKTIM</button>
      <div className="cool-div">
      </div>
    </div>
  );
};

export default Home;
