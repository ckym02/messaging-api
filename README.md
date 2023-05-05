# messaging-api

## 外部公開する

- ngrokのインストール
```
brew install --cask ngrok
```
- ngrokのアカウント作成
- 認証トークンの取得
- ngrokの認証
```
ngrok authtoken <your_auth_token>
```
- ngrokの起動
```
ngrok http 3030
```
## その他
- 公式アカウント
https://www.linebiz.com/jp/login/

- Devコンソール

## 動作確認方法
### 応答メッセージ
- サーバー起動
```
npm run start
```
- ngrokの起動
```
ngrok http 3030
```
- 公式アカウントにテキスト送信

### プッシュメッセージ
- リクエスト送信
```
 curl http://localhost:3030/push-message
```
- 公式アカウントからメッセージがくる