import React from 'react'
import {Breadcrumb, Form, Input, Button, Row, Col, message, InputNumber} from 'antd'
import consts from 'utils/consts'
import helpers from 'utils/helpers'
import CategorySelect from 'components/categorySelect'
import Padding from 'components/padding'
import connect from 'react-redux/lib/components/connect'
import actionCreators from '../../../redux/actions'

@connect(
  state => ({
    job: state.job
  }),
  dispatch => ({
    getJob: (options) => dispatch(actionCreators.getJob(options)),
    postJob: (options) => dispatch(actionCreators.postJob(options)),
    patchJob: (options) => dispatch(actionCreators.patchJob(options))
  })
)
class Comp extends React.Component {
  constructor() {
    super()
    this.id = null
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !nextProps.job.isPending
  }

  componentWillReceiveProps(nextProps) {
    if (this.id && !this.props.job.data && nextProps.job.data.id) {
      const data = nextProps.job.data
      const {setFieldsValue} = this.props.form

      setFieldsValue(data)
    }
  }

  componentDidMount() {
    if (this.id) {
      this.props.getJob({
        job_id: this.id
      })
    }
  }

  render() {
    const {getFieldDecorator} = this.props.form
    this.id = this.props.params.job_id

    return <div>
      <Breadcrumb>
        <Breadcrumb.Item href="/#/">首页</Breadcrumb.Item>
        <Breadcrumb.Item>岗位管理</Breadcrumb.Item>
        <Breadcrumb.Item>{this.id ? '编辑' : '新增'}</Breadcrumb.Item>
      </Breadcrumb>
      <Form horizontal>
        <Form.Item
          labelCol={{span: 2}}
          wrapperCol={{span: 20}}
          label="分类">
          {getFieldDecorator('category_id', {
            rules: [{
              required: true,
              message: '请选择分类'
            }]
          })(
            <CategorySelect name="category_id" afterChange={this._handleAfterChange} model={consts.MODELS.JOBS} />
          )}
        </Form.Item>
        <Form.Item
          labelCol={{span: 2}}
          wrapperCol={{span: 20}}
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
          labelCol={{span: 2}}
          wrapperCol={{span: 20}}
          label="薪资"
          hasFeedback>
          {getFieldDecorator('salary', {
            rules: []
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          labelCol={{span: 2}}
          wrapperCol={{span: 20}}
          label="需求人数"
          hasFeedback>
          {getFieldDecorator('need_number', {
            rules: [
              {
                max: 20,
                message: '不能超过 20 个字'
              }
            ]
          })(
            <InputNumber min={0} max={100} defaultValue={0} />
          )}
        </Form.Item>
        <Form.Item
          labelCol={{span: 2}}
          wrapperCol={{span: 20}}
          label="岗位职责"
          hasFeedback>
          {getFieldDecorator('duty', {
            rules: []
          })(
            <Input type="textarea" rows="6" />
          )}
        </Form.Item>
        <Form.Item
          labelCol={{span: 2}}
          wrapperCol={{span: 20}}
          label="任职要求"
          hasFeedback>
          {getFieldDecorator('requirement', {
            rules: []
          })(
            <Input type="textarea" rows="6" />
          )}
        </Form.Item>
      </Form>
      <Row>
        <Col offset="2" span="20">
          <Button type="primary" onClick={this._handleSubmit}>提交</Button>
          <Padding dir={['left']}>
            <Button type="primary" onClick={() => {
              helpers.go.bind(this)('/jobs')
            }}>返回</Button>
          </Padding>
        </Col>
      </Row>
    </div>
  }

  /**
   * 提交表单
   */
  _handleSubmit = (e) => {
    const {form, postJob, patchJob} = this.props
    const {resetFields, validateFields} = form

    e.preventDefault()

    validateFields((err, fieldsValue) => {
      if (!err) {
        if (this.id) {
          patchJob({
            'job_id': this.id,
            data: fieldsValue
          }).then(() => {
            message.success('编辑成功')
            helpers.go.bind(this)('/jobs')
          })
        } else {
          postJob({
            data: fieldsValue
          }).then(() => {
            message.success('新增成功')
            resetFields()
            helpers.go.bind(this)('/jobs')
          })
        }
      }
    })
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
}

module.exports = Form.create()(Comp)
