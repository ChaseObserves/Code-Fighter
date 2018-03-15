import React, { Component } from "react";
import { connect } from "react-redux";
import { socketConnect } from "socket.io-react";
import { fetchFighters, incomingChallenge, startFight } from "../actions";
import FightButton from "../images/FightButton.png";
import { Redirect } from "react-router-dom";

class FighterCards extends Component {
  state = {
    openModal1: false,
    openModal2: false,
    challengedName: ""
  };

  componentDidMount() {
    // when the component mounts, listen for changes to fighters and for incoming challenges using the socket.
    this.props.fetchFighters(this.props.socket);
    this.props.incomingChallenge(this.props.socket);
    this.props.startFight(this.props.socket);
  }

  // challenge is called when we want to challenge another user
  challenge(userId, name) {
    console.log("Challenging", userId, this.props.auth);
    console.log(name, this.props.auth.name);
    this.setState({ challengedName: name }, console.log(this.state));
    this.props.socket.emit("challenge", {
      challenger: this.props.auth,
      challenged: userId
    });
  }

  openModal1(fighter, name) {
    this.setState({ openModal1: true });
    console.log("Fighter: ", fighter);
    this.challenge(fighter, name);
    console.log("Name: ", name);
  }

  acceptChallenge(challengerId) {
    this.props.socket.emit("accept challenge", {
      challenger: challengerId
    });
  }

  renderFighters() {
    // TODO: filter out the logged in user from the cards
    return this.props.fighters.map(fighter => {
      if (fighter._id !== this.props.auth._id) {
        return (
          <div className="col s12" key={fighter._id}>
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title">{fighter.name}</span>
                <p>W/L: {(fighter.wins / fighter.losses).toFixed(2)}</p>
              </div>
              <div className="card-action">
                <a
                  className="waves-effect waves-light modal-trigger"
                  href="#modal1"
                  style={{ marginRight: 0 }}
                  onClick={(fighterID, name) =>
                    this.openModal1(fighter._id, fighter.name)}
                >
                  <img
                    src={FightButton}
                    style={{ width: "20%", height: "auto" }}
                    alt="Fight Button"
                  />
                </a>
              </div>
            </div>
          </div>
        );
      }
    });
  }

  render() {
    const hasBeenChallenged = this.props.challenge;
    return (
      <div>
        {this.props.acceptedFight ? (
          <Redirect to={"/fights/" + this.props.acceptedFight} />
        ) : null}
        {this.props.fighters.length > 1 ? (
          this.renderFighters()
        ) : (
          <h3 className="white-text">Sorry, no fighters ready</h3>
        )}
        {/* MODAL 1 */}
        <div
          id="modal1"
          className="modal"
          style={{
            zIndex: "1003",
            display: this.state.openModal1 ? "block" : "none",
            opacity: "1",
            transform: "scaleX(1)",
            top: "10%"
          }}
        >
          <div className="modal-content">
            <h4>You have challenged {this.state.challengedName}</h4>
            <p>Waiting for their response...</p>
          </div>
          <div className="modal-footer">
            <a
              href="#!"
              className="modal-action modal-close waves-effect waves-green btn-flat"
            >
              Cancel
            </a>
          </div>
        </div>
        {/* MODAL 2 */}
        <div
          id="modal2"
          className="modal"
          style={{
            zIndex: "1003",
            display: hasBeenChallenged ? "block" : "none",
            opacity: "1",
            transform: "scaleX(1)",
            top: "10%"
          }}
        >
          <div className="modal-content">
            <h4>
              You have been challenged by{" "}
              {hasBeenChallenged ? this.props.challenge.challenger.name : null}
            </h4>
            <p>Are you prepared to fight?</p>
          </div>
          <div className="modal-footer">
            <a
              href="#!"
              className="modal-action modal-close waves-effect waves-green btn-flat"
            >
              Not Today
            </a>
            <a
              href="#!"
              className="modal-action modal-close waves-effect waves-green btn-flat"
              onClick={() =>
                this.acceptChallenge(this.props.challenge.challenger._id)}
            >
              Let's Fight!
            </a>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ fighters, auth, challenge, acceptedFight }) {
  return { fighters, auth, challenge, acceptedFight };
}

export default connect(mapStateToProps, {
  fetchFighters,
  incomingChallenge,
  startFight
})(socketConnect(FighterCards));
