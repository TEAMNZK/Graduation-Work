# 第12章 配列

## 学習目標

- 配列とは何かを理解する
- 複数の値を1つの変数で扱える
- 配列を作成できる
- 配列の要素を取り出せる
- `for` 文を使って配列を処理できる
- 配列の長さを取得できる

---

## 配列とは

配列とは、複数の値をまとめて扱うための仕組みです。

たとえば、5人分の点数を扱いたい場合、変数だけで書くと次のようになります。

```java
int score1 = 80;
int score2 = 90;
int score3 = 75;
int score4 = 60;
int score5 = 95;
```

このように書くこともできますが、人数が増えると変数がどんどん増えてしまいます。

そこで配列を使います。

```java
int[] scores = {80, 90, 75, 60, 95};
```

配列を使うと、複数の値を1つの変数でまとめて管理できます。

---

## 配列の基本形

配列は次のように作成します。

```java
型[] 配列名 = {値1, 値2, 値3};
```

例：

```java
int[] scores = {80, 90, 75};
```

これは、`int` 型の値を複数入れられる `scores` という配列です。

---

## 配列の要素

配列に入っている1つ1つの値を **要素** と呼びます。

```java
int[] scores = {80, 90, 75};
```

この配列には、次の3つの要素が入っています。

| 位置 | 値 |
|---:|---:|
| 0 | 80 |
| 1 | 90 |
| 2 | 75 |

配列では、要素の位置を番号で指定します。

この番号を **インデックス** と呼びます。

---

## インデックスは0から始まる

Javaの配列のインデックスは、`0` から始まります。

```java
int[] scores = {80, 90, 75};
```

この場合：

| インデックス | 値 |
|---:|---:|
| `scores[0]` | `80` |
| `scores[1]` | `90` |
| `scores[2]` | `75` |

最初の要素は `scores[1]` ではなく、`scores[0]` です。

> 配列のインデックスは0から始まります。  
> ここは最初かなり間違えやすいポイントです。

---

## 配列の値を取り出す

配列の値を取り出すには、配列名とインデックスを使います。

```java
public class Main {
    public static void main(String[] args) {
        int[] scores = {80, 90, 75};

        System.out.println(scores[0]);
        System.out.println(scores[1]);
        System.out.println(scores[2]);
    }
}
```

実行結果：

```text
80
90
75
```

---

## 配列の値を変更する

配列の要素は、あとから変更できます。

```java
public class Main {
    public static void main(String[] args) {
        int[] scores = {80, 90, 75};

        scores[1] = 100;

        System.out.println(scores[0]);
        System.out.println(scores[1]);
        System.out.println(scores[2]);
    }
}
```

実行結果：

```text
80
100
75
```

` scores[1] = 100;` によって、2番目の要素が `90` から `100` に変わりました。

---

## 配列の長さ

配列の要素数は、`length` で取得できます。

```java
int[] scores = {80, 90, 75};

System.out.println(scores.length);
```

実行結果：

```text
3
```

`scores.length` は、配列 `scores` の要素数を表します。

---

## for文で配列を処理する

配列は、`for` 文と組み合わせることが多いです。

```java
public class Main {
    public static void main(String[] args) {
        int[] scores = {80, 90, 75};

        for (int i = 0; i < scores.length; i++) {
            System.out.println(scores[i]);
        }
    }
}
```

実行結果：

```text
80
90
75
```

`i` が `0`, `1`, `2` と変化することで、  
`scores[0]`, `scores[1]`, `scores[2]` を順番に取り出せます。

---

## `length` を使う理由

次のように、配列の長さを直接数字で書くこともできます。

```java
for (int i = 0; i < 3; i++) {
    System.out.println(scores[i]);
}
```

しかし、配列の要素数が変わると、数字も変更する必要があります。

```java
int[] scores = {80, 90, 75, 60, 95};
```

この場合、`3` を `5` に変えなければなりません。

そこで `length` を使います。

```java
for (int i = 0; i < scores.length; i++) {
    System.out.println(scores[i]);
}
```

`length` を使うと、配列の要素数が変わっても対応できます。

---

## 配列の合計を求める

配列の値をすべて足すこともできます。

```java
public class Main {
    public static void main(String[] args) {
        int[] scores = {80, 90, 75};

        int total = 0;

        for (int i = 0; i < scores.length; i++) {
            total += scores[i];
        }

        System.out.println("合計: " + total);
    }
}
```

実行結果：

```text
合計: 245
```

---

## 配列の平均を求める

合計を要素数で割ると、平均を求められます。

```java
public class Main {
    public static void main(String[] args) {
        int[] scores = {80, 90, 75};

        int total = 0;

        for (int i = 0; i < scores.length; i++) {
            total += scores[i];
        }

        double average = (double) total / scores.length;

        System.out.println("平均: " + average);
    }
}
```

実行結果：

```text
平均: 81.66666666666667
```

`(double) total` と書くことで、小数を含む計算ができます。

---

## 拡張for文

配列の要素を順番に取り出すだけなら、拡張for文を使うこともできます。

```java
for (型 変数名 : 配列名) {
    繰り返したい処理
}
```

例：

```java
public class Main {
    public static void main(String[] args) {
        int[] scores = {80, 90, 75};

        for (int score : scores) {
            System.out.println(score);
        }
    }
}
```

実行結果：

```text
80
90
75
```

拡張for文を使うと、インデックスを書かずに配列の値を順番に取り出せます。

---

## 通常のfor文と拡張for文の違い

| 書き方 | 向いている場面 |
|---|---|
| 通常の `for` 文 | インデックスを使いたい場合 |
| 拡張for文 | 要素を順番に取り出すだけの場合 |

たとえば、何番目の要素かを表示したい場合は、通常の `for` 文が向いています。

```java
for (int i = 0; i < scores.length; i++) {
    System.out.println(i + "番目: " + scores[i]);
}
```

要素を表示するだけなら、拡張for文がシンプルです。

```java
for (int score : scores) {
    System.out.println(score);
}
```

---

## 文字列の配列

配列には、数値だけでなく文字列も入れられます。

```java
public class Main {
    public static void main(String[] args) {
        String[] names = {"Taro", "Hanako", "Jiro"};

        for (int i = 0; i < names.length; i++) {
            System.out.println(names[i]);
        }
    }
}
```

実行結果：

```text
Taro
Hanako
Jiro
```

`String[]` は、文字列を複数扱うための配列です。

---

## booleanの配列

`boolean` 型の配列も作成できます。

```java
public class Main {
    public static void main(String[] args) {
        boolean[] results = {true, false, true};

        for (boolean result : results) {
            System.out.println(result);
        }
    }
}
```

実行結果：

```text
true
false
true
```

---

## 配列をあとから作成する

配列は、要素数を指定して作成することもできます。

```java
int[] scores = new int[3];
```

これは、`int` 型の値を3つ入れられる配列を作成しています。

---

## あとから値を入れる

`new int[3]` で作成した配列には、あとから値を入れられます。

```java
public class Main {
    public static void main(String[] args) {
        int[] scores = new int[3];

        scores[0] = 80;
        scores[1] = 90;
        scores[2] = 75;

        for (int i = 0; i < scores.length; i++) {
            System.out.println(scores[i]);
        }
    }
}
```

実行結果：

```text
80
90
75
```

---

## 配列の初期値

`new int[3]` のように配列を作成すると、最初は自動的に初期値が入ります。

```java
public class Main {
    public static void main(String[] args) {
        int[] scores = new int[3];

        System.out.println(scores[0]);
        System.out.println(scores[1]);
        System.out.println(scores[2]);
    }
}
```

実行結果：

```text
0
0
0
```

`int` 型の配列では、初期値は `0` です。

代表的な初期値は次のとおりです。

| 型 | 初期値 |
|---|---|
| `int` | `0` |
| `double` | `0.0` |
| `boolean` | `false` |
| `String` | `null` |

---

## 入力された値を配列に入れる

`Scanner` を使って、入力された値を配列に入れることもできます。

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        int[] scores = new int[3];

        for (int i = 0; i < scores.length; i++) {
            System.out.print((i + 1) + "人目の点数: ");
            scores[i] = scanner.nextInt();
        }

        System.out.println("入力された点数");

        for (int i = 0; i < scores.length; i++) {
            System.out.println(scores[i]);
        }

        scanner.close();
    }
}
```

実行例：

```text
1人目の点数: 80
2人目の点数: 90
3人目の点数: 75
入力された点数
80
90
75
```

---

## 最大値を求める

配列の中から最大値を探すこともできます。

```java
public class Main {
    public static void main(String[] args) {
        int[] scores = {80, 90, 75, 60, 95};

        int max = scores[0];

        for (int i = 1; i < scores.length; i++) {
            if (scores[i] > max) {
                max = scores[i];
            }
        }

        System.out.println("最大値: " + max);
    }
}
```

実行結果：

```text
最大値: 95
```

最初に `scores[0]` を最大値としておき、  
それより大きい値が見つかったら `max` を更新します。

---

## 最小値を求める

最小値も同じ考え方で求められます。

```java
public class Main {
    public static void main(String[] args) {
        int[] scores = {80, 90, 75, 60, 95};

        int min = scores[0];

        for (int i = 1; i < scores.length; i++) {
            if (scores[i] < min) {
                min = scores[i];
            }
        }

        System.out.println("最小値: " + min);
    }
}
```

実行結果：

```text
最小値: 60
```

---

## 存在チェック

配列の中に特定の値があるかを調べることもできます。

```java
public class Main {
    public static void main(String[] args) {
        int[] numbers = {3, 8, 10, 15, 20};

        int target = 10;
        boolean found = false;

        for (int i = 0; i < numbers.length; i++) {
            if (numbers[i] == target) {
                found = true;
                break;
            }
        }

        if (found) {
            System.out.println("見つかりました");
        } else {
            System.out.println("見つかりませんでした");
        }
    }
}
```

実行結果：

```text
見つかりました
```

見つかった時点で `break` すると、無駄な繰り返しを減らせます。

---

## インデックスの範囲に注意

配列には、存在しないインデックスを指定できません。

```java
int[] scores = {80, 90, 75};

System.out.println(scores[3]); // エラー
```

`scores` のインデックスは `0`, `1`, `2` です。

`scores[3]` は存在しないため、エラーになります。

---

## よくあるエラー

| エラー | 原因 | 解決方法 |
|---|---|---|
| `ArrayIndexOutOfBoundsException` | 存在しないインデックスを指定した | インデックスの範囲を確認する |
| `cannot find symbol` | 配列名や変数名のミス | 名前を確認する |
| `incompatible types` | 配列の型と値の型が合っていない | 型をそろえる |
| `';' expected` | セミコロン忘れ | 文の最後を確認する |
| `NullPointerException` | `null` の配列や要素を使っている | 配列が作成されているか確認する |

---


## まとめ

- 配列は複数の値をまとめて扱うための仕組み
- 配列は `型[] 配列名` の形で宣言する
- 配列の要素にはインデックスでアクセスする
- インデックスは `0` から始まる
- 配列の長さは `length` で取得できる
- 配列は `for` 文と組み合わせて使うことが多い
- 拡張for文を使うと、配列の要素を順番に取り出しやすい
- 存在しないインデックスを指定するとエラーになる