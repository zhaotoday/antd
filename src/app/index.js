import 'antd/dist/antd.css'

import React from 'react'
import actionCreators from '../redux/actions'

import { connect } from 'react-redux'
import { Head, Body, Sidebar, Main } from 'app/layout'

@connect(
  state => ({
    article: state.article
  }),
  dispatch => ({
    addArticle: (options) => dispatch(actionCreators.addArticle(options))
  })
)
class Comp extends React.Component {
  componentDidMount() {
    this.refs.sidebar.openKey = this.props.location.pathname
  }

  componentWillReceiveProps(nextProps) {
    this.refs.sidebar.openKey = nextProps.location.pathname
  }

  render() {
    return <div>
      <Head />
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
