import { BASE_URL } from '@/service/config'

export const goodsImgUrl = (item: Record<string, any>) => `${BASE_URL}/goods/${item.filename}`
