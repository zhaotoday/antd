import React from 'react'
import {Button, Popconfirm} from 'antd'

export default class extends React.Component {
  static propTypes = {
    // 确认事件
    onConfirm: React.PropTypes.func,
    // validate 事件
    onValidate: React.PropTypes.func
  }

  static defaultProps = {
    onConfirm() {
    },
    onValidate() {
    }
  }

  state = {
    visible: false,
    condition: true
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
    return <Popconfirm title="确认删除选中记录？" visible={this.state.visible}
      onConfirm={this._handleConfirm} onCancel={this._handleCancel} onVisibleChange={this._handleVisibleChange}>
      <Button type="primary" size="large" onClick={this._handleClickDelete}>删除</Button>
    </Popconfirm>
  }

  /**
   * 点击删除
   */
  _handleClickDelete = () => {
    this.props.onValidate().then(() => {
      this.setState({condition: true})
    }).catch(() => {
      this.setState({condition: false})
    })
  }

  /**
   * 确认
   */
  _handleConfirm = () => {
    this.props.onConfirm()
    this.setState({visible: false})
  }

  /**
   * 取消
   */
  _handleCancel = () => {
    this.setState({visible: false})
  }

  _handleVisibleChange = (visible) => {
    setTimeout(() => {
      if (this.state.condition) {
        this.setState({visible})
      } else {
        this.setState({visible: false})
      }
    }, 0)
  }
}
