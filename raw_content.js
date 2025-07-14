(function () {
  if (!location.hostname.startsWith('raw.githubusercontent.com')) return;

  const btn = document.createElement('button');
  btn.textContent = 'HTMLプレビュー';
  Object.assign(btn.style, {
    position: 'fixed',
    top: '10px',
    right: '10px',
    zIndex: 99999,
    padding: '8px 16px',
    background: '#2da44e',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
    transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
  });

  btn.addEventListener('mouseenter', () => {
    btn.style.background = '#2c974b';
    btn.style.boxShadow = '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)';
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.background = '#2da44e';
    btn.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)';
  });

  document.documentElement.appendChild(btn);

  btn.addEventListener('click', () => {
    const srcHtml = document.body.innerText;

    const baseHref = location.href.replace(/[^/]+$/, '');
    const htmlWithBase = srcHtml.replace(/<head[^>]*>/i, match => {
      return `${match}<base href="${baseHref}">`;
    });

    const blob = new Blob([htmlWithBase], { type: 'text/html; charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const newWindow = window.open(url, '_blank');
    
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);
  });
})();