# AiyoPerps 官方網站

此目錄為 AiyoPerps 官方網站的獨立靜態專案，預計部署網址為 `https://perps.aiyo.app`。

## 內容

- 根目錄 `index.html` 為繁體中文首頁
- `en/index.html` 為英文首頁
- `assets/` 放置共用樣式、腳本、圖片與 SEO 圖資

## 本機預覽

在此目錄執行：

```powershell
python -m http.server 4173
```

再開啟：

- `http://127.0.0.1:4173/`
- `http://127.0.0.1:4173/en/`

## 維護注意事項

- 本站為純靜態網站，不依賴前端框架
- 部署時請保留目錄結構，避免 `hreflang`、`canonical`、`sitemap.xml` 失效
- 若正式網址有調整，請同步更新兩個 HTML 頁面的 canonical、Open Graph URL 與 `sitemap.xml`
