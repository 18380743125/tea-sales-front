import bRequest from '..'
import type { IQueryGoods } from '@/types/goods'

// 查询商品
export function getGoodsReq(params: IQueryGoods) {
  return bRequest.get({
    url: '/api/v1/goods',
    params
  })
}

// 根据 id 查询商品
export function getGoodsByIdReq(id: number) {
  return bRequest.get({
    url: `/api/v1/goods/${id}`
  })
}

// 查询类别
export function getCategoriesReq() {
  return bRequest.get({
    url: '/api/v1/category'
  })
}

// 根据商品 ID 查询折扣信息
export function getDiscountByGoodsId(id: number) {
  return bRequest.get({
    url: `/api/v1/discounts/goods/${id}`
  })
}
