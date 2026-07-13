# 第13章 メソッド

## 学習目標

- メソッドとは何かを理解する
- メソッドを定義できる
- メソッドを呼び出せる
- 引数を使ってメソッドに値を渡せる
- 戻り値を使って結果を受け取れる
- メソッドを使って処理を整理できる

---

## メソッドとは

メソッドとは、処理をひとまとまりにして名前を付けたものです。

たとえば、次のような処理をメソッドにできます。

- あいさつを表示する
- 2つの数値を足す
- 点数から合格かどうかを判定する
- 配列の合計を計算する

メソッドを使うと、同じ処理を何度も書かずに済みます。

また、プログラムを読みやすく整理できます。

---

## メソッドを使わない例

まず、メソッドを使わずに同じ処理を何度も書いてみます。

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("こんにちは");
        System.out.println("Javaを学びましょう");

        System.out.println("こんにちは");
        System.out.println("Javaを学びましょう");

        System.out.println("こんにちは");
        System.out.println("Javaを学びましょう");
    }
}
```

実行結果：

```text
こんにちは
Javaを学びましょう
こんにちは
Javaを学びましょう
こんにちは
Javaを学びましょう
```

同じ処理を3回書いています。

このような場合、メソッドを使うとスッキリ書けます。

---

## メソッドを使う例

```java
public class Main {
    public static void main(String[] args) {
        greeting();
        greeting();
        greeting();
    }

    public static void greeting() {
        System.out.println("こんにちは");
        System.out.println("Javaを学びましょう");
    }
}
```

実行結果：

```text
こんにちは
Javaを学びましょう
こんにちは
Javaを学びましょう
こんにちは
Javaを学びましょう
```

`greeting()` というメソッドを作り、  
同じ処理を3回呼び出しています。

---

## メソッドの基本形

メソッドは次のように定義します。

```java
public static void メソッド名() {
    実行したい処理
}
```

例：

```java
public static void greeting() {
    System.out.println("こんにちは");
}
```

この場合、`greeting` という名前のメソッドを定義しています。

---

## メソッドを呼び出す

定義したメソッドは、次のように呼び出します。

```java
メソッド名();
```

例：

```java
greeting();
```

メソッドを呼び出すと、そのメソッドの中に書かれた処理が実行されます。

---

## メソッドの定義場所

この教科書では、まず `main` メソッドの下に新しいメソッドを書きます。

```java
public class Main {
    public static void main(String[] args) {
        greeting();
    }

    public static void greeting() {
        System.out.println("こんにちは");
    }
}
```

`main` メソッドも、実はメソッドの1つです。

```java
public static void main(String[] args) {
}
```

Javaプログラムは、まず `main` メソッドから実行されます。

---

## メソッド名の付け方

メソッド名は、その処理が何をするのか分かる名前にします。

良い例：

```java
printMessage();
calculateTotal();
showMenu();
```

分かりにくい例：

```java
a();
test();
doIt();
```

メソッド名を見るだけで、何をする処理なのか分かるようにしましょう。

---

## メソッド名はキャメルケースで書く

Javaでは、メソッド名にもキャメルケースを使うことが多いです。

```java
printMessage();
calculateTotal();
showUserName();
```

最初の単語は小文字で始め、2つ目以降の単語の先頭を大文字にします。

---

## 引数とは

引数とは、メソッドに渡す値のことです。

たとえば、名前を渡してあいさつを表示するメソッドを作れます。

```java
public class Main {
    public static void main(String[] args) {
        greeting("Taro");
        greeting("Hanako");
    }

    public static void greeting(String name) {
        System.out.println("こんにちは、" + name + "さん");
    }
}
```

実行結果：

```text
こんにちは、Taroさん
こんにちは、Hanakoさん
```

`greeting("Taro")` の `"Taro"` が引数です。

メソッド側では、`String name` として受け取っています。

---

## 引数を受け取るメソッドの基本形

引数を受け取るメソッドは、次のように書きます。

```java
public static void メソッド名(型 変数名) {
    実行したい処理
}
```

例：

```java
public static void greeting(String name) {
    System.out.println("こんにちは、" + name + "さん");
}
```

このメソッドは、`String` 型の値を1つ受け取ります。

---

## 数値を引数で渡す

数値を引数として渡すこともできます。

```java
public class Main {
    public static void main(String[] args) {
        showAge(20);
        showAge(35);
    }

    public static void showAge(int age) {
        System.out.println("年齢は" + age + "歳です");
    }
}
```

実行結果：

```text
年齢は20歳です
年齢は35歳です
```

`showAge` メソッドは、`int` 型の値を受け取っています。

---

## 複数の引数

メソッドには、複数の引数を渡すこともできます。

```java
public class Main {
    public static void main(String[] args) {
        showProfile("Taro", 20);
        showProfile("Hanako", 25);
    }

    public static void showProfile(String name, int age) {
        System.out.println("名前: " + name);
        System.out.println("年齢: " + age);
    }
}
```

実行結果：

```text
名前: Taro
年齢: 20
名前: Hanako
年齢: 25
```

複数の引数は、`,` で区切ります。

```java
public static void showProfile(String name, int age)
```

---

## 引数の順番に注意

引数は、定義した順番通りに渡す必要があります。

```java
public static void showProfile(String name, int age) {
    System.out.println(name + "さんは" + age + "歳です");
}
```

このメソッドは、最初に `String`、次に `int` を受け取ります。

正しい呼び出し：

```java
showProfile("Taro", 20);
```

間違った呼び出し：

```java
showProfile(20, "Taro"); // エラー
```

型や順番が違うとエラーになります。

---

## 戻り値とは

戻り値とは、メソッドの処理結果として返す値のことです。

たとえば、2つの数値を足して、その結果を返すメソッドを作れます。

```java
public class Main {
    public static void main(String[] args) {
        int result = add(10, 5);

        System.out.println(result);
    }

    public static int add(int num1, int num2) {
        int total = num1 + num2;
        return total;
    }
}
```

実行結果：

```text
15
```

`add(10, 5)` の結果として `15` が返され、  
`result` に代入されています。

---

## 戻り値があるメソッドの基本形

戻り値があるメソッドは、次のように書きます。

```java
public static 戻り値の型 メソッド名(引数) {
    処理
    return 戻り値;
}
```

例：

```java
public static int add(int num1, int num2) {
    return num1 + num2;
}
```

このメソッドは、`int` 型の値を返します。

---

## voidとは

`void` は、戻り値がないことを表します。

```java
public static void greeting() {
    System.out.println("こんにちは");
}
```

このメソッドは、画面に文字を表示するだけで、値を返しません。

一方、次のメソッドは `int` の値を返します。

```java
public static int add(int num1, int num2) {
    return num1 + num2;
}
```

---

## return文

`return` は、メソッドから値を返すために使います。

```java
return num1 + num2;
```

また、`return` が実行されると、そのメソッドの処理はそこで終了します。

```java
public static int checkScore(int score) {
    if (score < 0) {
        return 0;
    }

    return score;
}
```

この例では、`score` が `0` 未満なら `0` を返してメソッドを終了します。

---

## 戻り値をそのまま表示する

戻り値は、変数に入れずにそのまま使うこともできます。

```java
public class Main {
    public static void main(String[] args) {
        System.out.println(add(10, 5));
    }

    public static int add(int num1, int num2) {
        return num1 + num2;
    }
}
```

実行結果：

```text
15
```

`add(10, 5)` の結果が、そのまま `System.out.println()` に渡されています。

---

## 戻り値を計算に使う

戻り値は、さらに別の計算に使うこともできます。

```java
public class Main {
    public static void main(String[] args) {
        int result = add(10, 5) * 2;

        System.out.println(result);
    }

    public static int add(int num1, int num2) {
        return num1 + num2;
    }
}
```

実行結果：

```text
30
```

`add(10, 5)` の結果は `15` です。

その `15` に `2` を掛けているため、結果は `30` になります。

---

## booleanを返すメソッド

メソッドは、`boolean` を返すこともできます。

```java
public class Main {
    public static void main(String[] args) {
        int score = 75;

        if (isPass(score)) {
            System.out.println("合格");
        } else {
            System.out.println("不合格");
        }
    }

    public static boolean isPass(int score) {
        return score >= 60;
    }
}
```

実行結果：

```text
合格
```

`isPass` メソッドは、点数が60点以上なら `true`、  
そうでなければ `false` を返します。

---

## Stringを返すメソッド

文字列を返すメソッドも作れます。

```java
public class Main {
    public static void main(String[] args) {
        String message = getGreeting("Taro");

        System.out.println(message);
    }

    public static String getGreeting(String name) {
        return "こんにちは、" + name + "さん";
    }
}
```

実行結果：

```text
こんにちは、Taroさん
```

戻り値の型が `String` の場合、`return` で文字列を返します。

---

## 配列を引数にする

配列をメソッドに渡すこともできます。

```java
public class Main {
    public static void main(String[] args) {
        int[] scores = {80, 90, 75};

        printArray(scores);
    }

    public static void printArray(int[] numbers) {
        for (int number : numbers) {
            System.out.println(number);
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

`int[] numbers` のように書くことで、`int` 型の配列を受け取れます。

---

## 配列の合計を返すメソッド

配列を受け取り、合計を返すメソッドを作ってみます。

```java
public class Main {
    public static void main(String[] args) {
        int[] scores = {80, 90, 75};

        int total = getTotal(scores);

        System.out.println("合計: " + total);
    }

    public static int getTotal(int[] numbers) {
        int total = 0;

        for (int number : numbers) {
            total += number;
        }

        return total;
    }
}
```

実行結果：

```text
合計: 245
```

メソッドを使うことで、配列の合計を求める処理を再利用できます。

---

## メソッドを分けるメリット

メソッドを使うと、次のようなメリットがあります。

| メリット | 説明 |
|---|---|
| 再利用できる | 同じ処理を何度も使える |
| 読みやすくなる | 処理のまとまりが分かりやすくなる |
| 修正しやすくなる | 変更する場所を少なくできる |
| 役割を分けられる | 1つのメソッドに1つの役割を持たせられる |

---

## 1つのメソッドには1つの役割

メソッドは、できるだけ1つの役割に絞ると読みやすくなります。

良い例：

```java
public static int add(int num1, int num2) {
    return num1 + num2;
}
```

このメソッドは、2つの数値を足す役割だけを持っています。

分かりにくい例：

```java
public static void doEverything() {
    System.out.println("入力してください");
    System.out.println("計算します");
    System.out.println("結果を保存します");
}
```

いろいろな処理を詰め込みすぎると、何をするメソッドなのか分かりにくくなります。

---

## mainメソッドを整理する

メソッドを使うと、`main` メソッドを短くできます。

```java
public class Main {
    public static void main(String[] args) {
        showTitle();
        showMenu();
    }

    public static void showTitle() {
        System.out.println("Java学習アプリ");
    }

    public static void showMenu() {
        System.out.println("1: 開始");
        System.out.println("2: 終了");
    }
}
```

実行結果：

```text
Java学習アプリ
1: 開始
2: 終了
```

`main` メソッドを見るだけで、  
「タイトルを表示して、メニューを表示している」と分かります。

---

## よくあるエラー

| エラー | 原因 | 解決方法 |
|---|---|---|
| `cannot find symbol` | メソッド名の入力ミス | 定義した名前と呼び出し名を確認する |
| `method cannot be applied to given types` | 引数の数や型が違う | メソッド定義と呼び出しを確認する |
| `missing return statement` | 戻り値が必要なのに `return` がない | 必ず値を返す |
| `incompatible types` | 戻り値の型が違う | `return` する値の型を確認する |
| `void type not allowed here` | 戻り値のないメソッドを値として使っている | `void` メソッドは変数に代入しない |

---

## まとめ

- メソッドは、処理をひとまとまりにして名前を付けたもの
- メソッドは `メソッド名();` で呼び出す
- 引数を使うと、メソッドに値を渡せる
- 戻り値を使うと、メソッドから結果を受け取れる
- `void` は戻り値がないことを表す
- `return` は値を返すために使う
- 配列も引数として渡せる
- メソッドを使うと、プログラムを再利用しやすく、読みやすくできる