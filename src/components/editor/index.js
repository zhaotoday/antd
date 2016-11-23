import React from 'react'
import 'kindeditor'
import 'kindeditor/themes/default/default.css'

export default class extends React.Component {
  static propTypes = {
    // 组件名称
    name: React.PropTypes.string,
    // 编辑器的值
    value: React.PropTypes.string,
    // changed 事件
    afterChange: React.PropTypes.func,
    // 编辑器高度
    height: React.PropTypes.string
  }

  static defaultProps = {
    name: 'editor',
    value: '',
    afterChange: () => {
    },
    height: '500'
  }

  componentDidMount() {
    const that = this
    const { name, afterChange, height } = this.props
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
      pluginsPath: 'KEPlugins/',
      afterChange: function () {
        if (that.props.value !== this.html() && afterChange) {
          afterChange(name, this.html())
        }
      }
    }

    this.editor = KindEditor.create(this.refs.content, {...options})

    setTimeout(() => {
      this.editor.appendHtml(that.props.value)
    }, 100)
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