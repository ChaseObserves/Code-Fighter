import React, { Component } from "react";
import { connect } from "react-redux";
import { socketConnect } from 'socket.io-react';
import { fetchFighters, incomingChallenge } from "../actions";

class FighterCards extends Component {

  componentDidMount() {
    // when the component mounts, listen for changes to fighters and for incoming challenges using the socket.
    this.props.fetchFighters(this.props.socket);
    this.props.incomingChallenge(this.props.socket);
  }

  // challenge is called when we want to challenge another user
  challenge(userId) {
    console.log("Challenging", userId, this.props.auth);

    this.props.socket.emit("challenge", {
      challenger: this.props.auth,
      challenged: userId
    });
  }

  renderFighters() {
    // TODO: filter out the logged in user from the cards
    return this.props.fighters.map(fighter => {
      return (
        <div className="col s12 m8 l3" key={fighter._id}>
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">{fighter.name}</span>
              <p>W/L: {(fighter.wins / fighter.losses).toFixed(2)}</p>
            </div>
            <div className="card-action">
              <a style={{ marginRight: 0 }} onClick={()=>this.challenge(fighter._id)}>Fight</a>
            </div>
          </div>
        </div>
      );
    });
  }
  render() {
    return <div>
      {/* // TODO: Figure out how to display an incoming challenge nicely */}
      Challenge: {JSON.stringify(this.props.challenge)}
      {this.props.fighters ? this.renderFighters() : "Sorry, no fighters ready"}
    </div>;
  }
}

function mapStateToProps({ fighters, auth, challenge }) {
  return { fighters, auth, challenge };
}

export default connect(mapStateToProps, { fetchFighters, incomingChallenge })(socketConnect(FighterCards));
