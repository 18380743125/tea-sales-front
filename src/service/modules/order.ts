import bRequest from '../index'
import type { IQueryOrder } from '@/types/order'

// 查询订单信息 用户名、手机号、商品名称、订单状态
export function fetchOrdersReq(params: IQueryOrder) {
  return bRequest.get({
    url: '/api/v1/order',
    params
  })
}

interface ICreateOrder {
  goodsId: number
  count: number
  money: number
}
// 创建订单
export function createOrdersReq(address: number, data: ICreateOrder[]) {
  return bRequest.post({
    url: `/api/v1/order/${address}`,
    data
  })
}

export function updateOrderReq(id: number, state: number) {
  return bRequest.patch({
    url: `/api/v1/order/${id}`,
    params: { state }
  })
}
