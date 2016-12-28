import React from 'react'
import Model from './models/categories'
import {TreeSelect} from 'antd'
import _helpers from './utils/helpers'

export default class extends React.Component {
  static propTypes = {
    // 名称
    name: React.PropTypes.string,
    // 值
    value: React.PropTypes.string,
    // 模型
    model: React.PropTypes.string,
    // 是否显示顶级
    showTop: React.PropTypes.bool,
    // placeholder
    placeholder: React.PropTypes.string,
    // afterChange 事件
    afterChange: React.PropTypes.func
  }

  static defaultProps = {
    name: 'categorySelect',
    value: '',
    model: '',
    showTop: false,
    placeholder: '请选择分类',
    afterChange: () => {
    }
  }

  state = {
    treeData: []
  }

  /**
   * 重新加载
   */
  reload() {
    this._getData()
  }

  componentDidMount() {
    this._getData()
  }

  render() {
    let {treeData} = this.state
    const {value, showTop, placeholder} = this.props

    showTop && treeData.push({
      id: '0',
      pid: '-1',
      value: '0',
      label: '顶级'
    })

    return <TreeSelect
      treeDataSimpleMode={{id: 'id', pId: 'pid', rootPId: showTop ? '-1' : '0'}}
      value={_helpers.exist(value, treeData) ? value : showTop ? '0' : undefined}
      style={{width: 200}}
      size="large"
      allowClear
      dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
      treeData={treeData}
      placeholder={placeholder}
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

  /**
   * 获取数据
   */
  _getData = () => {
    const {model} = this.props

    new Model()
      .GET({
        params: {
          model,
          'order_by': 'sort,id desc'
        }
      })
      .then((response) => {
        this.setState({
          treeData: _helpers.toTreeData(response.data.items)
        })
      })
  }
}
