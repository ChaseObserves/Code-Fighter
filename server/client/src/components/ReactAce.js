import React, { Component } from "react";
import { render } from "react-dom";
import brace from "brace";
import AceEditor from "react-ace";
import { connect } from "react-redux";
import { endFight } from "../actions";

import "brace/mode/javascript";
import "brace/theme/monokai";

class ReactAce extends Component {
  onChange(newValue) {
    console.log("change", newValue);
  }

  submit = fightId => {
    this.props.endFight(fightId);
  };

  render() {
    return (
      <div>
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
            value={`function solve(a,b) {

}

return solve


describe("Basic tests", function(){
Test.assertDeepEquals(solve(['abc', 'abc','xyz','abcd','cde'], ['abc', 'cde', 'uap']), [2, 1, 0]);
Test.assertDeepEquals(solve(['abc', 'xyz','abc', 'xyz','cde'], ['abc', 'cde', 'xyz']), [2, 1, 2]);
Test.assertDeepEquals(solve(['quick', 'brown', 'fox', 'is', 'quick'], ['quick', 'abc', 'fox']), [2, 0, 1]);
});`}
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
              <button type="submit" className="red btn left white-text">
                Give Up
              </button>
            </li>
            <li>
              <button
                type="submit"
                className="grey btn right white-text"
                style={{ marginLeft: 20 }}
                onClick={() => this.submit(this.props.fightId)}
              >
                Submit
              </button>
            </li>
            <li>
              <button type="submit" className="teal btn right white-text">
                Test
              </button>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

// export default ReactAce;

function mapStateToProps({ completedFight }) {
  return { completedFight };
}

export default connect(mapStateToProps, { endFight })(ReactAce);
