import React from 'react'
import connect from 'react-redux/lib/components/connect'
import actionCreators from '../../../redux/actions'
import * as helpers from 'utils/helpers'
import {Breadcrumb, Form, Button, Input, message, Popconfirm} from 'antd'
import consts from 'utils/consts'
import Ellipsis from 'components/ellipsis'
import List from 'components/list'
import Delete from 'components/delete'
import CategorySelect from 'components/categorySelect'

module.exports = @connect(
  state => ({
    categories: state.categories
  }),
  dispatch => ({
    getCategories: (options) => dispatch(actionCreators.getCategories(options))
  })
)
class Comp extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  // 当前页码
  current = 0

  // 当前搜索参数
  search = {
    is: false,
    keyword: ''
  }

  state = {
    pid: ''
  }

  componentDidMount() {
    this._getData()
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !nextProps.categories.isPending
  }

  render() {
    const {categories} = this.props

    // 列表属性
    let listProps = {
      keyName: 'id',
      columns: [{
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        render: (text, record) => {
          return <span className="btn-action" onClick={() => {
            helpers.go.bind(this)(`/articles/form/${record.id}`)
          }}>
            <Ellipsis value={text} width="300" />
          </span>
        }
      }, {
        title: '发布时间',
        dataIndex: 'created_at',
        key: 'created_at',
        width: 150,
        render: (text, record) => {
          return <span>
            {helpers.getTime(record.created_at)}
          </span>
        }
      }, {
        title: '操作',
        key: 'action',
        width: 100,
        render: (text, record) => <span>
          <span className="btn-action" onClick={() => {
            helpers.go.bind(this)(`/articles/form/${record.id}`)
          }}>编辑</span>
          <span className="ant-divider" />
          <Popconfirm title="确认删除该记录？" onConfirm={this._handleDelete.bind(null, record.id)} okText="确认" cancelText="取消">
            <span className="btn-action">删除</span>
          </Popconfirm>
        </span>
      }],
      dataSource: categories.data ? categories.data.data.items : [],
      pagination: {
        current: this.current,
        pageSize: consts.PAGE_SIZE,
        total: categories.data ? categories.data.data.total : 0
      },
      getData: this._getData
    }

    return <div>
      <Breadcrumb>
        <Breadcrumb.Item href="/#/">首页</Breadcrumb.Item>
        <Breadcrumb.Item>文章管理</Breadcrumb.Item>
        <Breadcrumb.Item>分类列表</Breadcrumb.Item>
      </Breadcrumb>
      <div className="actions">

        <Form className="action" inline>
          <Form.Item>
            <Button type="primary" onClick={() => {
              helpers.go.bind(this)('/articles/form')
            }}>新增</Button>
          </Form.Item>
          <Form.Item>
            <Delete onValidate={this._handleDeleteValidate} onConfirm={this._handleDelete} />
          </Form.Item>
        </Form>
        <Form className="search" inline>
          <Form.Item>
            <CategorySelect name="pid" afterChange={this._handleAfterChange} value={this.state.pid} placeholder="请选择父类" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={this._handleClickSearch}>搜索</Button>
          </Form.Item>
        </Form>
      </div>
      <List ref="list" {...listProps} />
    </div>
  }

  /**
   * 获取数据
   */
  _getData = (current = 1) => {
    this.current = current

    // 搜索参数
    const searchParams = this.search.is ? {title: this.search.keyword, pid: this.state.pid} : {pid: '0'}

    return this.props.getCategories({
      params: {
        limit: consts.PAGE_SIZE,
        offset: (current - 1) * consts.PAGE_SIZE,
        ...searchParams
      }
    })
  }

  /**
   * 检查是否符合删除条件
   */
  _handleDeleteValidate = () => {
    const {selectedRowKeys} = this.refs.list

    return new Promise((resolve, reject) => {
      if (selectedRowKeys.length) {
        resolve()
      } else {
        reject()
        message.error('没有选中记录')
      }
    })
  }

  /**
   * 删除
   * @param {string} id 待删除 ID
   */
  _handleDelete = (id) => {
    if (!id) {
      const {selectedRowKeys} = this.refs.list
      id = selectedRowKeys.join(',')
    }

    this.props.deleteArticle({
      params: {
        id: id
      }
    }).then(() => {
      message.success('删除成功')
      // FIX: 删除后，选中状态有问题的 BUG
      this.refs.list.selectedRowKeys = []
      this._getData()
    })
  }

  /**
   * 点击搜索
   */
  _handleClickSearch = () => {
    // 设置当前进入搜索状态
    this.search.is = true
    this._getData(1)
  }

  /**
   * afterChange 事件
   */
  _handleAfterChange = (name, value) => {
    this.setState({
      [name]: value
    })
  }
}
