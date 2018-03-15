import React from "react";

const Lost = () => {
  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <h1>You Lost...</h1>
        <br />
        <p>Return to the fighter lobby and reclaim your honor</p>
        <br />
        <a href="/dashboard" key="Lobby">
          <button className="btn-grad btn-grad-1">Lobby</button>
        </a>
        <br />
      </div>
    </div>
  );
};

export default Lost;
