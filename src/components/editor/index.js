import React from 'react'
import 'kindeditor'
import 'kindeditor/themes/default/default.css'

export default class extends React.Component {
  static propTypes = {
    // 默认值
    defaultValue: React.PropTypes.string,
    // 编辑器高度
    height: React.PropTypes.string
  }

  static defaultProps = {
    defaultValue: '',
    height: '500'
  }

  componentDidMount() {
    const { defaultValue, height } = this.props
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

    // BUGFIX: 动态插入内容，为了解决刚开始时，鼠标滚动，滚动条不滚动的 bug
    setTimeout(function () {
      this.editor.appendHtml(defaultValue)
    }.bind(this), 100)
  }

  componentWillReceiveProps(nextProps) {
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
    return <textarea ref="content" defaultValue=""></textarea>
  }
}