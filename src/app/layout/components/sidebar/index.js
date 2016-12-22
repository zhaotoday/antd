import React from 'react'
import styles from './theme/styles'
import helpers from 'utils/helpers'

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
      <SubMenu key="/commodities" title={<span><Icon type="shopping-cart" /><span>产品管理</span></span>}>
        <Menu.Item key="/commodities">产品列表</Menu.Item>
      </SubMenu>
      <SubMenu key="/jobs" title={<span><Icon type="team" /><span>岗位管理</span></span>}>
        <Menu.Item key="/jobs">岗位列表</Menu.Item>
        <Menu.Item key="/jobs/categories/JOBS">分类列表</Menu.Item>
      </SubMenu>
      <SubMenu key="/settings" title={<span><Icon type="setting" /><span>系统设置</span></span>}>
        <Menu.Item key="/settings">网站设置</Menu.Item>
        <Menu.Item key="/sliders">首页滚动广告</Menu.Item>
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
