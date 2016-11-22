import React from 'react'
import {Upload, Button, Icon, message} from 'antd'
import consts from 'utils/consts'

// 上传地址
const action = consts.API_URL + '/api/files'

export default class extends React.Component {
  static propTypes = {
    // 文件 ID
    value: React.PropTypes.string
  }

  static defaultProps = {
    value: ''
  }

  state = {
    //  当前的文件列表
    fileList: []
  }

  // 上传成功后返回的文件 ID
  id = ''

  get value() {
    return this.id
  }

  render() {
    const {defaultValue} = this.props
    const {fileList} = this.state
    const props = {
      name: 'userfile',
      defaultFileList: [],
      fileList: fileList,
      multiple: false,
      listType: 'picture',
      action: action,
      onChange: this._handleChange
    }

    return <Upload {...props}>
      <Button type="ghost">
        <Icon type="upload" /> 请上传文件
      </Button>
    </Upload>
  }

  /**
   * 处理上传状态改变事件
   */
  _handleChange = (info) => {
    let {file, fileList} = info
    const {status, name} = file

    if (status === 'done') {
      message.success(`${name} 上传成功！`)
    } else if (status === 'error') {
      message.error(`${info.file.name} 上传失败！`)
    }

    fileList = fileList.slice(-1)

    if (file.response && file.response.data && file.response.data.id) {
      this.id = file.response.data.id
    }

    this.setState({fileList})
  }
}