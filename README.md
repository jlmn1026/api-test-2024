# api-test-2024

# 動作確認に必要なもの

```
- Docker
- VSCODEとdevContainerプラグイン
```

※開発は wsl2 上で行っています

# 動作確認

1. devContainer の起動
   vscode から container を open する(左下をクリックし、メニューから Reopen in Container を選択)

2. API サーバーの準備と起動

```
cd main-api
```

※初回のみ

```
cp .env.example .env
pnpm dlx prisma generate
```

サーバー起動

```
pnpm start:debug
```

3. モック API サーバーの起動

```
cd ../analysisImageMock
python3 manage.py runserver
```

4. フロントエンドサーバーの起動

```
cd ../frontend
pnpm dev
```
