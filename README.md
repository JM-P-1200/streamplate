# Streamplate

Streamplate — portfolio + template store by Japh.

## Quick start (tablet-friendly)

1. Copy files into a folder named `streamplate/`.
2. Add images to `assets/img/` (logo, thumbnails).
3. Initialize git and push to GitHub (or upload with GitHub web UI).
4. Connect repo to Netlify: Sites → New site from Git → GitHub → choose repo.
   - Build command: leave empty
   - Publish directory: `/` (root)

## Edit templates
- Edit `data/templates.json` to add or update template entries.
- Templates are rendered dynamically by `assets/js/store.js`.

## Netlify forms
- Contact form in `contact.html` is Netlify Forms-ready. Test via deployed site.

