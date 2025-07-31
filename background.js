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
    
    // HTMLコンテンツを保存して、固有のIDを生成
    const previewId = Date.now().toString();
    
    // chrome.storageを使用してHTMLコンテンツを保存
    chrome.storage.local.set({
      [`preview_${previewId}`]: {
        html: fullHtml,
        timestamp: Date.now()
      }
    }, () => {
      // 拡張機能のプレビューページをIDパラメータ付きで開く
      const previewUrl = chrome.runtime.getURL('preview.html') + '?id=' + previewId;
      
      chrome.tabs.create({ url: previewUrl }, (tab) => {
        console.log('Background: 新しいタブを作成しました', tab.id);
        
        // 古いプレビューデータをクリーンアップ（5分以上経過したもの）
        chrome.storage.local.get(null, (items) => {
          const now = Date.now();
          const keysToRemove = [];
          
          for (const key in items) {
            if (key.startsWith('preview_') && items[key].timestamp) {
              if (now - items[key].timestamp > 5 * 60 * 1000) { // 5分
                keysToRemove.push(key);
              }
            }
          }
          
          if (keysToRemove.length > 0) {
            chrome.storage.local.remove(keysToRemove);
          }
        });
      });
    });
    
    sendResponse({ success: true });
  }
  return true;
});