export function add2Zero(v) {
  let m = v / 60 | 0
  m = m < 10 ? '0' + m : '' + m
  let s = v % 60
  s = s < 10 ? '0' + s : '' + s
  return m + "'" + s + "''"
}