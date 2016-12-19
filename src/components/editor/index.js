import React from 'react'
import * as _helpers from './utils/helpers'
import app from 'utils/helpers/app'

import 'kindeditor'
import 'kindeditor/themes/default/default.css'
import Image from './components/image'
import consts from './utils/consts'

export default class extends React.Component {
  constructor() {
    super()

    // 为 true 时才可以执行 afterChange 事件
    this.changeable = false
    // 初始状态
    this.initial = true

    _helpers.overrideImagePlugin(() => {
      this.setState({imageVisible: true})
    })
  }

  static propTypes = {
    // 名称
    name: React.PropTypes.string,
    // 值
    value: React.PropTypes.string,
    // afterChange 事件
    afterChange: React.PropTypes.func,
    // 高度
    height: React.PropTypes.string,
    // 是否编辑状态
    editState: React.PropTypes.bool
  }

  static defaultProps = {
    name: 'editor',
    value: undefined,
    afterChange: () => {
    },
    height: '500',
    editState: false
  }

  state = {
    // 插入图片组件是否可见
    imageVisible: false
  }

  componentWillReceiveProps(nextProps) {
    const {value, editState} = nextProps

    this.changeable = false

    // 初始状态 && 编辑状态 && value 有值
    if (this.initial && editState && value) {
      this.editor.html(nextProps.value)
    }

    // 进入非初始状态
    this.initial = false
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

    this.editor = KindEditor.create(this.refs.content, {...options})
  }

  render() {
    return <div>
      <textarea ref="content" />
      <Image visible={this.state.imageVisible} onOk={this._handleImageOk} onCancel={this._handleImageCancel} />
    </div>
  }

  /**
   * 确定插入图片
   */
  _handleImageOk = (fileId) => {
    this.setState({imageVisible: false})

    app.getFile(fileId).then((file) => {
      this.editor.insertHtml(`<img src="${file.url}" />`)
    })
  }

  /**
   * 取消插入图片
   */
  _handleImageCancel = () => {
    this.setState({imageVisible: false})
  }
}
