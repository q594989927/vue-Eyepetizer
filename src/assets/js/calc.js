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
  var m = (now - s) / 1000 / 60
  var h = m / 60
  var d = h / 24
  var w = d / 7
  if (d > 7) {
    return Math.floor(w) + '星期'
  } else if (h > 24) {
    return Math.floor(d) + '天'
  } else if (m > 60) {
    return Math.floor(h) + '小时'
  } else {
    return Math.floor(m) + '分钟'
  }
}
export function getDate(t) {
  var time = new Date(t).toDateString().substr(4, 6);
  return time;
}
