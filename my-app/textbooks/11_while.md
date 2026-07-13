# 第11章 while文

## 学習目標

- `while` 文の基本を理解する
- 条件が `true` の間、処理を繰り返せる
- `for` 文と `while` 文の違いを理解する
- 入力された値によって繰り返しを続けられる
- `do while` 文の基本を理解する
- 無限ループに注意できる

---

## while文とは

`while` 文は、条件が成り立っている間、同じ処理を繰り返すための文です。

たとえば、次のような処理に使えます。

- 数値が一定の値になるまで繰り返す
- ユーザーが終了を選ぶまでメニューを表示する
- 正しいパスワードが入力されるまで入力を求める
- 条件を満たす間だけ処理を続ける

---

## while文の基本形

`while` 文は次のように書きます。

```java
while (条件式) {
    繰り返したい処理
}
```

条件式の結果が `true` の間、`{}` の中の処理が繰り返されます。

条件式が `false` になると、`while` 文は終了します。

---

## while文の例

次のプログラムは、1から5までの数字を表示します。

```java
public class Main {
    public static void main(String[] args) {
        int i = 1;

        while (i <= 5) {
            System.out.println(i);
            i++;
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

---

## while文の流れ

次のコードを見てみます。

```java
int i = 1;

while (i <= 5) {
    System.out.println(i);
    i++;
}
```

この `while` 文は、次のように動きます。

1. `i` に `1` を代入する
2. `i <= 5` を確認する
3. 条件が `true` なら `{}` の中を実行する
4. `i++` で `i` を1増やす
5. もう一度 `i <= 5` を確認する
6. 条件が `false` になるまで繰り返す

---

## カウンタ変数を使う

`while` 文でも、`for` 文と同じようにカウンタ変数を使えます。

```java
public class Main {
    public static void main(String[] args) {
        int count = 0;

        while (count < 5) {
            System.out.println("こんにちは");
            count++;
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

`count` が `0` から始まり、1回繰り返すごとに1ずつ増えます。

`count < 5` が `false` になると、繰り返しが終了します。

---

## for文とwhile文の違い

`for` 文と `while` 文は、どちらも繰り返し処理に使います。

| 文 | 向いている場面 |
|---|---|
| `for` 文 | 繰り返す回数が決まっている場合 |
| `while` 文 | 条件によって繰り返しを続ける場合 |

たとえば、5回繰り返すなら `for` 文が分かりやすいです。

```java
for (int i = 1; i <= 5; i++) {
    System.out.println(i);
}
```

一方、ユーザーが終了を選ぶまで繰り返すような処理は、`while` 文が向いています。

---

## while文でカウントダウンする

`while` 文では、数を減らしながら繰り返すこともできます。

```java
public class Main {
    public static void main(String[] args) {
        int count = 5;

        while (count >= 1) {
            System.out.println(count);
            count--;
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

`count--` によって、`count` の値が1ずつ減ります。

---

## 合計を求める

`while` 文を使って、1から5までの合計を求めてみます。

```java
public class Main {
    public static void main(String[] args) {
        int i = 1;
        int total = 0;

        while (i <= 5) {
            total += i;
            i++;
        }

        System.out.println(total);
    }
}
```

実行結果：

```text
15
```

`total += i;` によって、`total` に `i` の値を足しています。

---

## 入力された数まで合計する

`Scanner` と組み合わせると、入力された数までの合計を求められます。

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("数値を入力してください: ");
        int max = scanner.nextInt();

        int i = 1;
        int total = 0;

        while (i <= max) {
            total += i;
            i++;
        }

        System.out.println("合計: " + total);

        scanner.close();
    }
}
```

実行例：

```text
数値を入力してください: 10
合計: 55
```

---

## 条件が最初からfalseの場合

`while` 文は、最初に条件式を確認します。

そのため、最初から条件が `false` の場合、処理は1回も実行されません。

```java
public class Main {
    public static void main(String[] args) {
        int i = 10;

        while (i <= 5) {
            System.out.println(i);
            i++;
        }

        System.out.println("終了");
    }
}
```

実行結果：

```text
終了
```

`i <= 5` は最初から `false` なので、`while` 文の中は実行されません。

---

## ユーザーが終了を選ぶまで繰り返す

`while` 文は、メニュー処理と相性が良いです。

次のプログラムでは、ユーザーが `0` を入力するまで処理を繰り返します。

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        int menu = -1;

        while (menu != 0) {
            System.out.println("メニューを選択してください");
            System.out.println("1: あいさつ");
            System.out.println("2: 時間表示");
            System.out.println("0: 終了");
            System.out.print("番号: ");

            menu = scanner.nextInt();

            if (menu == 1) {
                System.out.println("こんにちは");
            } else if (menu == 2) {
                System.out.println("現在の時間を表示します");
            } else if (menu == 0) {
                System.out.println("終了します");
            } else {
                System.out.println("正しい番号を入力してください");
            }

            System.out.println();
        }

        scanner.close();
    }
}
```

実行例：

```text
メニューを選択してください
1: あいさつ
2: 時間表示
0: 終了
番号: 1
こんにちは

メニューを選択してください
1: あいさつ
2: 時間表示
0: 終了
番号: 0
終了します
```

---

## trueを使ったwhile文

`while (true)` と書くと、条件が常に `true` になるため、無限に繰り返します。

```java
while (true) {
    繰り返したい処理
}
```

このままだと処理が終わらないため、通常は `break` と組み合わせて使います。

---

## breakでwhile文を終了する

`break` を使うと、`while` 文を途中で終了できます。

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        while (true) {
            System.out.print("文字を入力してください。終了するには exit: ");
            String text = scanner.next();

            if (text.equals("exit")) {
                break;
            }

            System.out.println("入力: " + text);
        }

        System.out.println("終了しました");

        scanner.close();
    }
}
```

実行例：

```text
文字を入力してください。終了するには exit: hello
入力: hello
文字を入力してください。終了するには exit: exit
終了しました
```

`exit` と入力されたら、`break` によって `while` 文が終了します。

---

## continueで処理をスキップする

`continue` を使うと、その回の処理だけをスキップできます。

```java
public class Main {
    public static void main(String[] args) {
        int i = 0;

        while (i < 5) {
            i++;

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

`while` 文では、条件がずっと `true` のままだと処理が終わりません。

```java
public class Main {
    public static void main(String[] args) {
        int i = 1;

        while (i <= 5) {
            System.out.println(i);
        }
    }
}
```

このコードでは、`i` の値が変わっていません。

そのため、`i <= 5` がずっと `true` のままになり、無限ループになります。

正しくは、次のように `i++` を書きます。

```java
public class Main {
    public static void main(String[] args) {
        int i = 1;

        while (i <= 5) {
            System.out.println(i);
            i++;
        }
    }
}
```

`while` 文では、条件がいつか `false` になるように注意しましょう。

---

## do while文

`do while` 文は、処理を実行したあとに条件を確認する繰り返し文です。

基本形は次のとおりです。

```java
do {
    繰り返したい処理
} while (条件式);
```

`while` 文との違いは、最初に必ず1回は処理が実行されることです。

---

## do while文の例

```java
public class Main {
    public static void main(String[] args) {
        int i = 1;

        do {
            System.out.println(i);
            i++;
        } while (i <= 5);
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

---

## do while文は最低1回実行される

次の例では、条件が最初から `false` です。

```java
public class Main {
    public static void main(String[] args) {
        int i = 10;

        do {
            System.out.println(i);
            i++;
        } while (i <= 5);
    }
}
```

実行結果：

```text
10
```

`i <= 5` は `false` ですが、`do` の中の処理は先に1回実行されます。

---

## 入力チェックの例

`do while` 文は、入力チェックにも使えます。

次のプログラムでは、1から5の数字が入力されるまで繰り返します。

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        int number;

        do {
            System.out.print("1から5の数字を入力してください: ");
            number = scanner.nextInt();
        } while (number < 1 || number > 5);

        System.out.println("入力された数字: " + number);

        scanner.close();
    }
}
```

実行例：

```text
1から5の数字を入力してください: 10
1から5の数字を入力してください: 0
1から5の数字を入力してください: 3
入力された数字: 3
```

少なくとも1回は入力してもらいたい場合、`do while` 文が便利です。

---

## while文とdo while文の違い

| 文 | 条件を確認するタイミング | 最低実行回数 |
|---|---|---|
| `while` | 処理の前 | 0回 |
| `do while` | 処理の後 | 1回 |

`while` 文は、条件が最初から `false` なら1回も実行されません。

`do while` 文は、条件に関係なく最初に1回は実行されます。

---

## よくあるエラー

| エラー | 原因 | 解決方法 |
|---|---|---|
| 無限ループになる | 条件がずっと `true` のまま | 変数の更新を確認する |
| 1回も実行されない | 最初から条件が `false` | 初期値と条件式を確認する |
| `';' expected` | セミコロン忘れ | 文の最後を確認する |
| `cannot find symbol` | 変数名のミス | 変数名を確認する |
| 入力が終わらない | 終了条件が間違っている | `break` や条件式を確認する |

---

## 練習問題

### 問題1

`while` 文を使って、1から5まで表示しましょう。

実行例：

```text
1
2
3
4
5
```

---

### 問題2

`while` 文を使って、5から1までカウントダウンしましょう。

実行例：

```text
5
4
3
2
1
```

---

### 問題3

`while` 文を使って、1から10までの合計を表示しましょう。

実行例：

```text
55
```

---

### 問題4

数値を入力し、1からその数まで表示しましょう。

実行例：

```text
数値を入力してください: 4
1
2
3
4
```

---

### 問題5

ユーザーが `0` を入力するまで、入力された数値を表示し続けるプログラムを作成しましょう。

実行例：

```text
数値を入力してください: 5
入力: 5
数値を入力してください: 3
入力: 3
数値を入力してください: 0
終了します
```

---

### 問題6

`while` 文を使って、1から20までの偶数だけを表示しましょう。

実行例：

```text
2
4
6
8
10
12
14
16
18
20
```

---

### 問題7

パスワードを入力し、`java` と一致するまで繰り返しましょう。

実行例：

```text
パスワードを入力してください: abc
パスワードを入力してください: test
パスワードを入力してください: java
ログイン成功
```

---

### 問題8

`do while` 文を使って、1から5の数字が入力されるまで繰り返しましょう。

実行例：

```text
1から5の数字を入力してください: 9
1から5の数字を入力してください: 0
1から5の数字を入力してください: 4
入力された数字: 4
```

---

## まとめ

- `while` 文は、条件が `true` の間、処理を繰り返す
- `while` 文は、最初に条件を確認する
- 条件が最初から `false` の場合、1回も実行されない
- `for` 文は回数が決まっている繰り返しに向いている
- `while` 文は条件によって続ける繰り返しに向いている
- `break` で繰り返しを途中終了できる
- `continue` でその回の処理をスキップできる
- `do while` 文は、最低1回は処理を実行する
- 無限ループにならないように、条件式と変数の更新に注意する