const root = document.documentElement;
const yearNode = document.getElementById('year');
const themeToggle = document.getElementById('themeToggle');
const postGrid = document.getElementById('postGrid');

const DEFAULT_POSTS = [
  {
    id: 'seed-1',
    title: 'Building fast, beautiful static websites',
    category: 'Engineering',
    excerpt:
      'Practical patterns for performance and visual polish without heavyweight frameworks.',
    content:
      'Start with semantic HTML, add tasteful motion, and prioritize typography and contrast. Fancy means thoughtful, not noisy.',
    createdAt: '2026-02-24T09:00:00.000Z'
  },
  {
    id: 'seed-2',
    title: 'How I plan deep work weeks',
    category: 'Productivity',
    excerpt: 'A simple system for balancing maker time, meetings, and creative recovery.',
    content:
      'Time-block your peak hours for creation, move meetings to low-energy windows, and protect one recovery block.',
    createdAt: '2026-02-23T09:00:00.000Z'
  },
  {
    id: 'seed-3',
    title: 'What “fancy” actually means in UI',
    category: 'Notes',
    excerpt: 'Fancy isn’t glitter. It’s clarity, rhythm, contrast, and delight used with restraint.',
    content:
      'Good interfaces feel inevitable. Keep hierarchy clear, spacing intentional, and interactions responsive.',
    createdAt: '2026-02-22T09:00:00.000Z'
  }
];

function loadPosts() {
  const raw = localStorage.getItem('blogPosts');
  if (!raw) return DEFAULT_POSTS;
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length ? parsed : DEFAULT_POSTS;
  } catch {
    return DEFAULT_POSTS;
  }
}

function renderPosts() {
  if (!postGrid) return;
  const posts = loadPosts().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  postGrid.innerHTML = posts
    .map(
      (post) => `
      <article class="post card">
        <p class="tag">${post.category || 'General'}</p>
        <h3>${post.title}</h3>
        <p>${post.excerpt || ''}</p>
        <a href="post.html?id=${encodeURIComponent(post.id)}" class="link-arrow">Read post →</a>
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
