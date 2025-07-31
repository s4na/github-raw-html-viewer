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
    
    // 拡張機能のプレビューページを使用してHTMLを表示
    const previewUrl = chrome.runtime.getURL('preview.html') + 
      '?html=' + encodeURIComponent(html) + 
      '&baseUrl=' + encodeURIComponent(baseUrl);
    
    // 新しいタブで開く
    chrome.tabs.create({ url: previewUrl }, (tab) => {
      console.log('Background: 新しいタブを作成しました', tab.id);
    });
    
    sendResponse({ success: true });
  }
  return true;
});