const root = document.documentElement;
const yearNode = document.getElementById('year');
const themeToggle = document.getElementById('themeToggle');
const postGrid = document.getElementById('postGrid');

async function loadPosts() {
  try {
    const res = await fetch('data/posts.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('failed to load posts');
    const posts = await res.json();
    return Array.isArray(posts) ? posts : [];
  } catch {
    return [];
  }
}

async function renderPosts() {
  if (!postGrid) return;
  const posts = await loadPosts();
  if (!posts.length) {
    postGrid.innerHTML = '<article class="post card"><h3>No posts yet</h3><p>Add a post file and update data/posts.json.</p></article>';
    return;
  }

  posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  postGrid.innerHTML = posts
    .map(
      (post) => `
      <article class="post card">
        <p class="tag">${post.category || 'General'} • ${post.date || ''}</p>
        <h3>${post.title}</h3>
        <p>${post.excerpt || ''}</p>
        <a href="post.html?slug=${encodeURIComponent(post.slug)}" class="link-arrow">Read post →</a>
      </article>
    `
    )
    .join('');
}

if (yearNode) yearNode.textContent = new Date().getFullYear();

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  root.classList.add('light');
  if (themeToggle) themeToggle.textContent = '☀️';
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    root.classList.toggle('light');
    const light = root.classList.contains('light');
    themeToggle.textContent = light ? '☀️' : '🌙';
    localStorage.setItem('theme', light ? 'light' : 'dark');
  });
}

renderPosts();
