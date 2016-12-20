import React from 'react'
import {Breadcrumb, Form, Input, Button, Row, Col, message} from 'antd'
import helpers from 'utils/helpers'
import Editor from 'components/editor'
import Upload from 'components/upload'
import CategorySelect from 'components/categorySelect'
import Padding from 'components/padding'
import connect from 'react-redux/lib/components/connect'
import actionCreators from '../../../redux/actions'

@connect(
  state => ({
    setting: state.setting
  }),
  dispatch => ({
    getSetting: (options) => dispatch(actionCreators.getSetting(options)),
    patchSetting: (options) => dispatch(actionCreators.patchSetting(options))
  })
)
class Comp extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !nextProps.setting.isPending
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.setting.data && nextProps.setting.data.data.id) {
      const data = nextProps.setting.data.data
      const {setFieldsValue} = this.props.form

      setFieldsValue(data)
    }
  }

  componentDidMount() {
    this.props.getSetting({
      'setting_id': '1'
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
            rules: [{
              required: true,
              message: '请输入网站名称'
            }]
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          labelCol={{span: 2}}
          wrapperCol={{span: 16}}
          label="网站描述"
          hasFeedback>
          {getFieldDecorator('description')(
            <Input type="textarea" rows="4" />
          )}
        </Form.Item>
        <Form.Item
          labelCol={{span: 2}}
          wrapperCol={{span: 16}}
          label="域名"
          hasFeedback>
          {getFieldDecorator('domain')(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          labelCol={{span: 2}}
          wrapperCol={{span: 16}}
          label="关键词"
          hasFeedback>
          {getFieldDecorator('keywords')(
            <Input type="textarea" rows="4" />
          )}
        </Form.Item>
        <Form.Item
          labelCol={{span: 2}}
          wrapperCol={{span: 16}}
          label="备案号"
          hasFeedback>
          {getFieldDecorator('icp')(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          labelCol={{span: 2}}
          wrapperCol={{span: 16}}
          label="电话"
          hasFeedback>
          {getFieldDecorator('telephone')(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          labelCol={{span: 2}}
          wrapperCol={{span: 16}}
          label="手机"
          hasFeedback>
          {getFieldDecorator('mobilephone')(
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
                message: '请输入合法的邮箱'
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
          {getFieldDecorator('fax')(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          labelCol={{span: 2}}
          wrapperCol={{span: 16}}
          label="地址"
          hasFeedback>
          {getFieldDecorator('address')(
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
    const {form, patchSetting} = this.props
    const {validateFields} = form

    e.preventDefault()

    validateFields((err, fieldsValue) => {
      if (!err) {
        patchSetting({
          'setting_id': '1',
          data: fieldsValue
        }).then(() => {
          message.success('编辑成功')
        })
      }
    })
  }
}

module.exports = Form.create()(Comp)
