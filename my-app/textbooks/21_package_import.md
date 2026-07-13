# 第21章 packageとimport

## 学習目標

- `package` とは何かを理解する
- `import` とは何かを理解する
- クラスをフォルダごとに整理できる
- 別のパッケージにあるクラスを使える
- Java標準ライブラリを `import` して使える
- パッケージ名の付け方を知る

---

## packageとは

`package` とは、クラスをグループ分けするための仕組みです。

プログラムが大きくなると、クラスの数が増えていきます。

たとえば、次のようなクラスがあるとします。

```text
User
Product
Order
Calculator
DateUtil
FileUtil
```

クラスが少ないうちは問題ありません。

しかし、数が増えてくると、どのクラスが何のためのものか分かりにくくなります。

そこで `package` を使って、関連するクラスをまとめます。

---

## packageのイメージ

`package` は、フォルダでクラスを整理するようなものです。

```text
app/
├── user/
│   └── User.java
├── product/
│   └── Product.java
└── util/
    └── Calculator.java
```

このように、役割ごとにクラスを分けると管理しやすくなります。

---

## packageを使わない場合

これまでのサンプルでは、基本的に `package` を書いていませんでした。

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello");
    }
}
```

このように `package` を書かない場合、そのクラスは **デフォルトパッケージ** に属します。

学習用の小さなプログラムでは、デフォルトパッケージでも問題ありません。

しかし、実際の開発では `package` を使ってクラスを整理することが多いです。

---

## packageの基本形

`package` は、ファイルの先頭に書きます。

```java
package パッケージ名;
```

例：

```java
package app;
```

この場合、そのクラスは `app` パッケージに属します。

---

## packageを書く位置

`package` は、Javaファイルの一番上に書きます。

```java
package app;

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello");
    }
}
```

`import` がある場合でも、`package` のほうが先です。

```java
package app;

import java.util.Scanner;

public class Main {
}
```

---

## パッケージとフォルダの関係

Javaでは、パッケージ名とフォルダ構成を対応させます。

たとえば、次のようなパッケージを使う場合：

```java
package app;
```

ファイルは次の場所に置きます。

```text
app/Main.java
```

---

## appパッケージの例

フォルダ構成：

```text
java-study/
└── app/
    └── Main.java
```

`Main.java`：

```java
package app;

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello package");
    }
}
```

この `Main` クラスは、`app` パッケージに属します。

---

## パッケージ名が複数階層の場合

パッケージ名は、`.` を使って複数階層にできます。

```java
package app.user;
```

この場合、フォルダ構成は次のようになります。

```text
app/
└── user/
    └── User.java
```

`package app.user;` と書いたクラスは、`app/user/` フォルダに置きます。

---

## 複数階層の例

フォルダ構成：

```text
java-study/
└── app/
    └── user/
        └── User.java
```

`User.java`：

```java
package app.user;

public class User {
    public String name;
}
```

この `User` クラスは、`app.user` パッケージに属します。

---

## importとは

`import` とは、別のパッケージにあるクラスを使うための仕組みです。

これまで、入力処理で次のようなコードを書きました。

```java
import java.util.Scanner;
```

これは、`java.util` パッケージにある `Scanner` クラスを使うための準備です。

---

## importを使う理由

Javaには、便利なクラスがたくさん用意されています。

たとえば：

| クラス | 役割 |
|---|---|
| `Scanner` | 入力を受け取る |
| `ArrayList` | 複数の値を管理する |
| `Random` | ランダムな値を作る |
| `LocalDate` | 日付を扱う |

これらのクラスは、別のパッケージに入っています。

そのため、使う前に `import` します。

---

## Scannerのimport

```java
import java.util.Scanner;
```

これは、`java.util` パッケージにある `Scanner` クラスを使うという意味です。

使用例：

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("名前: ");
        String name = scanner.next();

        System.out.println("こんにちは、" + name + "さん");

        scanner.close();
    }
}
```

`import java.util.Scanner;` を書くことで、`Scanner` という名前でクラスを使えます。

---

## importを書かない場合

`import` を書かなくても、完全な名前を書けば使えます。

```java
java.util.Scanner scanner = new java.util.Scanner(System.in);
```

例：

```java
public class Main {
    public static void main(String[] args) {
        java.util.Scanner scanner = new java.util.Scanner(System.in);

        System.out.print("名前: ");
        String name = scanner.next();

        System.out.println("こんにちは、" + name + "さん");

        scanner.close();
    }
}
```

この書き方でも動きます。

しかし、毎回 `java.util.Scanner` と書くのは長くて読みにくいです。

そのため、通常は `import` を使います。

---

## importの基本形

`import` は次のように書きます。

```java
import パッケージ名.クラス名;
```

例：

```java
import java.util.Scanner;
```

この場合、`Scanner` クラスを短い名前で使えるようになります。

---

## importを書く位置

`import` は、`package` のあと、クラス定義の前に書きます。

```java
package app;

import java.util.Scanner;

public class Main {
}
```

`package` がない場合は、ファイルの先頭付近に書きます。

```java
import java.util.Scanner;

public class Main {
}
```

---

## 複数のimport

複数のクラスを使う場合は、`import` を複数書けます。

```java
import java.util.Scanner;
import java.util.Random;
import java.time.LocalDate;
```

例：

```java
import java.util.Random;
import java.time.LocalDate;

public class Main {
    public static void main(String[] args) {
        Random random = new Random();
        int number = random.nextInt(10);

        LocalDate today = LocalDate.now();

        System.out.println(number);
        System.out.println(today);
    }
}
```

---

## *を使ったimport

同じパッケージ内のクラスをまとめて使いたい場合は、`*` を使えます。

```java
import java.util.*;
```

これは、`java.util` パッケージのクラスをまとめて使えるようにする書き方です。

例：

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Random random = new Random();

        System.out.println(random.nextInt(10));

        scanner.close();
    }
}
```

---

## * importの注意

`import java.util.*;` は便利ですが、何を使っているか分かりにくくなることがあります。

明確にしたい場合は、使うクラスだけを個別に `import` します。

```java
import java.util.Scanner;
import java.util.Random;
```

学習中は、どのクラスを使っているか分かりやすくするため、個別に `import` するのがおすすめです。

---

## java.langはimport不要

`String` や `System` などは、`import` しなくても使えます。

```java
String name = "Taro";
System.out.println(name);
```

これは、`java.lang` パッケージが自動的に読み込まれるためです。

代表的な `java.lang` のクラス：

| クラス | 役割 |
|---|---|
| `String` | 文字列 |
| `System` | 標準入出力など |
| `Math` | 数学的な処理 |
| `Integer` | 整数に関する機能 |

---

## Mathクラスの例

`Math` クラスは `import` なしで使えます。

```java
public class Main {
    public static void main(String[] args) {
        int max = Math.max(10, 20);

        System.out.println(max);
    }
}
```

実行結果：

```text
20
```

`Math` は `java.lang` パッケージにあるため、`import` 不要です。

---

## 自分で作ったクラスをimportする

自分で作ったクラスも、別のパッケージにある場合は `import` して使います。

フォルダ構成：

```text
java-study/
└── app/
    ├── Main.java
    └── user/
        └── User.java
```

`User.java`：

```java
package app.user;

public class User {
    public String name;

    public void introduce() {
        System.out.println("私の名前は" + name + "です");
    }
}
```

`Main.java`：

```java
package app;

import app.user.User;

public class Main {
    public static void main(String[] args) {
        User user = new User();

        user.name = "Taro";
        user.introduce();
    }
}
```

実行結果：

```text
私の名前はTaroです
```

`Main` クラスは `app` パッケージにあります。

`User` クラスは `app.user` パッケージにあります。

別のパッケージにあるため、`import app.user.User;` が必要です。

---

## publicが必要な理由

別のパッケージからクラスを使う場合、クラスに `public` を付ける必要があります。

```java
package app.user;

public class User {
}
```

`public` がない場合、別のパッケージから使えません。

```java
class User {
}
```

このように書くと、同じパッケージ内からしか使えません。

---

## フィールドやメソッドにもpublicが必要

別のパッケージからフィールドやメソッドを使う場合も、`public` が必要です。

```java
package app.user;

public class User {
    public String name;

    public void introduce() {
        System.out.println("私の名前は" + name + "です");
    }
}
```

別のパッケージの `Main` から使うには、クラス、フィールド、メソッドが見える必要があります。

---

## アクセス修飾子とpackage

アクセス修飾子によって、どこから使えるかが変わります。

| 修飾子 | 使える範囲 |
|---|---|
| `public` | どこからでも使える |
| `protected` | 同じパッケージ、または子クラスから使える |
| 指定なし | 同じパッケージ内だけ |
| `private` | 同じクラス内だけ |

`package` を使うと、アクセス修飾子の意味も重要になります。

---

## 同じパッケージならimport不要

同じパッケージ内にあるクラスは、`import` しなくても使えます。

フォルダ構成：

```text
app/
├── Main.java
└── User.java
```

`User.java`：

```java
package app;

public class User {
    public String name;
}
```

`Main.java`：

```java
package app;

public class Main {
    public static void main(String[] args) {
        User user = new User();
        user.name = "Taro";

        System.out.println(user.name);
    }
}
```

`Main` と `User` はどちらも `app` パッケージです。

そのため、`import app.User;` は不要です。

---

## パッケージ名の付け方

パッケージ名は、基本的に小文字で書きます。

良い例：

```java
package app;
package app.user;
package app.product;
package app.util;
```

避けたい例：

```java
package App;
package User;
package MyPackage;
```

クラス名は大文字で始めますが、パッケージ名は小文字で書くのが一般的です。

---

## 役割ごとに分ける

パッケージは、役割ごとに分けると分かりやすくなります。

```text
app/
├── model/
│   └── User.java
├── service/
│   └── UserService.java
├── util/
│   └── StringUtil.java
└── Main.java
```

例：

| パッケージ | 役割 |
|---|---|
| `model` | データを表すクラス |
| `service` | 処理を行うクラス |
| `util` | 便利な共通処理 |
| `controller` | 入力や画面とのやり取り |

最初から細かく分けすぎる必要はありません。

プログラムが大きくなってきたら、役割ごとに整理していきます。

---

## 名前の衝突を防ぐ

`package` には、クラス名の衝突を防ぐ役割もあります。

たとえば、次のように同じ `User` という名前のクラスがあっても、パッケージが違えば区別できます。

```java
app.user.User
admin.user.User
```

完全な名前が違うため、Javaは別のクラスとして扱います。

---

## 完全修飾名

パッケージ名を含めたクラス名を **完全修飾名** と呼びます。

たとえば、`Scanner` の完全修飾名は次のとおりです。

```java
java.util.Scanner
```

自分で作った `User` クラスの場合：

```java
app.user.User
```

`import` は、この完全修飾名を短く書くための仕組みとも言えます。

---

## 同じ名前のクラスを使う場合

同じ名前のクラスを複数使う場合、`import` だけでは区別できないことがあります。

たとえば、次の2つを同時に使いたい場合：

```java
app.user.User
admin.user.User
```

両方を `User` という短い名前で使うと、どちらの `User` か分からなくなります。

その場合は、片方を完全修飾名で書きます。

```java
app.user.User user = new app.user.User();
admin.user.User adminUser = new admin.user.User();
```

---

## コンパイルと実行の注意

`package` を使うと、コンパイルや実行時にフォルダ構成を意識する必要があります。

フォルダ構成：

```text
java-study/
└── app/
    └── Main.java
```

`Main.java`：

```java
package app;

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello");
    }
}
```

この場合、`java-study` フォルダで次のようにコンパイルします。

```bash
javac app/Main.java
```

実行するときは、パッケージ名を含めて指定します。

```bash
java app.Main
```

---

## 実行時は完全修飾名を使う

`package app;` と書いた `Main` クラスは、単に `Main` ではなく `app.Main` です。

そのため、次のように実行します。

```bash
java app.Main
```

次のようにするとエラーになることがあります。

```bash
java Main
```

パッケージに属しているクラスを実行するときは、パッケージ名も含めます。

---

## よくあるエラー

| エラー | 原因 | 解決方法 |
|---|---|---|
| `class not found` | 実行時のクラス名が違う | `java app.Main` のようにパッケージ名を含める |
| `package ... does not exist` | import先のパッケージが見つからない | フォルダ構成やパッケージ名を確認する |
| `cannot find symbol` | クラス名やimportのミス | クラス名・パッケージ名を確認する |
| `is not public in ...` | クラスが `public` ではない | 別パッケージから使うクラスに `public` を付ける |
| `has private access` | privateなフィールドやメソッドにアクセスしている | `public` メソッド経由で使う |

---


## まとめ

- `package` はクラスをグループ分けするための仕組み
- `package` はJavaファイルの先頭に書く
- パッケージ名とフォルダ構成は対応させる
- `import` は別のパッケージにあるクラスを使うための仕組み
- `import` を使うと完全修飾名を短く書ける
- `java.lang` のクラスは `import` なしで使える
- 同じパッケージ内のクラスは `import` なしで使える
- 別パッケージから使うクラスには `public` が必要
- パッケージ名は小文字で書くのが一般的
- 実行時には `java app.Main` のようにパッケージ名を含める