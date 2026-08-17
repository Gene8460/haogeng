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

  // ===== 询盘表单：弹窗选择 WhatsApp / Email / Copy =====
  const form = document.getElementById('inquiryForm');
  const overlay = document.getElementById('inquiryOverlay');
  const preview = document.getElementById('inquiryPreview');
  const waLink = document.getElementById('inquiryWA');
  const mailLink = document.getElementById('inquiryMail');
  const copyBtn = document.getElementById('inquiryCopy');
  const closeBtn = document.getElementById('inquiryClose');
  const WA_NUMBER = '8613877228460'; // +86 138 7722 8460 (无+号)
  const MAIL_TO = 'tiktokmarch2024@outlook.com';

  function openInquiry(data) {
    if (!overlay) return;
    const subject = `Inquiry from ${data.name} (${data.country || 'N/A'})`;
    const body = `Name: ${data.name}\nEmail: ${data.email}\nCountry: ${data.country || ''}\n\nMessage:\n${data.message}`;
    const text = `Hello Haogeng,\n\n${body}\n\n--\nSent from https://haogeng.net`;
    // 预览
    if (preview) preview.textContent = `Subject: ${subject}\n\n${body}`;
    // WhatsApp
    if (waLink) waLink.href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
    // Email
    if (mailLink) mailLink.href = `mailto:${MAIL_TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    // Copy 按钮存当前内容
    if (copyBtn) copyBtn.dataset.text = text;
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeInquiry() {
    if (!overlay) return;
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      openInquiry({
        name: fd.get('name') || '',
        email: fd.get('email') || '',
        country: fd.get('country') || '',
        message: fd.get('message') || '',
      });
    });
  }
  if (closeBtn) closeBtn.addEventListener('click', closeInquiry);
  if (overlay) overlay.addEventListener('click', (e) => { if (e.target === overlay) closeInquiry(); });
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const txt = copyBtn.dataset.text || '';
      try {
        await navigator.clipboard.writeText(txt);
        const label = copyBtn.querySelector('.inquiry-label strong');
        const orig = label ? label.textContent : 'Copy Inquiry';
        if (label) {
          label.textContent = '✓ Copied!';
          setTimeout(() => { label.textContent = orig; }, 1800);
        }
      } catch (err) {
        alert('Copy failed, please select and copy manually:\n\n' + txt);
      }
    });
  }
  // ESC 关闭
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeInquiry(); });

  // 页脚年份
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});