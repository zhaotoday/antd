import React from 'react'
import actionCreators from '../redux/actions'

import connect from 'react-redux/lib/components/connect'
import { Header, Body, Sidebar, Main } from 'app/layout'

import 'antd/dist/antd.css'
import 'themes/global'
import { Upload, message, Button, Icon } from 'antd';

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
    const props = {
      name: 'userfile',
      multiple: false,
      listType: 'picture',
      action: 'http://www.cms.com/api/files',
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };


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
