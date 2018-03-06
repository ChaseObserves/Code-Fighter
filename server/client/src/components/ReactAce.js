import React, { Component } from "react";
import { render } from "react-dom";
import brace from "brace";
import AceEditor from "react-ace";

import "brace/mode/javascript";
import "brace/theme/monokai";

class ReactAce extends Component {
  onChange(newValue) {
    console.log("change", newValue);
  }

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
            value={`function testFunction(argument) {

}

return testFunction`}
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

export default ReactAce;
