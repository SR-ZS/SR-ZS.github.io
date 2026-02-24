const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const postContainer = document.getElementById('postContainer');

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

const params = new URLSearchParams(location.search);
const id = params.get('id');
const posts = loadPosts();
const post = posts.find((p) => p.id === id);

if (!post) {
  postContainer.innerHTML = `
    <h1>Post not found</h1>
    <p class="subtitle">This post may be a default seed post or was created in another browser/device.</p>
    <a href="index.html" class="cta">Back home</a>
  `;
} else {
  postContainer.innerHTML = `
    <p class="tag">${post.category || 'General'}</p>
    <h1>${post.title}</h1>
    <p class="subtitle">${new Date(post.createdAt).toLocaleString()}</p>
    <p>${post.content.replace(/\n/g, '<br/>')}</p>
    <p style="margin-top:24px;"><a href="index.html" class="cta">← Back to latest posts</a></p>
  `;
}
