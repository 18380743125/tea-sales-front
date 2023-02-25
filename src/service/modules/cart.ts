import type { IAddCart } from '@/types/cart'
import bRequest from '..'

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
export function updateCartReq(id: number, count: number) {
  return bRequest.patch({
    url: `/api/v1/carts/${id}`,
    data: { count }
  })
}
