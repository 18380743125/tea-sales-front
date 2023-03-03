import bRequest from '..'
import type { ICreateAddress, IUpdateAddress } from '@/types/address'

// 新建地址
export function createAddressReq(data: ICreateAddress) {
  return bRequest.post({
    url: '/api/v1/address',
    data
  })
}

// 删除地址
export function removeAddressReq(id: number) {
  return bRequest.delete({
    url: `/api/v1/address/${id}`
  })
}

// 修改地址
export function updateAddressReq(id: number, data: IUpdateAddress) {
  return bRequest.patch({
    url: `/api/v1/address/${id}`,
    data
  })
}

// 查询地址
export function fetchAddressReq() {
  return bRequest.get({
    url: '/api/v1/address'
  })
}
