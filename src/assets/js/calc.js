export function add2Zero(v) {
  let m = v / 60 | 0
  m = m < 10 ? '0' + m : '' + m
  let s = v % 60
  s = s < 10 ? '0' + s : '' + s
  return m + "'" + s + "''"
}
export function timeDiff(s) {
  let date = new Date()
  let now = date.getTime()
  let m = (now - s) / 1000 / 60
  if (m > 60) {
    let h = m / 60
    return h + '小时'
  } else {
    return m + '分钟'
  }
}

