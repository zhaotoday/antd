import React from 'react'
import * as helpers from './utils/helpers'

import 'kindeditor'
import 'kindeditor/themes/default/default.css'
import './theme/styles'
import ImageInsert from './components/imageInsert'
import consts from './utils/consts'

export default class extends React.Component {
  constructor() {
    super()

    // 添加插入图片插件
    helpers.addImageInsertPlugin(() => {
      this.setState({iiVisible: true})
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
    iiVisible: false
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
      <ImageInsert visible={this.state.iiVisible} onOk={this._handleImageInsertOk}
        onCancel={this._handleImageInsertCancel} />
    </div>
  }

  /**
   * 确定插入图片
   */
  _handleImageInsertOk = () => {
    this.setState({iiVisible: false})
    this.editor.insertHtml('222')
  }

  /**
   * 取消插入图片
   */
  _handleImageInsertCancel = () => {
    this.setState({iiVisible: false})
  }
}