
export function getSelected() {
  let url = '/api/v4/tabs/selected'
  return fetch(url).then(response => {
    return response.json();
  })
}