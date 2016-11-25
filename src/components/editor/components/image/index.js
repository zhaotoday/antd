import React from 'react'
import {Modal, message} from 'antd'
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

  state = {
    uploadValue: ''
  }

  render() {
    const {uploadValue} = this.state

    return <Modal title="插入图片" visible={this.props.visible} okText="插入" cancelText="取消"
      onOk={this._handleOk} onCancel={this._handleCancel}>
      <Upload value={uploadValue} afterChange={this._handleUploadAfterChange} />
    </Modal>
  }

  /**
   * 确定插入
   */
  _handleOk = () => {
    const {uploadValue} = this.state

    if (!uploadValue) {
      message.error('请上传文件')
      return
    }
    this.props.onOk(uploadValue)
    this.setState({
      uploadValue: ''
    })
  }

  /**
   * 取消
   */
  _handleCancel = () => {
    this.props.onCancel()
    this.setState({
      uploadValue: ''
    })
  }

  /**
   * 上传 afterChange 事件
   */
  _handleUploadAfterChange = (name, value) => {
    this.setState({
      uploadValue: value
    })
  }
}
