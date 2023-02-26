import type { IAddCart, IUpdateCart } from '@/types/cart'
import bRequest from '..'
import type { IQuery } from '@/types/common'

// 查询购物车数据
export function queryCartReq(params: IQuery) {
  return bRequest.get({
    url: '/api/v1/carts',
    params
  })
}

// 添加购物车
export function addCartReq(data: IAddCart) {
  return bRequest.post({
    url: '/api/v1/carts',
    data
  })
}

// 删除购物车
export function removeCartReq(id: number) {
  return bRequest.post({
    url: `/api/v1/carts/${id}`
  })
}

// 更改购物车
export function updateCartReq(id: number, params: IUpdateCart) {
  return bRequest.patch({
    url: `/api/v1/carts/${id}`,
    data: params
  })
}

// 全选与全不选
export function checkAllReq(flag: number) {
  return bRequest.patch({
    url: `/api/v1/carts/checkAll/${flag}`
  })
}
