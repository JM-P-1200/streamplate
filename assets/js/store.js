// assets/js/store.js
(async function(){
  // fetch templates.json
  async function getTemplates(){
    try {
      const resp = await fetch('/data/templates.json');
      if (!resp.ok) throw new Error('Failed to fetch templates.json');
      return await resp.json();
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  // render grid on templates.html
  async function renderGrid(){
    const container = document.getElementById('template-store');
    const countEl = document.getElementById('tpl-count');
    if (!container) return;
    const templates = await getTemplates();
    if (!templates) {
      container.innerHTML = '<p class="text-center text-red-500">Failed to load templates.</p>';
      if (countEl) countEl.textContent = '0';
      return;
    }
    if (countEl) countEl.textContent = templates.length;
    container.innerHTML = templates.map(t => `
      <article class="card">
        <img src="${t.thumbnail}" alt="${t.name}">
        <div class="p-4">
          <h3 class="text-xl font-semibold mb-2">${t.name}</h3>
          <p class="text-sm text-slate-600 mb-4">${t.description}</p>
          <div class="flex items-center justify-between">
            <a href="${t.demo}" target="_blank" class="text-blue-600 hover:underline text-sm">View Demo</a>
            <div class="flex gap-2">
              <a href="template.html?id=${t.id}" class="px-3 py-1 rounded border text-sm">Details</a>
              <a href="${t.buy}" target="_blank" class="px-3 py-1 rounded bg-sky-600 text-white text-sm">Buy</a>
            </div>
          </div>
        </div>
      </article>
    `).join('');
  }

  // render single template detail on template.html
  async function renderDetail(id){
    const holder = document.getElementById('template-detail');
    if (!holder) return;
    const templates = await getTemplates();
    if (!templates) {
      holder.innerHTML = '<p class="text-red-500">Failed to load template.</p>';
      return;
    }
    const t = templates.find(x => x.id === id);
    if (!t) {
      holder.innerHTML = '<p class="text-slate-600">Template not found.</p>';
      return;
    }
    holder.innerHTML = `
      <div class="grid gap-8 md:grid-cols-2">
        <div>
          <img src="${t.thumbnail}" alt="${t.name}" class="w-full rounded shadow">
        </div>
        <div>
          <h1 class="text-2xl font-bold">${t.name}</h1>
          <p class="mt-3 text-slate-600">${t.description}</p>

          <dl class="mt-6 text-sm text-slate-700">
            <div><strong>Price:</strong> ${t.price ? ('$' + t.price) : 'Check link'}</div>
            <div class="mt-2"><strong>Tags:</strong> ${t.tags ? t.tags.join(', ') : '—'}</div>
          </dl>

          <div class="mt-6 flex gap-3">
            <a href="${t.demo}" target="_blank" class="px-4 py-2 rounded bg-white border">View Demo</a>
            <a href="${t.buy}" target="_blank" class="px-4 py-2 rounded bg-sky-600 text-white">Buy</a>
          </div>
        </div>
      </div>

      <section class="mt-8">
        <h2 class="font-semibold">Details</h2>
        <p class="mt-2 text-slate-600">${t.longDescription || 'No further details provided.'}</p>
      </section>
    `;
  }

  // auto detect page
  if (document.getElementById('template-store')) {
    // templates page
    renderGrid();
  }

  // if template.html with ?id= present
  const url = new URL(location.href);
  const id = url.searchParams.get('id');
  if (id && document.getElementById('template-detail')) {
    renderDetail(id);
  }
})();
