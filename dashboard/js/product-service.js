function apiListProducts() {
  return fetch(`${APP_CONFIG.apiBase}/products`)
    .then(res => res.json());
}

function apiGetProduct(id) {
  return fetch(`${APP_CONFIG.apiBase}/products/${id}`)
    .then(res => res.json());
}

function apiCreateProduct(data) {
  return fetch(`${APP_CONFIG.apiBase}/products`, {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  }).then(res => res.json());
}

function apiUpdateProduct(id, data) {
  return fetch(`${APP_CONFIG.apiBase}/products/${id}`, {
    method: 'PUT',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  }).then(res => res.json());
}

function apiDeleteProduct(id) {
  return fetch(`${APP_CONFIG.apiBase}/products/${id}`, {
    method: 'DELETE'
  }).then(res => res.text());
}
