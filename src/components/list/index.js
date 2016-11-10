import React from 'react'
import { Table } from 'antd'

export default class extends React.Component {
  static propTypes = {
    columns: React.PropTypes.array,
    data: React.PropTypes.array,
    pagination: React.PropTypes.object,
    getData: React.PropTypes.func
  }

  static defaultProps = {
    columns: [],
    data: [],
    pagination: {
      total: 0,
      pageSize: 0,
      current: 0
    },
    getData: () => {
    }
  }

  state = {
    selectedRows: [],
    loading: true
  }

  /**
   * 获取选中列
   */
  get selectRows() {
    return this.state.selectedRows
  }

  /**
   * 设置是否加载中
   */
  set isLoading(loading) {
    this.setState({
      loading: loading
    })
  }

  render() {
    const { columns, data, pagination } = this.props
    const rowSelection = {
      onChange: this._handleSelectChange
    }

    return <Table rowSelection={rowSelection} columns={columns} dataSource={data} pagination={pagination}
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

    getData(current)
  }
}
