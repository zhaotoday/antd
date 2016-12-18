import React from 'react'
import styles from './theme/styles'

export default class extends React.Component {
  static propTypes = {
    value: React.PropTypes.string,
    width: React.PropTypes.number
  }

  static defaultProps = {
    value: '',
    width: 100
  }

  render() {
    const {value, width} = this.props

    return <div className={styles.ellipsis} style={width ? {width: `${width}px`} : null} title={value}>
      {value}
    </div>
  }
}
