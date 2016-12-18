import React from 'react'
import styles from './theme/styles'
import * as helpers from 'utils/helpers'

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
      <SubMenu key="/articles" title={<span><Icon type="file" /><span>文章管理</span></span>}>
        <Menu.Item key="/articles">文章列表</Menu.Item>
        <Menu.Item key="/categories">分类列表</Menu.Item>
        <Menu.Item key="/cache">更新缓存</Menu.Item>
      </SubMenu>
      <SubMenu key="/article1" title={<span><Icon type="appstore" /><span>系统设置</span></span>}>
        <Menu.Item key="/article1">网站设置</Menu.Item>
        <Menu.Item key="/article1">修改密码</Menu.Item>
      </SubMenu>
    </Menu>
  }

  /**
   * 点击导航菜单
   * @param e {object} item
   */
  _handleClick = (e) => {
    helpers.go.bind(this)(e.key)
  }

  /**
   * 切换
   * @param openKeys {array} 展开的 SubMenu 菜单项 key 数组
   */
  _handleOpenChange = (openKeys) => {
    this.setState({
      openKeys: openKeys
    })
  }
}
