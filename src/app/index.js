import React from 'react'
import {Header, Body, Sidebar, Main} from 'app/layout'
import 'utils/polyfill'

import 'antd/dist/antd.less'
import 'themes/global'

class Comp extends React.Component {
  componentDidMount() {
    this.refs.sidebar.openKey = this.props.location.pathname
  }

  componentWillReceiveProps(nextProps) {
    this.refs.sidebar.openKey = nextProps.location.pathname
  }

  render() {
    return <div>
      <Header />
      <Body>
        <Sidebar ref="sidebar" />
        <Main>
          {this.props.children}
        </Main>
      </Body>
    </div>
  }
}

module.exports = Comp
