import React from 'react'
import MediaQuery from 'react-responsive'
import BackLink from '@/module/shared/BackLink/Component'
import DepositForm from '@/module/form/DepositForm/Component'
import I18N from '@/I18N'
import { LG_WIDTH } from '@/config/constant'
import Meta from '@/module/common/Meta'
import StandardPage from '../../StandardPage'

import { Container } from './style'

export default class extends StandardPage {
  constructor(props) {
    super(props)

    this.state = {
      error: null,
    }
  }

  historyBack = () => {
    this.props.history.push('/')
  }

  onSubmit = (model) => {
    return this.props.createDeposit(model)
      .then(() => this.historyBack())
      .catch(err => this.setState({ error: err }))
  }

  ord_renderContent() {
    return (
      <div>
        <Meta
          title="Deposit"
          url={this.props.location.pathname}
        />

        <Container className="c_PostDetail">
          <h2>
            充值DAI的数量（年利率 8%）
          </h2>
          <DepositForm
            lang={this.props.lang}
            onSubmit={this.onSubmit}
            onCancel={this.historyBack}
            onSaveDraft={this.onSaveDraft}
          />
        </Container>
      </div>
    )
  }

}
