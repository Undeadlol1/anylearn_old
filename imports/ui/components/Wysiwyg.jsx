import React, { PropTypes } from 'react'
/*import {Editor, EditorState} from 'draft-js'

export default class Wysiwyg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
  }
  render() {
    const {editorState} = this.state;
    return <Editor editorState={editorState} onChange={this.onChange} />;
  }
}*/
import Editor from 'draft-js-editor'

export default class Wysiwyg extends React.Component {
  render() {
    return (<div>
      A sample text editor
      <Editor />
      </div>)
  }
}

//import 'tinymce/tinymce.js'
//global.tinymce = mce
//import TinyMCE from 'react-tinymce'
// import React from 'react'

/*export default class Wysiwyg extends Component {
  handleEditorChange(e) {
    console.log('Content was updated:', e.target.getContent());
  }
  render() {

        //selector:'textarea', //???????
      //  menubar: false,
        //language_url : '/tinymce.languages/ru.js',
        //skin_url: '/tinymce.skins/light',
      //  elementpath: false,
    return (
      <div>
        <b>{this.props.label || ''}</b>
        <TinyMCE
          content={this.props.text}
          config={{
              plugins: 'autoresize code image autolink advlist autosave codesample link preview print contextmenu paste',
              autoresize_bottom_margin: 10,
              paste_as_text: true,
              resize: false
          }}
          onChange={this.handleEditorChange}
        />
      </div>
    )
  }
}*/
Wysiwyg.defaultProps = {
  label: '',
  text: ''
}
Wysiwyg.propTypes = {
  label: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}
