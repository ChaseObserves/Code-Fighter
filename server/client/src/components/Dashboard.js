import React from "react";
import FighterCards from "./FighterCards";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { socketConnect } from "socket.io-react";

const bgImage = {
  width: "100%",
  height: "auto",
  float: "left",
  top: "0",
  left: "0",
  padding: "none",
  position: "fixed",
  zIndex: "-1"
};

// Anytime we're using state we're using data that is going to change
// Props are properties and/or values that come from somewhere else
const Dashboard = props => {
  if (props.auth) {
    props.socket.emit("ready", props.auth);
  }

  return (
    <div>
      <img
        style={bgImage}
        src="https://nextn-cdn-nextn.netdna-ssl.com/wp-content/uploads/2015/04/1504-15-Super-Smash-Bros.-Ryu-Roy-Wii-U-3DS-2.jpg"
        alt="Background"
      />
      <div className="container" style={{ textAlign: "center" }}>
        <br />
        <br />
        <h2 className="white-text">Choose Your Opponent</h2>
        <br />
        <div className="row">
          <div>
            <FighterCards />
          </div>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(socketConnect(Dashboard));
