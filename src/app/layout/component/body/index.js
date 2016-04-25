import React from 'react'
import styles from './theme/css'

export default class extends React.Component {
  render() {
    return <div className={`${styles.body} clearfix`}>
      {this.props.children}
    </div>
  }
}
