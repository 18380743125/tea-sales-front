import bRequest from '../index'
import type { IQueryOrder } from '@/types/order'

// 查询订单信息 用户名、手机号、商品名称、订单状态
export function queryOrdersReq(params: IQueryOrder) {
  return bRequest.get({
    url: '/api/v1/order',
    params
  })
}
