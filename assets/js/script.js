/* =========
  Basic UI
========= */
// year
document.getElementById('year').textContent = new Date().getFullYear();

// theme toggle (persist)
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const saved = localStorage.getItem('theme') || 'light';
if (saved === 'light') root.classList.add('light');

function setIcon(){
  themeToggle.textContent = root.classList.contains('light') ? '🌞' : '🌙';
}
setIcon();
themeToggle.addEventListener('click', () => {
  root.classList.toggle('light');
  localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
  setIcon();
});

// smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if(!el) return;
    e.preventDefault();
    el.scrollIntoView({behavior:'smooth', block:'start'});
    history.pushState(null, '', `#${id}`);
  });
});

// reveal on scroll
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
},{threshold:0.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// copy email
const copyBtn = document.getElementById('copyEmail');
if (copyBtn) {
  copyBtn.addEventListener('click', async ()=>{
    try {
      const email = document.getElementById('email').textContent.trim();
      await navigator.clipboard.writeText(email);
      copyBtn.textContent = 'Copied!';
      setTimeout(()=> copyBtn.textContent = 'Copy', 1500);
    } catch (e) {
      alert('Copy failed. Long-press / right-click to copy.');
    }
  });
}

/* ============================
  Live Activity Configuration
============================ */
const CONFIG = {
  githubUser: 'Sanjidh090',
  kaggleUser: 'sanjidh090',
  mediumUser: 'sanjidh090',
  devUser: 'sanjidh090',
  maxItems: 6
};

// Helper: create list item link
function addItem(ul, href, text, subtext) {
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.href = href;
  a.target = '_blank';
  a.rel = 'noopener';
  a.textContent = text;
  li.appendChild(a);
  if (subtext) {
    const span = document.createElement('span');
    span.style.display = 'block';
    span.style.color = 'var(--muted)';
    span.style.fontSize = '.92rem';
    span.textContent = subtext;
    li.appendChild(span);
  }
  ul.appendChild(li);
}

// CORS proxy (simple, public; replace with your own if you prefer)
const proxy = (url) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;

/* ================
   GitHub Events
================ */
async function loadGitHub() {
  const ul = document.getElementById('feed-github');
  if (!ul) return;
  try {
    const res = await fetch(`https://api.github.com/users/${CONFIG.githubUser}/events/public`);
    if (!res.ok) throw new Error('GitHub API rate-limited or unavailable');
    const events = await res.json();
    let count = 0;
    for (const ev of events) {
      if (count >= CONFIG.maxItems) break;
      const type = ev.type;
      const repo = ev.repo?.name || '';
      const when = new Date(ev.created_at).toLocaleString();
      if (type === 'PushEvent') {
        const msg = ev.payload?.commits?.[0]?.message || 'Pushed commits';
        addItem(ul, `https://github.com/${repo}/commits`, `Pushed to ${repo}`, `${msg} • ${when}`);
        count++;
      } else if (type === 'PullRequestEvent') {
        const action = ev.payload?.action || 'updated';
        const pr = ev.payload?.pull_request?.html_url || `https://github.com/${repo}`;
        addItem(ul, pr, `PR ${action} in ${repo}`, `${when}`);
        count++;
      } else if (type === 'CreateEvent') {
        const ref_type = ev.payload?.ref_type || 'repo';
        addItem(ul, `https://github.com/${repo}`, `Created ${ref_type}: ${repo}`, `${when}`);
        count++;
      } else if (type === 'IssuesEvent') {
        const action = ev.payload?.action || 'updated';
        const issue = ev.payload?.issue?.html_url || `https://github.com/${repo}/issues`;
        addItem(ul, issue, `Issue ${action} in ${repo}`, `${when}`);
        count++;
      }
    }
    if (!ul.children.length) {
      addItem(ul, `https://github.com/${CONFIG.githubUser}`, 'No recent public events found', '');
    }
  } catch (e) {
    addItem(ul, `https://github.com/${CONFIG.githubUser}`, 'Couldn’t load GitHub activity', 'Open profile →');
  }
}

/* ================
   Medium RSS
================ */
async function loadMedium() {
  const ul = document.getElementById('feed-medium');
  if (!ul) return;
  try {
    // Medium user RSS
    const rssUrl = `https://medium.com/feed/@${CONFIG.mediumUser}`;
    const res = await fetch(proxy(rssUrl));
    if (!res.ok) throw new Error('Medium RSS blocked');
    const text = await res.text();
    const xml = new window.DOMParser().parseFromString(text, 'application/xml');
    const items = Array.from(xml.querySelectorAll('item')).slice(0, CONFIG.maxItems);
    if (!items.length) throw new Error('No items');
    for (const it of items) {
      const title = it.querySelector('title')?.textContent?.trim() || 'Medium post';
      const link = it.querySelector('link')?.textContent?.trim() || `https://medium.com/@${CONFIG.mediumUser}`;
      const date = new Date(it.querySelector('pubDate')?.textContent || Date.now()).toLocaleDateString();
      addItem(ul, link, title, date);
    }
  } catch (e) {
    addItem(ul, `https://medium.com/@${CONFIG.mediumUser}`, 'Couldn’t load Medium posts', 'Open profile →');
  }
}

/* ================
   DEV.to RSS
================ */
async function loadDEV() {
  const ul = document.getElementById('feed-dev');
  if (!ul) return;
  try {
    const rssUrl = `https://dev.to/feed/${CONFIG.devUser}`;
    const res = await fetch(proxy(rssUrl));
    if (!res.ok) throw new Error('DEV RSS blocked');
    const text = await res.text();
    const xml = new window.DOMParser().parseFromString(text, 'application/xml');
    const items = Array.from(xml.querySelectorAll('item')).slice(0, CONFIG.maxItems);
    if (!items.length) throw new Error('No items');
    for (const it of items) {
      const title = it.querySelector('title')?.textContent?.trim() || 'DEV post';
      const link = it.querySelector('link')?.textContent?.trim() || `https://dev.to/${CONFIG.devUser}`;
      const date = new Date(it.querySelector('pubDate')?.textContent || Date.now()).toLocaleDateString();
      addItem(ul, link, title, date);
    }
  } catch (e) {
    addItem(ul, `https://dev.to/${CONFIG.devUser}`, 'Couldn’t load DEV posts', 'Open profile →');
  }
}

/* ==========================
   Kaggle (best-effort HTML)
========================== */
async function loadKaggle() {
  const ul = document.getElementById('feed-kaggle');
  if (!ul) return;
  try {
    // Attempt to scrape datasets + notebooks titles (public pages)
    const dsHtml = await (await fetch(proxy(`https://www.kaggle.com/${CONFIG.kaggleUser}/datasets?sort=updated`))).text();
    const nbHtml = await (await fetch(proxy(`https://www.kaggle.com/${CONFIG.kaggleUser}/code?sort=recent`))).text();

    const parser = new DOMParser();
    const dsDoc = parser.parseFromString(dsHtml, 'text/html');
    const nbDoc = parser.parseFromString(nbHtml, 'text/html');

    const dsLinks = Array.from(dsDoc.querySelectorAll('a[href*="/datasets/"]'));
    const nbLinks = Array.from(nbDoc.querySelectorAll('a[href*="/code/"]'));

    // Deduplicate and format a few items
    const dsItems = [];
    for (const a of dsLinks) {
      const href = a.getAttribute('href');
      const text = a.textContent.trim();
      if (href && text && !dsItems.find(x=>x.href===href) && text.length > 4) {
        dsItems.push({ href: `https://www.kaggle.com${href}`, text });
      }
      if (dsItems.length >= Math.ceil(CONFIG.maxItems/2)) break;
    }

    const nbItems = [];
    for (const a of nbLinks) {
      const href = a.getAttribute('href');
      const text = a.textContent.trim();
      if (href && text && !nbItems.find(x=>x.href===href) && text.length > 4) {
        nbItems.push({ href: `https://www.kaggle.com${href}`, text });
      }
      if (nbItems.length >= Math.floor(CONFIG.maxItems/2)) break;
    }

    const combined = [...dsItems, ...nbItems];
    if (!combined.length) throw new Error('Empty scrape');

    for (const it of combined.slice(0, CONFIG.maxItems)) {
      addItem(ul, it.href, it.text);
    }
  } catch (e) {
    addItem(ul, `https://www.kaggle.com/${CONFIG.kaggleUser}`, 'Couldn’t load Kaggle items', 'Open profile →');
  }
}

/* ===========
   Boot
=========== */
loadGitHub();
loadMedium();
loadDEV();
loadKaggle();
