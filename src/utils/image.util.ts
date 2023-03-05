import { BASE_URL } from '@/service/config'

export const goodsImgUrl = (item: Record<string, any>) => `${BASE_URL}/goods/${item.filename}`

export const userAvatarUrl = (item: Record<string, any>) => {
  return `${BASE_URL}/avatar/${item ? item.filename : 'default.png'}`
}

export const evaluateUrl = (item: Record<string, any>) => {
  return `${BASE_URL}/evaluate/${item.filename}`
}
