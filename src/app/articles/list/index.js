import React from 'react'
import connect from 'react-redux/lib/components/connect'
import actionCreators from '../../../redux/actions'
import helpers from 'utils/helpers'
import {Breadcrumb, Form, Button, Input} from 'antd'
import consts from 'utils/consts'
import List from 'components/list'
import Delete from 'components/delete'

module.exports = @connect(
  state => ({
    articles: state.articles
  }),
  dispatch => ({
    getArticles: (options) => dispatch(actionCreators.getArticles(options))
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

  componentDidMount() {
    this._getData()
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !nextProps.articles.isPending
  }

  render() {
    const {articles} = this.props

    // 列表属性
    let listProps = {
      columns: [{
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        render: text => <a href="#">{text}</a>
      }, {
        title: '栏目',
        dataIndex: 'category_id',
        key: 'category_id'
      }, {
        title: '操作',
        key: 'action',
        render: (text, record) => <span>
          <a href="#">修改</a>
          <span className="ant-divider" />
          <a href="#">删除</a>
        </span>
      }],
      dataSource: articles.data ? articles.data.data.items : [],
      pagination: {
        current: this.current,
        pageSize: consts.PAGE_SIZE,
        total: articles.data ? articles.data.data.total : 0
      },
      getData: this._getData
    }

    return <div>
      <Breadcrumb>
        <Breadcrumb.Item href="/#/">首页</Breadcrumb.Item>
        <Breadcrumb.Item>文章管理</Breadcrumb.Item>
        <Breadcrumb.Item>文章列表</Breadcrumb.Item>
      </Breadcrumb>
      <div className="actions">
        <Form className="action" inline>
          <Form.Item>
            <Button type="primary" onClick={() => {
              helpers.go.bind(this)('/articles/form')
            }}>新增</Button>
          </Form.Item>
          <Form.Item>
            <Delete onOk={this._handleDelete} />
          </Form.Item>
        </Form>
        <Form className="search" inline>
          <Form.Item>
            <Input placeholder="请输入标题" onChange={this._handleChangeSearch} />
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
    const searchParams = this.search.is ? {title: this.search.keyword} : null

    return this.props.getArticles({
      params: {
        limit: consts.PAGE_SIZE,
        offset: (current - 1) * consts.PAGE_SIZE,
        ...searchParams
      }
    })
  }

  /**
   * 删除
   */
  _handleDelete = () => {
    const {selectedRows} = this.refs.list
    alert(JSON.stringify(selectedRows))
  }

  /**
   * 搜索词 change 事件
   */
  _handleChangeSearch = (e) => {
    const value = e.target.value.trim()
    if (value) this.search.keyword = value
  }

  /**
   * 点击搜索
   */
  _handleClickSearch = () => {
    // 设置当前进入搜索状态
    this.search.is = true
    this._getData(1)
  }
}
