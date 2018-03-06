import React from "react";
import FighterCards from "./FighterCards";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { socketConnect } from 'socket.io-react';

// Anytime we're using state we're using data that is going to change
// Props are properties and/or values that come from somewhere else
const Dashboard = (props) => {
  
  if (props.auth) {
    props.socket.emit("ready", props.auth);
  }

  return (
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
  );
};


function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(socketConnect(Dashboard));
