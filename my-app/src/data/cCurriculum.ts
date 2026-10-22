import { cQuestionMap } from "./cQuestions";

const chapters = [
  { id: "c-basics", sectionTitle: "第1章 入力と判断 → お会計アプリ", description: "出力・変数・演算・条件分岐を学び、買い物で使える計算アプリを作ります。", topics: ["c-hello", "c-variables", "c-input", "c-numeric", "c-if", "c-logic", "c-switch", "c-project-checkout"] },
  { id: "c-data", sectionTitle: "第2章 繰り返しと集計 → 成績集計アプリ", description: "繰り返し・配列・検索・整列・関数を組み合わせ、複数人のデータを集計します。", topics: ["c-for", "c-while", "c-nested", "c-array", "c-search", "c-sort", "c-matrix", "c-stats", "c-function", "c-project-scores"] },
  { id: "c-text", sectionTitle: "第3章 文字列と入力の検証", description: "文字列の加工・数値への変換・入力検証と再帰を学びます。", topics: ["c-string", "c-ctype", "c-parsing", "c-text", "c-validation", "c-recursion"] },
  { id: "c-management", sectionTitle: "第4章 データの更新 → 在庫管理アプリ", description: "ポインタ・構造体・台帳の処理を学び、商品の状態を更新するアプリを完成させます。", topics: ["c-pointer", "c-struct", "c-records", "c-project-inventory"] },
  { id: "c-systems", sectionTitle: "第5章 保存できる在庫管理アプリへ", description: "発展文法を学んだ後、複数商品→メモリ拡張→保存・復元の3段階で制作します。状態フラグは任意の追加挑戦です。", topics: ["c-bits", "c-enum", "c-macro", "c-memory", "c-files", "c-project-inventory-advanced", "c-project-inventory-flags"] },
];
export const cCurriculum = chapters.map(({ topics, ...chapter }) => ({
  ...chapter,
  items: topics.map((id) => {
    const question = cQuestionMap[id][0];
    const titles: Record<string,string> = {
      "c-numeric":"整数の計算と単位変換", "c-logic":"論理演算", "c-switch":"switch文", "c-nested":"二重ループ",
      "c-search":"検索", "c-sort":"並べ替え", "c-matrix":"2次元データ", "c-stats":"統計と集計", "c-string":"文字列",
      "c-ctype":"文字の分類と変換", "c-parsing":"文字列の解析", "c-text":"行と文章の処理", "c-validation":"入力の検証",
      "c-recursion":"再帰", "c-records":"構造体配列と台帳", "c-bits":"ビット演算", "c-enum":"列挙型", "c-macro":"マクロ",
      "c-memory":"動的メモリ", "c-files":"ファイル操作",
    };
    return { id, no: question.no, title: titles[id] ?? question.title, type: question.type, project: question.project };
  }),
}));
