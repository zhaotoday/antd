import React from 'react'
import {Table} from 'antd'

export default class extends React.Component {
  static propTypes = {
    value: React.PropTypes.string,
    columns: React.PropTypes.array,
    total: React.PropTypes.number,
    pageSize: React.PropTypes.number,
    current: React.PropTypes.number,
    data: React.PropTypes.array,
    getData: React.PropTypes.func
  }

  static defaultProps = {
    value: '',
    columns: [],
    total: 0,
    pageSize: 0,
    current: 0,
    data: [],
    getData: () => {
    }
  }

  state = {
    selectedRows: [],
    data: [],
    pagination: {
      current: this.props.current,
      pageSize: this.props.pageSize,
      total: this.props.total
    },
    loading: false
  }

  /**
   * 获取选中列
   */
  get selectRows() {
    return this.state.selectedRows
  }

  /*
   shouldComponentUpdate(nextProps, nextState) {
   return nextProps.total != 0
   }
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.total) {
      this.setState({
        pagination: {
          ...this.state.pagination,
          total: nextProps.total,
          pageSize: nextProps.pageSize
        }
      })
    }
  }

  render() {
    console.log(this.props)
    const { columns, data } = this.props
    const { pagination } =  this.state
    const rowSelection = {
      onChange: this._handleSelectChange
    }
//alert(JSON.stringify(pagination))
    return <Table rowSelection={rowSelection} columns={columns} dataSource={data} pagination={pagination}
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
