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
    
    // Data URLを使用してHTMLを直接開く（スクリプト実行を許可）
    const dataUrl = `data:text/html;charset=utf-8,${encodeURIComponent(fullHtml)}`;
    
    // 新しいタブで開く
    chrome.tabs.create({ url: dataUrl }, (tab) => {
      console.log('Background: 新しいタブを作成しました', tab.id);
    });
    
    sendResponse({ success: true });
  }
  return true;
});