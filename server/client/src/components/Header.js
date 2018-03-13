import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CFlogo from "../images/CFlogo.png";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google" style={{ fontFamily: "Bangers" }}>
              Login with Google
            </a>
          </li>
        );
      default:
        return [
          <li key="Logout">
            <a href="/api/logout" style={{ fontFamily: "Bangers" }}>
              Logout
            </a>
          </li>
        ];
    }
  }

  render() {
    return (
      <nav className="blue-grey darken-3">
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? "/surveys" : "/"} // The logic here is important. this.props.auth is a boolean, either the response returns a user object (true) or it returns an empty string (false). This ternary operator states that if this.props.user is true, let the logo route them to their survey dashboard. If it's false, route them to the landing page.
            className="left brand-logo"
            style={{ paddingLeft: 20 }}
          >
            <img
              src={CFlogo}
              style={{ width: "10%", height: "auto", paddingTop: "10px" }}
              alt="Code Fighter Logo"
            />
          </Link>
          <ul className="right">{this.renderContent()} </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  // On this line, the "auth" property is destructured off the state object by putting "auth" in curly brackets as the argument (see lines 36-42)
  return { auth }; // After destructering auth off of state and pulling state out of the function, "auth: auth.state" becomes "auth: auth" and since the key and value are the same, it becomes simply "auth"
}

// Lines 40-42 are the same function as above, just before a refactor. This function gets called with the entire state object as an argument, pulled out of the Redux store.
// This function needs to return an object that will be passed to the Header Component as props.
// The only piece of state we care about (for the Header) off the state object is the "auth" piece of state, which is a property defined in the /reducers/index.js file and assigned "authReducer"

// function mapStateToProps(state) {
//     return { auth: state.auth };
// }

export default connect(mapStateToProps)(Header);
