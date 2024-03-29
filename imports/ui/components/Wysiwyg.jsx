import React, { Component, PropTypes } from 'react'
import { $ } from 'meteor/jquery'
import TinyMCE from 'react-tinymce'
/*tinymce.init({
  selector: 'textarea',
  skin_url: '/packages/teamon_tinymce/skins/lightgray',
});*/

/*{
  plugins: 'autoresize code image autolink advlist autosave codesample link preview print contextmenu paste',
  autoresize_bottom_margin: 10,
  paste_as_text: true,
  resize: false
}*/
export default class Wysiwyg extends Component {
  handleEditorChange(e) {
    //console.log('Content was updated:', e.target.getContent());
    this.props.onChange(e.target.getContent())
  }
  render() {
    return (
      <div {...this.props}>
        {this.props.label ? <b>{this.props.label}</b> : ''}
        <TinyMCE
          content={this.props.text}
          config={{
                language_url : '/tinymce.languages/ru.js',
                skin_url: '/tinymce.skins/light',
                content_css : '/tinymce.css',
                plugins: 'autoresize code image autolink advlist autosave codesample link preview print contextmenu paste',
                autoresize_bottom_margin: 10,
                paste_as_text: true,
                elementpath: true,
                resize: false,
                //inline: true
            }}
          onChange={this.handleEditorChange.bind(this)}
        />
      </div>
    )
  }
}
Wysiwyg.defaultProps = {
  label: '',
  text: ''
}
Wysiwyg.propTypes = {
  label: PropTypes.string,
  text: PropTypes.string.isRequired
}
