import React, { Component } from "react";
import ReactAce from "./ReactAce";

class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <div className="row">
          <div className="col m8">
            <h5>Situation</h5>
            <p>
              Given two arrays of strings, return the number of times each
              string of the second array appears in the first array.
            </p>
            <ReactAce fightId={this.props.match.params.fightId} />
          </div>
          <div className="col m4">
            <h5>Example</h5>
            <p>
              array1 = ['abc', 'abc', 'xyz', 'cde', 'uvw']<br />
              array2 = ['abc', 'cde', 'uap']<br />
              How many times do the elements in array2 appear in array1?<br />
              <br />
              'abc' appears twice in the first array (2)<br />
              'cde' appears only once (1)<br />
              'uap' does not appear in the first array (0)<br />
              Therefore, solve(array1, array2) = [2, 1, 0]<br />
              <br />
              FIGHT!
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Lobby;
