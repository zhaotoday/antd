import React from 'react'
import {Upload, Button, Icon, message} from 'antd'
import consts from 'utils/consts'
import * as helpers from 'utils/helpers'

// 上传地址
const action = consts.API_URL + '/files'

export default class extends React.Component {
  static propTypes = {
    // 名称
    name: React.PropTypes.string,
    // 值
    value: React.PropTypes.string,
    // afterChange 事件
    afterChange: React.PropTypes.func
  }

  static defaultProps = {
    name: 'upload',
    value: undefined,
    afterChange: () => {
    }
  }

  state = {
    //  当前的文件列表
    fileList: []
  }

  // 组件第一次 receive props
  condition = true

  componentWillReceiveProps(nextProps) {
    const {value} = nextProps

    if (this.props.value === undefined) {
      this.condition = false
    }

    if (!(this.props.value === undefined || this.props.value !== value)) {
      return
    }

    if (!value) {
      this.setState({
        fileList: []
      })
    } else {
      // 组件第一次 receive props 会调用
      if (this.condition) {
        helpers.getFileURL(value).then((url) => {
          this.setState({
            fileList: [{
              uid: -1,
              name,
              status: 'done',
              url,
              thumbUrl: url,
            }]
          })
        })
      }
    }

    this.condition = false
  }

  render() {
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
      const id = file.response.data.id.toString()
      this.props.afterChange(this.props.name, id)
    }

    if (fileList.length === 0) {
      this.props.afterChange(this.props.name, '')
    }

    this.setState({fileList})
  }
}