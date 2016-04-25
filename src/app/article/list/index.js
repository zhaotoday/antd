import React from 'react'
import { Breadcrumb, Table, Icon } from 'antd'

module.exports = class extends React.Component {
  render() {
    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      render(text) {
        return <a href="#">{text}</a>
      }
    }, {
      title: '年龄',
      dataIndex: 'age',
      key: 'age'
    }, {
      title: '住址',
      dataIndex: 'address',
      key: 'address'
    }, {
      title: '操作',
      key: 'operation',
      render(text, record) {
        return <span>
          <a href="#">操作一{record.name}</a>
          <span className="ant-divider"></span>
          <a href="#">操作二</a>
          <span className="ant-divider"></span>
          <a href="#" className="ant-dropdown-link">
            更多 <Icon type="down" />
          </a>
        </span>
      }
    }]

    const data = [{
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号'
    }, {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    }, {
      key: '3',
      name: '李大嘴',
      age: 32,
      address: '西湖区湖底公园1号'
    }]

    return <div>
      <Breadcrumb separator=">">
        <Breadcrumb.Item href="/#/">首页</Breadcrumb.Item>
        <Breadcrumb.Item href="/#/article/add">文章管理</Breadcrumb.Item>
        <Breadcrumb.Item href="/#/article">文章列表</Breadcrumb.Item>
        <Breadcrumb.Item>某应用</Breadcrumb.Item>
      </Breadcrumb>
      <Table columns={columns} dataSource={data} />
    </div>
  }
}
