import React from 'react'
import styles from './theme/styles'

export default class extends React.Component {
  static propTypes = {
    // 方向
    dir: React.PropTypes.array
  }

  static defaultProps = {
    dir: ['left', 'right', 'top', 'bottom']
  }

  render() {
    const {dir} = this.props
    const classNames = dir.map((item) => {
      return styles[item]
    })

    return <span className={classNames.join(' ')}>
      {this.props.children}
    </span>
  }
}
