# 新楓之谷 VIP 階級計算機

方便玩家快速計算在《新楓之谷》提升或維持 VIP 階級所需的點數與花費。

## 專案功能

- 計算不同 VIP 階級計算所需花費
- 支援兩種點數使用方式：自用 / 送禮
- 支援自動計算最低幣值或手動設定幣值

## 安裝與啟動

1. 安裝依賴：
```bash
npm install
```
2. 啟動本地開發伺服器：
```bash
npm run dev
```
3. 開啟瀏覽器：
```bash
http://localhost:5173
```
4. 編譯與打包：
```bash
npm run build
```
5. 部署到github pages：
```bash
npm run deploy
```

## 專案結構
```plaintext
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Calculator.jsx
│   │   └── HomePage.jsx
│   ├── App.jsx
│   └── main.jsx
├── public/
└── index.html
```

## 注意事項
- 本工具僅供玩家參考使用，實際數據可能因遊戲版本或規則改動而有所不同
- 若遇到數值異常，請確認輸入資料是否正確