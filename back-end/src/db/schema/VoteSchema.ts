import { Schema } from 'mongoose'
import * as _ from 'lodash'
import { constant } from '../../constant'

export const Deposit = {
  content: {
    type: String,
    // required: true
  },
  amount: {
    type: Number,
    // required: true
  },
  // status: {
  //   type: String,
  //   enum: ['FINISHED']
  // },
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'post'
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
}
