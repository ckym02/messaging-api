// .envファイルから環境変数の読み込み
require('dotenv').config()
const https = require("https")
const express = require("express")
const app = express()

const PORT = process.env.PORT
const TOKEN = process.env.LINE_ACCESS_TOKEN

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

// ヘルスチェックが失敗しないように
app.get("/", (req, res) => {
  res.sendStatus(200)
  console.log('Hello World!')
})

// postリクエストをルーティングする→ボットサーバがきたリクエストにどのように対応するのかを設定
app.post("/webhook", function(req, res) {
  res.send("HTTP POST request sent to the webhook URL!")

  if (req.body.events[0].type === "message") {

  // 応答トークンを受け取る
  const dataString = JSON.stringify({
    replyToken: req.body.events[0].replyToken,
    messages: [
      {
        "type": "text",
        "text": "Hello, user"
      },
      {
        "type": "text",
        "text": "May I help you?"
      }
    ]
  })

  // ユーザの返信をpostするためのリクエストヘッダの作成
  const headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + TOKEN
  }
  
  // node.jsの仕様（エンドポイントのホスト名とパスなどのオプションを設定）
  const webhookOptions = {
    "hostname": "api.line.me",
    "path": "/v2/bot/message/reply",
    "method": "POST",
    "headers": headers,
    "body": dataString
  }

  const request = https.request(webhookOptions, (res) => {
    res.on("data", (d) => {
      process.stdout.write(d)
    })
  })

    // リクエスト送信時のエラーをキャッチ
    request.on("error", (err) => {
      console.error(err)
    })
  
    // 定義したリクエストの送信
    request.write(dataString)
    request.end()
  }
})

app.get("/push-message", function(req, res) {

  const dataString = JSON.stringify({
    to: line_user_id,
    messages: [
      {
        "type": "text",
        "text": "プッシュメッセージ送信しました"
      },
      {
        "type": "text",
        "text": "元気ですか？"
      }
    ]
  })

  // postするためのリクエストヘッダの作成
  const headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + TOKEN
  }
  
  // node.jsの仕様（エンドポイントのホスト名とパスなどのオプションを設定）
  const webhookOptions = {
    "hostname": "api.line.me",
    "path": "/v2/bot/message/push",
    "method": "POST",
    "headers": headers,
    "body": dataString
  }

  const request = https.request(webhookOptions, (res) => {
    res.on("data", (d) => {
      process.stdout.write(d)
    })
  })

  // リクエスト送信時のエラーをキャッチ
  request.on("error", (err) => {
    console.error(err)
  })

  // 定義したリクエストの送信
  request.write(dataString)
  request.end()
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})