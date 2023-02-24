import { IQuery } from './common'

export interface IQueryOrder extends IQuery {
  goodsName?: string
  state?: string
  uname?: string
  phone?: string
}

export interface IDeliverGoods {
  orderId?: number
  userId?: number
  addressId?: number
  way?: string
}
