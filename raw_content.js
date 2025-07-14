(function () {
  console.log('GitHub Raw HTML Viewer: スクリプトが読み込まれました');
  
  if (!location.hostname.startsWith('raw.githubusercontent.com')) {
    console.log('GitHub Raw HTML Viewer: raw.githubusercontent.comではないため、スキップします');
    return;
  }

  console.log('GitHub Raw HTML Viewer: ボタンを作成します');
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
    console.log('GitHub Raw HTML Viewer: ボタンがクリックされました');
    
    const srcHtml = document.body.innerText;
    const baseHref = location.href.replace(/[^/]+$/, '');
    
    console.log('GitHub Raw HTML Viewer: HTMLコンテンツを取得しました', {
      htmlLength: srcHtml.length,
      baseHref: baseHref
    });

    // バックグラウンドスクリプトにメッセージを送信して新しいタブでHTMLを開く
    chrome.runtime.sendMessage({
      action: 'openHtmlPreview',
      html: srcHtml,
      baseUrl: baseHref
    }, response => {
      if (response && response.success) {
        console.log('GitHub Raw HTML Viewer: HTMLプレビューが新しいタブで開かれました');
      } else {
        console.error('GitHub Raw HTML Viewer: エラーが発生しました', response);
      }
    });
  });
})();