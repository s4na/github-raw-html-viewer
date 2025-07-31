chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'openHtmlPreview') {
    const { html, baseUrl } = request;
    
    console.log('Background: HTMLプレビューリクエストを受信', {
      htmlLength: html.length,
      baseUrl: baseUrl
    });
    
    try {
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
      
      // Data URLを使用（Manifest V3のservice workerではBlob URLが使えないため）
      const dataUrl = `data:text/html;charset=utf-8,${encodeURIComponent(fullHtml)}`;
      
      // 新しいタブで開く
      chrome.tabs.create({ url: dataUrl }, (tab) => {
        if (chrome.runtime.lastError) {
          console.error('Background: タブ作成エラー', chrome.runtime.lastError);
          sendResponse({ success: false, error: chrome.runtime.lastError.message });
          return;
        }
        
        console.log('Background: 新しいタブを作成しました', tab.id);
        sendResponse({ success: true });
      });
      
    } catch (error) {
      console.error('Background: エラーが発生しました', error);
      sendResponse({ success: false, error: error.message });
    }
    
    return true; // 非同期レスポンスのために必要
  }
});