# 第6章 演算子

## 学習目標

- 演算子とは何かを理解する
- 足し算・引き算・掛け算・割り算ができる
- 余りを求める計算ができる
- 比較演算子を使って値を比較できる
- 代入演算子を使って変数の値を変更できる

---

## 演算子とは

演算子とは、計算や比較などを行うための記号です。

たとえば、足し算には `+` を使います。

```java
int result = 10 + 5;
```

この `+` が演算子です。

Javaでは、数値の計算や文字列の連結、値の比較などに演算子を使います。

---

## 算術演算子

算術演算子は、数値の計算に使います。

| 演算子 | 意味 | 例 | 結果 |
|---|---|---|---|
| `+` | 足し算 | `10 + 3` | `13` |
| `-` | 引き算 | `10 - 3` | `7` |
| `*` | 掛け算 | `10 * 3` | `30` |
| `/` | 割り算 | `10 / 3` | `3` |
| `%` | 余り | `10 % 3` | `1` |

---

## 足し算

```java
public class Main {
    public static void main(String[] args) {
        int result = 10 + 5;

        System.out.println(result);
    }
}
```

実行結果：

```text
15
```

---

## 引き算

```java
public class Main {
    public static void main(String[] args) {
        int result = 10 - 5;

        System.out.println(result);
    }
}
```

実行結果：

```text
5
```

---

## 掛け算

Javaで掛け算をするときは `*` を使います。

```java
public class Main {
    public static void main(String[] args) {
        int result = 10 * 5;

        System.out.println(result);
    }
}
```

実行結果：

```text
50
```

---

## 割り算

Javaで割り算をするときは `/` を使います。

```java
public class Main {
    public static void main(String[] args) {
        int result = 10 / 5;

        System.out.println(result);
    }
}
```

実行結果：

```text
2
```

---

## 整数同士の割り算

整数同士で割り算をすると、小数部分は切り捨てられます。

```java
public class Main {
    public static void main(String[] args) {
        int result = 10 / 3;

        System.out.println(result);
    }
}
```

実行結果：

```text
3
```

`10 / 3` は本来 `3.333...` ですが、`int` では整数しか扱えないため、結果は `3` になります。

小数まで求めたい場合は、`double` を使います。

```java
public class Main {
    public static void main(String[] args) {
        double result = 10.0 / 3.0;

        System.out.println(result);
    }
}
```

実行結果：

```text
3.3333333333333335
```

---

## 余りを求める

余りを求めるには `%` を使います。

```java
public class Main {
    public static void main(String[] args) {
        int result = 10 % 3;

        System.out.println(result);
    }
}
```

実行結果：

```text
1
```

`10` を `3` で割ると、商は `3`、余りは `1` です。

`%` は、偶数・奇数の判定などでよく使います。

```java
int number = 8;

System.out.println(number % 2);
```

実行結果：

```text
0
```

2で割った余りが `0` なら偶数です。

---

## 変数を使った計算

演算子は、変数と組み合わせて使えます。

```java
public class Main {
    public static void main(String[] args) {
        int price = 100;
        int count = 3;

        int total = price * count;

        System.out.println(total);
    }
}
```

実行結果：

```text
300
```

---

## 文字列の連結

`+` は、数値の足し算だけでなく、文字列をつなげるときにも使います。

```java
public class Main {
    public static void main(String[] args) {
        String firstName = "Taro";
        String lastName = "Yamada";
        String name = lastName + firstName;

        System.out.println(name);
    }
}
```

実行結果：

```text
YamadaTaro
```

文字列の間に空白を入れたい場合は、次のようにします。

```java
String name = lastName + " " + firstName
System.out.println(name);
```

実行結果：

```text
Yamada Taro
```

---

## 数値と文字列をつなげる

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

---

## 計算の順序

Javaの計算には、数学と同じように優先順位があります。

掛け算や割り算は、足し算や引き算より先に計算されます。

```java
public class Main {
    public static void main(String[] args) {
        int result = 10 + 5 * 2;

        System.out.println(result);
    }
}
```

実行結果：

```text
20
```

`5 * 2` が先に計算されるため、結果は `20` になります。

---

## 丸かっこを使う

計算の順序を変えたいときは、丸かっこ `()` を使います。

```java
public class Main {
    public static void main(String[] args) {
        int result = (10 + 5) * 2;

        System.out.println(result);
    }
}
```

実行結果：

```text
30
```

`10 + 5` が先に計算されます。

---

## 代入演算子

変数に値を入れるときに使う `=` も演算子です。

```java
int score = 80;
```

この `=` は、右側の値を左側の変数に代入するという意味です。

> 数学の「等しい」とは少し意味が違います。  
> Javaでは `=` は「右の値を左に入れる」と考えます。

---

## 複合代入演算子

変数の値を使って計算し、その結果を同じ変数に入れることがあります。

```java
int score = 80;
score = score + 10;
```

これは、次のように短く書けます。

```java
score += 10;
```

代表的な複合代入演算子は次のとおりです。

| 演算子 | 意味 | 例 |
|---|---|---|
| `+=` | 足して代入 | `x += 5` |
| `-=` | 引いて代入 | `x -= 5` |
| `*=` | 掛けて代入 | `x *= 5` |
| `/=` | 割って代入 | `x /= 5` |
| `%=` | 余りを代入 | `x %= 5` |

---

## インクリメント

変数の値を1増やすには、`++` を使えます。

```java
public class Main {
    public static void main(String[] args) {
        int count = 0;

        count++;

        System.out.println(count);
    }
}
```

実行結果：

```text
1
```

`count++` は、次のコードと同じ意味です。

```java
count = count + 1;
```

---

## デクリメント

変数の値を1減らすには、`--` を使えます。

```java
public class Main {
    public static void main(String[] args) {
        int count = 10;

        count--;

        System.out.println(count);
    }
}
```

実行結果：

```text
9
```

---

## 比較演算子

比較演算子は、値を比較するときに使います。

比較の結果は `true` または `false` になります。

| 演算子 | 意味 | 例 | 結果 |
|---|---|---|---|
| `==` | 等しい | `10 == 10` | `true` |
| `!=` | 等しくない | `10 != 5` | `true` |
| `>` | より大きい | `10 > 5` | `true` |
| `<` | より小さい | `10 < 5` | `false` |
| `>=` | 以上 | `10 >= 10` | `true` |
| `<=` | 以下 | `10 <= 5` | `false` |

---

## 比較演算子の例

```java
public class Main {
    public static void main(String[] args) {
        int age = 20;

        System.out.println(age >= 18);
    }
}
```

実行結果：

```text
true
```

`age` は `20` なので、`18` 以上です。

そのため、結果は `true` になります。

---

## `=` と `==` の違い

Javaでは、`=` と `==` は意味が違います。

| 書き方 | 意味 |
|---|---|
| `=` | 代入する |
| `==` | 等しいか比較する |

例：

```java
int age = 20;
```

これは、`age` に `20` を代入しています。

```java
age == 20
```

これは、`age` が `20` と等しいかを比較しています。

この違いはとても重要です。

---

## 論理演算子

論理演算子は、複数の条件を組み合わせるときに使います。

| 演算子 | 意味 | 例 |
|---|---|---|
| `&&` | かつ | `age >= 18 && age < 65` |
| `||` | または | `age < 18 || age >= 65` |
| `!` | ではない | `!isStudent` |

---

## 論理演算子の例

```java
public class Main {
    public static void main(String[] args) {
        int age = 20;
        boolean hasTicket = true;

        System.out.println(age >= 18 && hasTicket);
    }
}
```

実行結果：

```text
true
```

`age >= 18` は `true`、`hasTicket` も `true` です。

`&&` は両方が `true` のときだけ `true` になります。

---

## よくあるエラー

| エラー | 原因 | 解決方法 |
|---|---|---|
| `bad operand types` | 型に合わない演算をしている | 演算できる型か確認する |
| `';' expected` | セミコロン忘れ | 文の最後に `;` を付ける |
| `not a statement` | 演算結果の使い方が間違っている | 代入や出力に使う |
| `incompatible types` | 結果の型と変数の型が合っていない | 変数の型を確認する |

---


## まとめ

- 演算子は、計算や比較を行うための記号
- `+`, `-`, `*`, `/`, `%` で計算できる
- 整数同士の割り算では小数部分が切り捨てられる
- `+` は文字列の連結にも使える
- `=` は代入、`==` は比較
- 比較演算子の結果は `true` または `false`
- `&&`, `||`, `!` で条件を組み合わせられる