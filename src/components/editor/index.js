import React from 'react'
import 'kindeditor'
import 'kindeditor/themes/default/default.css'

export default class extends React.Component {
  static propTypes = {
    // 编辑器的值
    value: React.PropTypes.string,
    // 编辑器高度
    height: React.PropTypes.string
  }

  static defaultProps = {
    value: '',
    height: '500'
  }

  componentDidMount() {
    const { value, height } = this.props
    const items = [
      'source',
      'image', 'fullscreen', 'undo', 'redo', 'justifyleft', 'justifycenter', 'justifyright',
      'justifyfull', 'indent', 'outdent', 'subscript',
      'superscript', 'link',
      'fontname', 'formatblock',
      'fontsize',
      'forecolor', 'hilitecolor', 'bold',
      'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', 'picture',
      'hr'
    ]
    const options = {
      width: '100%',
      height: height,
      items: items,
      pluginsPath: `KEPlugins/`
    }

    this.editor = KindEditor.create(this.refs.content, {...options})
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value) {
      this.editor.appendHtml(nextProps.value)
    }
  }

  // 取值
  get value() {
    this.editor.sync()
    return this.refs.content.value
  }

  // 设值
  set value(value) {
    this.editor.html(value)
  }

  render() {
    return <textarea ref="content" />
  }
}