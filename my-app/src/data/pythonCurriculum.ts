import type { PythonQuestion } from "./pythonQuestions";

export const pythonCurriculum: {
  id: string; sectionTitle: string; description: string;
  items: Pick<PythonQuestion, "id" | "no" | "title" | "type">[];
}[] = [
  {
    "id": "chapter1",
    "sectionTitle": "第1章 Pythonの基礎",
    "description": "出力・変数・演算・標準入力を学びます。",
    "items": [
      {
        "id": "python-hello",
        "no": "01",
        "title": "画面への出力",
        "type": "lesson"
      },
      {
        "id": "python-variables",
        "no": "02",
        "title": "変数",
        "type": "lesson"
      },
      {
        "id": "python-arithmetic",
        "no": "03",
        "title": "演算子",
        "type": "lesson"
      },
      {
        "id": "python-input",
        "no": "04",
        "title": "標準入力",
        "type": "lesson"
      }
    ]
  },
  {
    "id": "chapter2",
    "sectionTitle": "第2章 制御構文",
    "description": "条件分岐と繰り返しを練習します。",
    "items": [
      {
        "id": "python-if",
        "no": "05",
        "title": "条件分岐",
        "type": "lesson"
      },
      {
        "id": "python-for",
        "no": "06",
        "title": "for文",
        "type": "lesson"
      },
      {
        "id": "python-while",
        "no": "07",
        "title": "while文",
        "type": "lesson"
      }
    ]
  },
  {
    "id": "chapter3",
    "sectionTitle": "第3章 データと関数",
    "description": "リスト・辞書・関数を使います。",
    "items": [
      {
        "id": "python-list",
        "no": "08",
        "title": "リスト",
        "type": "lesson"
      },
      {
        "id": "python-dict",
        "no": "09",
        "title": "辞書",
        "type": "lesson"
      },
      {
        "id": "python-function",
        "no": "10",
        "title": "関数",
        "type": "lesson"
      }
    ]
  },
  {
    "id": "chapter4",
    "sectionTitle": "第4章 発展と制作",
    "description": "例外処理とクラスを学び、成績集計に挑戦します。",
    "items": [
      {
        "id": "python-exception",
        "no": "11",
        "title": "例外処理",
        "type": "lesson"
      },
      {
        "id": "python-class",
        "no": "12",
        "title": "クラス",
        "type": "lesson"
      },
      {
        "id": "python-score-app",
        "no": "13",
        "title": "成績集計アプリ",
        "type": "mini_project"
      }
    ]
  }
];
