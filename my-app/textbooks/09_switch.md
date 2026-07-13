# 第9章 switch文

## 学習目標

- `switch` 文の基本を理解する
- 値によって処理を分けられる
- `case` と `default` の使い方を理解する
- `break` の役割を理解する
- `if` 文との使い分けを知る

---

## switch文とは

`switch` 文は、値によって処理を分けるための文です。

たとえば、入力された数字によって曜日を表示したり、  
メニュー番号によって処理を変えたりできます。

`if` 文でも同じような処理は書けますが、  
条件が「特定の値と一致するかどうか」の場合は、`switch` 文を使うと読みやすくなることがあります。

---

## switch文の基本形

`switch` 文は次のように書きます。

```java
switch (値) {
    case 値1:
        値1のときの処理
        break;

    case 値2:
        値2のときの処理
        break;

    default:
        どのcaseにも当てはまらないときの処理
        break;
}
```

`switch` の `()` に入れた値と、  
`case` に書いた値が一致するかどうかを判定します。

---

## switch文の例

曜日番号を使って、曜日を表示してみます。

```java
public class Main {
    public static void main(String[] args) {
        int day = 1;

        switch (day) {
            case 1:
                System.out.println("月曜日");
                break;

            case 2:
                System.out.println("火曜日");
                break;

            case 3:
                System.out.println("水曜日");
                break;

            default:
                System.out.println("不明な曜日です");
                break;
        }
    }
}
```

実行結果：

```text
月曜日
```

`day` の値は `1` なので、`case 1` の処理が実行されます。

---

## caseとは

`case` は、値が一致したときに実行する処理を書く場所です。

```java
case 1:
    System.out.println("月曜日");
    break;
```

この場合、`switch` に渡された値が `1` なら、  
`System.out.println("月曜日");` が実行されます。

---

## defaultとは

`default` は、どの `case` にも当てはまらなかったときに実行されます。

```java
default:
    System.out.println("不明な曜日です");
    break;
```

`if` 文でいう `else` のような役割です。

---

## breakとは

`break` は、`switch` 文の処理をそこで終了するために使います。

```java
case 1:
    System.out.println("月曜日");
    break;
```

`break` があることで、`case 1` の処理が終わったあと、  
`switch` 文全体から抜けます。

---

## breakを書かない場合

`break` を書かないと、次の `case` の処理も続けて実行されます。

```java
public class Main {
    public static void main(String[] args) {
        int day = 1;

        switch (day) {
            case 1:
                System.out.println("月曜日");

            case 2:
                System.out.println("火曜日");

            case 3:
                System.out.println("水曜日");

            default:
                System.out.println("不明な曜日です");
        }
    }
}
```

実行結果：

```text
月曜日
火曜日
水曜日
不明な曜日です
```

このように、意図しない処理が続けて実行されることがあります。

そのため、基本的には各 `case` の最後に `break` を書きます。

---

## 入力された値で処理を分ける

`Scanner` と組み合わせると、入力された値によって処理を変えられます。

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("曜日番号を入力してください: ");
        int day = scanner.nextInt();

        switch (day) {
            case 1:
                System.out.println("月曜日");
                break;

            case 2:
                System.out.println("火曜日");
                break;

            case 3:
                System.out.println("水曜日");
                break;

            case 4:
                System.out.println("木曜日");
                break;

            case 5:
                System.out.println("金曜日");
                break;

            case 6:
                System.out.println("土曜日");
                break;

            case 7:
                System.out.println("日曜日");
                break;

            default:
                System.out.println("1〜7の数字を入力してください");
                break;
        }

        scanner.close();
    }
}
```

実行例：

```text
曜日番号を入力してください: 5
金曜日
```

---

## 文字列でswitch文を使う

`switch` 文では、文字列を使うこともできます。

```java
public class Main {
    public static void main(String[] args) {
        String command = "start";

        switch (command) {
            case "start":
                System.out.println("開始します");
                break;

            case "stop":
                System.out.println("停止します");
                break;

            case "help":
                System.out.println("ヘルプを表示します");
                break;

            default:
                System.out.println("不明なコマンドです");
                break;
        }
    }
}
```

実行結果：

```text
開始します
```

文字列を使う場合は、`case "start":` のように `"` で囲みます。

---

## メニュー処理の例

`switch` 文は、メニュー処理と相性が良いです。

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("メニューを選択してください");
        System.out.println("1: 新規作成");
        System.out.println("2: 編集");
        System.out.println("3: 削除");
        System.out.print("番号: ");

        int menu = scanner.nextInt();

        switch (menu) {
            case 1:
                System.out.println("新規作成を開始します");
                break;

            case 2:
                System.out.println("編集を開始します");
                break;

            case 3:
                System.out.println("削除を開始します");
                break;

            default:
                System.out.println("正しい番号を入力してください");
                break;
        }

        scanner.close();
    }
}
```

実行例：

```text
メニューを選択してください
1: 新規作成
2: 編集
3: 削除
番号: 2
編集を開始します
```

---

## 複数のcaseで同じ処理をする

複数の値で同じ処理をしたい場合は、`case` を続けて書けます。

```java
public class Main {
    public static void main(String[] args) {
        int day = 6;

        switch (day) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                System.out.println("平日です");
                break;

            case 6:
            case 7:
                System.out.println("休日です");
                break;

            default:
                System.out.println("1〜7の数字を入力してください");
                break;
        }
    }
}
```

実行結果：

```text
休日です
```

`case 6` と `case 7` は同じ処理を実行します。

---

## if文で書いた場合

同じ処理を `if` 文で書くと、次のようになります。

```java
public class Main {
    public static void main(String[] args) {
        int day = 6;

        if (day >= 1 && day <= 5) {
            System.out.println("平日です");
        } else if (day == 6 || day == 7) {
            System.out.println("休日です");
        } else {
            System.out.println("1〜7の数字を入力してください");
        }
    }
}
```

範囲で判定したい場合は、`if` 文のほうが書きやすいこともあります。

---

## if文とswitch文の使い分け

`if` 文と `switch` 文は、どちらも条件によって処理を分けるために使います。

| 使いたい場面 | 向いている文 |
|---|---|
| 年齢が18歳以上か判定する | `if` |
| 点数が60点以上か判定する | `if` |
| 1〜7の曜日番号で処理を分ける | `switch` |
| メニュー番号で処理を分ける | `switch` |
| 文字列コマンドで処理を分ける | `switch` |

範囲を判定する場合は `if` 文、  
特定の値ごとに処理を分ける場合は `switch` 文が向いています。

---

## 新しいswitch式

Javaには、より短く書ける新しい `switch` の書き方もあります。

```java
public class Main {
    public static void main(String[] args) {
        int day = 1;

        String result = switch (day) {
            case 1 -> "月曜日";
            case 2 -> "火曜日";
            case 3 -> "水曜日";
            default -> "不明な曜日です";
        };

        System.out.println(result);
    }
}
```

実行結果：

```text
月曜日
```

この書き方では、`break` を書かなくてもよくなります。

ただし、この教科書ではまず基本の `switch` 文をしっかり学びます。

---

## よくあるエラー

| エラー | 原因 | 解決方法 |
|---|---|---|
| `case, default, or '}' expected` | `case` や `{}` の書き方が間違っている | `switch` 文の形を確認する |
| `constant expression required` | `case` に使えない値を書いている | 固定の値を使う |
| 意図しないcaseまで実行される | `break` を忘れている | 各 `case` の最後に `break` を書く |
| `cannot find symbol` | 変数名のミス | 変数名を確認する |
| `';' expected` | セミコロン忘れ | 文の最後を確認する |



---

## まとめ

- `switch` 文は、値によって処理を分けるために使う
- `case` は、値が一致したときの処理を書く
- `default` は、どの `case` にも当てはまらないときに実行される
- `break` は、`switch` 文を終了するために使う
- `break` を忘れると、次の `case` まで実行されることがある
- 範囲の判定は `if` 文、値ごとの判定は `switch` 文が向いている