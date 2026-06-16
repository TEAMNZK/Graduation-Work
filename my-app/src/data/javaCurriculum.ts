export type JavaCurriculumItem = {
  id: string;
  no: string;
  title: string;
  type: "lesson" | "mini_project" | "final_project";
};

export type JavaCurriculumSection = {
  id: string;
  sectionTitle: string;
  description: string;
  items: JavaCurriculumItem[];
};

export const javaCurriculum: JavaCurriculumSection[] = [
  {
    id: "chapter1",
    sectionTitle: "第1章 基礎文法",
    description: "Javaの基本的な文法を学び、小作品につなげます。",
    items: [
      { id: "01-java-overview", no: "01", title: "Javaとは", type: "lesson" },
      { id: "02-how-to-run", no: "02", title: "アプリ上での実行方法", type: "lesson" },
      { id: "03-hello-world", no: "03", title: "Hello World", type: "lesson" },
      { id: "04-variables", no: "04", title: "変数", type: "lesson" },
      { id: "05-data-types", no: "05", title: "データ型", type: "lesson" },
      { id: "06-operators", no: "06", title: "演算子", type: "lesson" },
      { id: "07-input-output", no: "07", title: "入力と出力", type: "lesson" },
      { id: "08-if", no: "08", title: "if文", type: "lesson" },
      { id: "09-switch", no: "09", title: "switch文", type: "lesson" },
      { id: "10-for", no: "10", title: "for文", type: "lesson" },
      { id: "11-while", no: "11", title: "while文", type: "lesson" },
      { id: "project-janken", no: "演習", title: "じゃんけんゲーム", type: "mini_project" },
    ],
  },
  {
    id: "chapter2",
    sectionTitle: "第2章 配列とメソッド",
    description: "配列やメソッドを学び、条件判定アプリを作ります。",
    items: [
      { id: "12-array", no: "12", title: "配列", type: "lesson" },
      { id: "13-method", no: "13", title: "メソッド", type: "lesson" },
      { id: "14-overload", no: "14", title: "オーバーロード", type: "lesson" },
      { id: "project-score-app", no: "演習", title: "成績判定アプリ", type: "mini_project" },
    ],
  },
  {
    id: "chapter3",
    sectionTitle: "第3章 オブジェクト指向",
    description: "Javaらしい設計に必要な考え方を学びます。",
    items: [
      { id: "15-class-object", no: "15", title: "クラスとオブジェクト", type: "lesson" },
      { id: "16-constructor", no: "16", title: "コンストラクタ", type: "lesson" },
      { id: "17-static", no: "17", title: "static", type: "lesson" },
      { id: "18-inheritance", no: "18", title: "継承", type: "lesson" },
      { id: "19-polymorphism", no: "19", title: "ポリモーフィズム", type: "lesson" },
      { id: "20-abstract-interface", no: "20", title: "抽象クラス・インターフェース", type: "lesson" },
      { id: "21-package-import", no: "21", title: "パッケージとimport", type: "lesson" },
      { id: "22-exception", no: "22", title: "例外処理", type: "lesson" },
      { id: "23-file-io", no: "23", title: "ファイル入出力", type: "lesson" },
      { id: "24-collection", no: "24", title: "コレクション", type: "lesson" },
      { id: "project-todo", no: "演習", title: "Todoリスト", type: "mini_project" },
    ],
  },
  {
    id: "chapter4",
    sectionTitle: "第4章 発展文法",
    description: "より便利な書き方やライブラリを学びます。",
    items: [
      { id: "25-generics", no: "25", title: "ジェネリクス", type: "lesson" },
      { id: "26-lambda", no: "26", title: "ラムダ式", type: "lesson" },
      { id: "27-stream-api", no: "27", title: "Stream API", type: "lesson" },
      { id: "28-date-time", no: "28", title: "日付と時刻", type: "lesson" },
      { id: "project-library-enhance", no: "演習", title: "図書管理アプリ強化", type: "mini_project" },
    ],
  },
  {
    id: "chapter5",
    sectionTitle: "第5章 総合演習",
    description: "これまで学んだ内容を組み合わせて作品を完成させます。",
    items: [
      { id: "32-final-exercise", no: "32", title: "総合演習", type: "lesson" },
      { id: "project-library-final", no: "総合", title: "図書管理アプリ完成", type: "final_project" },
    ],
  },
];