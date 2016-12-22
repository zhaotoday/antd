import React from 'react'
import styles from './theme/styles'
import {Icon, Popconfirm} from 'antd'
import helpers from 'utils/helpers'
import auth from 'utils/auth'

export default class extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  render() {
    return <div className={styles.header}>
      <div className={styles.inner}>
        <a className={styles.title} href="#">
          后台管理系统
        </a>
        <div className={styles.user}>
          <Popconfirm title="确认退出？" onConfirm={this._handleLogout} okText="确认" cancelText="取消">
            <span className={styles.logout}>
                <Icon type="poweroff" /> 退出
            </span>
          </Popconfirm>
        </div>
      </div>
    </div>
  }

  /**
   * 注销
   */
  _handleLogout = () => {
    auth.destroy()
    helpers.go.bind(this)('/login')
  }
}
