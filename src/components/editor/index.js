import React from 'react'
import { Modal } from 'antd'
import Upload from 'components/upload'

import 'kindeditor'
import 'kindeditor/themes/default/default.css'
import './theme/styles'

export default class extends React.Component {
  constructor() {
    super()
    // 是否已初始化
    this.initialized = false
  }

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

  state = {
    // 图片上传框是否可视
    imgUploadVisible: false
  }

  componentDidMount() {
    const that = this
    const {name, afterChange, height} = this.props
    const items = [
      'source',
      'fullscreen', 'undo', 'redo', 'justifyleft', 'justifycenter', 'justifyright',
      'justifyfull', 'indent', 'outdent', 'subscript',
      'superscript', 'link',
      'fontname', 'formatblock',
      'fontsize',
      'forecolor', 'hilitecolor', 'bold',
      'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', 'picture',
      'hr',
      'imgUpload'
    ]
    const options = {
      width: '100%',
      height: height,
      items: items,
      pluginsPath: 'KEPlugins/',
      afterChange: function () {
        if (that.initialized && that.props.value !== this.html()) {
          afterChange(name, this.html())
        }
      }
    }

    setTimeout(() => {
      this.editor.appendHtml(that.props.value)
      that.initialized = true
    }, 100)

    this.editor = KindEditor.create(this.refs.content, {...options})

    // 自定义插入图片插件
    KindEditor.lang({
      'imgUpload': '插入图片'
    })

    KindEditor.plugin('imgUpload', function (K) {
      this.clickToolbar('imgUpload', function () {
        that.setState({
          imgUploadVisible: true
        })
        //that.insertHtml('<strong>测试内容</strong>')
      })
    })
  }

  render() {
    return <div>
      <textarea ref="content" />
      <Modal title="插入图片" visible={this.state.imgUploadVisible} okText="插入" cancelText="取消"
        onOk={this._handleOk} onCancel={this._handleCancel}>
        <Upload />
      </Modal>
    </div>
  }

  /**
   * 确定插入
   */
  _handleOk = () => {
    this.setState({
      imgUploadVisible: false
    })

    this.editor.insertHtml(333)
  }

  /**
   * 取消
   */
  _handleCancel = () => {
    this.setState({
      imgUploadVisible: false
    })
  }
}