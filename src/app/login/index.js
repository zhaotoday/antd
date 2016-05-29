import React from 'react'
import styles from './theme/styles'
import Panel from 'components/panel'
import { Form, Input, Button, Row, Col } from 'antd'

module.exports = Form.create()(
  class extends React.Component {
    render() {
      const { getFieldProps } = this.props.form

      const usernameProps = getFieldProps('username', {
        rules: [{required: true, message: '用户名不能为空'}]
      })

      const passwordProps = getFieldProps('password', {
        rules: [{required: true, message: '密码不能为空'}]
      })

      const formItemLayout = {
        labelCol: {span: 5},
        wrapperCol: {span: 16}
      }

      return <div className={styles.login}>
        <Panel>
          <Panel.Head>网站后台管理系统</Panel.Head>
          <Panel.Body>
            <Form horizontal form={this.props.form}>
              <Form.Item
                {...formItemLayout}
                label="用户名："
                hasFeedback>
                <Input {...usernameProps} size="large" placeholder="输入用户名" />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="密码："
                hasFeedback>
                <Input {...passwordProps} size="large" placeholder="输入密码" />
              </Form.Item>
              <Row>
                <Col offset="5" span="16">
                  <Button type="primary" size="large" onClick={this._handleSubmit}>登陆</Button>
                </Col>
              </Row>
            </Form>
          </Panel.Body>
        </Panel>
      </div>
    }

    // 提交
    _handleSubmit = (e) => {
      e.preventDefault()

      this.props.form.validateFieldsAndScroll((errors, values) => {
        if (errors) {
          console.log('Errors in form!!!')
          return
        }
        console.log('Submit!!!')
        console.log(values)
      })
    }
  }
)
