import React from 'react'
import {Form, Input, message, Modal, InputNumber} from 'antd'
import Upload from 'components/upload'
import connect from 'react-redux/lib/components/connect'
import actionCreators from '../../../redux/actions'

@connect(
  state => ({
    slider: state.slider
  }),
  dispatch => ({
    getSlider: (options) => dispatch(actionCreators.getSlider(options)),
    postSlider: (options) => dispatch(actionCreators.postSlider(options)),
    patchSlider: (options) => dispatch(actionCreators.patchSlider(options))
  })
)
class Comp extends React.Component {
  constructor() {
    super()
    this.id = ''
    this.pid = ''
  }

  static propTypes = {
    // 重载列表
    onReload: React.PropTypes.func
  }

  static defaultProps = {
    onReload: () => {
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  state = {
    visible: false
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !nextProps.slider.isPending
  }

  componentDidMount() {
    this.props.provideController({
      init: (data = {}) => {
        const {id} = data

        if (id) {
          this.id = id

          this.props.getSlider({
            slider_id: id
          }).then((response) => {
            const data = response.value.data
            const {setFieldsValue} = this.props.form

            this.picture && this.picture.init()
            setFieldsValue(data)
          })
        } else {
          this.id = ''

          setTimeout(() => {
            this.props.form.setFieldsValue({
              title: '',
              picture: ''
            })
          }, 0)
        }
      },
      show: () => {
        this.setState({visible: true})
      }
    })
  }

  render() {
    const {getFieldDecorator} = this.props.form

    return <Modal title={this.id ? '编辑' : '新增'} visible={this.state.visible} onOk={this._handleOk}
      onCancel={this._handleCancel}>

      <Form horizontal>
        <Form.Item
          labelCol={{span: 4}}
          wrapperCol={{span: 18}}
          label="标题"
          required
          hasFeedback>
          {getFieldDecorator('title', {
            rules: [{
              required: true,
              message: '请输入标题'
            }]
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          labelCol={{span: 4}}
          wrapperCol={{span: 18}}
          label="跳转地址"
          hasFeedback>
          {getFieldDecorator('url', {
            rules: [{
              type: 'url',
              message: '格式错误'
            }]
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          labelCol={{span: 4}}
          wrapperCol={{span: 18}}
          label="排序"
          hasFeedback>
          {getFieldDecorator('sort', {
            rules: []
          })(
            <InputNumber min={0} max={10000} defaultValue={3} />
          )}
        </Form.Item>
        <Form.Item
          labelCol={{span: 4}}
          wrapperCol={{span: 18}}
          label="图片">
          {getFieldDecorator('picture', {
            rules: [{
              required: true,
              message: '请上传图片'
            }]
          })(
            <Upload name="picture" afterChange={this._handleAfterChange} editState={!!this.id}
              provideController={(component) => {
                this.picture = component
              }} />
          )}
        </Form.Item>
      </Form>
    </Modal>
  }

  /**
   * 处理 afterChange 事件
   */
  _handleAfterChange = (name, value) => {
    const {setFieldsValue, validateFields} = this.props.form

    setFieldsValue({
      [name]: value
    })

    validateFields([name])
  }

  /**
   * 取消
   */
  _handleCancel = () => {
    this.setState({visible: false})
  }

  /**
   * 提交表单
   */
  _handleOk = () => {
    const {form, postSlider, patchSlider} = this.props
    const {resetFields, validateFields} = form

    validateFields((err, fieldsValue) => {
      if (err) return

      if (this.id) {
        patchSlider({
          'slider_id': this.id,
          data: fieldsValue
        }).then(() => {
          message.success('编辑成功')
          this.setState({visible: false})
          this.props.onReload()
        })
      } else {
        postSlider({
          data: fieldsValue
        }).then(() => {
          message.success('新增成功')
          resetFields()
          this.setState({visible: false})
          this.props.onReload()
        })
      }
    })
  }
}

const CategoryForm = Form.create()(Comp)

export default CategoryForm
