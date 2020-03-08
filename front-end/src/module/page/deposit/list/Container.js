import {
  createContainer,
} from '@/util'
import {
  POST_STATUS
} from '@/constant'
import DepositService from '@/service/DepositService'
import CommentService from '@/service/CommentService'
import Component from './Component'

const mapState = (state) => {
  const currentUserId = state.user.current_user_id

  const depositState = {
    ...state.deposit,
    tagsIncluded: state.deposit.tags_included,
    referenceStatus: state.deposit.reference_status,
    dataList: state.deposit.all_deposits,
    total: state.deposit.all_deposits_total,
    currentUserId,
    filter: state.deposit.filter || {},
    isLogin: state.user.is_login,
    user: state.user
  }

  return depositState
}

const mapDispatch = () => {
  const service = new DepositService()
  const commentService = new CommentService()

  return {
    async changePage(page) {
      return service.changePage(page)
    },

    async onSortByChanged(sortBy) {
      return service.saveSortBy(sortBy)
    },

    async getList(query) {

      query = Object.assign({
        status: POST_STATUS.ACTIVE
      }, query)

      return service.list(query)
    },

    async loadMore(query) {

      query = Object.assign({
        status: POST_STATUS.ACTIVE
      }, query)

      return service.loadMore(query)
    },

    resetAll() {
      return service.resetAll()
    },

    async create(doc) {
      return service.create(doc)
    },

    async subscribe(id) {
      return commentService.subscribe('deposit', id)
    },

    async unsubscribe(id) {
      return commentService.unsubscribe('deposit', id)
    },
  }
}

export default createContainer(Component, mapState, mapDispatch)
