import bRequest from '..'
import type { IQueryEvaluate, IPublishComment } from '@/types/evaluate'

// 查询评价
export function queryEvaluateReq(params: IQueryEvaluate) {
  return bRequest.get({
    url: '/api/v1/evaluate',
    params
  })
}

// 删除评价
export function removeEvaluateReq(id: number) {
  return bRequest.delete({
    url: `/api/v1/evaluate/${id}`
  })
}

// 发表评论
export function publishCommentReq(params: IPublishComment) {
  return bRequest.post({
    url: '/api/v1/evaluate/comment',
    data: params
  })
}

// 根据评价ID查询所有其评论
export function getCommentsReq(id: number) {
  return bRequest.get({
    url: `/api/v1/evaluate/comment/${id}`
  })
}

// 根据 ids 删除评论
export function removeCommentReq(ids: number[]) {
  return bRequest.delete({
    url: '/api/v1/evaluate/comment',
    data: { ids }
  })
}
