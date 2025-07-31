// URLパラメータからプレビューIDを取得
const params = new URLSearchParams(window.location.search);
const previewId = params.get('id');

if (previewId) {
    // chrome.storageからHTMLコンテンツを取得
    chrome.storage.local.get([`preview_${previewId}`], (result) => {
        const previewData = result[`preview_${previewId}`];
        
        if (previewData && previewData.html) {
            // iframeにHTMLを設定
            const iframe = document.getElementById('preview-frame');
            iframe.srcdoc = previewData.html;
            
            // 使用済みのデータを削除
            chrome.storage.local.remove([`preview_${previewId}`]);
        } else {
            // エラー表示
            document.body.innerHTML = '<div class="error">プレビューデータが見つかりません。</div>';
        }
    });
} else {
    // エラー表示
    document.body.innerHTML = '<div class="error">プレビューIDが指定されていません。</div>';
}