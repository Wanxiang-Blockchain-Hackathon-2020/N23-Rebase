import * as _ from 'lodash'
import Base from '../Base'
import DepositService from '../../service/DepositService'

export default class extends Base {

  // protected needLogin = true;

  async action() {
    const param = this.getParam()
    const service = this.buildService(DepositService)

    const rs = await service.list(param)
    return this.result(1, rs)
  }
}
