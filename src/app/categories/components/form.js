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
    patchCategory: (options) => dispatch(actionCreators.patchCategory(options))
  })
)
class Comp extends React.Component {
  constructor() {
    super()
  }

  static propTypes = {
    // ID
    id: React.PropTypes.string
  }

  static defaultProps = {
    id: ''
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

  componentWillReceiveProps(nextProps) {
    if (!this.props.category.data && nextProps.category.data.data.id) {
      const data = nextProps.category.data.data
      const {setFieldsValue} = this.props.form

      setFieldsValue({
        title: data.title,
        description: data.description,
        pid: data.pid,
        sort: data.sort
      })
    }
  }

  componentDidMount() {
    const {id} = this.props

    if (id) {
      this.props.getCategory({
        category_id: id
      })
    }


    this.props.provideController({
      init: (data = {}) => {
        if (data.category_id) {
          this.props.getCategory({
            category_id: data.category_id
          })
        }
      },
      show: () => {
        this.setState({
          visible: true
        })
      }
    })
  }

  render() {
    const {getFieldDecorator} = this.props.form

    return <Modal title="新增" visible={this.state.visible} onOk={this._handleOk} onCancel={this._handleCancel}>

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
          label="描述"
          hasFeedback>
          {getFieldDecorator('description', {
            rules: []
          })(
            <Input type="textarea" rows="4" />
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
    const {form, postCategory, patchCategory} = this.props
    const {resetFields, validateFields} = form

    validateFields((err, fieldsValue) => {
      if (err) return

      if (this.id) {
        patchCategory({
          'article_id': this.id,
          data: fieldsValue
        }).then(() => {
          message.success('编辑成功')
        })
      } else {
        postCategory({
          data: fieldsValue
        }).then(() => {
          message.success('新增成功')
          resetFields()
        })
      }
    })
  }
}

const CategoryForm = Form.create()(Comp)

export default CategoryForm
