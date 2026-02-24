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

function escapeHtml(str) {
  return str
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function renderMarkdown(md) {
  const lines = md.split('\n');
  return lines
    .map((line) => {
      if (line.startsWith('### ')) return `<h3>${escapeHtml(line.slice(4))}</h3>`;
      if (line.startsWith('## ')) return `<h2>${escapeHtml(line.slice(3))}</h2>`;
      if (line.startsWith('# ')) return `<h1>${escapeHtml(line.slice(2))}</h1>`;
      if (!line.trim()) return '<br/>';
      const linked = escapeHtml(line).replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
      return `<p>${linked}</p>`;
    })
    .join('');
}

async function main() {
  const slug = new URLSearchParams(location.search).get('slug');
  if (!slug) {
    postContainer.innerHTML = '<h1>Post not found</h1><p>Missing slug.</p><a class="cta" href="index.html">Back home</a>';
    return;
  }

  try {
    const res = await fetch(`posts/${slug}.md`, { cache: 'no-store' });
    if (!res.ok) throw new Error('not found');
    const md = await res.text();
    postContainer.innerHTML = `${renderMarkdown(md)}<p style="margin-top:24px;"><a class="cta" href="index.html">← Back home</a></p>`;
  } catch {
    postContainer.innerHTML = '<h1>Post not found</h1><p>The markdown file does not exist.</p><a class="cta" href="index.html">Back home</a>';
  }
}

main();
