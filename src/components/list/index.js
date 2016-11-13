import React from 'react'
import { Table } from 'antd'

export default class extends React.Component {
  static propTypes = {
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
    selectedRows: [],
    // 分页是否加载中
    loading: true
  }

  /**
   * 获取选中列
   */
  get selectRows() {
    return this.state.selectedRows
  }

  componentDidMount() {
    this._setLoading(false)
  }

  componentWillReceiveProps(nextProps) {
    this._setLoading(false)
  }

  render() {
    let { columns, dataSource, pagination } = this.props
    const rowSelection = {
      onChange: this._handleSelectChange
    }

    dataSource = dataSource.map((item, index) => {
      item.key = index
      return item
    })

    return <Table rowSelection={rowSelection} columns={columns} dataSource={dataSource} pagination={pagination}
      loading={this.state.loading}
      onChange={this._handleTableChange} />
  }

  /**
   * 选中列
   */
  _handleSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({
      selectedRows: selectedRows
    })
  }

  /**
   * 处理表格改变事件
   */
  _handleTableChange = (pagination, filters, sorter) => {
    const { current } = pagination
    const { getData } = this.props

    this._setLoading(true)

    getData(current).then(() => {
      this._setLoading(false)
    })
  }

  /**
   * 设置是否加载中
   */
  _setLoading(loading) {
    this.setState({
      loading: loading
    })
  }
}
