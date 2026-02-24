# Portfolio Blog (GitHub Pages)

A fancy static blog homepage with a built-in writing entrance.

## Features

- Fancy homepage layout
- `Write a post` entrance (`admin.html`)
- Local post publishing (stored in browser `localStorage`)
- Single post page (`post.html?id=...`)

## Local preview

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Notes

This version stores posts in each browser's local storage (no backend/database).
If you want cross-device publishing and permanent content management, next step is adding a static-site CMS flow (e.g. markdown + build, or GitHub API based editor).
