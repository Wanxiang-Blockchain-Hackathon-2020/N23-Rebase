import Base from './Base'
import { Document } from 'mongoose'
import * as _ from 'lodash'
import { constant } from '../constant'
import { mail, user as userUtil } from '../utility'

interface Mail {
  subject: string;
  body: string;
  role?: string;
  user?: object;
}

export default class extends Base {
  private model: any
  protected init() {
    this.model = this.getDBModel('Deposit')
  }

  public async create(param: any): Promise<Document> {
    const {
      content, proposalId, status
    } = param

    const doc: any = {
      content,
      proposalId,
      createdBy: this.currentUser._id
    }

    try {
      const rs = await this.model.save(doc)
      return rs
    } catch (error) {
      console.log(error)
      return
    }
  }

  /**
   * @param param
   * @returns {Promise<"mongoose".Document>}
   */
  public async update(param: any): Promise<Document> {
    const {
      id: _id, content, status
    } = param

    if (!this.currentUser || !this.currentUser._id) {
      throw 'DepositService.updateDraft - invalid current user'
    }

    const cur = await this.model.findOne({ _id })
    if (!cur) {
      throw 'DepositService.updateDraft - invalid id'
    }

    if (!this.isOwner(cur)) {
      throw 'DepositService.updateDraft - not owner'
    }

    const doc: any = {
      content
    }

    try {
      await this.model.update({ _id }, doc)

      return await this.getById(_id)
    } catch (error) {
      console.log('error happened: ', error)
      return
    }
  }

  /**
   * list
   * @param query
   * @returns {Promise<Object>}
   */
  public async list(param: any): Promise<Object> {
    const { proposalId } = param
    if (!proposalId) {
      throw 'DepositService.list - must specify a proposal id'
    }

    const query: any = {
      proposalId,
    }

    const cursor = this.model.getDBInstance().find(query).sort({
      createdAt: 1
    })
    const totalCursor = this.model.getDBInstance().find(query).count()

    const list = await cursor
    const total = await totalCursor

    return {
      list,
      total,
    }
  }

  public async getById(id): Promise<any> {
    return await this.model.getDBInstance().findOne({ _id: id })
  }

  public async getProposalById(id): Promise<any> {
    return await this.getDBModel('CVote').getDBInstance().findOne({ _id: id })
  }

  private isOwner(doc) {
    const userId = _.get(this.currentUser, '_id', '')
    return userId.toString() === _.get(doc, 'createdBy').toString()
  }
}
