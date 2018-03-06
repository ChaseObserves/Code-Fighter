import React, { Component } from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";

class Landing extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        console.log("This is the false case", this.props.auth);
        return (
          <a href="/auth/google">
            <button className="btn brown lighten-3">Login with Google</button>
          </a>
        );
      default:
        console.log("This is the default:", this.props.auth);
        return [
          <a href="/surveys" key="Lobby">
            <button className="btn brown lighten-3">Lobby</button>
          </a>
        ];
    }
  }
  // renderContent is a helper method. It includes a switch statement that will switch between the three possible options for the state of auth (null, false, or the User model object) as
  // defined in authReducer. We set the User model object to default to avoid hairy object syntax within the switch statement, as the other two were super easy: either "null" or "false"

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Code Fighter</h1>
        Compete head-to-head in coding challenges
        <br />
        <div>
          {this.renderContent()}
          {/* this line calls the helper method, which will loop through the switch statement, determine which case is true, then display the true result */}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Landing);
