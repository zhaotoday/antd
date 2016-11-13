import React from 'react'
import styles from './theme/styles'
import { Icon } from 'antd'

export default class extends React.Component {
  render() {
    return <div className={styles.header}>
      <div className={styles.inner}>
        <a className={styles.title} href="#">
          后台管理系统
        </a>
        <div className={styles.user}>
          <span className={styles.logout} onClick={this._handleLogout}>
            <Icon type="poweroff" /> 注销
          </span>
        </div>
      </div>
    </div>
  }

  /**
   * 注销
   */
  _handleLogout = () => {
    alert(2)
  }
}
