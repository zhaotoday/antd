import React from 'react'
import * as _helpers from './utils/helpers'
import helpers from 'utils/helpers'

import 'kindeditor'
import 'kindeditor/themes/default/default.css'
import Image from './components/image'
import consts from './utils/consts'

export default class extends React.Component {
  constructor() {
    super()

    _helpers.overrideImagePlugin(() => {
      this.setState({imageVisible: true})
    })

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
    // 插入图片组件是否可见
    imageVisible: false
  }

  componentDidMount() {
    const that = this
    const {name, afterChange, height} = this.props
    const options = {
      width: '100%',
      height: height,
      items: consts.ITEMS,
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
  }

  render() {
    return <div>
      <textarea ref="content" />
      <Image visible={this.state.imageVisible} onOk={this._handleImageOk}
        onCancel={this._handleImageCancel} />
    </div>
  }

  /**
   * 确定插入图片
   */
  _handleImageOk = (fileId) => {
    this.setState({imageVisible: false})
    helpers.getFileURL(fileId).then((url) => {
      this.editor.insertHtml(`<img src="${url}" />`)
    })

  }

  /**
   * 取消插入图片
   */
  _handleImageCancel = () => {
    this.setState({imageVisible: false})
  }
}