# GitHub Raw HTML Viewer

Chrome拡張機能：GitHubのraw HTMLファイルをブラウザ上でレンダリング表示

## 機能

- `raw.githubusercontent.com` で配信されるHTMLファイルにプレビューボタンを追加
- ボタンクリックで新しいタブにHTMLをレンダリング表示
- 相対パス対応（`<base>` タグ自動挿入）
- プライベートリポジトリにも対応（認証情報を保持）

## インストール方法

1. このリポジトリをクローンまたはダウンロード
2. zip解凍
3. Chrome の拡張機能管理ページを開く（`chrome://extensions/`）
4. 右上の「デベロッパー モード」を有効化
5. 「パッケージ化されていない拡張機能を読み込む」をクリック
6. このプロジェクトのディレクトリを選択

## 使用方法

1. GitHubでHTMLファイルを開く
2. 「Raw」ボタンをクリックして生のHTMLを表示
3. 画面右上に表示される「HTMLプレビュー」ボタンをクリック
4. 新しいタブでレンダリングされたHTMLが表示される

## 技術仕様

- Manifest V3 対応
- content_scripts による DOM 操作
- Blob URL を使用した安全なプレビュー実装
- Cookie認証を維持しつつ別オリジンで実行

## ライセンス

MIT License
