# 第5章 データ型

## 学習目標

- データ型とは何かを理解する
- 整数・小数・文字・文字列・真偽値を扱える
- 代表的なデータ型を使い分けられる
- 型が違う値を代入するとエラーになることを理解する

---

## データ型とは

データ型とは、変数に入れる値の種類のことです。

Javaでは、変数を使うときに「どんな種類の値を入れるのか」を決める必要があります。

たとえば、次のように使います。

```java
int age = 20;
String name = "Taro";
double height = 170.5;
boolean isStudent = true;
```

それぞれの変数には、入れられる値の種類があります。

| 型 | 入れられる値の例 |
|---|---|
| `int` | 整数 |
| `double` | 小数 |
| `String` | 文字列 |
| `char` | 1文字 |
| `boolean` | `true` または `false` |

---

## `int` 型

`int` は整数を扱うための型です。

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

`int` には、小数を入れることはできません。

```java
int number = 10.5; // エラー
```

---

## `double` 型

`double` は小数を扱うための型です。

```java
public class Main {
    public static void main(String[] args) {
        double height = 170.5;

        System.out.println(height);
    }
}
```

実行結果：

```text
170.5
```

小数を扱いたいときは `double` を使います。

---

## `String` 型

`String` は文字列を扱うための型です。

文字列は `"` で囲みます。

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

次のように、文章も入れることができます。

```java
String message = "こんにちは、Java!";
```

---

## `char` 型

`char` は1文字を扱うための型です。

`char` の値は `'` で囲みます。

```java
public class Main {
    public static void main(String[] args) {
        char grade = 'A';

        System.out.println(grade);
    }
}
```

実行結果：

```text
A
```

`char` は1文字だけです。

```java
char grade = 'A';   // OK
char text = 'AB';   // エラー
```

> `String` は複数の文字を扱えます。  
> `char` は1文字だけを扱います。

---

## `boolean` 型

`boolean` は、真偽値を扱うための型です。

真偽値とは、正しいか正しくないかを表す値です。

`boolean` には次のどちらかを入れます。

```text
true
false
```

例：

```java
public class Main {
    public static void main(String[] args) {
        boolean isStudent = true;

        System.out.println(isStudent);
    }
}
```

実行結果：

```text
true
```

`boolean` は、条件分岐でよく使います。

```java
boolean isAdult = false;
```

---

## 型ごとの使い分け

データ型は、扱いたい値に合わせて選びます。

| 使いたい値 | 使う型 | 例 |
|---|---|---|
| 年齢 | `int` | `int age = 20;` |
| 点数 | `int` | `int score = 85;` |
| 身長 | `double` | `double height = 170.5;` |
| 名前 | `String` | `String name = "Taro";` |
| ランク | `char` | `char rank = 'A';` |
| 学生かどうか | `boolean` | `boolean isStudent = true;` |

---

## 型が違うとエラーになる

Javaでは、変数の型に合わない値を入れるとエラーになります。

```java
int age = "20"; // エラー
```

`int` は整数を入れる型なので、文字列 `"20"` は入れられません。

次のように書く必要があります。

```java
int age = 20;
```

文字列として扱いたい場合は `String` を使います。

```java
String ageText = "20";
```

---

## 数字と文字列の違い

次の2つは、見た目は似ていますが別物です。

```java
int number = 20;
String text = "20";
```

`20` は数値です。

`"20"` は文字列です。

数値は計算できます。

```java
int number = 20;
System.out.println(number + 10);
```

実行結果：

```text
30
```

文字列は、`+` を使うと文字としてつながります。

```java
String text = "20";
System.out.println(text + 10);
```

実行結果：

```text
2010
```

この違いはかなり大事です。

---

## 文字列と数値を組み合わせる

文字列と数値を `+` でつなげることもできます。

```java
public class Main {
    public static void main(String[] args) {
        String name = "Taro";
        int age = 20;

        System.out.println(name + "さんは" + age + "歳です。");
    }
}
```

実行結果：

```text
Taroさんは20歳です。
```

このように、文字列と変数を組み合わせて表示できます。

---

## 型推論 `var`

Javaでは、`var` を使って変数を宣言することもできます。

```java
var age = 20;
var name = "Taro";
```

この場合、Javaが自動的に型を判断します。

ただし、この教科書の前半では、型をしっかり理解するために次のように書きます。

```java
int age = 20;
String name = "Taro";
```

> 最初は `int` や `String` などの型を明示して書くほうがおすすめです。

---

## 基本データ型と参照型

Javaの型は、大きく分けると次の2種類があります。

| 種類 | 例 |
|---|---|
| 基本データ型 | `int`, `double`, `char`, `boolean` |
| 参照型 | `String` など |

この章では、細かい違いまで覚える必要はありません。

まずは、`int` や `double` などは基本的な値を扱う型、  
`String` は文字列を扱う型、と理解しておけば大丈夫です。

---

## よくあるエラー

| エラー | 原因 | 解決方法 |
|---|---|---|
| `incompatible types` | 型に合わない値を代入している | 型と値を確認する |
| `unclosed character literal` | `char` の書き方が間違っている | 1文字を `'` で囲む |
| `unclosed string literal` | 文字列の `"` を閉じ忘れている | 文字列を `"` で囲む |
| `possible lossy conversion from double to int` | 小数を整数型に入れようとしている | `double` を使う |

---

## まとめ

- データ型は、変数に入れる値の種類を表す
- `int` は整数を扱う
- `double` は小数を扱う
- `String` は文字列を扱う
- `char` は1文字を扱う
- `boolean` は `true` または `false` を扱う
- Javaでは型に合わない値を入れるとエラーになる