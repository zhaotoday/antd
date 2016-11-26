import React from 'react'
import {Button, Modal} from 'antd'

export default class extends React.Component {
  static propTypes = {
    // 确认事件
    onOk: React.PropTypes.func,
    // validate 事件
    onValidate: React.PropTypes.func
  }

  static defaultProps = {
    onOk() {
    },
    onValidate() {
    }
  }

  state = {
    visible: false
  }

  /**
   * 设置是否可见
   */
  set visible(visible) {
    this.setState({visible})
  }

  componentWillReceiveProps() {
    return false
  }

  render() {
    return <span>
      <Button type="primary" size="large" onClick={this._handleClickDelete}>删除</Button>
      <Modal title="请确认" width="400" visible={this.state.visible}
        onOk={this._handleOk} onCancel={this._handleCancel}>
        <p>确认删除选中记录？</p>
      </Modal>
    </span>
  }

  /**
   * 点击删除
   */
  _handleClickDelete = () => {
    this.props.onValidate().then(() => {
      this.setState({visible: true})
    })
  }

  /**
   * 确认
   */
  _handleOk = () => {
    this.props.onOk()
    this.setState({visible: false})
  }

  /**
   * 取消
   */
  _handleCancel = () => {
    this.setState({visible: false})
  }
}
