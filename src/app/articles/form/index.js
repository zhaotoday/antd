import React from 'react'
import {Breadcrumb, Form, Input, Button, Row, Col, message} from 'antd'
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
    putArticle: (options) => dispatch(actionCreators.putArticle(options))
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
    if (this.id && !this.props.article.data && nextProps.article.data.id) {
      const data = nextProps.article.data
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
        <Breadcrumb.Item>文章管理</Breadcrumb.Item>
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
          label="图片">
          {getFieldDecorator('picture', {
            rules: [{
              required: true,
              message: '请上传图片'
            }]
          })(
            <Upload name="picture" afterChange={this._handleAfterChange} editState={!!this.id} />
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
    const {form, postArticle, putArticle} = this.props
    const {resetFields, validateFields} = form

    e.preventDefault()

    validateFields((err, fieldsValue) => {
      if (!err) {
        if (this.id) {
          putArticle({
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
