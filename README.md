# Kohinata Mikuru Official Website

小日向みくる公式サイトの静的ファイルです。

## URL設計

- `GET /` - トップページ
- `GET /contact/` - お問い合わせページ
- `POST` - Google Form 側で送信処理

`/index.html`、`/contact.html`、`/contact/index.html` にアクセスされた場合は、見た目に出ないようにクリーンURLへリダイレクトします。

## Cloudflare Pages

- Project name: `kohinata-mikuru-official`
- Default URL: `https://kohinata-mikuru-official.pages.dev`
- Build command: none
- Output directory: `.`

## Local Preview

静的サーバーでルートを配信してください。
