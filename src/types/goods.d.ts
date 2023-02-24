import { IQuery } from './common'

export interface IQueryGoods extends IQuery {
  name?: string
  category?: number
}

export interface IDiscount {
  goodsId?: number
  id?: number
  rate?: number
  descripion?: string
}
