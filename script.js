// ===== STATE =====
const TOTAL_MODULES = 11;
let currentModule = 0; // 0 = home

// ===== NAVIGATION =====
function showModule(num) {
  // Hide all sections
  document.querySelectorAll('.module-section').forEach(s => s.classList.remove('active'));

  // Show target
  const target = num === 0
    ? document.getElementById('module-home')
    : document.getElementById('module-' + num);
  if (target) target.classList.add('active');

  // Update sidebar active state
  document.querySelectorAll('.module-item').forEach(item => {
    item.classList.toggle('active', parseInt(item.dataset.module) === num);
  });

  // Update state
  currentModule = num;

  // Update UI
  updateProgress();
  updateNavButtons();
  updateBadge();

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Close mobile sidebar
  document.getElementById('sidebar').classList.remove('open');
}

function goHome() {
  showModule(0);
}

function nextModule() {
  if (currentModule < TOTAL_MODULES) showModule(currentModule + 1);
}

function prevModule() {
  if (currentModule > 1) showModule(currentModule - 1);
  else if (currentModule === 1) goHome();
}

// ===== PROGRESS =====
function updateProgress() {
  const pct = currentModule === 0 ? 0 : (currentModule / TOTAL_MODULES) * 100;
  document.getElementById('progress-fill').style.width = pct + '%';
}

function updateNavButtons() {
  const prev = document.getElementById('btn-prev');
  const next = document.getElementById('btn-next');
  const nav = document.getElementById('module-nav');
  const progress = document.getElementById('nav-progress');

  if (currentModule === 0) {
    if (nav) nav.style.display = 'none';
    return;
  }
  if (nav) nav.style.display = 'flex';

  if (prev) prev.disabled = false;
  if (next) {
    if (currentModule >= TOTAL_MODULES) {
      next.disabled = true;
      next.textContent = 'Course Complete!';
    } else {
      next.disabled = false;
      next.textContent = 'Next →';
    }
  }
  if (progress) progress.textContent = currentModule + ' / ' + TOTAL_MODULES;
}

function updateBadge() {
  const badge = document.getElementById('module-badge');
  if (badge) {
    if (currentModule === 0) badge.textContent = 'WebDev From Zero';
    else badge.textContent = 'Module ' + currentModule + ' / ' + TOTAL_MODULES;
  }
}

// ===== COPY BUTTON =====
function copyCode(btn) {
  const pre = btn.closest('.code-block').querySelector('pre');
  const text = pre.innerText;
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = '✓ Copied';
    btn.classList.add('copied');
    showToast();
    setTimeout(() => {
      btn.textContent = 'Copy';
      btn.classList.remove('copied');
    }, 2000);
  }).catch(() => {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    btn.textContent = '✓ Copied';
    btn.classList.add('copied');
    showToast();
    setTimeout(() => {
      btn.textContent = 'Copy';
      btn.classList.remove('copied');
    }, 2000);
  });
}

function showToast() {
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// ===== MOBILE SIDEBAR =====
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

// Close sidebar when clicking outside
document.addEventListener('click', (e) => {
  const sidebar = document.getElementById('sidebar');
  const toggle = document.getElementById('menu-toggle');
  if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && e.target !== toggle) {
    sidebar.classList.remove('open');
  }
});

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  showModule(0);
});
