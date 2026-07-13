# 第14章 オーバーロード

## 学習目標

- オーバーロードとは何かを理解する
- 同じ名前のメソッドを複数定義できる
- 引数の数や型によってメソッドを使い分けられる
- 戻り値だけではオーバーロードできないことを理解する
- オーバーロードを使って読みやすいコードを書ける

---

## オーバーロードとは

オーバーロードとは、同じ名前のメソッドを複数定義することです。

ただし、まったく同じ形のメソッドを複数作ることはできません。

オーバーロードでは、次のような違いが必要です。

- 引数の数が違う
- 引数の型が違う
- 引数の順番が違う

たとえば、同じ `print` という名前でも、  
文字列用、整数用、小数用のメソッドを作ることができます。

---

## オーバーロードを使わない例

まず、オーバーロードを使わずにメソッド名を分けてみます。

```java
public class Main {
    public static void main(String[] args) {
        printString("Java");
        printInt(100);
        printDouble(3.14);
    }

    public static void printString(String text) {
        System.out.println(text);
    }

    public static void printInt(int number) {
        System.out.println(number);
    }

    public static void printDouble(double number) {
        System.out.println(number);
    }
}
```

実行結果：

```text
Java
100
3.14
```

この書き方でも動きます。

しかし、どれも「値を表示する」という役割なのに、  
メソッド名がばらばらになっています。

---

## オーバーロードを使う例

オーバーロードを使うと、同じ `print` という名前で定義できます。

```java
public class Main {
    public static void main(String[] args) {
        print("Java");
        print(100);
        print(3.14);
    }

    public static void print(String text) {
        System.out.println(text);
    }

    public static void print(int number) {
        System.out.println(number);
    }

    public static void print(double number) {
        System.out.println(number);
    }
}
```

実行結果：

```text
Java
100
3.14
```

Javaは、渡された引数の型を見て、  
どの `print` メソッドを呼び出すかを自動で判断します。

---

## 引数の型が違うオーバーロード

引数の型が違えば、同じ名前のメソッドを定義できます。

```java
public class Main {
    public static void main(String[] args) {
        show(10);
        show("Hello");
    }

    public static void show(int number) {
        System.out.println("整数: " + number);
    }

    public static void show(String text) {
        System.out.println("文字列: " + text);
    }
}
```

実行結果：

```text
整数: 10
文字列: Hello
```

`show(10)` では `int` 型のメソッドが呼ばれます。

`show("Hello")` では `String` 型のメソッドが呼ばれます。

---

## 引数の数が違うオーバーロード

引数の数が違う場合も、オーバーロードできます。

```java
public class Main {
    public static void main(String[] args) {
        greeting();
        greeting("Taro");
    }

    public static void greeting() {
        System.out.println("こんにちは");
    }

    public static void greeting(String name) {
        System.out.println("こんにちは、" + name + "さん");
    }
}
```

実行結果：

```text
こんにちは
こんにちは、Taroさん
```

`greeting()` は引数なしのメソッドです。

`greeting("Taro")` は `String` 型の引数を1つ受け取るメソッドです。

---

## 引数の順番が違うオーバーロード

引数の型の順番が違う場合も、オーバーロードできます。

```java
public class Main {
    public static void main(String[] args) {
        show("Taro", 20);
        show(25, "Hanako");
    }

    public static void show(String name, int age) {
        System.out.println(name + "さんは" + age + "歳です");
    }

    public static void show(int age, String name) {
        System.out.println(age + "歳の" + name + "さんです");
    }
}
```

実行結果：

```text
Taroさんは20歳です
25歳のHanakoさんです
```

1つ目は `String, int` の順番です。

2つ目は `int, String` の順番です。

このように、引数の順番が違えば別のメソッドとして扱われます。

---

## 戻り値だけではオーバーロードできない

戻り値の型だけが違うメソッドは、オーバーロードできません。

次のコードはエラーになります。

```java
public static int getValue() {
    return 10;
}

public static String getValue() {
    return "Java";
}
```

どちらも `getValue()` という名前で、引数もありません。

Javaは、メソッドを呼び出すときに戻り値だけでは区別できません。

そのため、戻り値の型だけを変えてもオーバーロードにはなりません。

---

## メソッドの区別に使われるもの

Javaでは、メソッドを区別するときに次の情報を使います。

- メソッド名
- 引数の数
- 引数の型
- 引数の順番

この組み合わせを **メソッドシグネチャ** と呼びます。

次の2つは、シグネチャが違います。

```java
public static void show(int number)
public static void show(String text)
```

引数の型が違うため、別のメソッドとして扱われます。

---

## メソッドシグネチャの例

| メソッド | オーバーロード可能か |
|---|---|
| `show()` と `show(String name)` | 可能 |
| `show(int number)` と `show(double number)` | 可能 |
| `show(String name, int age)` と `show(int age, String name)` | 可能 |
| `int getValue()` と `String getValue()` | 不可 |

戻り値の型は、メソッドシグネチャには含まれません。

---

## 足し算メソッドのオーバーロード

次の例では、`add` メソッドをオーバーロードしています。

```java
public class Main {
    public static void main(String[] args) {
        System.out.println(add(10, 5));
        System.out.println(add(1.5, 2.3));
        System.out.println(add(10, 20, 30));
    }

    public static int add(int num1, int num2) {
        return num1 + num2;
    }

    public static double add(double num1, double num2) {
        return num1 + num2;
    }

    public static int add(int num1, int num2, int num3) {
        return num1 + num2 + num3;
    }
}
```

実行結果：

```text
15
3.8
60
```

同じ `add` という名前でも、  
引数の型や数によって呼び出されるメソッドが変わります。

---

## 表示メソッドのオーバーロード

表示処理でも、オーバーロードはよく使えます。

```java
public class Main {
    public static void main(String[] args) {
        showMessage();
        showMessage("Java");
        showMessage("Java", 3);
    }

    public static void showMessage() {
        System.out.println("メッセージはありません");
    }

    public static void showMessage(String message) {
        System.out.println(message);
    }

    public static void showMessage(String message, int count) {
        for (int i = 0; i < count; i++) {
            System.out.println(message);
        }
    }
}
```

実行結果：

```text
メッセージはありません
Java
Java
Java
Java
```

`showMessage()` は引数なし、  
`showMessage("Java")` は文字列を1つ、  
`showMessage("Java", 3)` は文字列と回数を受け取ります。

---

## System.out.printlnもオーバーロードされている

実は、これまで何度も使ってきた `System.out.println()` もオーバーロードされています。

```java
System.out.println("Hello");
System.out.println(100);
System.out.println(3.14);
System.out.println(true);
```

実行結果：

```text
Hello
100
3.14
true
```

文字列、整数、小数、真偽値など、  
さまざまな値を同じ `println` で表示できます。

これは、`println` が複数の型に対応するようにオーバーロードされているためです。

---

## オーバーロードのメリット

オーバーロードには、次のようなメリットがあります。

| メリット | 説明 |
|---|---|
| メソッド名を統一できる | 同じ役割の処理を同じ名前にできる |
| コードが読みやすくなる | メソッド名から役割が分かりやすい |
| 呼び出し側が使いやすい | 引数を変えるだけで使い分けられる |
| 関連する処理をまとめられる | 同じ目的のメソッドを整理できる |

---

## オーバーロードしすぎに注意

オーバーロードは便利ですが、使いすぎると分かりにくくなることもあります。

たとえば、同じ名前なのにまったく違う処理をするメソッドは避けたほうがよいです。

分かりにくい例：

```java
public static void run(String name) {
    System.out.println(name);
}

public static void run(int price) {
    System.out.println(price * 2);
}
```

`run` という名前だけでは、何をするメソッドなのか分かりません。

オーバーロードは、同じ目的の処理に使うと読みやすくなります。

---

## 良いオーバーロードの例

同じ「表示する」という目的なら、同じ名前にしても自然です。

```java
public static void print(String text) {
    System.out.println(text);
}

public static void print(int number) {
    System.out.println(number);
}

public static void print(double number) {
    System.out.println(number);
}
```

どのメソッドも「値を表示する」という役割を持っています。

このように、役割が同じメソッドに対してオーバーロードを使うと分かりやすくなります。

---

## 型の自動変換とオーバーロード

Javaでは、必要に応じて型が自動変換されることがあります。

```java
public class Main {
    public static void main(String[] args) {
        show(10);
    }

    public static void show(double number) {
        System.out.println(number);
    }
}
```

実行結果：

```text
10.0
```

`10` は `int` 型ですが、  
`double` 型として扱えるため、`show(double number)` が呼び出されます。

---

## より近い型が選ばれる

複数のメソッドが候補になる場合、Javaはより近い型のメソッドを選びます。

```java
public class Main {
    public static void main(String[] args) {
        show(10);
    }

    public static void show(int number) {
        System.out.println("int: " + number);
    }

    public static void show(double number) {
        System.out.println("double: " + number);
    }
}
```

実行結果：

```text
int: 10
```

`10` は `int` 型なので、  
`show(int number)` が選ばれます。

---

## あいまいな呼び出しに注意

オーバーロードでは、どのメソッドを呼べばよいかJavaが判断できない場合があります。

```java
public static void show(int number, double value) {
    System.out.println("int, double");
}

public static void show(double value, int number) {
    System.out.println("double, int");
}
```

この状態で次のように呼び出すと、エラーになることがあります。

```java
show(10, 20);
```

`10` も `20` も `int` ですが、  
どちらのメソッドにも変換できてしまうため、判断があいまいになります。

オーバーロードを書くときは、呼び出しが分かりやすい形にしましょう。

---

## オーバーロードと引数名

引数名だけを変えても、オーバーロードにはなりません。

次のコードはエラーになります。

```java
public static void show(int age) {
    System.out.println(age);
}

public static void show(int score) {
    System.out.println(score);
}
```

どちらも `show(int)` という同じ形のメソッドです。

引数名が `age` と `score` で違っていても、  
Javaから見ると同じメソッドとして扱われます。

---

## よくあるエラー

| エラー | 原因 | 解決方法 |
|---|---|---|
| `method is already defined` | 同じシグネチャのメソッドを定義している | 引数の数や型を変える |
| `reference to method is ambiguous` | 呼び出すメソッドがあいまい | 引数の型を明確にする |
| `method cannot be applied to given types` | 引数の型や数が合わない | 呼び出し方を確認する |
| `missing return statement` | 戻り値が必要なのに `return` がない | 必ず値を返す |
| `incompatible types` | 戻り値や引数の型が合わない | 型を確認する |

---

## まとめ

- オーバーロードは、同じ名前のメソッドを複数定義すること
- 引数の数が違えばオーバーロードできる
- 引数の型が違えばオーバーロードできる
- 引数の順番が違えばオーバーロードできる
- 戻り値の型だけではオーバーロードできない
- 引数名だけを変えてもオーバーロードできない
- オーバーロードを使うと、同じ目的の処理を同じ名前で整理できる
- 使いすぎると分かりにくくなるため、同じ役割のメソッドに使う