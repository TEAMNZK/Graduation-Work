# 第22章 例外処理

## 学習目標

- 例外とは何かを理解する
- `try-catch` を使って例外を処理できる
- 例外が発生したときの流れを理解する
- `finally` の使い方を理解する
- `throw` と `throws` の基本を理解する
- よくある例外の原因と対処法を知る

---

## 例外とは

例外とは、プログラムの実行中に発生する問題のことです。

たとえば、次のような場合に例外が発生します。

- 数値を入力する場所に文字を入力した
- 存在しない配列の要素を取り出そうとした
- `null` の変数からメソッドを呼び出した
- 存在しないファイルを読み込もうとした
- 0で割り算しようとした

例外が発生すると、何も対処していない場合、プログラムは途中で終了します。

---

## 例外が発生する例

次のコードでは、0で割り算をしています。

```java
public class Main {
    public static void main(String[] args) {
        int result = 10 / 0;

        System.out.println(result);
    }
}
```

このプログラムを実行すると、例外が発生します。

```text
Exception in thread "main" java.lang.ArithmeticException: / by zero
```

`ArithmeticException` は、計算に関する例外です。

この場合、0で割り算しようとしたため例外が発生しています。

---

## 例外が起きるとどうなるか

例外が発生すると、その時点で通常の処理は止まります。

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("開始");

        int result = 10 / 0;

        System.out.println("結果: " + result);
        System.out.println("終了");
    }
}
```

実行結果：

```text
開始
Exception in thread "main" java.lang.ArithmeticException: / by zero
```

`10 / 0` のところで例外が発生するため、  
そのあとの `System.out.println("終了");` は実行されません。

---

## 例外処理とは

例外処理とは、例外が発生したときにプログラムが異常終了しないように対処する仕組みです。

Javaでは、主に `try-catch` を使って例外を処理します。

---

## try-catchの基本形

`try-catch` は次のように書きます。

```java
try {
    例外が発生する可能性のある処理
} catch (例外の型 変数名) {
    例外が発生したときの処理
}
```

`try` の中に、例外が発生する可能性のある処理を書きます。

例外が発生すると、対応する `catch` の中の処理が実行されます。

---

## try-catchの例

```java
public class Main {
    public static void main(String[] args) {
        try {
            int result = 10 / 0;
            System.out.println(result);
        } catch (ArithmeticException e) {
            System.out.println("0で割ることはできません");
        }

        System.out.println("プログラムを終了します");
    }
}
```

実行結果：

```text
0で割ることはできません
プログラムを終了します
```

例外が発生しても、`catch` で処理しているため、プログラムは最後まで実行されます。

---

## tryの中の処理

`try` の中には、例外が発生する可能性のある処理を書きます。

```java
try {
    int result = 10 / 0;
    System.out.println(result);
}
```

この例では、`10 / 0` で例外が発生する可能性があります。

例外が発生すると、その時点で `try` の中の残りの処理は実行されず、`catch` に移ります。

---

## catchの中の処理

`catch` の中には、例外が発生したときの処理を書きます。

```java
catch (ArithmeticException e) {
    System.out.println("0で割ることはできません");
}
```

`ArithmeticException` は、発生する例外の型です。

`e` は、発生した例外を受け取る変数です。

---

## 例外オブジェクトを使う

`catch` で受け取った例外オブジェクトから、エラーメッセージを取得できます。

```java
public class Main {
    public static void main(String[] args) {
        try {
            int result = 10 / 0;
            System.out.println(result);
        } catch (ArithmeticException e) {
            System.out.println("エラー: " + e.getMessage());
        }
    }
}
```

実行結果：

```text
エラー: / by zero
```

`getMessage()` は、例外の内容を表すメッセージを返します。

---

## 入力で例外が発生する例

`Scanner` で整数を入力する場所に文字を入力すると、例外が発生します。

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("整数を入力してください: ");
        int number = scanner.nextInt();

        System.out.println("入力された数値: " + number);

        scanner.close();
    }
}
```

実行例：

```text
整数を入力してください: abc
Exception in thread "main" java.util.InputMismatchException
```

`nextInt()` は整数を受け取るメソッドです。

そのため、`abc` のような文字を入力すると `InputMismatchException` が発生します。

---

## 入力の例外を処理する

```java
import java.util.Scanner;
import java.util.InputMismatchException;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        try {
            System.out.print("整数を入力してください: ");
            int number = scanner.nextInt();

            System.out.println("入力された数値: " + number);
        } catch (InputMismatchException e) {
            System.out.println("整数を入力してください");
        }

        scanner.close();
    }
}
```

実行例：

```text
整数を入力してください: abc
整数を入力してください
```

`InputMismatchException` を `catch` することで、入力ミスに対応できます。

---

## 複数のcatch

例外の種類によって処理を分けたい場合は、`catch` を複数書けます。

```java
try {
    処理
} catch (例外型1 e) {
    例外型1が発生したときの処理
} catch (例外型2 e) {
    例外型2が発生したときの処理
}
```

---

## 複数のcatchの例

```java
public class Main {
    public static void main(String[] args) {
        try {
            int[] numbers = {10, 20, 30};

            System.out.println(numbers[5]);
        } catch (ArithmeticException e) {
            System.out.println("計算エラーが発生しました");
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("配列の範囲外にアクセスしました");
        }
    }
}
```

実行結果：

```text
配列の範囲外にアクセスしました
```

`numbers[5]` は存在しないため、`ArrayIndexOutOfBoundsException` が発生します。

---

## Exceptionでまとめて受け取る

`Exception` は、多くの例外の親クラスです。

そのため、次のように書くと、さまざまな例外をまとめて受け取れます。

```java
try {
    処理
} catch (Exception e) {
    例外が発生したときの処理
}
```

例：

```java
public class Main {
    public static void main(String[] args) {
        try {
            int result = 10 / 0;
            System.out.println(result);
        } catch (Exception e) {
            System.out.println("何らかのエラーが発生しました");
        }
    }
}
```

実行結果：

```text
何らかのエラーが発生しました
```

---

## Exceptionを使いすぎない

`Exception` でまとめて受け取ると便利ですが、どんな例外が起きたのか分かりにくくなることがあります。

```java
catch (Exception e) {
    System.out.println("エラーです");
}
```

この書き方では、計算エラーなのか、配列のエラーなのか、入力エラーなのか分かりません。

できるだけ、想定される例外の型を指定すると分かりやすくなります。

```java
catch (ArithmeticException e) {
    System.out.println("0で割ることはできません");
}
```

---

## catchの順番に注意

複数の `catch` を書く場合、親クラスの例外を先に書くとエラーになります。

間違った例：

```java
try {
    int result = 10 / 0;
} catch (Exception e) {
    System.out.println("例外が発生しました");
} catch (ArithmeticException e) {
    System.out.println("計算エラーです");
}
```

`Exception` は `ArithmeticException` の親クラスです。

先に `Exception` で受け取ってしまうと、`ArithmeticException` の `catch` には到達できません。

正しくは、具体的な例外を先に書きます。

```java
try {
    int result = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("計算エラーです");
} catch (Exception e) {
    System.out.println("例外が発生しました");
}
```

---

## finally

`finally` は、例外が発生してもしなくても必ず実行される処理を書く場所です。

```java
try {
    処理
} catch (例外の型 e) {
    例外が発生したときの処理
} finally {
    必ず実行する処理
}
```

---

## finallyの例

```java
public class Main {
    public static void main(String[] args) {
        try {
            int result = 10 / 0;
            System.out.println(result);
        } catch (ArithmeticException e) {
            System.out.println("0で割ることはできません");
        } finally {
            System.out.println("finallyの処理です");
        }
    }
}
```

実行結果：

```text
0で割ることはできません
finallyの処理です
```

例外が発生しても、`finally` の処理は実行されます。

---

## 例外が発生しない場合のfinally

```java
public class Main {
    public static void main(String[] args) {
        try {
            int result = 10 / 2;
            System.out.println(result);
        } catch (ArithmeticException e) {
            System.out.println("0で割ることはできません");
        } finally {
            System.out.println("finallyの処理です");
        }
    }
}
```

実行結果：

```text
5
finallyの処理です
```

例外が発生しなくても、`finally` は実行されます。

---

## finallyが向いている処理

`finally` は、後片付けの処理に向いています。

たとえば：

- ファイルを閉じる
- データベース接続を閉じる
- ネットワーク接続を閉じる
- 一時的なリソースを解放する

ただし、最近のJavaでは `try-with-resources` という便利な書き方もよく使われます。

これはファイル操作の章で扱います。

---

## 配列の例外

配列では、存在しないインデックスを指定すると例外が発生します。

```java
public class Main {
    public static void main(String[] args) {
        int[] numbers = {10, 20, 30};

        System.out.println(numbers[3]);
    }
}
```

実行結果：

```text
Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException
```

配列のインデックスは `0` から始まります。

この配列で使えるインデックスは `0`, `1`, `2` です。

---

## 配列の例外を処理する

```java
public class Main {
    public static void main(String[] args) {
        int[] numbers = {10, 20, 30};

        try {
            System.out.println(numbers[3]);
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("配列の範囲外です");
        }
    }
}
```

実行結果：

```text
配列の範囲外です
```

---

## nullによる例外

`null` の変数からメソッドを呼び出すと、例外が発生します。

```java
public class Main {
    public static void main(String[] args) {
        String text = null;

        System.out.println(text.length());
    }
}
```

実行結果：

```text
Exception in thread "main" java.lang.NullPointerException
```

`text` には文字列オブジェクトが入っていません。

そのため、`length()` を呼び出そうとして例外が発生します。

---

## nullを確認する

`null` の可能性がある場合は、使う前に確認します。

```java
public class Main {
    public static void main(String[] args) {
        String text = null;

        if (text != null) {
            System.out.println(text.length());
        } else {
            System.out.println("textはnullです");
        }
    }
}
```

実行結果：

```text
textはnullです
```

`NullPointerException` はよくある例外なので、注意しましょう。

---

## NumberFormatException

文字列を数値に変換するとき、変換できない文字列を指定すると例外が発生します。

```java
public class Main {
    public static void main(String[] args) {
        String text = "abc";

        int number = Integer.parseInt(text);

        System.out.println(number);
    }
}
```

実行結果：

```text
Exception in thread "main" java.lang.NumberFormatException
```

`"abc"` は整数に変換できないため、`NumberFormatException` が発生します。

---

## NumberFormatExceptionを処理する

```java
public class Main {
    public static void main(String[] args) {
        String text = "abc";

        try {
            int number = Integer.parseInt(text);
            System.out.println(number);
        } catch (NumberFormatException e) {
            System.out.println("数値に変換できません");
        }
    }
}
```

実行結果：

```text
数値に変換できません
```

---

## throw

`throw` を使うと、自分で例外を発生させることができます。

```java
throw new IllegalArgumentException("不正な値です");
```

`IllegalArgumentException` は、不正な引数が渡されたときによく使われる例外です。

---

## throwの例

年齢が負の値の場合に、例外を発生させてみます。

```java
public class Main {
    public static void main(String[] args) {
        setAge(-5);
    }

    public static void setAge(int age) {
        if (age < 0) {
            throw new IllegalArgumentException("年齢は0以上である必要があります");
        }

        System.out.println("年齢: " + age);
    }
}
```

実行結果：

```text
Exception in thread "main" java.lang.IllegalArgumentException: 年齢は0以上である必要があります
```

`throw` を使うことで、不正な値を受け取ったときに明確にエラーを発生させられます。

---

## throwをtry-catchで受け取る

自分で発生させた例外も、`try-catch` で処理できます。

```java
public class Main {
    public static void main(String[] args) {
        try {
            setAge(-5);
        } catch (IllegalArgumentException e) {
            System.out.println("エラー: " + e.getMessage());
        }
    }

    public static void setAge(int age) {
        if (age < 0) {
            throw new IllegalArgumentException("年齢は0以上である必要があります");
        }

        System.out.println("年齢: " + age);
    }
}
```

実行結果：

```text
エラー: 年齢は0以上である必要があります
```

---

## throws

`throws` は、そのメソッドで例外が発生する可能性があることを示すために使います。

```java
戻り値の型 メソッド名() throws 例外型 {
    処理
}
```

例：

```java
public static void checkAge(int age) throws Exception {
    if (age < 0) {
        throw new Exception("年齢が不正です");
    }
}
```

`throws` は、例外処理を呼び出し元に任せるときに使います。

---

## throwsの例

```java
public class Main {
    public static void main(String[] args) {
        try {
            checkAge(-5);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    public static void checkAge(int age) throws Exception {
        if (age < 0) {
            throw new Exception("年齢が不正です");
        }

        System.out.println("年齢: " + age);
    }
}
```

実行結果：

```text
年齢が不正です
```

`checkAge()` は例外を発生させる可能性があります。

そのため、呼び出し元の `main` メソッドで `try-catch` を使っています。

---

## throwとthrowsの違い

| 書き方 | 意味 |
|---|---|
| `throw` | 実際に例外を発生させる |
| `throws` | 例外が発生する可能性を宣言する |

例：

```java
throw new Exception("エラーです");
```

これは、実際に例外を発生させています。

```java
public static void method() throws Exception
```

これは、このメソッドで例外が発生する可能性があることを示しています。

---

## チェック例外と非チェック例外

Javaの例外には、大きく分けて次の2種類があります。

| 種類 | 説明 | 例 |
|---|---|---|
| チェック例外 | 例外処理を書く必要がある例外 | `IOException` |
| 非チェック例外 | 例外処理を書かなくてもコンパイルできる例外 | `ArithmeticException`, `NullPointerException` |

この章では、まず「例外には種類がある」くらいの理解で大丈夫です。

ファイル操作の章では、`IOException` というチェック例外が登場します。

---

## よくある例外

| 例外 | 主な原因 |
|---|---|
| `ArithmeticException` | 0で割り算した |
| `InputMismatchException` | 入力された値の型が合わない |
| `ArrayIndexOutOfBoundsException` | 配列の範囲外にアクセスした |
| `NullPointerException` | `null` からメソッドやフィールドを使った |
| `NumberFormatException` | 数値に変換できない文字列を変換しようとした |
| `IOException` | ファイル操作などで問題が発生した |

---

## 例外処理を書くときの考え方

例外処理を書くときは、次のように考えます。

1. どこで例外が起きそうか考える
2. 起きそうな例外の種類を確認する
3. `try` の中に危険な処理を書く
4. `catch` でユーザーに分かりやすいメッセージを表示する
5. 必要なら `finally` で後片付けをする

例外処理は、プログラムを安全に動かすために重要です。

---

## 悪い例外処理

次のように、何も表示しない `catch` は避けましょう。

```java
try {
    int result = 10 / 0;
} catch (Exception e) {
}
```

これでは、例外が発生しても何が起きたのか分かりません。

最低限、メッセージを表示すると原因を調べやすくなります。

```java
catch (Exception e) {
    System.out.println("エラーが発生しました: " + e.getMessage());
}
```

---

## ユーザー向けのメッセージにする

例外が発生したときは、ユーザーに分かりやすいメッセージを表示することも大切です。

技術的なメッセージ：

```text
java.util.InputMismatchException
```

ユーザー向けのメッセージ：

```text
整数を入力してください
```

学習用のプログラムでも、できるだけ分かりやすいメッセージを意識しましょう。

---

## よくあるエラー

| エラー | 原因 | 解決方法 |
|---|---|---|
| `ArithmeticException` | 0で割り算した | 割る数が0でないか確認する |
| `InputMismatchException` | 入力値の型が違う | 入力する値の種類を確認する |
| `ArrayIndexOutOfBoundsException` | 配列の範囲外にアクセスした | インデックスを確認する |
| `NullPointerException` | `null` の変数を使った | `null` でないか確認する |
| `NumberFormatException` | 数値に変換できない文字列を変換した | 変換前に文字列の内容を確認する |
| `unreported exception ... must be caught or declared to be thrown` | チェック例外を処理していない | `try-catch` または `throws` を書く |


---

## まとめ

- 例外は、プログラムの実行中に発生する問題
- 例外が発生すると、何も対処しない場合はプログラムが終了する
- `try-catch` を使うと、例外を処理できる
- `try` には例外が発生する可能性のある処理を書く
- `catch` には例外が発生したときの処理を書く
- `finally` は例外の有無に関係なく実行される
- `throw` は自分で例外を発生させるために使う
- `throws` は例外が発生する可能性を宣言するために使う
- 例外処理を書くことで、プログラムを安全に動かしやすくなる