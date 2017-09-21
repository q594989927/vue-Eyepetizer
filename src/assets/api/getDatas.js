export function apiSelected() {
  let url = '/api/v4/tabs/selected'
  return fetch(url).then(response => {
    return response.json();
  })
}
export function apiDiscovery() {
  let url = '/api/v4/discovery'
  return fetch(url).then(response => {
    return response.json();
  })
}
export function apiHot(start, count) {
  let url = '/api/v4/discovery/hot?start=' + start + '&num=' + count
  return fetch(url).then(response => {
    return response.json();
  })
}
export function apiCategory(start, count) {
  let url = '/api/v4/discovery/category?start=' + start + '&num=' + count
  return fetch(url).then(response => {
    return response.json();
  })
}
export function apiDetailCategory(start, count, id) {
  let url = '/api/v3/videos?start=' + start + '&num=' + count + '&categoryId=' + id + '&strategy=date'
  return fetch(url).then(response => {
    return response.json();
  })
}
export function apiDefaultAuthor() {
  let url = '/api/v4/pgcs/all?'
  return fetch(url).then(response => {
    return response.json();
  })
}
export function apiAuthor(start, count) {
  let url = '/api/v4/pgcs/all?start=' + start + '&num=' + count
  return fetch(url).then(response => {
    return response.json();
  })
}
export function apiAuthorDetail(id) {
  let url = '/api/v4/pgcs/detail/tab?id=' + id
  return fetch(url).then(response => {
    return response.json();
  })
}
export function apiAuthorVideoList(start, count, id) {
  let url = '/api/v4/pgcs/videoList?start=' + start + '&num=' + count + '&id=' + id + '&strategy=date'
  return fetch(url).then(response => {
    return response.json();
  })
}
export function apiFollow() {
  let url = '/api/v4/tabs/follow'
  return fetch(url).then(response => {
    return response.json();
  })
}
export function apiSearch(start, count, q) {
  let url = '/api/v1/search?start=' + start + '&num=' + count + '&query=' + q
  return fetch(url).then(response => {
    return response.json();
  })
}