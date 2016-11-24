import React from 'react'
import {TreeSelect} from 'antd'

export default class extends React.Component {
  static propTypes = {
    // 名称
    name: React.PropTypes.string,
    // 值
    value: React.PropTypes.string,
    // afterChange 事件
    afterChange: React.PropTypes.func
  }

  static defaultProps = {
    name: 'categorySelect',
    value: '',
    afterChange: () => {
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
      value={this.props.value || undefined}
      style={{width: 300}}
      dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
      treeData={treeData}
      placeholder="请选择栏目"
      treeDefaultExpandAll
      onChange={this._handleChange}
    />
  }

  /**
   * change 事件
   */
  _handleChange = (value) => {
    const {name, afterChange} = this.props
    afterChange(name, value)
  }
}