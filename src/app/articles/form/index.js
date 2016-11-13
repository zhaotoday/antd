import React from 'react'
import { Breadcrumb, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button } from 'antd'
import Editor from 'components/editor'
import Upload from 'components/upload'

module.exports = Form.create()(class extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        span: 2
      },
      wrapperCol: {
        span: 14
      }
    }

    return <div>
      <Breadcrumb>
        <Breadcrumb.Item href="/#/">首页</Breadcrumb.Item>
        <Breadcrumb.Item>文章管理</Breadcrumb.Item>
        <Breadcrumb.Item>新增文章</Breadcrumb.Item>
      </Breadcrumb>
      <Form horizontal>
        <Form.Item
          labelCol={{span: 2}}
          wrapperCol={{span: 20}}
          label="标题"
          hasFeedback>
          {getFieldDecorator('title', {
            rules: [{
              required: true,
              message: '请输入标题'
            }],
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
          <Editor defaultValue="abc<br/>dd" />
        </Form.Item>
        <Form.Item
          labelCol={{span: 2}}
          wrapperCol={{span: 20}}
          label="图片">
          <Upload ref="upload" action="http://www.cms.com/api/files" />
        </Form.Item>
        <Form.Item
          labelCol={{span: 2}}
          wrapperCol={{span: 20}}
          label=" ">
          <Button type="primary" onClick={this._handleSubmit}>提交</Button>
        </Form.Item>
      </Form>
    </div>
  }

  /**
   * 提交
   */
  _handleSubmit = () => {
    const { upload } = this.refs

    alert(JSON.stringify(upload.value))
  }
})
