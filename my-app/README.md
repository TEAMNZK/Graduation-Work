This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Javaドリルの検証

- `npm test`: 採点、API、進捗計算の回帰テスト。
- `npm run check:java`: 全見本コードをJava 13互換でコンパイルし、全入力ケースと戻り値・宣言の検証を実行します。ローカルのJDK（`java`と`javac`）が必要です。ファイル入出力は一時フォルダ内で実行します。
- `npx tsc --noEmit` / `npm run lint`: 型とLintの確認。

問題文・見本は`src/data/javaQuestions.ts`と`src/data/javaExercises`、追加入力ケースは`javaTestCases.ts`、メソッド等の実行時検証は`javaVerifications.ts`で管理します。採点はサーバー側で行い、Judge0の正常終了、全ケースの出力、コメントや文字列を除外したコード要素を確認します。有限のテストケースによる検証であり、任意のJavaコードの意味を完全に証明するものではありません。

達成率は現在登録されている問題IDのうち、解答済みの一意なIDの割合です。削除済みの問題IDや旧トピックIDは集計しません。

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
