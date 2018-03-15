import React from "react";
// import { Link } from "react-router-dom";
// import SurveyList from "./surveys/SurveyList";

const Won = () => {
  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <h1>You Won!</h1>
        <br />
        <p>Return to the fighter lobby and live to fight another day</p>
        <br />
        <a href="/dashboard" key="Lobby">
          <button className="btn-grad btn-grad-1">Lobby</button>
        </a>
        <br />
      </div>
    </div>
  );
};

export default Won;
