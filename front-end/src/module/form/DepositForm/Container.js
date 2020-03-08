import {
  createContainer,
} from '@/util'
import Component from './Component'
import DepositService from '@/service/DepositService'

const mapState = state => ({
  loading: state.deposit.loading
})

const mapDispatch = () => {
  const depositService = new DepositService()
  return {
    async create(param) {
      return depositService.create(param)
    },
    async update(param) {
      return depositService.update(param)
    }
  }
}

export default createContainer(Component, mapState, mapDispatch)
