import React from 'react'
import Model from './models/categories'
import {TreeSelect} from 'antd'
import * as _helpers from './utils/helpers'

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

  state = {
    treeData: []
  }

  componentDidMount() {
    new Model()
      .GET()
      .then((response) => {
        this.setState({
          treeData: _helpers.toTreeData(response.data.data.items)
        })
      })
  }

  render() {
    let {treeData} = this.state

    treeData.push({
      id: '0',
      pid: '-1',
      value: '0',
      label: '顶级'
    })

    return <TreeSelect
      treeDataSimpleMode={{id: 'id', pId: 'pid', rootPId: '-1'}}
      value={this.props.value || undefined}
      style={{width: 200}}
      size="large"
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
