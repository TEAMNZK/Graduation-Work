This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Javaドリルの検証

- `npm test`: 採点、API、進捗計算の回帰テスト。
- `npm run check:java`: 全見本コードをJava 13互換でコンパイルし、全入力ケースと戻り値・宣言の検証を実行します。ローカルのJDK（`java`と`javac`）が必要です。ファイル入出力は一時フォルダ内で実行します。
- `npx tsc --noEmit` / `npm run lint`: 型とLintの確認。

問題文・見本は`src/data/javaQuestions.ts`と`src/data/javaExercises`、追加入力ケースは`javaTestCases.ts`、メソッド等の実行時検証は`javaVerifications.ts`で管理します。採点はサーバー側で行い、Judge0の正常終了、全ケースの出力、コメントや文字列を除外したコード要素を確認します。有限のテストケースによる検証であり、任意のJavaコードの意味を完全に証明するものではありません。

達成率は現在登録されている問題IDのうち、解答済みの一意なIDの割合です。削除済みの問題IDや旧トピックIDは集計しません。

## C言語ドリル

`/drill/c` で30単元・通常160問と制作7問、合計167問（必修166問＋任意1問）を選び、`/drill/c/start` で解答できます。問題の索引は `src/data/cQuestions.ts`、追加の演習は `src/data/cLessons/`、制作課題は `src/data/cProjects.ts` と `src/data/cInventoryProject.ts`、カリキュラムは `src/data/cCurriculum.ts`、サーバー採点は `src/lib/cGrading.ts` で管理します。既存の問題IDは維持しています。

条件分岐の後に「お会計アプリ」、配列・関数の後に「成績集計アプリ」、ポインタ・構造体の後に「在庫管理アプリ」を配置しています。各課題には完成目標、既習項目、制作手順、見本コードと複数のテストケースがあります。選択問題は学習順で出題し、一覧で準備の演習数と制作物の完成数を確認できます。制作物は標準入力・標準出力で動くコンソールアプリです。

第5章の最後では、在庫管理を「複数商品と検索→動的メモリで件数拡張→ファイル保存・復元」の3問で育てます。各段階のエディターには前段階の見本を用意します。3段階のクリアで4つ目の制作物が完成し、ビットを使う販売状態フラグは任意の発展として独立しています。一括選択とダッシュボードの必修達成率から任意課題を除外します。保存ファイルは実行ごとに独立するため、同一実行内の「保存→全削除→復元」で再起動に相当する動作を検証します。実際の別リクエスト間でファイルが保持される機能ではありません。

入力・演算・論理演算・switch・繰り返し・配列・検索・整列・2次元データ・集計・関数・文字列・文字分類・解析・行処理・入力検証・再帰・ポインタ・構造体・台帳・ビット・列挙型・マクロ・動的メモリ・ファイル操作を扱います。各問題に見本とヒントを用意し、入力のある問題は原則3件以上のケースで検証します。

実行には既存の `JUDGE0_BASE_URL`（未設定時は `https://ce.judge0.com`）を使い、C (GCC 9.2.0)、言語ID 50に送信します。サーバーの問題定義を用い、正常終了と各ケースの出力一致を確認します。指定関数は追加の呼び出しで戻り値や参照先の更新を検査し、ファイル課題は保存内容も検査します。必要なコード要素はコメント・文字列を除外して確認します。メモリ解放の完全性、再帰の必須使用、任意のコードの意味まで証明する採点ではありません。

進捗は `c-` で始まる問題IDとしてFirestoreに保存し、中断位置は `drill-c-session` に保存します。ダッシュボードの達成率とおすすめ問題は最終学習言語に合わせて表示します。

`node --test tests/c-drill.test.cjs tests/execute-route.test.cjs` でCの採点・APIと既存言語の振り分けを検証できます。テストでは実行サービスをモックしています。

`npm run check:c` は見本コードをC99でコンパイルし、全ケースを別々の一時フォルダで実行します。gcc/clangをPATHに追加するか、環境変数`CC`へコンパイラの実行ファイルを指定してください。TCCでも検証可能です。`C_QUESTION_FILTER=c-files-` のように接頭辞で対象を絞れます。ファイル課題の保存結果と指定関数の検証も含みます。ローカルの見本専用検証であり、利用者が送ったコードをホストPCで実行する用途には使いません。

## Pythonドリル

通常演習26単元154問と制作6問、合計160問です。既存26問のIDを残し、入力・計算・制御構文・コレクション・検索・関数・文字列・内包表記・クラス・再帰・ファイル・JSONまで拡充しています。

制作目標は「お会計→成績集計→タスク管理→保存・復元できるタスク管理」です。最後はJSON保存と、不正なファイルを検証しながら復元する2段階になっています。前段階の見本をエディターへ用意し、一覧に準備の進捗と制作物の完成数を表示します。

問題は `src/data/pythonQuestions.ts` と `src/data/pythonLessons/`、制作は `src/data/pythonProjects.ts`、学習順は `src/data/pythonCurriculum.ts` で管理します。各問題にヒント・見本・実行ケースを用意しています。

採点は `/api/execute` からサーバーの問題定義を使ってJudge0で行います。入力のある問題は複数ケースで検証し、指定関数の戻り値・リスト更新・クラスの独立した状態・保存ファイルも確認します。構文指定はPythonのASTとtokenizeで調べ、コメントや文字列だけで条件を満たした扱いにはしません。構文があるだけで学習意図を完全に証明できるわけではありません。

`npm run check:python` はローカルPythonで全見本と採点用の検証を実行します。`PYTHON`に実行ファイル、`PYTHON_QUESTION_FILTER`に問題IDの接頭辞を指定できます。各ケースは別の一時フォルダで動き、壊れたファイルなどの初期データも個別に用意します。ローカル実行するのはリポジトリの見本のみで、利用者の解答はJudge0で実行します。

ローカルではPython 3.8の文法指定でも解析しますが、これはPython 3.8実機の代わりではありません。使用する構文と標準ライブラリは既存のJudge0設定（言語ID 71）に合わせています。保存・復元は同じ実行内で検証し、別リクエスト間でファイルを保持する機能ではありません。

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
