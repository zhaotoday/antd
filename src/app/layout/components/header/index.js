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
    return <header className={styles.header}>
      <div className={styles.inner}>
        后台管理系统
        <div className={styles.dropdown}>
          <Icon type="poweroff" />admin
        </div>
      </div>
    </header>
  }
}
