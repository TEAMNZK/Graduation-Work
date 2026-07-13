# 第10章 for文

## 学習目標

- 繰り返し処理とは何かを理解する
- `for` 文の基本形を理解する
- 指定した回数だけ処理を繰り返せる
- カウントアップ・カウントダウンができる
- 繰り返しを使って合計を計算できる

---

## 繰り返し処理とは

繰り返し処理とは、同じ処理を何度も実行することです。

たとえば、次のような処理があります。

- 「こんにちは」を5回表示する
- 1から10までの数字を表示する
- 1から100までの合計を計算する
- 入力を何回も受け取る

同じコードを何度も書く代わりに、繰り返し処理を使うと短く書けます。

---

## 繰り返しを使わない例

まず、`こんにちは` を5回表示するプログラムを書いてみます。

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("こんにちは");
        System.out.println("こんにちは");
        System.out.println("こんにちは");
        System.out.println("こんにちは");
        System.out.println("こんにちは");
    }
}
```

実行結果：

```text
こんにちは
こんにちは
こんにちは
こんにちは
こんにちは
```

この書き方でも動きますが、同じコードを何度も書いています。

もし100回表示したい場合、100行書く必要があります。

それはかなり大変です。

---

## for文を使う例

同じ処理は、`for` 文を使うと短く書けます。

```java
public class Main {
    public static void main(String[] args) {
        for (int i = 0; i < 5; i++) {
            System.out.println("こんにちは");
        }
    }
}
```

実行結果：

```text
こんにちは
こんにちは
こんにちは
こんにちは
こんにちは
```

`for` 文を使うと、同じ処理を指定した回数だけ繰り返せます。

---

## for文の基本形

`for` 文は次のように書きます。

```java
for (初期化; 条件式; 更新) {
    繰り返したい処理
}
```

それぞれの意味は次のとおりです。

| 部分 | 意味 |
|---|---|
| 初期化 | 繰り返しで使う変数を用意する |
| 条件式 | 繰り返しを続ける条件を書く |
| 更新 | 1回処理が終わるごとに変数を変更する |

---

## for文の流れ

次のコードを見てみます。

```java
for (int i = 0; i < 5; i++) {
    System.out.println("こんにちは");
}
```

この `for` 文は、次のように動きます。

1. `int i = 0` で変数 `i` を用意する
2. `i < 5` を確認する
3. 条件が `true` なら `{}` の中を実行する
4. `i++` で `i` を1増やす
5. もう一度 `i < 5` を確認する
6. 条件が `false` になるまで繰り返す

---

## カウンタ変数

`for` 文でよく使われる変数を **カウンタ変数** と呼びます。

```java
for (int i = 0; i < 5; i++) {
    System.out.println(i);
}
```

この場合、`i` がカウンタ変数です。

実行結果：

```text
0
1
2
3
4
```

`i` は `0` から始まり、1回繰り返すごとに1ずつ増えます。

---

## 1から5まで表示する

`1` から `5` まで表示したい場合は、次のように書きます。

```java
public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 5; i++) {
            System.out.println(i);
        }
    }
}
```

実行結果：

```text
1
2
3
4
5
```

`i <= 5` と書くことで、`i` が5以下の間だけ繰り返します。

---

## 0から始めるか、1から始めるか

`for` 文では、カウンタ変数を `0` から始めることも、`1` から始めることもあります。

```java
for (int i = 0; i < 5; i++) {
    System.out.println(i);
}
```

実行結果：

```text
0
1
2
3
4
```

```java
for (int i = 1; i <= 5; i++) {
    System.out.println(i);
}
```

実行結果：

```text
1
2
3
4
5
```

どちらも5回繰り返しています。

配列を扱うときは `0` から始めることが多いです。  
回数や番号を表示したいときは `1` から始めると分かりやすいことがあります。

---

## カウントダウン

`for` 文では、数を減らしながら繰り返すこともできます。

```java
public class Main {
    public static void main(String[] args) {
        for (int i = 5; i >= 1; i--) {
            System.out.println(i);
        }
    }
}
```

実行結果：

```text
5
4
3
2
1
```

`i--` は、`i` を1ずつ減らすという意味です。

---

## 2ずつ増やす

カウンタ変数は、1ずつではなく2ずつ増やすこともできます。

```java
public class Main {
    public static void main(String[] args) {
        for (int i = 0; i <= 10; i += 2) {
            System.out.println(i);
        }
    }
}
```

実行結果：

```text
0
2
4
6
8
10
```

`i += 2` は、`i` に2を足すという意味です。

---

## 偶数を表示する

2ずつ増やすことで、偶数だけを表示できます。

```java
public class Main {
    public static void main(String[] args) {
        for (int i = 2; i <= 10; i += 2) {
            System.out.println(i);
        }
    }
}
```

実行結果：

```text
2
4
6
8
10
```

---

## 奇数を表示する

奇数を表示したい場合は、`1` から始めて2ずつ増やします。

```java
public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 9; i += 2) {
            System.out.println(i);
        }
    }
}
```

実行結果：

```text
1
3
5
7
9
```

---

## 繰り返しで合計を求める

`for` 文を使うと、合計を計算できます。

次の例では、1から5までの合計を求めます。

```java
public class Main {
    public static void main(String[] args) {
        int total = 0;

        for (int i = 1; i <= 5; i++) {
            total += i;
        }

        System.out.println(total);
    }
}
```

実行結果：

```text
15
```

計算の流れは次のとおりです。

| 回数 | `i` | `total` |
|---|---:|---:|
| 最初 | - | 0 |
| 1回目 | 1 | 1 |
| 2回目 | 2 | 3 |
| 3回目 | 3 | 6 |
| 4回目 | 4 | 10 |
| 5回目 | 5 | 15 |

---

## 入力された回数だけ繰り返す

`Scanner` と組み合わせると、ユーザーが入力した回数だけ繰り返せます。

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("何回表示しますか: ");
        int count = scanner.nextInt();

        for (int i = 1; i <= count; i++) {
            System.out.println(i + "回目");
        }

        scanner.close();
    }
}
```

実行例：

```text
何回表示しますか: 3
1回目
2回目
3回目
```

---

## 入力された数まで合計する

入力された数までの合計を求めるプログラムです。

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("数値を入力してください: ");
        int max = scanner.nextInt();

        int total = 0;

        for (int i = 1; i <= max; i++) {
            total += i;
        }

        System.out.println("合計は" + total + "です。");

        scanner.close();
    }
}
```

実行例：

```text
数値を入力してください: 10
合計は55です。
```

---

## for文の中でif文を使う

`for` 文の中に `if` 文を書くこともできます。

次の例では、1から10までの数字のうち、偶数だけを表示します。

```java
public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 10; i++) {
            if (i % 2 == 0) {
                System.out.println(i);
            }
        }
    }
}
```

実行結果：

```text
2
4
6
8
10
```

`i % 2 == 0` は、`i` が偶数かどうかを判定しています。

---

## break文

`break` を使うと、繰り返しを途中で終了できます。

```java
public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 10; i++) {
            if (i == 5) {
                break;
            }

            System.out.println(i);
        }
    }
}
```

実行結果：

```text
1
2
3
4
```

`i` が `5` になった時点で、`break` によって `for` 文が終了します。

---

## continue文

`continue` を使うと、その回の処理だけをスキップできます。

```java
public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 5; i++) {
            if (i == 3) {
                continue;
            }

            System.out.println(i);
        }
    }
}
```

実行結果：

```text
1
2
4
5
```

`i` が `3` のときだけ、`System.out.println(i);` が実行されません。

---

## 無限ループに注意

`for` 文の条件がずっと `true` のままだと、処理が終わらなくなります。

```java
for (int i = 0; i < 5; i--) {
    System.out.println(i);
}
```

このコードでは、`i` がどんどん小さくなるため、`i < 5` がずっと `true` のままになります。

その結果、繰り返しが終わりません。

`for` 文を書くときは、いつか条件が `false` になるようにします。

---

## よくあるエラー

| エラー | 原因 | 解決方法 |
|---|---|---|
| `';' expected` | `for` 文の中のセミコロン不足 | `for (初期化; 条件式; 更新)` の形を確認する |
| `cannot find symbol` | カウンタ変数の名前ミス | 変数名を確認する |
| 繰り返しが終わらない | 条件式や更新が間違っている | 条件がいつか `false` になるか確認する |
| 1回多く実行される | `<` と `<=` の使い分けミス | 実行したい回数を確認する |
| 1回も実行されない | 最初から条件が `false` | 初期値と条件式を確認する |

---

## まとめ

- `for` 文は、同じ処理を繰り返すために使う
- `for (初期化; 条件式; 更新)` の形で書く
- カウンタ変数を使って回数を管理する
- `i++` は1増やす、`i--` は1減らす
- `+=` を使うと、指定した数ずつ増やせる
- `for` 文と `if` 文を組み合わせると条件付きの繰り返しができる
- `break` は繰り返しを終了する
- `continue` はその回の処理をスキップする