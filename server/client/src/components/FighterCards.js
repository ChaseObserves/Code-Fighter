import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchFighters } from "../actions";

class FighterCards extends Component {
  componentDidMount() {
    this.props.fetchFighters();
  }

  renderFighters() {
    return this.props.fighters.map(fighter => {
      return (
        <div className="col s12 m8 l3" key={fighter.name}>
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">{fighter.name}</span>
              <p>W/L: {(fighter.wins / fighter.losses).toFixed(2)}</p>
            </div>
            <div className="card-action">
              <a style={{ marginRight: 0 }}>Fight</a>
            </div>
          </div>
        </div>
      );
    });
  }
  render() {
    return <div>{this.renderFighters()}</div>;
  }
}

function mapStateToProps({ fighters }) {
  return { fighters };
}

export default connect(mapStateToProps, { fetchFighters })(FighterCards);
