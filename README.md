# 慶應セパタクロークラブ リレーブログ

メンバーが順番にバトンをつなぐブログサイトです。**すべて無料**（GitHub だけで動きます）。

- 閲覧：誰でも見られる（外部公開）
- 編集：サークル共通の「トークン」を知っているメンバーだけ
- 代：卒業年度で自動分類（1代目 = 27卒、28卒 = 2代目 …）
- リレー：管理画面の「リレー順」で並べた順に回る。最新記事を書いた人の次が「執筆中」になる

- サイトURL：https://keiosepaktakrawclub.github.io/keio-sepak-blog/
- 編集ページ：https://keiosepaktakrawclub.github.io/keio-sepak-blog/admin/

---

## 初回セットアップ（管理者が1回だけ・PC推奨）

### 1. ファイルを入れる
1. https://github.com/keiosepaktakrawclub/keio-sepak-blog を開く
2. 「uploading an existing file」（または Add file → Upload files）をクリック
3. zip を解凍し、**`keio-sepak-blog` フォルダの中身すべて**をドラッグ＆ドロップ →「Commit changes」
   - `.github` フォルダは隠しフォルダです。Mac は Finder で `Command + Shift + .`、Windows はエクスプローラーの「表示 → 隠しファイル」で表示してから一緒に入れてください
   - 入れ忘れるとサイトが公開されません

### 2. 公開をオンにする
1. リポジトリの **Settings → Pages**
2. 「Build and deployment」の Source を **GitHub Actions** にする
3. **Actions** タブで緑のチェックが付けば完了（1〜2分）。うまくいかない時は Actions タブで「Deploy to GitHub Pages」→「Run workflow」

### 3. 共通トークンを作る
サークル用アカウントでログインした状態で：
1. 右上アイコン → **Settings** → 左メニュー最下部 **Developer settings**
2. **Personal access tokens → Fine-grained tokens → Generate new token**
3. 入力内容
   - Token name：`blog-editor`
   - Expiration：1年（引き継ぎ時に作り直す）
   - **Resource owner：keiosepaktakrawclub**
   - Repository access：**Only select repositories** → `keio-sepak-blog`
   - Permissions → Repository permissions：**Contents** と **Pull requests** を「Read and write」
4. 「Generate token」→ 表示された `github_pat_…` をコピー（**この画面でしか見られません**）
6. トークンを LINE グループのノートなど、メンバーだけが見られる場所に貼る

---

## 記事を書く（メンバー向け）

1. 編集ページ（サイト下部の「メンバー用 編集ページ」）を開く
2. **「トークンでサインイン（Sign In with Token）」** → 共通トークンを貼り付け
   （同じブラウザなら次回から不要）
3. 「記事」→「新規作成」→ タイトル・URL用英字・日付・書いた人・本文を入れて保存／公開
4. 1〜2分でサイトに反映されます

## リレー順を決める・変える

編集ページ →「リレー順」で、メンバーを追加・ドラッグで並べ替え → 保存。
- 最新記事を書いた人の **次の人** がトップに「NOW ON BATON」として表示されます
- 最後の人の次は先頭に戻ります
- 記事ごとに「次の走者」を指定すると、その記事の最後のバトン表示だけ変えられます

## 新しい代が入ったら

編集ページ →「メンバー」→ 新規作成で **卒業年度（例：2031）** を入れるだけ。代のページは自動で増えます。

## 最初にやること

編集ページで「メンバー」を登録 →「リレー順」を並べる → 1人目が記事を書く、の順で始めてください。

## 引き継ぎ・トラブル時

- **毎年の引き継ぎ時、または退部者が出たら**：トークンを作り直し（古いものは Settings → Fine-grained tokens から Delete）、新しいものを共有し直す
- **トークンが外部に漏れたら**：すぐ Delete して作り直す
- **共用アカウントのパスワード・2段階認証**は管理者が責任を持って保管し、次の代の管理者に引き継ぐ
- 次の代の管理者を Organization の **Owner** にも追加しておくと、共用アカウントに入れなくなってもサイトを守れます

---

### 開発者向け
```bash
npm install
npm start      # http://localhost:8080 でプレビュー
```
- サイト名などの設定：`src/_data/site.js`
- デザイン：`src/css/style.css`
- 構成：Eleventy（静的サイト生成）＋ Sveltia CMS（編集ページ）＋ GitHub Pages（公開）
