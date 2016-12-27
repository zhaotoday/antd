import React from 'react'
import {Form, Input, message, Modal, InputNumber} from 'antd'
import connect from 'react-redux/lib/components/connect'
import actionCreators from '../../../redux/actions'

@connect(
  state => ({
    category: state.category
  }),
  dispatch => ({
    getCategory: (options) => dispatch(actionCreators.getCategory(options)),
    postCategory: (options) => dispatch(actionCreators.postCategory(options)),
    putCategory: (options) => dispatch(actionCreators.putCategory(options))
  })
)
class Comp extends React.Component {
  constructor() {
    super()
    this.id = ''
    this.pid = ''
  }

  static propTypes = {
    // 模型
    model: React.PropTypes.string,
    // 重载列表
    onReload: React.PropTypes.func
  }

  static defaultProps = {
    model: '',
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
    return !nextProps.category.isPending
  }

  componentDidMount() {
    this.props.provideController({
      init: (data = {}) => {
        const {id} = data

        if (id) {
          this.id = id
          this.pid = ''

          this.props.getCategory({
            category_id: id
          }).then((response) => {
            const data = response.value.data
            const {setFieldsValue} = this.props.form

            setFieldsValue({
              title: data.title,
              description: data.description,
              sort: data.sort
            })
          })
        } else {
          this.id = ''
          this.pid = data.pid || '0'

          setTimeout(() => {
            this.props.form.setFieldsValue({
              title: '',
              description: '',
              sort: ''
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
          label="备注"
          hasFeedback>
          {getFieldDecorator('description', {
            rules: []
          })(
            <Input type="textarea" rows="2" />
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
      </Form>
    </Modal>
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
    const {form, postCategory, putCategory, model} = this.props
    const {resetFields, validateFields} = form

    validateFields((err, fieldsValue) => {
      if (err) return

      if (this.id) {
        putCategory({
          'category_id': this.id,
          data: {
            ...fieldsValue,
            model
          }
        }).then(() => {
          message.success('编辑成功')
          this.setState({visible: false})
          this.props.onReload()
        })
      } else {
        postCategory({
          data: {
            ...fieldsValue,
            pid: this.pid,
            model
          }
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
