export interface ICreateAddress {
  name: string
  tel: string
  address: string
  isDefault?: string
}

export interface IUpdateAddress extends Partial<ICreateAddress> {}
