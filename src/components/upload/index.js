import React from 'react'
import {Upload, Button, Icon, message} from 'antd'
import consts from 'utils/consts'
import app from 'utils/app'
import auth from 'utils/auth'

// 上传地址
const action = consts.API_URL + '/files'

export default class extends React.Component {
  constructor() {
    super()

    this.initial = true
  }

  static propTypes = {
    // 名称
    name: React.PropTypes.string,
    // 值
    value: React.PropTypes.string,
    // afterChange 事件
    afterChange: React.PropTypes.func,
    // 是否编辑状态
    editState: React.PropTypes.bool
  }

  static defaultProps = {
    name: 'upload',
    value: undefined,
    afterChange: () => {
    },
    editState: false
  }

  state = {
    //  当前的文件列表
    fileList: []
  }

  componentDidMount() {
    this.props.provideController({
      init() {
        this.initial = true
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    const {value, editState} = nextProps

    if (value) {
      // 初始状态 && 编辑状态 && value 有值
      if (this.initial && editState) {
        app.getFile(value).then((file) => {
          const {name, url} = file

          this.setState({
            fileList: [{uid: -1, name, status: 'done', url, thumbUrl: url}]
          })
        })
      }
    } else {
      this.setState({
        fileList: []
      })
    }

    this.initial = false
  }

  render() {
    const {fileList} = this.state
    const props = {
      headers: auth.getAuth(),
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
