import React from 'react'
import {Modal} from 'antd'
import Upload from 'components/upload'

export default class extends React.Component {
  static propTypes = {
    // 是否可见
    visible: React.PropTypes.bool,
    // 值
    value: React.PropTypes.string,
    // onOk 事件
    onOk: React.PropTypes.func,
    // onCancel 事件
    onCancel: React.PropTypes.func
  }

  static defaultProps = {
    visible: false,
    value: '',
    onOk: () => {
    },
    onCancel: () => {
    }
  }

  render() {
    return <Modal title="插入图片" visible={this.props.visible} okText="插入" cancelText="取消"
      onOk={this._handleOk} onCancel={this._handleCancel}>
      <Upload />
    </Modal>
  }

  /**
   * 确定插入
   */
  _handleOk = () => {
    this.props.onOk()
  }

  /**
   * 取消
   */
  _handleCancel = () => {
    this.props.onCancel()
  }
}