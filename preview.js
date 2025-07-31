// URLパラメータからプレビューIDを取得
const params = new URLSearchParams(window.location.search);
const previewId = params.get('id');

if (previewId) {
    // chrome.storageからHTMLコンテンツを取得
    chrome.storage.local.get([`preview_${previewId}`], (result) => {
        const previewData = result[`preview_${previewId}`];
        
        if (previewData && previewData.html) {
            // Blob URLを作成してiframeのsrcに設定
            const blob = new Blob([previewData.html], { type: 'text/html;charset=utf-8' });
            const blobUrl = URL.createObjectURL(blob);
            
            const iframe = document.getElementById('preview-frame');
            iframe.src = blobUrl;
            
            // iframeが読み込まれたらBlob URLを解放
            iframe.onload = () => {
                // 少し遅延させてから解放（読み込み完了を確実にするため）
                setTimeout(() => {
                    URL.revokeObjectURL(blobUrl);
                }, 1000);
            };
            
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