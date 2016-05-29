import React from 'react'
import styles from './theme/styles'
import { Icon, Menu, Dropdown } from 'antd'
const DropdownButton = Dropdown.Button

export default class extends React.Component {
  _handleButtonClick() {
    console.log('click button')
  }

  _handleMenuClick(e) {
    console.log('click', e)
  }

  render() {
    const menu = (
      <Menu onClick={this._handleMenuClick}>
        <Menu.Item key="1"><Icon type="desktop" /> 网站首页</Menu.Item>
        <Menu.Item key="2"><Icon type="poweroff" /> 退出</Menu.Item>
      </Menu>
    )

    return <div className={styles.head}>
      <div className={styles.inner}>
        <Icon type="appstore-o" />&nbsp;
        网站管理后台
        <div className={styles.dropdown}>
          <DropdownButton onClick={this._handleButtonClick} overlay={menu} type="ghost">
            <Icon type="user" /> admin
          </DropdownButton>
        </div>
      </div>
    </div>
  }
}
