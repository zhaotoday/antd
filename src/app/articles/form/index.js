import React from 'react'
import { Breadcrumb, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button } from 'antd'
import Editor from 'components/editor'
import Upload from 'components/upload'
import Tree from 'components/tree'

module.exports = Form.create()(class extends React.Component {
  componentDidMount() {
    const { setFieldsValue } = this.props.form
    setFieldsValue({
      title: '2'
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return <div>
      <Breadcrumb>
        <Breadcrumb.Item href="/#/">首页</Breadcrumb.Item>
        <Breadcrumb.Item>文章管理</Breadcrumb.Item>
        <Breadcrumb.Item>新增文章</Breadcrumb.Item>
      </Breadcrumb>
      <Tree />
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
          <Editor ref="editor" defaultValue="abc<br/>dd" />
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
  _handleSubmit = (e) => {
    const { upload, editor } = this.refs
    const { form } = this.props

    e.preventDefault();

    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }

      alert(JSON.stringify(fieldsValue))

      alert(editor.value)
    })
  }
})
