import React from 'react'
import {TreeSelect} from 'antd'

export default class extends React.Component {
  static propTypes = {
    // 选择器的值
    value: React.PropTypes.string
  }

  static defaultProps = {
    value: ''
  }

  state = {
    //  当前选择器的值
    value: undefined
  }

  /**
   * 获取选择器的值
   * @returns {string}
   */
  get value() {
    return this.state.value
  }

  /**
   * 设置选择器的值
   * @param {string} value 值
   */
  set value(value) {
    this.setState({value})
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value) {
      this.setState({
        value: nextProps.value
      })
    }
  }

  render() {
    const treeData = [{
      label: 'Node1',
      value: '0-0',
      key: '0-0',
      children: [{
        label: 'Child Node1',
        value: '0-0-1',
        key: '0-0-1',
      }, {
        label: 'Child Node2',
        value: '0-0-2',
        key: '0-0-2',
      }],
    }, {
      label: 'Node2',
      value: '0-1',
      key: '0-1',
    }]

    return <TreeSelect
      value={this.state.value}
      style={{width: 300}}
      dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
      treeData={treeData}
      placeholder="请选择栏目"
      treeDefaultExpandAll
      onChange={this._handleChange}
    />
  }

  /**
   * 选择器 change 事件
   */
  _handleChange = (value) => {
    this.setState({value})
  }
}