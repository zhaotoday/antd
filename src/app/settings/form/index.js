import React from 'react'
import {Breadcrumb, Form, Input, Button, Row, Col, message} from 'antd'
import connect from 'react-redux/lib/components/connect'
import actionCreators from '../../../redux/actions'
import lang from 'utils/lang'
import Editor from 'components/editor'

@connect(
  state => ({
    setting: state.setting
  }),
  dispatch => ({
    getSetting: (options) => dispatch(actionCreators.getSetting(options)),
    putSetting: (options) => dispatch(actionCreators.putSetting(options))
  })
)
class Comp extends React.Component {
  constructor() {
    super()
    this.id = ((lang) => {
      switch (lang) {
        case 'cn':
          return 1

        case 'ar':
          return 2

        case 'en':
          return 3

        default:
          return 1
      }
    })(lang.get())
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !nextProps.setting.isPending
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.setting.data && nextProps.setting.data && nextProps.setting.data.id) {
      const data = nextProps.setting.data
      const {setFieldsValue} = this.props.form

      setFieldsValue(data)
    }
  }

  componentDidMount() {
    this.props.getSetting({
      'setting_id': this.id
    })
  }

  render() {
    const {getFieldDecorator} = this.props.form

    return <div>
      <Breadcrumb>
        <Breadcrumb.Item href="/#/">首页</Breadcrumb.Item>
        <Breadcrumb.Item>系统设置</Breadcrumb.Item>
        <Breadcrumb.Item>网站设置</Breadcrumb.Item>
      </Breadcrumb>
      <Form horizontal>
        <Form.Item
          labelCol={{span: 2}}
          wrapperCol={{span: 16}}
          label="网站名称"
          required
          hasFeedback>
          {getFieldDecorator('site_name', {
            rules: [
              {
                required: true,
                message: '请输入网站名称'
              },
              {
                max: 50,
                message: '不能超过 50 个字'
              }
            ]
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          labelCol={{span: 2}}
          wrapperCol={{span: 16}}
          label="网站描述"
          hasFeedback>
          {getFieldDecorator('description', {
            rules: [
              {
                max: 500,
                message: '不能超过 500 个字'
              }
            ]
          })(
            <Input type="textarea" rows="4" />
          )}
        </Form.Item>
        <Form.Item
          labelCol={{span: 2}}
          wrapperCol={{span: 16}}
          label="关键词"
          hasFeedback>
          {getFieldDecorator('keywords', {
            rules: [
              {
                max: 200,
                message: '不能超过 200 个字'
              }
            ]
          })(
            <Input type="textarea" rows="2" />
          )}
        </Form.Item>
        <Form.Item
          labelCol={{span: 2}}
          wrapperCol={{span: 16}}
          label="关于我们"
          hasFeedback>
          {getFieldDecorator('about', {
            rules: [
              {
                max: 1000,
                message: '不能超过 1000 个字'
              }
            ]
          })(
            <Editor name="about" afterChange={this._handleAfterChange} editState={!!this.id} height="250" />
          )}
        </Form.Item>
        <Form.Item
          labelCol={{span: 2}}
          wrapperCol={{span: 16}}
          label="联系我们"
          hasFeedback>
          {getFieldDecorator('contact', {
            rules: [
              {
                max: 1000,
                message: '不能超过 1000 个字'
              }
            ]
          })(
            <Input type="textarea" rows="4" />
          )}
        </Form.Item>
        <Form.Item
          labelCol={{span: 2}}
          wrapperCol={{span: 16}}
          label="备案号"
          hasFeedback>
          {getFieldDecorator('icp', {
            rules: [
              {
                max: 50,
                message: '不能超过 50 个字'
              }
            ]
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          labelCol={{span: 2}}
          wrapperCol={{span: 16}}
          label="邮箱"
          hasFeedback>
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: '格式错误'
              }
            ]
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          labelCol={{span: 2}}
          wrapperCol={{span: 16}}
          label="地址"
          hasFeedback>
          {getFieldDecorator('address', {
            rules: [
              {
                max: 100,
                message: '不能超过 100 个字'
              }
            ]
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          labelCol={{span: 2}}
          wrapperCol={{span: 16}}
          label="手机"
          hasFeedback>
          {getFieldDecorator('mobilephone', {
            rules: [
              {
                pattern: /^1[3|5|7|8][0-9]{9}$/,
                message: '格式错误'
              }
            ]
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          labelCol={{span: 2}}
          wrapperCol={{span: 16}}
          label="公司福利"
          hasFeedback>
          {getFieldDecorator('job_benefits', {
            rules: [
              {
                max: 1000,
                message: '不能超过 1000 个字'
              }
            ]
          })(
            <Input type="textarea" rows="6" />
          )}
        </Form.Item>
        <Form.Item
          labelCol={{span: 2}}
          wrapperCol={{span: 16}}
          label="招聘信息"
          hasFeedback>
          {getFieldDecorator('job_info', {
            rules: [
              {
                max: 1000,
                message: '不能超过 1000 个字'
              }
            ]
          })(
            <Input type="textarea" rows="6" />
          )}
        </Form.Item>
        <Form.Item
          labelCol={{span: 2}}
          wrapperCol={{span: 16}}
          label="电话"
          hasFeedback>
          {getFieldDecorator('telephone', {
            rules: [
              {
                pattern: /^0[0-9]{2,3}[-]?[0-9]{7,8}$/,
                message: '格式错误'
              }
            ]
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          labelCol={{span: 2}}
          wrapperCol={{span: 16}}
          label="传真"
          hasFeedback>
          {getFieldDecorator('fax', {
            rules: [
              {
                pattern: /^0[0-9]{2,3}[-]?[0-9]{7,8}$/,
                message: '格式错误'
              }
            ]
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          labelCol={{span: 2}}
          wrapperCol={{span: 16}}
          label="邮政编码"
          hasFeedback>
          {getFieldDecorator('postcode', {
            rules: [
              {
                pattern: /^[1-9][0-9]{5}$/,
                message: '格式错误'
              }
            ]
          })(
            <Input />
          )}
        </Form.Item>
      </Form>
      <Row>
        <Col offset="2" span="20">
          <Button type="primary" onClick={this._handleSubmit}>提交</Button>
        </Col>
      </Row>
    </div>
  }

  /**
   * 提交表单
   */
  _handleSubmit = (e) => {
    const {form, putSetting} = this.props
    const {validateFields} = form

    e.preventDefault()

    validateFields((err, fieldsValue) => {
      if (!err) {
        putSetting({
          'setting_id': this.id,
          data: fieldsValue
        }).then(() => {
          message.success('编辑成功')
        })
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
