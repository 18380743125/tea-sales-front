import bRequest from '..'
import type { IQueryEvaluate, IPublishComment } from '@/types/evaluate'

// 查询评价
export function queryEvaluateReq(params: IQueryEvaluate) {
  return bRequest.get({
    url: '/api/v1/evaluate',
    params
  })
}

// 发表评价
export function createEvaluateReq(imgs: File[], data: any) {
  const fd = new FormData()
  fd.append('star', data.star)
  fd.append('content', data.content)
  fd.append('orderId', data.orderId)
  if (imgs.length > 0) {
    for (const file of imgs) fd.append('imgs', file)
  }
  return bRequest.post({
    url: '/api/v1/evaluate',
    data: fd
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
