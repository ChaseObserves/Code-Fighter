import React from "react";
import FighterCards from "./FighterCards";
import { Link } from "react-router-dom";

import { SocketProvider } from "socket.io-react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

// Anytime we're using state we're using data that is going to change
// Props are properties and/or values that come from somewhere else
const Dashboard = () => {
  return (
    <SocketProvider socket={socket}>
      <div className="container" style={{ textAlign: "center" }}>
        <br />
        <br />
        <h2>Choose Your Opponent</h2>
        <br />
        <div className="row">
          <div>
            <FighterCards />
          </div>
        </div>
        <div className="fixed-action-btn">
          <Link to="/lobby" className="btn-floating btn-large red">
            <i className="large material-icons">add</i>
          </Link>
        </div>
      </div>
    </SocketProvider>
  );
};

export default Dashboard;
