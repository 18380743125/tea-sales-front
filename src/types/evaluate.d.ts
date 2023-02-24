import { IQuery } from './common'

export interface IQueryEvaluate extends IQuery {
  uname: string
  goodsName: string
}

export interface IPublishComment {
  evaluateId: number
  content: string
  parentId?: number
}
