import React from 'react';
import Terser from 'terser';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/monokai';

export default class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: '',
    }
    this.text = '';
  }

  componentDidMount() {
  }

  jsToBookmarklets = () => {
    const { text } = this;
    const minified = Terser.minify(text);
    if (minified.error) {
      alert(minified.error.message);
      return;
    }
    const result = `javascript: (function(){${minified.code}})()`;
    this.setState({
      result: result
    })
  }

  testRun = () => {
    window.location.href = this.state.result || '#';
  }

  onChangeText = (value) => {
    this.text = value;
  }

  render() {
    return (
      <div>
        <h1>Hello</h1>
        <p>Input js here</p>
        <AceEditor
          mode="javascript"
          theme="monokai"
          name="ace-editor"
          onChange={this.onChangeText}
          value={this.text}
          fontSize={14}
          showPrintMargin={true}
          showGutter={true}
          wrapEnabled={true}
          highlightActiveLine={true}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            showLineNumbers: true,
            tabSize: 2,
          }}
          style={{ display: 'inline-block' }}
        />
        <AceEditor
          mode="javascript"
          theme="monokai"
          name="result-editor"
          readOnly={true}
          value={this.state.result}
          fontSize={14}
          showPrintMargin={true}
          showGutter={true}
          wrapEnabled={true}
          highlightActiveLine={true}
          setOptions={{
            showLineNumbers: true,
            tabSize: 2,
          }}
          style={{ display: 'inline-block' }}
        />
        <button onClick={this.jsToBookmarklets}>
          Make bookmarklets
        </button>
        <a href={this.state.result || '#'}>Test run!</a>
      </div>
    );
  }
}