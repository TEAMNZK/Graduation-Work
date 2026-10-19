export type PythonQuestion = {
  id: string;
  no: string;
  title: string;
  description: string;
  hint: string;
  sampleInput?: string;
  expectedOutput: string;
  starterCode: string;
  answerCode: string;
  requiredPatterns?: string[];
  forbiddenPatterns?: string[];
  type: "lesson" | "mini_project" | "final_project";
};

const questions: PythonQuestion[] = [
  {
    "id": "python-hello-q1",
    "no": "01",
    "title": "画面への出力",
    "description": "print()を使って Hello Python と表示してください。",
    "hint": "print()の引数に文字列を渡します。",
    "sampleInput": "",
    "expectedOutput": "Hello Python",
    "answerCode": "print(\"Hello Python\")",
    "requiredPatterns": [
      "print("
    ],
    "starterCode": "# ここにコードを書いてください\n",
    "type": "lesson"
  },
  {
    "id": "python-variables-q1",
    "no": "02",
    "title": "変数",
    "description": "nameにTaro、ageに20を代入し、print(name, age)で表示してください。",
    "hint": "文字列と整数をそれぞれ変数に代入します。",
    "sampleInput": "",
    "expectedOutput": "Taro 20",
    "answerCode": "name = \"Taro\"\nage = 20\nprint(name, age)",
    "requiredPatterns": [
      "name =",
      "age ="
    ],
    "starterCode": "# ここにコードを書いてください\n",
    "type": "lesson"
  },
  {
    "id": "python-arithmetic-q1",
    "no": "03",
    "title": "演算子",
    "description": "aに17、bに5を代入し、商の整数部分と余りをそれぞれ改行して表示してください。",
    "hint": "整数除算は //、余りは % です。",
    "sampleInput": "",
    "expectedOutput": "3\n2",
    "answerCode": "a = 17\nb = 5\nprint(a // b)\nprint(a % b)",
    "requiredPatterns": [
      "//",
      "%"
    ],
    "starterCode": "# ここにコードを書いてください\n",
    "type": "lesson"
  },
  {
    "id": "python-input-q1",
    "no": "04",
    "title": "標準入力",
    "description": "標準入力から整数を2行読み取り、合計を表示してください。",
    "hint": "int(input())で1行ずつ整数を読み取れます。",
    "sampleInput": "7\n8\n",
    "expectedOutput": "15",
    "answerCode": "a = int(input())\nb = int(input())\nprint(a + b)",
    "requiredPatterns": [
      "input(",
      "int("
    ],
    "starterCode": "# ここにコードを書いてください\n",
    "type": "lesson"
  },
  {
    "id": "python-if-q1",
    "no": "05",
    "title": "条件分岐",
    "description": "標準入力から点数を読み取り、60以上ならPass、未満ならFailと表示してください。",
    "hint": "ifとelseを使い、処理を4スペース字下げします。",
    "sampleInput": "75\n",
    "expectedOutput": "Pass",
    "answerCode": "score = int(input())\nif score >= 60:\n    print(\"Pass\")\nelse:\n    print(\"Fail\")",
    "requiredPatterns": [
      "if ",
      "else:",
      "input("
    ],
    "starterCode": "# ここにコードを書いてください\n",
    "type": "lesson"
  },
  {
    "id": "python-for-q1",
    "no": "06",
    "title": "for文",
    "description": "for文とrange()を使って1から5を1行ずつ表示してください。",
    "hint": "range(1, 6)は1から5までの整数を返します。",
    "sampleInput": "",
    "expectedOutput": "1\n2\n3\n4\n5",
    "answerCode": "for number in range(1, 6):\n    print(number)",
    "requiredPatterns": [
      "for ",
      "range("
    ],
    "starterCode": "# ここにコードを書いてください\n",
    "type": "lesson"
  },
  {
    "id": "python-while-q1",
    "no": "07",
    "title": "while文",
    "description": "countを3から始め、while文で3、2、1を改行して表示してください。",
    "hint": "繰り返すたびにcountを1減らします。",
    "sampleInput": "",
    "expectedOutput": "3\n2\n1",
    "answerCode": "count = 3\nwhile count > 0:\n    print(count)\n    count -= 1",
    "requiredPatterns": [
      "while "
    ],
    "starterCode": "# ここにコードを書いてください\n",
    "type": "lesson"
  },
  {
    "id": "python-list-q1",
    "no": "08",
    "title": "リスト",
    "description": "numbers = [10, 20, 30]を作成し、40を追加して合計と要素数を改行して表示してください。",
    "hint": "append()、sum()、len()を使います。",
    "sampleInput": "",
    "expectedOutput": "100\n4",
    "answerCode": "numbers = [10, 20, 30]\nnumbers.append(40)\nprint(sum(numbers))\nprint(len(numbers))",
    "requiredPatterns": [
      ".append(",
      "sum(",
      "len("
    ],
    "starterCode": "# ここにコードを書いてください\n",
    "type": "lesson"
  },
  {
    "id": "python-dict-q1",
    "no": "09",
    "title": "辞書",
    "description": "辞書studentにname: Taroとscore: 80を格納し、名前と点数を空白区切りで表示してください。",
    "hint": "辞書の値はstudent[キー]で取り出せます。",
    "sampleInput": "",
    "expectedOutput": "Taro 80",
    "answerCode": "student = {\"name\": \"Taro\", \"score\": 80}\nprint(student[\"name\"], student[\"score\"])",
    "requiredPatterns": [
      "student =",
      "student["
    ],
    "starterCode": "# ここにコードを書いてください\n",
    "type": "lesson"
  },
  {
    "id": "python-function-q1",
    "no": "10",
    "title": "関数",
    "description": "2つの数の合計を返すadd関数を定義し、add(3, 4)の結果を表示してください。",
    "hint": "defで定義し、returnで結果を返します。",
    "sampleInput": "",
    "expectedOutput": "7",
    "answerCode": "def add(a, b):\n    return a + b\n\nprint(add(3, 4))",
    "requiredPatterns": [
      "def add(",
      "return "
    ],
    "starterCode": "# ここにコードを書いてください\n",
    "type": "lesson"
  },
  {
    "id": "python-exception-q1",
    "no": "11",
    "title": "例外処理",
    "description": "標準入力を整数に変換して表示し、変換できない場合はInvalidと表示してください。",
    "hint": "tryとexcept ValueErrorを使います。",
    "sampleInput": "abc\n",
    "expectedOutput": "Invalid",
    "answerCode": "try:\n    number = int(input())\n    print(number)\nexcept ValueError:\n    print(\"Invalid\")",
    "requiredPatterns": [
      "try:",
      "except ValueError:",
      "input("
    ],
    "starterCode": "# ここにコードを書いてください\n",
    "type": "lesson"
  },
  {
    "id": "python-class-q1",
    "no": "12",
    "title": "クラス",
    "description": "名前を保持するPersonクラスを定義し、Taroというインスタンスのnameを表示してください。",
    "hint": "__init__でself.nameに値を保存します。",
    "sampleInput": "",
    "expectedOutput": "Taro",
    "answerCode": "class Person:\n    def __init__(self, name):\n        self.name = name\n\nperson = Person(\"Taro\")\nprint(person.name)",
    "requiredPatterns": [
      "class Person:",
      "def __init__(",
      "self.name"
    ],
    "starterCode": "# ここにコードを書いてください\n",
    "type": "lesson"
  },
  {
    "id": "python-score-app-q1",
    "no": "13",
    "title": "成績集計アプリ",
    "description": "標準入力の1行目から人数、続く行から各人の整数の点数を読み取り、合計と平均を改行して表示してください。平均は小数点以下1桁にします。人数は1以上です。",
    "hint": "リストに点数を格納し、sum()とf文字列の:.1fを使えます。",
    "sampleInput": "3\n70\n80\n90\n",
    "expectedOutput": "240\n80.0",
    "answerCode": "count = int(input())\nscores = []\nfor _ in range(count):\n    scores.append(int(input()))\ntotal = sum(scores)\nprint(total)\nprint(f\"{total / count:.1f}\")",
    "requiredPatterns": [
      "input(",
      "for ",
      "sum("
    ],
    "starterCode": "# ここにコードを書いてください\n",
    "type": "mini_project"
  },
{
    "id": "python-hello-q2",
    "no": "01",
    "title": "2行のメッセージ",
    "description": "print()を2回使い、1行目に Hello、2行目に Python と表示してください。",
    "hint": "表示したい順にprint()を呼び出します。",
    "sampleInput": "",
    "expectedOutput": "Hello\nPython",
    "answerCode": "print(\"Hello\")\nprint(\"Python\")",
    "requiredPatterns": [
      "print("
    ],
    "starterCode": "# ここにコードを書いてください\n",
    "type": "lesson"
  },
  {
    "id": "python-variables-q2",
    "no": "02",
    "title": "変数の更新",
    "description": "priceに120、countに3を代入してください。totalにpriceとcountの積を代入し、totalを表示してください。",
    "hint": "掛け算には * を使います。",
    "sampleInput": "",
    "expectedOutput": "360",
    "answerCode": "price = 120\ncount = 3\ntotal = price * count\nprint(total)",
    "requiredPatterns": [
      "price",
      "count",
      "total",
      "*"
    ],
    "starterCode": "# ここにコードを書いてください\n",
    "type": "lesson"
  },
  {
    "id": "python-arithmetic-q2",
    "no": "03",
    "title": "時間の換算",
    "description": "total_minutesに135を代入し、整数除算と余りを使って時間と残りの分を求め、空白区切りで表示してください。",
    "hint": "60で割った商が時間、余りが分です。",
    "sampleInput": "",
    "expectedOutput": "2 15",
    "answerCode": "total_minutes = 135\nprint(total_minutes // 60, total_minutes % 60)",
    "requiredPatterns": [
      "//",
      "%"
    ],
    "starterCode": "# ここにコードを書いてください\n",
    "type": "lesson"
  },
  {
    "id": "python-input-q2",
    "no": "04",
    "title": "名前を使った挨拶",
    "description": "標準入力から名前を1行読み取り、Hello, 名前! の形式で表示してください。",
    "hint": "input()で読み取り、f文字列などで挨拶を組み立てます。",
    "sampleInput": "Hanako\n",
    "expectedOutput": "Hello, Hanako!",
    "answerCode": "name = input()\nprint(f\"Hello, {name}!\")",
    "requiredPatterns": [
      "input("
    ],
    "starterCode": "# ここにコードを書いてください\n",
    "type": "lesson"
  },
  {
    "id": "python-if-q2",
    "no": "05",
    "title": "3段階の成績判定",
    "description": "標準入力から整数の点数を読み取り、80以上ならA、60以上80未満ならB、60未満ならCと表示してください。if・elif・elseを使ってください。",
    "hint": "高い点数の条件から順に判定します。",
    "sampleInput": "70\n",
    "expectedOutput": "B",
    "answerCode": "score = int(input())\nif score >= 80:\n    print(\"A\")\nelif score >= 60:\n    print(\"B\")\nelse:\n    print(\"C\")",
    "requiredPatterns": [
      "input(",
      "if ",
      "elif ",
      "else:"
    ],
    "starterCode": "# ここにコードを書いてください\n",
    "type": "lesson"
  },
  {
    "id": "python-for-q2",
    "no": "06",
    "title": "偶数の合計",
    "description": "for文とrange()を使い、2から10までの偶数の合計を求めて表示してください。",
    "hint": "range(2, 11, 2)で偶数を順に取り出せます。",
    "sampleInput": "",
    "expectedOutput": "30",
    "answerCode": "total = 0\nfor number in range(2, 11, 2):\n    total += number\nprint(total)",
    "requiredPatterns": [
      "for ",
      "range("
    ],
    "starterCode": "# ここにコードを書いてください\n",
    "type": "lesson"
  },
  {
    "id": "python-while-q2",
    "no": "07",
    "title": "入力を合計する",
    "description": "整数を1行ずつ読み取り、0が入力されるまでwhile文で合計してください。0が入力されたら合計だけを表示してください。入力には最後に必ず0が含まれます。",
    "hint": "while文で繰り返し、0を読んだらbreakで終了できます。",
    "sampleInput": "5\n8\n2\n0\n",
    "expectedOutput": "15",
    "answerCode": "total = 0\nwhile True:\n    number = int(input())\n    if number == 0:\n        break\n    total += number\nprint(total)",
    "requiredPatterns": [
      "while ",
      "input("
    ],
    "starterCode": "# ここにコードを書いてください\n",
    "type": "lesson"
  },
  {
    "id": "python-list-q2",
    "no": "08",
    "title": "リストの並べ替え",
    "description": "scores = [75, 90, 60, 85]を作成し、sort()で昇順に並べ替えてください。先頭の値と末尾の値を、それぞれ改行して表示してください。",
    "hint": "sort()で並べ替え、[0]と[-1]で両端の値を取り出します。",
    "sampleInput": "",
    "expectedOutput": "60\n90",
    "answerCode": "scores = [75, 90, 60, 85]\nscores.sort()\nprint(scores[0])\nprint(scores[-1])",
    "requiredPatterns": [
      ".sort("
    ],
    "starterCode": "# ここにコードを書いてください\n",
    "type": "lesson"
  },
  {
    "id": "python-dict-q2",
    "no": "09",
    "title": "在庫数の更新",
    "description": "stock = {\"apple\": 3, \"banana\": 2}を作成してください。appleの在庫を4増やし、get()でorangeの在庫を取得して、appleとorangeの在庫を改行して表示してください。orangeが未登録の場合は0とします。",
    "hint": "辞書の値は更新できます。get(キー, 0)で未登録時の値を指定します。",
    "sampleInput": "",
    "expectedOutput": "7\n0",
    "answerCode": "stock = {\"apple\": 3, \"banana\": 2}\nstock[\"apple\"] += 4\nprint(stock[\"apple\"])\nprint(stock.get(\"orange\", 0))",
    "requiredPatterns": [
      ".get("
    ],
    "starterCode": "# ここにコードを書いてください\n",
    "type": "lesson"
  },
  {
    "id": "python-function-q2",
    "no": "10",
    "title": "戻り値を使った判定",
    "description": "整数が偶数ならTrue、奇数ならFalseを返すis_even関数を定義してください。is_even(8)とis_even(5)の結果を改行して表示してください。",
    "hint": "2で割った余りが0かどうかをreturnで返します。",
    "sampleInput": "",
    "expectedOutput": "True\nFalse",
    "answerCode": "def is_even(number):\n    return number % 2 == 0\n\nprint(is_even(8))\nprint(is_even(5))",
    "requiredPatterns": [
      "def is_even(",
      "return ",
      "%"
    ],
    "starterCode": "# ここにコードを書いてください\n",
    "type": "lesson"
  },
  {
    "id": "python-exception-q2",
    "no": "11",
    "title": "ゼロ除算への対応",
    "description": "標準入力から整数を読み取り、10をその数で割った結果を表示してください。0の場合はCannot divide by zeroと表示してください。tryとexcept ZeroDivisionErrorを使います。入力は整数とします。",
    "hint": "割り算をtry内に書き、ゼロ除算をexceptで処理します。",
    "sampleInput": "0\n",
    "expectedOutput": "Cannot divide by zero",
    "answerCode": "try:\n    number = int(input())\n    print(10 / number)\nexcept ZeroDivisionError:\n    print(\"Cannot divide by zero\")",
    "requiredPatterns": [
      "try:",
      "except ZeroDivisionError:",
      "input("
    ],
    "starterCode": "# ここにコードを書いてください\n",
    "type": "lesson"
  },
  {
    "id": "python-class-q2",
    "no": "12",
    "title": "カウンタークラス",
    "description": "Counterクラスを定義してください。__init__でself.countを0にし、incrementメソッドで1増やします。インスタンスを作り、incrementを3回呼び出してcountを表示してください。",
    "hint": "メソッドの第1引数はselfです。",
    "sampleInput": "",
    "expectedOutput": "3",
    "answerCode": "class Counter:\n    def __init__(self):\n        self.count = 0\n\n    def increment(self):\n        self.count += 1\n\ncounter = Counter()\ncounter.increment()\ncounter.increment()\ncounter.increment()\nprint(counter.count)",
    "requiredPatterns": [
      "class Counter:",
      "def __init__(",
      "def increment(",
      "self.count"
    ],
    "starterCode": "# ここにコードを書いてください\n",
    "type": "lesson"
  },
  {
    "id": "python-score-app-q2",
    "no": "13",
    "title": "合格者数の集計",
    "description": "標準入力の1行目から人数、続く行から各人の整数の点数を読み取ってください。最高点、最低点、60点以上の人数を、この順で改行して表示してください。人数は1以上です。",
    "hint": "点数をリストに格納し、max()・min()で最高点と最低点を求めます。",
    "sampleInput": "5\n45\n60\n90\n75\n50\n",
    "expectedOutput": "90\n45\n3",
    "answerCode": "count = int(input())\nscores = []\nfor _ in range(count):\n    scores.append(int(input()))\npassed = 0\nfor score in scores:\n    if score >= 60:\n        passed += 1\nprint(max(scores))\nprint(min(scores))\nprint(passed)",
    "requiredPatterns": [
      "input(",
      "for ",
      "max(",
      "min("
    ],
    "starterCode": "# ここにコードを書いてください\n",
    "type": "mini_project"
  }
];

export const pythonQuestionMap = questions.reduce<Record<string, PythonQuestion[]>>(
  (topicMap, question) => {
    const topicId = question.id.replace(/-q\d+$/, "");
    (topicMap[topicId] ??= []).push(question);
    return topicMap;
  },
  {}
);

export const pythonQuestionEntriesById = Object.fromEntries(
  Object.entries(pythonQuestionMap).flatMap(([topicId, items]) =>
    items.map((question, index) => [question.id, { ...question, topicId, questionIndex: index, questionCount: items.length }])
  )
);

export const getPythonQuestions = (topicId: string): PythonQuestion[] => pythonQuestionMap[topicId] ?? [];
export const hasPythonQuestions = (topicId: string): boolean => getPythonQuestions(topicId).length > 0;
