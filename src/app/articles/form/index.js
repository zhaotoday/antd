import React from 'react'
import {Breadcrumb, Form, Input, Button, Row, Col, TreeSelect} from 'antd'
import Editor from 'components/editor'
import Upload from 'components/upload'
import CategorySelect from 'components/categorySelect'

module.exports = Form.create()(class extends React.Component {
  componentDidMount() {
    const {setFieldsValue} = this.props.form

    setFieldsValue({
      title: '2',
      content: 'abc<br/>dd',
      category_id: '0-0-1'
    })
  }

  render() {
    const {getFieldDecorator} = this.props.form

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
          {getFieldDecorator('content', {
            rules: [{
              required: true,
              message: '请输入内容'
            }],
          })(
            <Editor />
          )}
        </Form.Item>
        <Form.Item
          labelCol={{span: 2}}
          wrapperCol={{span: 20}}
          label="栏目">
          {getFieldDecorator('category_id', {
            rules: [{
              required: true,
              message: '请选择栏目'
            }],
          })(
            <CategorySelect />
          )}
        </Form.Item>
        <Form.Item
          labelCol={{span: 2}}
          wrapperCol={{span: 20}}
          label="图片">
          {getFieldDecorator('category_id', {
            rules: [{
              required: true,
              message: '请上传图片'
            }],
          })(
            <Upload />
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
    const {upload, editor} = this.refs
    const {form} = this.props

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
