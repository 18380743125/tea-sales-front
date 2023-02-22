export default function throttle(
  fn: Function,
  interval: number,
  { leading = true, trailing = false }
) {
  let startTime = 0
  let timer: NodeJS.Timeout | null = null
  const _throttle = function (this: unknown, ...args: any[]) {
    return new Promise((resolve, reject) => {
      try {
        const nowTime = Date.now()
        // 立即执行控制
        if (!leading && startTime === 0) {
          startTime = nowTime
        }
        const waitTime = interval - (nowTime - startTime)
        if (waitTime <= 0) {
          if (timer) clearTimeout(timer)
          const res = fn.apply(this, args)
          resolve(res)
          startTime = nowTime
          timer = null
          return
        }

        // 尾部执行控制
        if (trailing && !timer) {
          timer = setTimeout(() => {
            const res = fn.apply(this, args)
            resolve(res)
            timer = null
            startTime = Date.now()
          }, waitTime)
        }
      } catch (err) {
        reject(err)
      }
    })
  }
  // 取消尾部执行
  _throttle.cancel = function () {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  return _throttle
}
