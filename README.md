# Portfolio Blog (GitHub Pages)

A fancy static personal blog with owner-only publishing.

## Security model

- Site is static on GitHub Pages.
- No public write/admin endpoint on production.
- New posts are published only by repo commits (maintainer access required).

## Content structure

- Post index data: `data/posts.json`
- Post content files: `posts/<slug>.md`
- Post renderer page: `post.html?slug=<slug>`

## Publish a new post

1. Create `posts/<slug>.md`
2. Add an entry in `data/posts.json`:

```json
{
  "slug": "my-new-post",
  "title": "My new post",
  "category": "Notes",
  "excerpt": "Short summary",
  "date": "2026-02-24"
}
```

3. Commit and push:

```bash
git add .
git commit -m "feat: publish new blog post"
git push
```

GitHub Pages will rebuild automatically.
