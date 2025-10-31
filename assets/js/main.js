// assets/js/main.js
// small helpers used across pages

document.addEventListener('DOMContentLoaded', () => {
  // set year in all possible spans
  const y = new Date().getFullYear();
  ['year','year-2','year-3','year-4','year-5'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = y;
  });

  // optional: simple mobile nav toggle if you want to add a hamburger later
});
