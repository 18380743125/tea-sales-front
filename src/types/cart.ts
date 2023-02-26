export interface IAddCart {
  goodsId: number
  count: number
  checked?: boolean
}

export interface IUpdateCart {
  count?: number
  checked?: boolean
  goodsId: number
}
