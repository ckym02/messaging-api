# messaging-api

外部公開するために

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