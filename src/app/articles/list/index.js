import React from 'react'
import connect from 'react-redux/lib/components/connect'
import actionCreators from '../../../redux/actions'
import helpers from 'utils/helpers'
import {Breadcrumb, Form, Button, Input} from 'antd'
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
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  current = 0

  componentDidMount() {
    this._getData()
  }

  shouldComponentUpdate(nextProps, nextState) {
    return Object.keys(nextProps.articles) !== 0
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
            <Button type="primary">删除</Button>
          </Form.Item>
        </Form>
        <Form className="search" inline>
          <Form.Item>
            <Input placeholder="请输入标题" />
          </Form.Item>
          <Form.Item>
            <Button type="primary">搜索</Button>
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

    return this.props.getArticles({
      params: {
        limit: consts.PAGE_SIZE,
        offset: (current - 1) * consts.PAGE_SIZE
      }
    })
  }
}
