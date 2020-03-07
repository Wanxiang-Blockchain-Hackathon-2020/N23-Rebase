import { message } from 'antd'
import _ from 'lodash'
import { createContainer, logger } from '@/util'
import CommentService from '@/service/CommentService'
import Component from './Component'

export default createContainer(Component, (state) => {
  const commentables = ['post']

  const props = {
    currentUserId: state.user.current_user_id,
    loading: {},
  }

  _.each(commentables, (commentable) => {
    props[commentable] = _.get(state[commentable], 'detail')
    props.loading[commentable] = state[commentable].loading
  })

  return props
}, () => {
  const commentService = new CommentService()

  return {
    async postComment(type, reduxType, detailReducer, returnUrl, parentId, comment, headline, vote) {
      try {
        const rs = await commentService.postComment(type, reduxType, detailReducer,
          returnUrl, parentId, comment, headline, vote)

        if (rs) {
          message.success('Your comment has been posted.')
        }
      } catch (err) {
        message.error(err.message)
        logger.error(err)
      }
    },

    async subscribe(type, parentId) {
      try {
        await commentService.subscribe(type, parentId)
      } catch (err) {
        message.error(err.message)
        logger.error(err)
      }
    },

    async unsubscribe(type, parentId) {
      try {
        await commentService.unsubscribe(type, parentId)
      } catch (err) {
        message.error(err.message)
        logger.error(err)
      }
    },
  }
})
