import {
  createContainer,
} from '@/util'
import Component from './Component'
import DepositService from '@/service/DepositService'

export default createContainer(Component, (state) => {
  return {
    currentUserId: state.user.current_user_id,
    isCouncil: state.user.is_council,
    isAdmin: state.user.is_admin
  }
}, () => {
  const service = new DepositService()

  return {
    createDeposit(post) {
      return service.create(post)
    }
  }
})
