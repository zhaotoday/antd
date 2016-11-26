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

    // 开关，是否可改变，为 true 时才可以执行 afterChange 事件
    this.changeable = false
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
    value: undefined,
    afterChange: () => {
    },
    height: '500'
  }

  state = {
    // 插入图片组件是否可见
    imageVisible: false
  }

  componentWillReceiveProps(nextProps) {
    // FIX: 表单重置 BUG
    if (!nextProps.value) {
      this.changeable = false
      this.editor.html('')
    }
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
        const {value} = that.props

        if (that.changeable && value !== this.html()) {
          afterChange(name, this.html())
        }

        that.changeable = true
      }
    }

    setTimeout(() => {
      this.editor.html(that.props.value)
      that.changeable = true
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
