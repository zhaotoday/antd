import React from 'react'
import styles from './theme/styles'

import { Menu, Icon } from 'antd'

const SubMenu = Menu.SubMenu

export default class extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  state = {
    current: '',
    openKeys: []
  }

  set openKey(pathname) {
    this.setState({
      current: pathname,
      openKeys: ['/' + pathname.split('/')[1]]
    })
  }

  render() {
    return <Menu className={styles.sidebar}
      onClick={this._handleClick}
      onOpenChange={this._handleOpenChange}
      style={{ width: 240 }}
      defaultOpenKeys={[this.state.current]}
      selectedKeys={[this.state.current]}
      openKeys={this.state.openKeys}
      mode="inline">
      <SubMenu key="/articles" title={<span><Icon type="appstore" /><span>文章管理</span></span>}>
        <Menu.Item key="/articles">文章列表</Menu.Item>
        <Menu.Item key="/articles/form">栏目列表</Menu.Item>
      </SubMenu>
      <SubMenu key="/article1" title={<span><Icon type="appstore" /><span>导航二</span></span>}>
        <Menu.Item key="/article1">选项5</Menu.Item>
        <Menu.Item key="/article/add1">选项6</Menu.Item>
      </SubMenu>
      <SubMenu key="/article2" title={<span><Icon type="appstore" /><span>导航二</span></span>}>
        <Menu.Item key="/article2">选项5</Menu.Item>
        <Menu.Item key="/article/add2">选项6</Menu.Item>
      </SubMenu>
    </Menu>
  }

  // 点击导航菜单
  _handleClick = (e) => {
    this.context.router.push(e.key)
  }

  // 切换
  _handleOpenChange = (openKeys) => {
    this.setState({
      openKeys: openKeys
    })
  }
}
