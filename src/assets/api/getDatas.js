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
export function getDetailCategory(start, count, id) {
  let url = '/api/v3/videos?start=' + start + '&num=' + count + '&categoryId=' + id + '&strategy=date'
  return fetch(url).then(response => {
    return response.json();
  })
}
export function getDefaultAuthor() {
  let url = '/api/v4/pgcs/all?'
  return fetch(url).then(response => {
    return response.json();
  })
}
export function getAuthor(start, count) {
  let url = '/api/v4/pgcs/all?start=' + start + '&num=' + count
  return fetch(url).then(response => {
    return response.json();
  })
}
export function getAuthorDetail(id) {
  let url = '/api/v4/pgcs/detail/tab?id=' + id
  return fetch(url).then(response => {
    return response.json();
  })
}