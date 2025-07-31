(function () {
  console.log('GitHub Raw HTML Viewer: スクリプトが読み込まれました');
  
  if (!location.hostname.startsWith('raw.githubusercontent.com')) {
    console.log('GitHub Raw HTML Viewer: raw.githubusercontent.comではないため、スキップします');
    return;
  }

  console.log('GitHub Raw HTML Viewer: ボタンを作成します');
  const btn = document.createElement('button');
  btn.textContent = 'Preview';
  Object.assign(btn.style, {
    position: 'fixed',
    top: '10px',
    right: '10px',
    zIndex: 99999,
    padding: '6px 12px',
    background: '#0969da',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    cursor: 'pointer'
  });

  btn.addEventListener('mouseenter', () => {
    btn.style.background = '#0860ca';
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.background = '#0969da';
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
      // chrome.runtime.lastErrorをチェック
      if (chrome.runtime.lastError) {
        console.error('GitHub Raw HTML Viewer: メッセージ送信エラー', chrome.runtime.lastError.message);
        return;
      }
      
      if (response && response.success) {
        console.log('GitHub Raw HTML Viewer: HTMLプレビューが新しいタブで開かれました');
      } else {
        console.error('GitHub Raw HTML Viewer: エラーが発生しました', response || 'レスポンスがありません');
      }
    });
  });
})();