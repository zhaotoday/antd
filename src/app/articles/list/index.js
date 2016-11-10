import React from 'react'
import connect from 'react-redux/lib/components/connect'
import actionCreators from '../../../redux/actions'
import { Breadcrumb } from 'antd'
import consts from 'utils/consts'
import List from 'components/list'

module.exports = @connect(
  state => ({
    articles: state.articles
  }),
  dispatch => ({
    getArticles: (options) => dispatch(actionCreators.getArticles(options))
  })
)
class Comp extends React.Component {
  current = 0

  componentDidMount() {
    this._getData()
  }

  shouldComponentUpdate(nextProps, nextState) {
    return Object.keys(nextProps.articles) != 0
  }

  render() {
    const { articles } = this.props

    if (!Object.keys(articles).length) return null

    // 列表属性
    let listProps = {
      columns: [{
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        render: text => <a href="#">{text}</a>,
      }, {
        title: '栏目',
        dataIndex: 'category_id',
        key: 'category_id',
      }, {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
          <a href="#">Action 一 {record.name}</a>
          <span className="ant-divider" />
          <a href="#">Delete</a>
        </span>
        ),
      }],
      data: articles.data ? articles.data.data.items : [],
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
        <Breadcrumb.Item href="/#/articles/form">文章管理</Breadcrumb.Item>
        <Breadcrumb.Item href="/#/article">文章列表</Breadcrumb.Item>
        <Breadcrumb.Item>某应用</Breadcrumb.Item>
      </Breadcrumb>
      <List ref="list" {...listProps} />
    </div>
  }

  /**
   * 设置分页加载中
   */
  _setPageLoading(loading) {
    if (this.refs.list) this.refs.list.isLoading = loading
  }

  /**
   * 获取数据
   */
  _getData = (current = 0) => {
    this.current = current

    this._setPageLoading(true)

    this.props.getArticles({
      params: {
        limit: consts.PAGE_SIZE,
        offset: current
      }
    }).then(() => {
      this._setPageLoading(false)
    }).catch(() => {
      this._setPageLoading(false)
    })
  }
}