# 第7章 入力と出力

## 学習目標

- Javaで文字を画面に表示できる
- `System.out.print()` と `System.out.println()` の違いを理解する
- `Scanner` を使ってキーボード入力を受け取れる
- 入力された文字列や数値を変数に入れられる
- 入力処理でよくあるエラーを理解する

---

## 出力とは

出力とは、プログラムの結果を画面に表示することです。

Javaでは、画面に文字を表示するときに次の命令を使います。

```java
System.out.println();
```

これまでの章でも、何度も使ってきました。

---

## `println` で出力する

`println` は、文字を表示したあとに改行します。

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("こんにちは");
        System.out.println("Java");
    }
}
```

実行結果：

```text
こんにちは
Java
```

`println` を使うと、1回出力するごとに次の行へ進みます。

---

## `print` で出力する

`print` は、文字を表示しても改行しません。

```java
public class Main {
    public static void main(String[] args) {
        System.out.print("こんにちは");
        System.out.print("Java");
    }
}
```

実行結果：

```text
こんにちはJava
```

`print` を使うと、続けて同じ行に表示されます。

---

## `println` と `print` の違い

| 命令 | 動き |
|---|---|
| `System.out.println()` | 表示したあと改行する |
| `System.out.print()` | 表示しても改行しない |

入力を求めるメッセージでは、`print` を使うことも多いです。

```java
System.out.print("名前を入力してください: ");
```

このように書くと、入力する場所が同じ行に表示されます。

---

## 入力とは

入力とは、キーボードなどからプログラムに値を渡すことです。

たとえば、次のような値をユーザーに入力してもらえます。

- 名前
- 年齢
- 点数
- 金額
- メッセージ

入力を使うと、毎回違う値でプログラムを動かせます。

---

## `Scanner` とは

Javaでキーボード入力を受け取るには、`Scanner` を使います。

`Scanner` を使うには、プログラムの最初に次の1行を書きます。

```java
import java.util.Scanner;
```

これは、`Scanner` を使うための準備です。

---

## 文字列を入力する

まずは、名前を入力して表示するプログラムを書いてみます。

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("名前を入力してください: ");
        String name = scanner.next();

        System.out.println("こんにちは、" + name + "さん");
    }
}
```

実行例：

```text
名前を入力してください: Taro
こんにちは、Taroさん
```

---

## コードの意味

### `import java.util.Scanner;`

```java
import java.util.Scanner;
```

これは、`Scanner` を使うための準備です。

Javaには便利な機能がたくさん用意されています。

その中から `Scanner` を使うために、`import` を書きます。

---

### `Scanner scanner = new Scanner(System.in);`

```java
Scanner scanner = new Scanner(System.in);
```

これは、キーボードから入力を受け取るための準備です。

この章では、次のように考えておけば大丈夫です。

> `scanner` という名前の入力受付係を用意している

---

### `scanner.next()`

```java
String name = scanner.next();
```

`scanner.next()` は、キーボードから入力された文字列を受け取ります。

受け取った文字列を、`name` という変数に代入しています。

---

## 整数を入力する

整数を入力するときは `nextInt()` を使います。

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("年齢を入力してください: ");
        int age = scanner.nextInt();

        System.out.println("あなたは" + age + "歳です。");
    }
}
```

実行例：

```text
年齢を入力してください: 20
あなたは20歳です。
```

`nextInt()` は、入力された値を整数として受け取ります。

---

## 小数を入力する

小数を入力するときは `nextDouble()` を使います。

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("身長を入力してください: ");
        double height = scanner.nextDouble();

        System.out.println("身長は" + height + "cmです。");
    }
}
```

実行例：

```text
身長を入力してください: 170.5
身長は170.5cmです。
```

---

## 入力メソッドの種類

代表的な入力メソッドは次のとおりです。

| メソッド | 受け取る値 | 例 |
|---|---|---|
| `next()` | 空白までの文字列 | `Taro` |
| `nextLine()` | 1行分の文字列 | `Hello Java` |
| `nextInt()` | 整数 | `20` |
| `nextDouble()` | 小数 | `170.5` |
| `nextBoolean()` | 真偽値 | `true` |

---

## `next()` と `nextLine()` の違い

`next()` は、空白までの文字列を受け取ります。

```java
String text = scanner.next();
```

たとえば、次のように入力した場合：

```text
Hello Java
```

`next()` では `Hello` だけが受け取られます。

---

`nextLine()` は、1行分の文字列を受け取ります。

```java
String text = scanner.nextLine();
```

たとえば、次のように入力した場合：

```text
Hello Java
```

`nextLine()` では `Hello Java` 全体が受け取られます。

---

## 文章を入力する

文章を入力したい場合は、`nextLine()` を使います。

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("メッセージを入力してください: ");
        String message = scanner.nextLine();

        System.out.println("入力されたメッセージ: " + message);
    }
}
```

実行例：

```text
メッセージを入力してください: Javaの勉強を始めました
入力されたメッセージ: Javaの勉強を始めました
```

---

## 複数の値を入力する

複数の値を入力して、計算に使うこともできます。

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("1つ目の数値: ");
        int num1 = scanner.nextInt();

        System.out.print("2つ目の数値: ");
        int num2 = scanner.nextInt();

        int total = num1 + num2;

        System.out.println("合計は" + total + "です。");
    }
}
```

実行例：

```text
1つ目の数値: 10
2つ目の数値: 5
合計は15です。
```

---

## 入力した値を使って計算する

商品の値段と個数を入力して、合計金額を計算してみます。

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("商品の値段: ");
        int price = scanner.nextInt();

        System.out.print("個数: ");
        int count = scanner.nextInt();

        int total = price * count;

        System.out.println("合計金額は" + total + "円です。");
    }
}
```

実行例：

```text
商品の値段: 120
個数: 5
合計金額は600円です。
```

---

## `nextInt()` のあとに `nextLine()` を使うときの注意

`nextInt()` のあとに `nextLine()` を使うと、入力がうまく受け取れないことがあります。

例：

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("年齢: ");
        int age = scanner.nextInt();

        System.out.print("名前: ");
        String name = scanner.nextLine();

        System.out.println(age + "歳の" + name + "さん");
    }
}
```

このコードでは、`name` の入力が飛ばされたように見えることがあります。

これは、`nextInt()` のあとに残った改行を `nextLine()` が受け取ってしまうためです。

---

## 解決方法

`nextInt()` のあとに `nextLine()` を使う場合は、間にもう一度 `nextLine()` を書きます。

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("年齢: ");
        int age = scanner.nextInt();

        scanner.nextLine();

        System.out.print("名前: ");
        String name = scanner.nextLine();

        System.out.println(age + "歳の" + name + "さん");
    }
}
```

`scanner.nextLine();` を1回入れることで、残っていた改行を読み飛ばせます。

---

## 入力された値を表示する

入力された値をそのまま表示するだけでも、立派なプログラムです。

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("名前: ");
        String name = scanner.next();

        System.out.print("年齢: ");
        int age = scanner.nextInt();

        System.out.println("名前: " + name);
        System.out.println("年齢: " + age);
    }
}
```

実行例：

```text
名前: Taro
年齢: 20
名前: Taro
年齢: 20
```

---

## `Scanner` を閉じる

`Scanner` は、使い終わったあとに閉じることができます。

```java
scanner.close();
```

例：

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("名前を入力してください: ");
        String name = scanner.next();

        System.out.println("こんにちは、" + name + "さん");

        scanner.close();
    }
}
```

小さな練習プログラムでは省略されることもありますが、  
使い終わったものを閉じる習慣は大切です。

---

## よくあるエラー

| エラー | 原因 | 解決方法 |
|---|---|---|
| `cannot find symbol` | `Scanner` の import 忘れ | `import java.util.Scanner;` を書く |
| `InputMismatchException` | 数値を入力する場所に文字を入力した | 入力する値の種類を確認する |
| 入力が飛ばされる | `nextInt()` のあとに `nextLine()` を使っている | 間に `scanner.nextLine();` を入れる |
| `';' expected` | セミコロン忘れ | 文の最後に `;` を付ける |
| `variable might not have been initialized` | 変数に値を入れる前に使っている | 入力結果を変数に代入する |

---

## まとめ

- 出力には `System.out.println()` や `System.out.print()` を使う
- `println` は改行する
- `print` は改行しない
- 入力には `Scanner` を使う
- `Scanner` を使うには `import java.util.Scanner;` が必要
- 文字列は `next()` や `nextLine()` で入力できる
- 整数は `nextInt()`、小数は `nextDouble()` で入力できる
- `nextInt()` のあとに `nextLine()` を使うときは注意する