import React from 'react'
import {Breadcrumb, Form, Input, Button, Row, Col, message, InputNumber} from 'antd'
import consts from 'utils/consts'
import helpers from 'utils/helpers'
import Editor from 'components/editor'
import Upload from 'components/upload'
import CategorySelect from 'components/categorySelect'
import Padding from 'components/padding'
import connect from 'react-redux/lib/components/connect'
import actionCreators from '../../../redux/actions'

@connect(
  state => ({
    article: state.article
  }),
  dispatch => ({
    getArticle: (options) => dispatch(actionCreators.getArticle(options)),
    postArticle: (options) => dispatch(actionCreators.postArticle(options)),
    patchArticle: (options) => dispatch(actionCreators.patchArticle(options))
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
    return !nextProps.article.isPending
  }

  componentWillReceiveProps(nextProps) {
    if (this.id && !this.props.article.data && nextProps.article.data.data.id) {
      const data = nextProps.article.data.data
      const {setFieldsValue} = this.props.form

      setFieldsValue({
        title: data.title,
        content: data.content,
        category_id: data.category_id,
        picture: data.picture
      })
    }
  }

  componentDidMount() {
    if (this.id) {
      this.props.getArticle({
        article_id: this.id
      })
    }
  }

  render() {
    const {getFieldDecorator} = this.props.form
    this.id = this.props.params.article_id

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
            <CategorySelect name="category_id" afterChange={this._handleAfterChange} model={consts.MODELS.ARTICLES} />
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
          required
          hasFeedback>
          {getFieldDecorator('salary', {
            rules: [{
              required: true,
              message: '请输入薪资'
            }]
          })(
            <InputNumber min={0} max={10000} defaultValue={0} />
          )}
          元/月
        </Form.Item>
        <Form.Item
          labelCol={{span: 2}}
          wrapperCol={{span: 20}}
          label="需求人数"
          required
          hasFeedback>
          {getFieldDecorator('need_number', {
            rules: [
              {
                required: true,
                message: '请输入需求人数'
              }
            ]
          })(
            <InputNumber min={0} max={10000} defaultValue={0} />
          )}
        </Form.Item>
        <Form.Item
          labelCol={{span: 2}}
          wrapperCol={{span: 20}}
          label="岗位职责"
          required
          hasFeedback>
          {getFieldDecorator('duty', {
            rules: [{
              required: true,
              message: '请输入岗位职责'
            }]
          })(
            <Input type="textarea" rows="6" />
          )}
        </Form.Item>
        <Form.Item
          labelCol={{span: 2}}
          wrapperCol={{span: 20}}
          label="任职要求"
          required
          hasFeedback>
          {getFieldDecorator('requirement', {
            rules: [{
              required: true,
              message: '请输入任职要求'
            }]
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
              helpers.go.bind(this)('/articles')
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
    const {form, postArticle, patchArticle} = this.props
    const {resetFields, validateFields} = form

    e.preventDefault()

    validateFields((err, fieldsValue) => {
      if (!err) {
        if (this.id) {
          patchArticle({
            'article_id': this.id,
            data: fieldsValue
          }).then(() => {
            message.success('编辑成功')
            helpers.go.bind(this)('/articles')
          })
        } else {
          postArticle({
            data: fieldsValue
          }).then(() => {
            message.success('新增成功')
            resetFields()
            helpers.go.bind(this)('/articles')
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
