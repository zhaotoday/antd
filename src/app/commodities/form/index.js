import React from 'react'
import {Breadcrumb, Form, Input, Button, Row, Col, message} from 'antd'
import helpers from 'utils/helpers'
import Editor from 'components/editor'
import Upload from 'components/upload'
import Padding from 'components/padding'
import connect from 'react-redux/lib/components/connect'
import actionCreators from '../../../redux/actions'

@connect(
  state => ({
    commodity: state.commodity
  }),
  dispatch => ({
    getCommodity: (options) => dispatch(actionCreators.getCommodity(options)),
    postCommodity: (options) => dispatch(actionCreators.postCommodity(options)),
    patchCommodity: (options) => dispatch(actionCreators.patchCommodity(options))
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
    return !nextProps.commodity.isPending
  }

  componentWillReceiveProps(nextProps) {
    if (this.id && !this.props.commodity.data && nextProps.commodity.data.data.id) {
      const data = nextProps.commodity.data.data
      const {setFieldsValue} = this.props.form

      setFieldsValue(data)
    }
  }

  componentDidMount() {
    if (this.id) {
      this.props.getCommodity({
        commodity_id: this.id
      })
    }
  }

  render() {
    const {getFieldDecorator} = this.props.form
    this.id = this.props.params.commodity_id

    return <div>
      <Breadcrumb>
        <Breadcrumb.Item href="/#/">首页</Breadcrumb.Item>
        <Breadcrumb.Item>产品管理</Breadcrumb.Item>
        <Breadcrumb.Item>{this.id ? '编辑' : '新增'}</Breadcrumb.Item>
      </Breadcrumb>
      <Form horizontal>
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
          label="官网"
          hasFeedback>
          {getFieldDecorator('website', {
            rules: [{
              type: 'url',
              message: '格式错误'
            }]
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          labelCol={{span: 2}}
          wrapperCol={{span: 20}}
          label="App Store"
          hasFeedback>
          {getFieldDecorator('app_store', {
            rules: [{
              type: 'url',
              message: '格式错误'
            }]
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          labelCol={{span: 2}}
          wrapperCol={{span: 20}}
          label="Google Play"
          hasFeedback>
          {getFieldDecorator('google_play', {
            rules: [{
              type: 'url',
              message: '格式错误'
            }]
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          labelCol={{span: 2}}
          wrapperCol={{span: 20}}
          label="内容"
          required
          hasFeedback>
          {getFieldDecorator('content', {
            rules: [{
              required: true,
              message: '请输入内容'
            }]
          })(
            <Editor name="content" afterChange={this._handleAfterChange} editState={!!this.id} />
          )}
        </Form.Item>
        <Form.Item
          labelCol={{span: 2}}
          wrapperCol={{span: 20}}
          label="图标">
          {getFieldDecorator('icon', {
            rules: [{
              required: true,
              message: '请上传图标'
            }]
          })(
            <Upload name="icon" afterChange={this._handleAfterChange} editState={!!this.id} />
          )}
        </Form.Item>
        <Form.Item
          labelCol={{span: 2}}
          wrapperCol={{span: 20}}
          label="图片 1">
          {getFieldDecorator('picture1', {
            rules: []
          })(
            <Upload name="picture1" afterChange={this._handleAfterChange} editState={!!this.id} />
          )}
        </Form.Item>
        <Form.Item
          labelCol={{span: 2}}
          wrapperCol={{span: 20}}
          label="图片 2">
          {getFieldDecorator('picture2', {
            rules: []
          })(
            <Upload name="picture2" afterChange={this._handleAfterChange} editState={!!this.id} />
          )}
        </Form.Item>
        <Form.Item
          labelCol={{span: 2}}
          wrapperCol={{span: 20}}
          label="图片 3">
          {getFieldDecorator('picture3', {
            rules: []
          })(
            <Upload name="picture3" afterChange={this._handleAfterChange} editState={!!this.id} />
          )}
        </Form.Item>
        <Form.Item
          labelCol={{span: 2}}
          wrapperCol={{span: 20}}
          label="图片 4">
          {getFieldDecorator('picture4', {
            rules: []
          })(
            <Upload name="picture4" afterChange={this._handleAfterChange} editState={!!this.id} />
          )}
        </Form.Item>
      </Form>
      <Row>
        <Col offset="2" span="20">
          <Button type="primary" onClick={this._handleSubmit}>提交</Button>
          <Padding dir={['left']}>
            <Button type="primary" onClick={() => {
              helpers.go.bind(this)('/commodities')
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
    const {form, postCommodity, patchCommodity} = this.props
    const {resetFields, validateFields} = form

    e.preventDefault()

    validateFields((err, fieldsValue) => {
      if (!err) {
        if (this.id) {
          patchCommodity({
            'commodity_id': this.id,
            data: fieldsValue
          }).then(() => {
            message.success('编辑成功')
            helpers.go.bind(this)('/commodities')
          })
        } else {
          postCommodity({
            data: fieldsValue
          }).then(() => {
            message.success('新增成功')
            resetFields()
            helpers.go.bind(this)('/commodities')
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
