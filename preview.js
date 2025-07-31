// URLパラメータからHTMLコンテンツを取得
const params = new URLSearchParams(window.location.search);
const htmlContent = params.get('html');
const baseUrl = params.get('baseUrl');

if (htmlContent && baseUrl) {
    // デコードしたHTMLコンテンツを構築
    const decodedHtml = decodeURIComponent(htmlContent);
    
    // 完全なHTMLドキュメントを作成
    const fullHtml = `<!DOCTYPE html>
<html>
<head>
    <base href="${baseUrl}">
    <meta charset="UTF-8">
    <title>HTML Preview</title>
</head>
<body>
${decodedHtml}
</body>
</html>`;
    
    // iframeにHTMLを設定
    const iframe = document.getElementById('preview-frame');
    iframe.srcdoc = fullHtml;
}