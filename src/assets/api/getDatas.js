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
export function getHot() {
  let url = '/api/v4/discovery/hot'
  return fetch(url).then(response => {
    return response.json();
  })
}
export function getCategory() {
  let url = '/api/v4/discovery/category'
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