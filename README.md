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

2. API サーバーの起動

```
cd main-api
pnpm dev
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
