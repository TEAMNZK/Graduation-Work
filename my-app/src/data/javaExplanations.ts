import type { JavaQuestionEntry } from "@/data/javaQuestions";

type TopicGuide = { overview: string; points: string[]; textbook?: string };
const topicGuides: Record<string, TopicGuide> = {
  "01-java-overview": { overview: "Javaのプログラムは、mainメソッドの中に書いた処理から動き始めます。まずは文字を表示し、コードと実行結果のつながりを確かめましょう。", points: ["文字列は半角のダブルクォーテーションで囲みます。", "printlnは文字を表示した後に改行します。"], textbook: "01_intro" },
  "02-how-to-run": { overview: "mainメソッドの中の処理は、基本的に上から順に実行されます。表示する順番と改行の位置に注目しましょう。", points: ["printlnを複数回呼ぶと、それぞれ別の行に表示されます。", "文の最後にはセミコロンが必要です。"], textbook: "02_environment" },
  "03-hello-world": { overview: "System.out.printlnを使うと、文字列や計算結果を画面に表示できます。+は文字列同士をつなぐときにも使えます。", points: ["文字列の中のスペースも出力に含まれます。", "printは改行せず、printlnは最後に改行します。"], textbook: "03_hello_world" },
  "04-variables": { overview: "変数は、値に名前を付けて保管する入れ物です。変数名を使うと、その時点で入っている値を取り出せます。", points: ["型、変数名、初期値の順に宣言します。", "再代入では新しい値に置き換わります。"], textbook: "04_variables" },
  "05-data-types": { overview: "型は、変数にどのような値を入れられるかを決めます。整数、小数、文字、文字列、真偽値を区別しましょう。", points: ["整数はint、小数はdouble、真偽値はbooleanで扱います。", "charは1文字をシングルクォーテーションで、Stringは文字列をダブルクォーテーションで囲みます。"], textbook: "05_data_types" },
  "06-operators": { overview: "演算子は、値の計算や比較に使う記号です。式を計算した結果を変数に入れたり、そのまま表示したりできます。", points: ["整数同士の割り算では小数部分が切り捨てられます。", "括弧で計算順を指定できます。%は余り、比較式の結果はtrueかfalseです。"], textbook: "06_operators" },
  "07-input-output": { overview: "Scannerで標準入力を読み取り、受け取った値を使って処理します。入力を変えても、それに合わせた結果になることが大切です。", points: ["nextIntは整数、nextは空白までの単語、nextLineは1行を読み取ります。", "入力の順番と読み取る順番をそろえましょう。"], textbook: "07_input_output" },
  "08-if": { overview: "if文は、条件がtrueのときだけ処理を実行します。else ifとelseを組み合わせると、条件に応じて処理を分けられます。", points: ["else ifは上から確認され、最初に当てはまった分岐だけが実行されます。", "以上には>=を使います。&&は両方の条件が成立するときtrueになります。"], textbook: "08_if" },
  "09-switch": { overview: "switch文は、値に対応するcaseの処理へ進みます。値がどの選択肢に当たるかで処理を切り替えるときに便利です。", points: ["caseの末尾のbreakはswitchを抜けるために使います。", "defaultには、どのcaseにも一致しないときの処理を書きます。"], textbook: "09_switch" },
  "10-for": { overview: "for文は、初期化・繰り返す条件・更新をまとめて書く繰り返し処理です。まず最初の値で条件を確認し、処理と更新を繰り返します。", points: ["条件がfalseになった時点でループを終了します。", "合計を求める場合は、ループの前に合計用の変数を用意します。"], textbook: "10_for" },
  "11-while": { overview: "while文は、条件がtrueの間、同じ処理を繰り返します。条件の確認は処理の前なので、最初からfalseなら一度も実行されません。", points: ["ループ内でカウンターを更新しないと、終了しなくなることがあります。", "合計はループの外で初期化し、ループ内で足し込みます。"], textbook: "11_while" },
  "12-array": { overview: "配列は、同じ型の値をひとまとまりにして扱う仕組みです。添字を指定すると、その位置の要素を取り出せます。", points: ["最初の要素の添字は0です。2番目は1になります。", "lengthは要素数です。最後の添字はlength - 1です。"], textbook: "12_array" },
  "13-method": { overview: "メソッドは、名前を付けてまとめた処理です。呼び出すことでその中の処理が実行されます。引数で値を渡し、returnで結果を返せます。", points: ["voidは戻り値がないことを表します。intなどを指定した場合は、その型の値を返します。", "定義しただけでは処理は動きません。呼び出すコードも必要です。"], textbook: "13_method" },
  "14-overload": { overview: "オーバーロードは、同じ名前で引数の型や数が異なるメソッドを定義することです。呼び出し時の引数に合うものが選ばれます。", points: ["戻り値の型だけを変えても、オーバーロードにはなりません。", "メソッド名と引数の並びを見比べましょう。"], textbook: "14_overload" },
  "15-class-object": { overview: "クラスはデータや処理の設計図で、newで作るオブジェクトがその実体です。フィールドに値を保管し、メソッドで処理を行います。", points: ["同じクラスから作ったオブジェクトでも、インスタンスフィールドの値は別々に持てます。", "オブジェクト名.フィールド名や、オブジェクト名.メソッド名()でアクセスします。"], textbook: "15_class_object" },
  "16-constructor": { overview: "コンストラクタは、newでオブジェクトを作るときに呼ばれる初期化処理です。受け取った引数をフィールドに保存できます。", points: ["コンストラクタはクラスと同じ名前で、戻り値の型を書きません。", "this.nameのthisは、作成中のオブジェクト自身を表します。"], textbook: "16_constructor" },
  "17-static": { overview: "staticを付けたフィールドやメソッドは、個々のオブジェクトではなくクラスに属します。オブジェクトを作らずに利用できます。", points: ["staticメソッドはクラス名.メソッド名()で呼び出せます。", "static変数は同じクラスのオブジェクト間で共有されます。"], textbook: "17_static" },
  "18-inheritance": { overview: "継承は、親クラスの性質を子クラスへ引き継ぐ仕組みです。extendsで親を指定し、必要に応じて処理を上書きします。", points: ["同じ名前・引数のメソッドを子で定義すると、オーバーライドできます。", "superは親クラスの処理を呼び出すときに使います。"], textbook: "18_inheritance" },
  "19-polymorphism": { overview: "親クラス型の変数でも、子クラスのオブジェクトを扱えます。上書きされたメソッドを呼ぶと、実際のオブジェクトに対応する処理が動きます。", points: ["変数の型と、実際にnewしたクラスを分けて考えましょう。", "instanceofは、オブジェクトが指定した型に当てはまるかを確認します。"], textbook: "19_polymorphism" },
  "20-abstract-interface": { overview: "インターフェースや抽象クラスは、実装すべき処理の形を決めるために使います。具体的な処理は実装クラスや子クラスに書きます。", points: ["インターフェースの実装にはimplements、クラスの継承にはextendsを使います。", "実装するメソッドの名前、引数、戻り値の型をそろえましょう。"], textbook: "20_abstract_interface" },
  "21-package-import": { overview: "importは、別のパッケージにあるクラスを短い名前で使うための宣言です。必要なクラスを読み込み、そのクラスの機能を利用します。", points: ["import文はクラス定義より前に書きます。", "importしただけでは処理は実行されません。オブジェクトの作成やメソッドの呼び出しが必要です。"], textbook: "21_package_import" },
  "22-exception": { overview: "例外処理は、処理中の問題に備える仕組みです。try内で例外が起きると、対応するcatchへ処理が移ります。", points: ["finallyには、例外の有無にかかわらず実行したい後処理を書きます。", "throwsは、例外を呼び出し元へ伝える可能性を宣言します。"], textbook: "22_exception" },
  "23-file-io": { overview: "ファイルや読み書き用のクラスを使うと、データを保存したり取り出したりできます。入出力では例外への備えと文字コードの指定も大切です。", points: ["ファイルの書き込みと読み込みでは、同じパスや文字コードを指定します。", "try-with-resourcesは、使い終わったリソースを自動で閉じる構文です。"], textbook: "23_file_io" },
  "24-collection": { overview: "コレクションは、複数のデータをまとめて扱う仕組みです。ArrayListは順序のある一覧、HashMapはキーと値の組を扱います。", points: ["ArrayListはaddで追加し、getで取り出します。size()は要素数です。", "HashMapはputで登録し、キーを指定してgetで取り出します。"], textbook: "24_collection" },
  "25-generics": { overview: "ジェネリクスは、扱う型を後から指定できる仕組みです。型を指定すると、間違った型の値を入れるミスをコンパイル時に見つけやすくなります。", points: ["ArrayList<String>なら、取り出した値をStringとして扱えます。", "ジェネリクスの型引数には、intではなくIntegerなどの参照型を使います。"], textbook: "25_generics" },
  "26-lambda": { overview: "ラムダ式は、処理そのものを値のように渡すための書き方です。->の左側が引数、右側が実行する処理です。", points: ["Runnableはrun、Functionはapply、Predicateはtestで処理を呼び出します。", "ラムダ式も、作成しただけでは実行されません。"], textbook: "26_lambda" },
  "27-stream-api": { overview: "Stream APIは、データの絞り込みや変換、集計をつなげて書く仕組みです。元の一覧にどのような処理を順にかけるかを考えます。", points: ["filterは条件に合う値を残し、mapなどは値を変換します。", "count、sum、forEachなどの終端操作によって処理が実行されます。"], textbook: "27_stream_api" },
  "28-date-time": { overview: "java.timeのクラスを使うと、日付や時刻を扱えます。LocalDateは日付、LocalDateTimeは日付と時刻を表します。", points: ["ofで指定した日時を作り、nowで現在の日時を取得します。", "plusDaysなどは新しい値を返します。元の日時自体は変更しません。"], textbook: "28_date_time" },
  "32-final-exercise": { overview: "総合問題は、小さな処理に分けると考えやすくなります。データの用意、繰り返しや判定、結果の表示という流れを整理しましょう。", points: ["メソッドに分けると、計算や判定を別のデータでも再利用できます。", "配列やリストの中の値を、1つずつ追って確認しましょう。"] },
  "project-janken": { overview: "じゃんけんは、手を数値で表し、その組み合わせで結果を決める問題です。この演習では0がグー、1がチョキ、2がパーです。", points: ["同じ値ならあいこです。勝つ組み合わせは(0,1)、(1,2)、(2,0)です。", "完成問題では、自分と相手の手を入力します。乱数は使わず、同じ入力なら同じ結果になります。"], textbook: "08_if" },
  "project-score-app": { overview: "成績判定をメソッドにまとめると、複数の点数に同じ基準を適用できます。80点以上をA、60点以上80点未満をB、それ以外をCと判定します。", points: ["高い点数の条件から確認すると、Aの点数をBとして判定するミスを防げます。", "集計では評価ごとにカウンターを用意し、該当するものだけを1増やします。"], textbook: "13_method" },
};

export type JavaExplanation = {
  overview: string;
  points: string[];
  walkthrough: { line: number; code: string; explanation: string }[];
  textbook?: string;
};

function explainLine(code: string): string | null {
  const text = code.trim().replace(/^}\s*/, "");
  if (!text || /^[{};]+$/.test(text) || text.startsWith("//") || text.startsWith("@")) return null;
  if (/^import\b/.test(text)) return "このコードで利用するクラスを、短い名前で書けるようにします。";
  if (/\bclass\s+Main\b/.test(text)) return "プログラムの入口となるmainメソッドを、このMainクラスに定義します。";
  if (/\bclass\b/.test(text)) return /\bextends\b/.test(text) ? "親クラスを継承するクラスを定義します。親の機能を引き継いで使えます。" : "データや処理をまとめるクラスを定義します。";
  if (/^interface\b/.test(text)) return "実装するクラスが持つべきメソッドの形を定義します。";
  if (/\bvoid\s+main\s*\(/.test(text)) return "プログラムを実行したときは、このメソッドの中から処理が始まります。";
  if (/^else\s+if\b/.test(text)) return "前の条件に当てはまらなかった場合に、この条件を確認します。";
  if (/^if\s*\(/.test(text)) return "括弧の中の条件を確認し、trueのときだけ、この分岐の処理を実行します。";
  if (/^else\b/.test(text)) return "それまでの条件に当てはまらなかった場合に、この処理を実行します。";
  if (/^for\s*\(/.test(text)) return text.includes(";") ? "初期化を一度行い、条件の確認、内部の処理、変数の更新を繰り返します。" : "配列やリストから要素を1つずつ取り出して、内部の処理を繰り返します。";
  if (/^while\s*\(/.test(text)) return "括弧の中の条件がtrueの間、内部の処理を繰り返します。";
  if (/^switch\s*\(/.test(text)) return "括弧の中の値を調べ、その値に対応するcaseへ進みます。";
  if (/^case\b/.test(text)) return "switchで調べた値が、このcaseの値と一致するときの処理です。";
  if (/^default\s*:/.test(text)) return "どのcaseにも一致しなかった場合の処理です。";
  if (/^break\s*;/.test(text)) return "実行中のswitch、または繰り返し処理を抜けます。";
  if (/^return\b/.test(text)) return "式の結果を呼び出し元に返し、このメソッドの処理を終えます。";
  if (/\bcatch\s*\(/.test(text)) return "try内で対応する例外が発生した場合に、この処理を実行します。";
  if (/^finally\b/.test(text)) return "例外が起きたかどうかにかかわらず、後処理を実行します。";
  if (/^try\b/.test(text)) return text.includes("(") ? "使用するリソースを用意します。このブロックを抜けると自動的に閉じられます。" : "例外が起こる可能性のある処理を、このブロックにまとめます。";
  if (/^throw\b/.test(text)) return "例外を発生させます。対応するcatchがあれば、そちらへ処理が移ります。";
  if (/System\.out\.println\s*\(/.test(text)) return "括弧の中の式を評価し、その値を表示して改行します。変数なら、その時点の値が表示されます。";
  if (/System\.out\.print\s*\(/.test(text)) return "括弧の中の値を表示します。printlnと違い、最後に改行しません。";
  if (/\.nextInt\s*\(/.test(text)) return "標準入力から次の整数を読み取り、変数に保存します。";
  if (/\.nextLine\s*\(/.test(text)) return "標準入力の1行を読み取り、文字列として保存します。";
  if (/\.next\s*\(/.test(text)) return "標準入力から空白で区切られた次の単語を読み取ります。";
  if (/\bnew\s+Scanner\b/.test(text)) return "標準入力を読み取るためのScannerを用意します。";
  if (/\bthis\./.test(text) && text.includes("=")) return "受け取った値を、このオブジェクト自身のフィールドに保存します。";
  if (/\.add\s*\(/.test(text)) return "リストの末尾に、新しい要素を追加します。";
  if (/\.put\s*\(/.test(text)) return "キーと値の組をMapへ登録します。同じキーがあれば、値を更新します。";
  if (/\.set\s*\(/.test(text)) return "指定した添字の要素を、新しい値に置き換えます。要素数は変わりません。";
  if (/\.remove\s*\(/.test(text)) return "指定した要素をリストから削除します。後ろの要素は前へ詰まり、要素数が1減ります。";
  if (/\+\+|--/.test(text)) return text.includes("++") ? "この変数の値を1増やします。" : "この変数の値を1減らします。";
  if (/\+=/.test(text)) return "右辺の値を現在の変数の値に足し、その結果で更新します。";
  if (/^(?:public\s+|private\s+|protected\s+|static\s+)*(?:[\w<>\[\],]+\s+)+\w+\s*\([^;]*\)\s*(?:throws\s+\w+\s*)?\{/.test(text)) return "名前、受け取る引数、返す値の型を指定してメソッドを定義します。呼び出すと、この中の処理が動きます。";
  if (/^\w+\s*\([^;]*\)\s*\{/.test(text)) return "オブジェクトを作るときに呼ばれるコンストラクタを定義します。引数で初期値を受け取れます。";
  const declaration = text.match(/^(?:(?:static|final|public|private|protected)\s+)*([\w<>\[\],]+)\s+(\w+)\s*(?:=|;)/);
  if (declaration) return `${declaration[1]}型の${declaration[2]}を宣言します。${text.includes("=") ? "右辺の値を、最初の値として保存します。" : "この変数でデータを保持します。"}`;
  if (/^[\w.]+\s*=/.test(text)) return "右辺の値を、左辺の変数やフィールドに代入します。以前の値は置き換わります。";
  if (/Files\.write/.test(text)) return "指定したパスのファイルへ、データを書き込みます。";
  if (/\.stream\s*\(/.test(text)) return "一覧のデータをStreamとして扱い、絞り込みや集計などを順に適用します。";
  if (/^[\w.]+\s*\([^;]*\)\s*;/.test(text)) return "このメソッドを呼び出して、定義されている処理を実行します。引数があれば、その値を渡します。";
  return null;
}

export function getJavaExplanation(question: JavaQuestionEntry): JavaExplanation {
  const guide = topicGuides[question.topicId];
  if (!guide) throw new Error(`解説が未定義のトピックです: ${question.topicId}`);
  const walkthrough = (question.answerCode ?? "").split(/\r?\n/).flatMap((code, index) => {
    const explanation = explainLine(code);
    return explanation ? [{ line: index + 1, code: code.trim(), explanation }] : [];
  });
  return { ...guide, overview: question.quiz?.explanation ?? guide.overview, walkthrough };
}
