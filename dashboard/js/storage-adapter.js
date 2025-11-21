// LocalStorage functions
function localList() {
  return Promise.resolve(JSON.parse(localStorage.getItem("streamplate_products_v1") || "[]"));
}
function localGet(id) {
  const items = JSON.parse(localStorage.getItem("streamplate_products_v1") || "[]");
  return Promise.resolve(items.find(i => i.id == id));
}
function localCreate(data) {
  const items = JSON.parse(localStorage.getItem("streamplate_products_v1") || "[]");
  const nextId = items.length ? Math.max(...items.map(i => i.id)) + 1 : 1;
  data.id = nextId;
  items.push(data);
  localStorage.setItem("streamplate_products_v1", JSON.stringify(items));
  return Promise.resolve(data);
}
function localUpdate(id, data) {
  const items = JSON.parse(localStorage.getItem("streamplate_products_v1") || "[]");
  const idx = items.findIndex(i => i.id == id);
  items[idx] = {...items[idx], ...data};
  localStorage.setItem("streamplate_products_v1", JSON.stringify(items));
  return Promise.resolve(items[idx]);
}
function localDelete(id) {
  let items = JSON.parse(localStorage.getItem("streamplate_products_v1") || "[]");
  items = items.filter(i => i.id != id);
  localStorage.setItem("streamplate_products_v1", JSON.stringify(items));
  return Promise.resolve();
}


// Auto-switch wrapper
const ProductAPI = {
  list: () =>
    APP_CONFIG.mode === "api" ? apiListProducts() : localList(),

  get: (id) =>
    APP_CONFIG.mode === "api" ? apiGetProduct(id) : localGet(id),

  create: (data) =>
    APP_CONFIG.mode === "api" ? apiCreateProduct(data) : localCreate(data),

  update: (id, data) =>
    APP_CONFIG.mode === "api" ? apiUpdateProduct(id, data) : localUpdate(id, data),

  delete: (id) =>
    APP_CONFIG.mode === "api" ? apiDeleteProduct(id) : localDelete(id)
};
