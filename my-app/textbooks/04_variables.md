# 第4章 変数

## 学習目標

- 変数とは何かを理解する
- 変数を宣言できる
- 変数に値を代入できる
- 変数の値を画面に表示できる
- 変数の値を変更できる

---

## 変数とは

変数とは、値を入れておくための箱のようなものです。

プログラムでは、数値や文字などのデータを一時的に保存して使うことがあります。

たとえば、次のような情報を変数に入れることができます。

- 年齢
- 名前
- 点数
- 金額
- メッセージ

変数を使うことで、同じ値を何度も使ったり、途中で値を変更したりできます。

---

## 変数を使わない例

まず、変数を使わずに文字を表示してみます。

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Taro");
        System.out.println("Taro");
        System.out.println("Taro");
    }
}
```

このプログラムでは、`"Taro"` を3回書いています。

もし名前を `"Hanako"` に変えたい場合、3か所すべてを書き換える必要があります。

---

## 変数を使う例

次に、変数を使って同じ内容を書いてみます。

```java
public class Main {
    public static void main(String[] args) {
        String name = "Taro";

        System.out.println(name);
        System.out.println(name);
        System.out.println(name);
    }
}
```

この場合、名前を変更したいときは次の1か所だけ変えればよくなります。

```java
String name = "Taro";
```

変数を使うと、プログラムを修正しやすくなります。

---

## 変数の宣言

Javaで変数を使うには、まず変数を宣言します。

変数の宣言は、次のように書きます。

```java
型 変数名;
```

たとえば、整数を入れる変数は次のように宣言します。

```java
int age;
```

これは、`age` という名前の変数を用意するという意味です。

---

## 値の代入

変数に値を入れることを **代入** といいます。

```java
age = 20;
```

このコードは、`age` に `20` を代入しています。

---

## 宣言と代入を同時に行う

変数は、宣言と代入を同時に行うこともできます。

```java
int age = 20;
```

この書き方はよく使われます。

---

## 変数を表示する

変数の値は `System.out.println()` で表示できます。

```java
public class Main {
    public static void main(String[] args) {
        int age = 20;

        System.out.println(age);
    }
}
```

実行結果：

```text
20
```

変数名を指定すると、その中に入っている値が表示されます。

---

## 文字列を入れる変数

文字列を入れるには `String` を使います。

```java
public class Main {
    public static void main(String[] args) {
        String name = "Taro";

        System.out.println(name);
    }
}
```

実行結果：

```text
Taro
```

`String` は文字列を扱うための型です。

---

## 数値を入れる変数

整数を入れるには `int` を使います。

```java
public class Main {
    public static void main(String[] args) {
        int score = 85;

        System.out.println(score);
    }
}
```

実行結果：

```text
85
```

`int` は整数を扱うための型です。

---

## 変数の値を変更する

変数の値は、あとから変更できます。

```java
public class Main {
    public static void main(String[] args) {
        int score = 80;

        System.out.println(score);

        score = 90;

        System.out.println(score);
    }
}
```

実行結果：

```text
80
90
```

最初は `80` が入っています。

そのあと、`score = 90;` によって値が `90` に変更されます。

---

## 変数名のルール

変数名にはいくつかのルールがあります。

| ルール | 例 |
|---|---|
| 英字、数字、`_` などが使える | `score`, `user_name` |
| 数字から始めることはできない | `1score` は不可 |
| 予約語は使えない | `class`, `public` は不可 |
| 大文字と小文字は区別される | `score` と `Score` は別物 |

---

## 変数名の付け方

変数名は、何を表す値なのか分かる名前にします。

良い例：

```java
int age = 20;
String name = "Taro";
int score = 85;
```

分かりにくい例：

```java
int a = 20;
String x = "Taro";
int s = 85;
```

短すぎる名前は、あとから見たときに意味が分かりにくくなります。

---

## キャメルケース

Javaでは、変数名に **キャメルケース** を使うことが多いです。

キャメルケースとは、2つ目以降の単語の先頭を大文字にする書き方です。

```java
int totalScore = 300;
String userName = "Taro";
int itemPrice = 1200;
```

`totalScore` や `userName` のように書くと、読みやすくなります。

---

## 文字列と変数を組み合わせる

文字列と変数は `+` でつなげることができます。

```java
public class Main {
    public static void main(String[] args) {
        String name = "Taro";
        int age = 20;

        System.out.println("名前は" + name + "です。");
        System.out.println("年齢は" + age + "歳です。");
    }
}
```

実行結果：

```text
名前はTaroです。
年齢は20歳です。
```

このように、文字列と変数を組み合わせて表示できます。

---

## よくあるエラー

| エラー | 原因 | 解決方法 |
|---|---|---|
| `cannot find symbol` | 変数名の入力ミス | 宣言した変数名と同じか確認する |
| `variable might not have been initialized` | 値を入れる前に使っている | 先に値を代入する |
| `';' expected` | セミコロン忘れ | 文の最後に `;` を付ける |
| `not a statement` | 書き方が間違っている | 代入や出力の形を確認する |

---

## まとめ

- 変数は値を入れておくための箱のようなもの
- Javaでは変数を使う前に宣言する
- 変数には値を代入できる
- 変数の値はあとから変更できる
- 文字列は `String`、整数は `int` を使う
- 分かりやすい変数名を付けることが大切