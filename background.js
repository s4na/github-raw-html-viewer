chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'openHtmlPreview') {
    const { html, baseUrl } = request;
    
    console.log('Background: HTMLプレビューリクエストを受信', {
      htmlLength: html.length,
      baseUrl: baseUrl
    });
    
    // HTMLドキュメントを完全に構築
    const fullHtml = `<!DOCTYPE html>
<html>
<head>
    <base href="${baseUrl}">
    <meta charset="UTF-8">
    <title>HTML Preview</title>
</head>
<body>
${html}
</body>
</html>`;
    
    // Blob URLを作成（ダウンロードではなくブラウザで表示）
    const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
    const blobUrl = URL.createObjectURL(blob);
    
    // 新しいタブで開く
    chrome.tabs.create({ url: blobUrl }, (tab) => {
      console.log('Background: 新しいタブを作成しました', tab.id);
      
      // 30秒後にBlob URLを解放
      setTimeout(() => {
        URL.revokeObjectURL(blobUrl);
      }, 30000);
    });
    
    sendResponse({ success: true });
  }
  return true;
});