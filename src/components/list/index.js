import React from 'react'
import {Table} from 'antd'

export default class extends React.Component {
  static propTypes = {
    // 键名，用来表示唯一索引，一般是记录的 ID
    keyName: React.PropTypes.string,
    // 数据标题
    columns: React.PropTypes.array,
    // 数据
    dataSource: React.PropTypes.array,
    // 分页属性
    pagination: React.PropTypes.object,
    // 获取数据
    getData: React.PropTypes.func
  }

  static defaultProps = {
    keyName: 'id',
    columns: [],
    dataSource: [],
    pagination: {
      total: 0,
      pageSize: 0,
      current: 0
    },
    getData: () => {
    }
  }

  state = {
    // 选中行
    selectedRowKeys: [],
    // 分页是否加载中
    loading: true
  }

  /**
   * 获取选中列
   */
  get selectedRowKeys() {
    return this.state.selectedRowKeys
  }

  componentDidMount() {
    this.setState({loading: false})
  }

  componentWillReceiveProps(nextProps) {
    this.setState({loading: false})
  }

  render() {
    let {keyName, columns, dataSource, pagination} = this.props
    const {selectedRowKeys, loading} = this.state
    const rowSelection = {
      selectedRowKeys: selectedRowKeys,
      onChange: this._handleSelectChange
    }

    dataSource = dataSource.map((item, index) => {
      item.key = item[keyName]
      return item
    })

    return <Table rowSelection={rowSelection} columns={columns} dataSource={dataSource} pagination={pagination}
      loading={loading}
      onChange={this._handleTableChange} />
  }

  /**
   * 选中列
   */
  _handleSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({
      selectedRowKeys: selectedRowKeys
    })
  }

  /**
   * 处理表格改变事件
   */
  _handleTableChange = (pagination, filters, sorter) => {
    const {current} = pagination
    const {getData} = this.props

    this.setState({loading: true})

    getData(current).then(() => {
      this.setState({loading: false})
    })
  }
}
