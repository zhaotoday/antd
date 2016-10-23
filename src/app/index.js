import React from 'react'
import actionCreators from '../redux/actions'

import connect from 'react-redux/lib/components/connect'
import { Head, Body, Sidebar, Main } from 'app/layout'

import 'antd/dist/antd.css'
import 'themes/global'

@connect(
  state => ({
    articles: state.articles,
    files: state.files
  }),
  dispatch => ({
    postArticle: (options) => dispatch(actionCreators.postArticle(options)),
    postFile: (options) => dispatch(actionCreators.postFile(options))
  })
)
class Comp extends React.Component {
  componentDidMount() {
    this.props.postFile({
      data: {
        title: 'the title'
      }
    })

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
