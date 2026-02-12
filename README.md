# HBN 審圖 + AI 文案擷取（GitHub + Vercel）

這個 repo 會部署成一個網站：
- /public/index.html：審圖頁面（含 AI 抓圖文案 UI）
- /api/openai-proxy：Vercel Serverless Function，負責安全地轉發到 OpenAI Responses API
  - 你的 OPENAI_API_KEY 只放在 Vercel 的 Environment Variables，不會出現在前端或 GitHub。

## 部署到 Vercel（建議流程）
1. 把此 repo push 到 GitHub
2. Vercel Dashboard → New Project → Import 你的 repo
3. Project Settings → Environment Variables
   - Key: OPENAI_API_KEY
   - Value: 你的 OpenAI API Key（sk-...）
   - Environment: Production + Preview（建議都勾）
4. 重新 Deploy（或觸發一次新的 commit）
5. 開啟你的 Vercel 網址，使用頁面上的「AI抓文案圖」

## 本機測試（可選）
你可以用 `vercel dev` 或任意靜態伺服器測 public/，但 API 需要 Vercel Functions 才能跑。
