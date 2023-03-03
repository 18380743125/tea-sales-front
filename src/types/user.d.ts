import type { IQuery } from './common'

export interface ILoginForm {
  name: string
  password: string
  captcha: string
  remember: boolean
  flag?: number
}

export interface IRegisterForm {
  name: string
  password: string
  okpassword: string
  captcha: string
}

export interface IPassword {
  oldpassword: string
  password: string
  againpassword: string
}

export interface IQueryUser extends IQuery {
  name?: string
  phone?: string
  [number]: string
}

export interface IUpdateUser {
  gender?: string

  age?: number | string

  phone?: string

  banned?: string

  account?: number | string
}
