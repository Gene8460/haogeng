/* main.js — 初始化逻辑 */

document.addEventListener('DOMContentLoaded', () => {
  // 语言切换
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.getAttribute('data-lang')));
  });

  // 恢复上次语言
  const saved = localStorage.getItem('haogeng_lang');
  if (saved && I18N[saved]) {
    setLang(saved);
  } else {
    setLang('en');
  }

  // 渲染产品
  renderProducts('all');
  initFilters();

  // 移动端菜单
  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => menu.classList.toggle('open'));
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
  }

  // 询盘表单：用 mailto 打开邮件客户端
  const form = document.getElementById('inquiryForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const name = fd.get('name') || '';
      const email = fd.get('email') || '';
      const country = fd.get('country') || '';
      const message = fd.get('message') || '';
      const subject = `Inquiry from ${name} (${country})`;
      const body = `Name: ${name}\nEmail: ${email}\nCountry: ${country}\n\nMessage:\n${message}`;
      window.location.href = `mailto:tiktokmarch2024@outlook.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  // 页脚年份
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
