import React, { Component } from "react";
import { connect } from "react-redux";
import StreetFighter from "../images/StreetFighterBG.mp4";
import CFlogo from "../images/CFlogo.png";
// import { Link } from "react-router-dom";

const bgVideo = {
  width: "100%",
  height: "auto",
  float: "left",
  top: "0",
  left: "0",
  padding: "none",
  position: "fixed",
  zIndex: "-1"
};

class Landing extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        console.log("This is the false case", this.props.auth);
        return (
          <a href="/auth/google">
            <button className="btn-grad btn-grad-1">Login with Google</button>
          </a>
        );
      default:
        console.log("This is the default:", this.props.auth);
        return [
          <a href="/dashboard" key="Lobby">
            <button className="btn-grad btn-grad-1">Lobby</button>
          </a>
        ];
    }
  }
  // renderContent is a helper method. It includes a switch statement that will switch between the three possible options for the state of auth (null, false, or the User model object) as
  // defined in authReducer. We set the User model object to default to avoid hairy object syntax within the switch statement, as the other two were super easy: either "null" or "false"

  render() {
    return (
      <div>
        <video style={bgVideo} loop autoPlay muted>
          <source src={this.props.videoURL} type="video/mp4" />
          <source src={this.props.videoURL} type="video/ogg" />
          Your browser does not support the video tag.
        </video>
        <div style={{ textAlign: "center" }}>
          <img
            src={CFlogo}
            style={{ width: "50%", height: "auto", paddingTop: "50px" }}
            alt="Code Fighter Logo"
          />
          <br />
          <div>
            {this.renderContent()}
            {/* this line calls the helper method, which will loop through the switch statement, determine which case is true, then display the true result */}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    auth,
    videoURL: StreetFighter
  };
}

export default connect(mapStateToProps)(Landing);
