import React from 'react'
import _ from 'lodash'
import { Form, Input, Button, Row, Tabs, Radio } from 'antd'
import BaseComponent from '@/model/BaseComponent'
import I18N from '@/I18N'
import { ABSTRACT_MAX_WORDS } from '@/constant'
import CircularProgressbar from '@/module/common/CircularProgressbar'
import CodeMirrorEditor from '@/module/common/CodeMirrorEditor'
import MDEditor from '@/module/common/MDEditor'

import {
  Container,
  Note,
  TabText,
  CirContainer
} from './style'

const FormItem = Form.Item


class C extends BaseComponent {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      errorKeys: {},
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    const { onSubmit, form } = this.props
    this.setState({ loading: true })
    form.validateFields(async (err, values) => {
      if (err) {
        this.setState({
          loading: false,
          errorKeys: err,
          activeKey: this.getActiveKey(Object.keys(err)[0])
        })
        return
      }
      await onSubmit(values)
      this.setState({ loading: false })
    })
  }

  getTitleInput() {
    const { initialValues = {} } = this.props
    const { getFieldDecorator } = this.props.form

    return getFieldDecorator('title', {
      rules: [
        { required: true, message: I18N.get('post.form.error.required') }
      ],
      initialValue: initialValues.title
    })(
      <Input size="large" type="text" />
    )
  }

  getAmountInput() {
    const { initialValues = {} } = this.props
    const { getFieldDecorator } = this.props.form

    return getFieldDecorator('amount', {
      rules: [
        { required: true, message: I18N.get('post.form.error.required') }
      ],
      initialValue: 1
    })(
      <Input size="large" type="number" />
    )
  }

  getToInput() {
    const { initialValues = {} } = this.props
    const { getFieldDecorator } = this.props.form

    return getFieldDecorator('to', {
      rules: [
        { required: true, message: I18N.get('post.form.error.required') }
      ],
      initialValue: ''
    })(
      <Input size="large" type="text" />
    )
  }

  getTextarea(id) {
    const { initialValues = {} } = this.props
    const { getFieldDecorator } = this.props.form

    const rules = [{
      required: true,
      message: I18N.get('post.form.error.required')
    }]
    return getFieldDecorator(id, {
      rules,
      initialValue: initialValues[id],
    })(
      <MDEditor onTextChange={this.onTextChange} />
    )
  }

  onTextChange = ({html, text}) => {
    console.log('onTextChange', html, text)
  }

  ord_render() {
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            label={`${I18N.get('post.form.fields.title')} *`}
            // labelCol={{span: 23}}
            // wrapperCol={{span: 18}}
            colon={false}
            >
            {this.getTitleInput()}
          </FormItem>
          <FormItem
            label={`数量 *`}
            colon={false}
            >
            {this.getAmountInput()}
          </FormItem>
          <FormItem
            label={`To *`}
            colon={false}
            >
            {this.getToInput()}
          </FormItem>
          <FormItem
            label={`${I18N.get('post.form.fields.desc')} *`}
            // labelCol={{span: 2}}
            // wrapperCol={{span: 18}}
            colon={false}
          >
            {this.getTextarea('desc')}
          </FormItem>
          <Row gutter={8} type="flex" justify="center">
            <Button
              loading={this.state.loading}
              className="cr-btn cr-btn-primary"
              htmlType="submit"
            >
              {I18N.get('post.form.button.save')}
            </Button>
          </Row>
        </Form>
      </Container>
    )
  }
}

export default Form.create()(C)
