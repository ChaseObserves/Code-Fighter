import React, { Component } from "react";
import { render } from "react-dom";
import brace from "brace";
import AceEditor from "react-ace";
import { connect } from "react-redux";
import { endFight } from "../actions";
import { Link, Redirect } from "react-router-dom";
// import TestModal from "./TestModal";

import "brace/mode/javascript";
import "brace/theme/monokai";

class ReactAce extends Component {
  state = {
    openTestModal: false,
    testPass: false,
    editorText: `function solve(a,b) {
      
      }
      
      return solve
      
      
      describe("Basic tests", function(){
      Test.assertDeepEquals(solve(['abc', 'abc','xyz','abcd','cde'], ['abc', 'cde', 'uap']), [2, 1, 0]);
      Test.assertDeepEquals(solve(['abc', 'xyz','abc', 'xyz','cde'], ['abc', 'cde', 'xyz']), [2, 1, 2]);
      Test.assertDeepEquals(solve(['quick', 'brown', 'fox', 'is', 'quick'], ['quick', 'abc', 'fox']), [2, 0, 1]);
      });`
  };

  onChange = newValue => {
    this.setState({ editorText: newValue, testPass: false });
    console.log("change", newValue);
  };

  // NEED TO FIGURE OUT HOW TO MAKE THE SUBMIT BUTTON ROUTE BASED ON STATUS OF JSON OBJECT SENT BY SERVER

  submit = fightId => {
    this.props.endFight(fightId);
    console.log("completedFight: ", this.props.completedFight);
  };

  renderSubmitButton = () => {
    if (this.state.testPass === false) {
      return null;
    } else {
      return (
        <button
          type="submit"
          className="red btn right white-text"
          style={{ marginLeft: 20 }}
          onClick={() => this.submit(this.props.fightId)}
        >
          Submit
        </button>
      );
    }
  };

  renderWonLost = (won, fightId) => {
    if (won) {
      return <Redirect to={"/won"} />;
    } else {
      return <Redirect to={"/lost"} />;
    }
  };
  handleOpen = () => {
    if (
      this.state.editorText.includes(`var dict = {}
    for (i = 0; i < a.length; i++) {
    var word = a[i]
      if (word in dict) {
        dict[word] = dict[word] + 1
      } else {
        dict[word] = 1
      }
    }
    var result = [];
    for (j = 0; j < b.length; j++) {
      var key = b[j]
      if (key in dict) {
        result.push(dict[key])
      } else {
        result.push(0)
      }
    }
    return result
  }`)
    ) {
      this.setState({ testPass: true });
    } else {
      this.setState({ testPass: false });
    }

    this.setState({ openTestModal: true });
  };

  handleClose = () => {
    this.setState({ openTestModal: false });
  };

  testModalContent = () => {
    if (!this.state.openTestModal) {
      return null;
    }

    if (this.state.testPass) {
      return <h4 style={{ textAlign: "center" }}>Test Passed!</h4>;
    } else {
      return <h4 style={{ textAlign: "center" }}>Test Failed</h4>;
    }
  };

  render() {
    console.log("Inside render", this.props.completedFight);
    return (
      <div>
        <div>
          {this.props.completedFight
            ? this.renderWonLost(this.props.completedFight.won)
            : null}
        </div>
        <div>
          <AceEditor
            mode="javascript"
            theme="monokai"
            name="blah2"
            onLoad={this.onLoad}
            onChange={this.onChange}
            fontSize={14}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            value={this.state.editorText}
            setOptions={{
              enableBasicAutocompletion: false,
              enableLiveAutocompletion: false,
              enableSnippets: false,
              showLineNumbers: true,
              tabSize: 2
            }}
          />
        </div>
        <div>
          <ul>
            <li>
              <Link
                to="/lost"
                type="submit"
                className="red btn left white-text"
              >
                Give Up
              </Link>
            </li>
            <li>{this.renderSubmitButton()}</li>
            <li>
              <button
                type="submit"
                className="teal btn right white-text"
                onClick={() => this.handleOpen("openTestModal")}
              >
                Test
              </button>
            </li>
          </ul>
        </div>
        {/* MODAL */}
        <div
          id="testPassModal"
          className="modal"
          style={{
            zIndex: "1003",
            display: this.state.openTestModal ? "block" : "none",
            opacity: "1",
            transform: "scaleX(1)",
            top: "10%"
          }}
        >
          <div className="modal-content">{this.testModalContent()}</div>
          <div className="modal-footer">
            <a
              href="#!"
              className="modal-action modal-close waves-effect waves-green btn-flat"
              onClick={() => this.handleClose("openTestModal")}
            >
              Cancel
            </a>
          </div>
        </div>
      </div>
    );
  }
}

// export default ReactAce;

function mapStateToProps({ completedFight }) {
  console.log("mapStateToProps", completedFight);
  return { completedFight };
}

export default connect(mapStateToProps, { endFight })(ReactAce);
