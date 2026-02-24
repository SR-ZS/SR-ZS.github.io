const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const form = document.getElementById('postForm');
const msg = document.getElementById('saveMsg');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  root.classList.add('light');
  themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
  root.classList.toggle('light');
  const light = root.classList.contains('light');
  themeToggle.textContent = light ? '☀️' : '🌙';
  localStorage.setItem('theme', light ? 'light' : 'dark');
});

function loadPosts() {
  try {
    return JSON.parse(localStorage.getItem('blogPosts') || '[]');
  } catch {
    return [];
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);

  const post = {
    id: `post-${Date.now()}`,
    title: String(data.get('title') || '').trim(),
    category: String(data.get('category') || 'General').trim(),
    excerpt: String(data.get('excerpt') || '').trim(),
    content: String(data.get('content') || '').trim(),
    createdAt: new Date().toISOString()
  };

  if (!post.title || !post.excerpt || !post.content) {
    msg.textContent = 'Please fill title, excerpt and content.';
    return;
  }

  const posts = loadPosts();
  posts.unshift(post);
  localStorage.setItem('blogPosts', JSON.stringify(posts));

  form.reset();
  msg.textContent = '✅ Published! Go back home to see it in Latest Posts.';
});
