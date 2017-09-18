export function getSelected() {
  let url = '/api/v4/tabs/selected'
  return fetch(url).then(response => {
    return response.json();
  })
}
export function getDiscovery() {
  let url = '/api/v4/discovery'
  return fetch(url).then(response => {
    return response.json();
  })
}
export function getHot(start, count) {
  let url = '/api/v4/discovery/hot?start=' + start + '&num=' + count
  return fetch(url).then(response => {
    return response.json();
  })
}
export function getCategory(start, count) {
  let url = '/api/v4/discovery/category?start=' + start + '&num=' + count
  return fetch(url).then(response => {
    return response.json();
  })
}
export function getDetailCategory(id) {
  let url = '/api/v3/videos?&categoryId=' + id
  return fetch(url).then(response => {
    return response.json();
  })
}
export function getAuthor() {
  let url = '/api/v4/pgcs/all'
  return fetch(url).then(response => {
    return response.json();
  })
}

//http://baobab.kaiyanapp.com/api/v3/videos?&categoryId=
// 2 创意
// 4 开胃
// 6 旅行
// 8 预告