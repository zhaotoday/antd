import React from 'react'
import 'kindeditor'
import 'kindeditor/themes/default/default.css'

export default class extends React.Component {
  static propTypes = {
    // 名称
    name: React.PropTypes.string,
    // 值
    value: React.PropTypes.string,
    // afterChange 事件
    afterChange: React.PropTypes.func,
    // 高度
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
        if (afterChange) {
          afterChange(name, this.html())
        }
      }
    }

    this.editor = KindEditor.create(this.refs.content, {...options})

    setTimeout(() => {
      this.editor.appendHtml(that.props.value)
    }, 100)
  }

  render() {
    return <textarea ref="content" />
  }
}