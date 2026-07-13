# 第26章 ラムダ式

## 学習目標

- ラムダ式とは何かを理解する
- ラムダ式の基本形を書ける
- 匿名クラスとの違いを知る
- 関数型インターフェースを理解する
- `Consumer`、`Predicate`、`Function` の基本を理解する
- コレクションとラムダ式を組み合わせて使える

---

## ラムダ式とは

ラムダ式とは、処理を短く書くための記法です。

Javaでは、メソッドのような処理を値として渡したい場面があります。

たとえば、次のような処理です。

- リストの要素を1つずつ表示する
- 条件に合う値だけを判定する
- 値を変換する
- ボタンが押されたときの処理を書く

ラムダ式を使うと、このような処理を短く書けます。

---

## ラムダ式の基本形

ラムダ式は次のように書きます。

```java
(引数) -> {
    処理
}
```

例：

```java
(name) -> {
    System.out.println(name);
}
```

これは、`name` を受け取り、その値を表示する処理です。

---

## さらに短く書く

処理が1行だけの場合は、 `{}` を省略できます。

```java
name -> System.out.println(name)
```

引数が1つだけの場合は、 `()` も省略できます。

```java
name -> System.out.println(name)
```

ラムダ式は、短く書けるのが特徴です。

---

## ラムダ式のイメージ

ラムダ式は、名前のない小さな処理だと考えると分かりやすいです。

通常のメソッド：

```java
void printName(String name) {
    System.out.println(name);
}
```

ラムダ式：

```java
name -> System.out.println(name)
```

ラムダ式には、メソッド名がありません。

その場で使う短い処理を書くときに便利です。

---

## ArrayListとラムダ式

`ArrayList` の要素をすべて表示する例を見てみます。

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> names = new ArrayList<>();

        names.add("Taro");
        names.add("Hanako");
        names.add("Jiro");

        names.forEach(name -> System.out.println(name));
    }
}
```

実行結果：

```text
Taro
Hanako
Jiro
```

`forEach()` は、リストの要素を1つずつ取り出して処理します。

```java
name -> System.out.println(name)
```

この部分がラムダ式です。

---

## 拡張for文との比較

これまで、リストの要素を表示するときは拡張for文を使いました。

```java
for (String name : names) {
    System.out.println(name);
}
```

ラムダ式を使うと、次のように書けます。

```java
names.forEach(name -> System.out.println(name));
```

どちらも同じように、リストの要素を順番に表示しています。

---

## ラムダ式の引数

ラムダ式では、左側に引数を書きます。

```java
name -> System.out.println(name)
```

この場合、`name` が引数です。

`forEach()` では、リストの要素が1つずつ `name` に渡されます。

```java
names.forEach(name -> System.out.println(name));
```

`names` の中身が `"Taro"`、`"Hanako"`、`"Jiro"` なら、  
それぞれ順番に `name` に入ります。

---

## 引数の型を書くこともできる

ラムダ式では、引数の型を書くこともできます。

```java
(String name) -> System.out.println(name)
```

例：

```java
names.forEach((String name) -> System.out.println(name));
```

ただし、多くの場合、Javaが型を自動で判断してくれます。

そのため、次のように型を省略することが多いです。

```java
names.forEach(name -> System.out.println(name));
```

---

## 複数行のラムダ式

処理が複数行になる場合は、 `{}` を使います。

```java
names.forEach(name -> {
    System.out.println("名前:");
    System.out.println(name);
});
```

例：

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> names = new ArrayList<>();

        names.add("Taro");
        names.add("Hanako");

        names.forEach(name -> {
            System.out.println("名前:");
            System.out.println(name);
        });
    }
}
```

実行結果：

```text
名前:
Taro
名前:
Hanako
```

---

## 引数がないラムダ式

引数がないラムダ式は、次のように書きます。

```java
() -> System.out.println("Hello")
```

`()` は、引数がないことを表します。

---

## Runnableとラムダ式

`Runnable` は、実行する処理を表すインターフェースです。

```java
Runnable task = () -> System.out.println("実行しました");

task.run();
```

例：

```java
public class Main {
    public static void main(String[] args) {
        Runnable task = () -> System.out.println("実行しました");

        task.run();
    }
}
```

実行結果：

```text
実行しました
```

`Runnable` の `run()` メソッドには引数がありません。

そのため、ラムダ式では `()` を使っています。

---

## 関数型インターフェースとは

関数型インターフェースとは、抽象メソッドを1つだけ持つインターフェースです。

ラムダ式は、関数型インターフェースに代入できます。

例：

```java
interface Greeting {
    void sayHello();
}
```

この `Greeting` インターフェースには、抽象メソッドが1つだけあります。

そのため、関数型インターフェースとして使えます。

---

## 自作の関数型インターフェース

```java
public class Main {
    public static void main(String[] args) {
        Greeting greeting = () -> System.out.println("こんにちは");

        greeting.sayHello();
    }
}

interface Greeting {
    void sayHello();
}
```

実行結果：

```text
こんにちは
```

`Greeting` の `sayHello()` メソッドの中身を、ラムダ式で書いています。

---

## 引数がある関数型インターフェース

```java
public class Main {
    public static void main(String[] args) {
        Message message = name -> System.out.println("こんにちは、" + name + "さん");

        message.show("Taro");
    }
}

interface Message {
    void show(String name);
}
```

実行結果：

```text
こんにちは、Taroさん
```

`Message` インターフェースの `show(String name)` に対応する処理を、ラムダ式で書いています。

---

## 戻り値があるラムダ式

戻り値がある場合も、ラムダ式で書けます。

```java
public class Main {
    public static void main(String[] args) {
        Calculator calculator = (a, b) -> a + b;

        int result = calculator.add(10, 5);

        System.out.println(result);
    }
}

interface Calculator {
    int add(int a, int b);
}
```

実行結果：

```text
15
```

`(a, b) -> a + b` は、2つの値を受け取り、合計を返すラムダ式です。

---

## returnを書く場合

処理が複数行になる場合は、`return` を書きます。

```java
Calculator calculator = (a, b) -> {
    int total = a + b;
    return total;
};
```

例：

```java
public class Main {
    public static void main(String[] args) {
        Calculator calculator = (a, b) -> {
            int total = a + b;
            return total;
        };

        System.out.println(calculator.add(10, 5));
    }
}

interface Calculator {
    int add(int a, int b);
}
```

実行結果：

```text
15
```

`{}` を使う場合、値を返すには `return` が必要です。

---

## @FunctionalInterface

関数型インターフェースには、`@FunctionalInterface` を付けることがあります。

```java
@FunctionalInterface
interface Greeting {
    void sayHello();
}
```

`@FunctionalInterface` を付けると、そのインターフェースが関数型インターフェースとして正しいかをJavaが確認してくれます。

抽象メソッドを2つ書いてしまった場合、エラーになります。

---

## @FunctionalInterfaceの例

```java
@FunctionalInterface
interface Greeting {
    void sayHello();
}
```

この場合、抽象メソッドは `sayHello()` だけなので問題ありません。

間違った例：

```java
@FunctionalInterface
interface Greeting {
    void sayHello();
    void sayGoodbye(); // エラー
}
```

抽象メソッドが2つあるため、関数型インターフェースではありません。

---

## 匿名クラスとの比較

ラムダ式が登場する前は、匿名クラスを使って処理を書いていました。

```java
Greeting greeting = new Greeting() {
    @Override
    public void sayHello() {
        System.out.println("こんにちは");
    }
};
```

ラムダ式を使うと、次のように短く書けます。

```java
Greeting greeting = () -> System.out.println("こんにちは");
```

ラムダ式は、匿名クラスを短く書くための記法として考えることもできます。

---

## 匿名クラスの例

```java
public class Main {
    public static void main(String[] args) {
        Greeting greeting = new Greeting() {
            @Override
            public void sayHello() {
                System.out.println("こんにちは");
            }
        };

        greeting.sayHello();
    }
}

interface Greeting {
    void sayHello();
}
```

実行結果：

```text
こんにちは
```

---

## ラムダ式で書き直す

同じ処理をラムダ式で書くと、次のようになります。

```java
public class Main {
    public static void main(String[] args) {
        Greeting greeting = () -> System.out.println("こんにちは");

        greeting.sayHello();
    }
}

interface Greeting {
    void sayHello();
}
```

実行結果：

```text
こんにちは
```

同じ処理でも、ラムダ式のほうが短く書けます。

---

## Consumer

Javaには、よく使う関数型インターフェースが用意されています。

`Consumer<T>` は、値を受け取って処理するためのインターフェースです。

戻り値はありません。

```java
Consumer<String> printer = name -> System.out.println(name);
```

使うには、次の `import` が必要です。

```java
import java.util.function.Consumer;
```

---

## Consumerの例

```java
import java.util.function.Consumer;

public class Main {
    public static void main(String[] args) {
        Consumer<String> printer = name -> System.out.println(name);

        printer.accept("Taro");
    }
}
```

実行結果：

```text
Taro
```

`Consumer` では、処理を実行するときに `accept()` を使います。

---

## Predicate

`Predicate<T>` は、値を受け取って `true` または `false` を返すインターフェースです。

条件判定に使います。

```java
Predicate<Integer> isAdult = age -> age >= 18;
```

使うには、次の `import` が必要です。

```java
import java.util.function.Predicate;
```

---

## Predicateの例

```java
import java.util.function.Predicate;

public class Main {
    public static void main(String[] args) {
        Predicate<Integer> isAdult = age -> age >= 18;

        System.out.println(isAdult.test(20));
        System.out.println(isAdult.test(15));
    }
}
```

実行結果：

```text
true
false
```

`Predicate` では、判定するときに `test()` を使います。

---

## Function

`Function<T, R>` は、値を受け取って別の値を返すインターフェースです。

```java
Function<String, Integer> lengthFunction = text -> text.length();
```

これは、`String` を受け取り、`Integer` を返す関数です。

使うには、次の `import` が必要です。

```java
import java.util.function.Function;
```

---

## Functionの例

```java
import java.util.function.Function;

public class Main {
    public static void main(String[] args) {
        Function<String, Integer> lengthFunction = text -> text.length();

        int length = lengthFunction.apply("Java");

        System.out.println(length);
    }
}
```

実行結果：

```text
4
```

`Function` では、処理を実行するときに `apply()` を使います。

---

## Consumer, Predicate, Functionの違い

| インターフェース | 役割 | メソッド | 例 |
|---|---|---|---|
| `Consumer<T>` | 値を受け取って処理する | `accept()` | 表示する |
| `Predicate<T>` | 値を受け取って判定する | `test()` | 18歳以上か |
| `Function<T, R>` | 値を受け取って変換する | `apply()` | 文字数に変換する |

---

## ArrayListとConsumer

`forEach()` は、`Consumer` とラムダ式を使って処理できます。

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> names = new ArrayList<>();

        names.add("Taro");
        names.add("Hanako");
        names.add("Jiro");

        names.forEach(name -> System.out.println(name));
    }
}
```

実行結果：

```text
Taro
Hanako
Jiro
```

`name -> System.out.println(name)` は、  
`String` を受け取って表示する処理です。

---

## removeIfとPredicate

`ArrayList` には、条件に合う要素を削除する `removeIf()` があります。

`removeIf()` では、`Predicate` のような条件を書くことができます。

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<Integer> numbers = new ArrayList<>();

        numbers.add(10);
        numbers.add(15);
        numbers.add(20);
        numbers.add(25);

        numbers.removeIf(number -> number >= 20);

        System.out.println(numbers);
    }
}
```

実行結果：

```text
[10, 15]
```

`number -> number >= 20` は、  
`20` 以上なら `true` を返す条件です。

`removeIf()` は、条件が `true` になる要素を削除します。

---

## 文字列のリストでremoveIf

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> names = new ArrayList<>();

        names.add("Taro");
        names.add("Hanako");
        names.add("Jiro");
        names.add("Sakura");

        names.removeIf(name -> name.length() <= 4);

        System.out.println(names);
    }
}
```

実行結果：

```text
[Hanako, Sakura]
```

`name.length() <= 4` が `true` になる名前が削除されます。

---

## ラムダ式とメソッド参照

次のラムダ式は、要素をそのまま表示しています。

```java
name -> System.out.println(name)
```

このような場合、メソッド参照を使ってさらに短く書けます。

```java
System.out::println
```

例：

```java
names.forEach(System.out::println);
```

---

## メソッド参照の例

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> names = new ArrayList<>();

        names.add("Taro");
        names.add("Hanako");
        names.add("Jiro");

        names.forEach(System.out::println);
    }
}
```

実行結果：

```text
Taro
Hanako
Jiro
```

`System.out::println` は、  
「受け取った値を `System.out.println()` に渡す」という意味です。

---

## ラムダ式とメソッド参照の比較

ラムダ式：

```java
names.forEach(name -> System.out.println(name));
```

メソッド参照：

```java
names.forEach(System.out::println);
```

どちらも同じ結果になります。

慣れるまではラムダ式で書き、意味が分かってきたらメソッド参照も使ってみましょう。

---

## ラムダ式で外側の変数を使う

ラムダ式の中では、外側で定義した変数を使えます。

```java
public class Main {
    public static void main(String[] args) {
        String prefix = "名前: ";

        Consumer<String> printer = name -> System.out.println(prefix + name);

        printer.accept("Taro");
    }
}
```

実行結果：

```text
名前: Taro
```

ラムダ式の中で、外側の `prefix` を使っています。

---

## ラムダ式内で外側の変数を変更できない

ラムダ式の中で、外側のローカル変数を変更することはできません。

```java
int count = 0;

names.forEach(name -> {
    count++; // エラー
});
```

ラムダ式から使う外側のローカル変数は、実質的に `final` である必要があります。

つまり、あとから変更されない変数だけが使えます。

---

## 実質的にfinalとは

次のコードでは、`prefix` はあとから変更されていません。

```java
String prefix = "名前: ";

names.forEach(name -> System.out.println(prefix + name));
```

このような変数は、`final` と書いていなくても、実質的に `final` として扱われます。

一方、次のようにあとから変更すると、ラムダ式の中では使えません。

```java
String prefix = "名前: ";
prefix = "Name: ";

names.forEach(name -> System.out.println(prefix + name)); // エラー
```

---

## ラムダ式を使うメリット

ラムダ式には、次のようなメリットがあります。

| メリット | 説明 |
|---|---|
| 短く書ける | 匿名クラスよりコードが少ない |
| 読みやすくなる | 処理の内容をその場で書ける |
| コレクションと相性がよい | `forEach()` や `removeIf()` で使える |
| Stream APIにつながる | 次章のStream APIで多用する |

---

## ラムダ式を使いすぎない

ラムダ式は便利ですが、複雑な処理を詰め込みすぎると読みにくくなります。

分かりにくい例：

```java
names.forEach(name -> {
    if (name.length() >= 5) {
        String upper = name.toUpperCase();
        System.out.println("名前: " + upper);
    } else {
        System.out.println("短い名前です");
    }
});
```

処理が長くなる場合は、普通のメソッドに分けたほうが読みやすいこともあります。

---

## ラムダ式が向いている場面

ラムダ式は、短い処理を書くときに向いています。

たとえば：

- 要素を表示する
- 条件を判定する
- 値を変換する
- 1〜3行程度の簡単な処理を書く

複雑な処理は、無理にラムダ式にせず、メソッドに分けることも大切です。

---

## よくあるエラー

| エラー | 原因 | 解決方法 |
|---|---|---|
| `incompatible types` | ラムダ式の形が代入先の型と合っていない | 引数や戻り値を確認する |
| `target type of a lambda conversion must be an interface` | ラムダ式を代入できない型に代入している | 関数型インターフェースに代入する |
| `multiple non-overriding abstract methods found` | 抽象メソッドが複数あるインターフェースに代入している | 抽象メソッドを1つにする |
| `local variables referenced from a lambda expression must be final or effectively final` | ラムダ式内で使う外側の変数が変更されている | 変数を変更しない |
| `missing return value` | 戻り値が必要なのに返していない | `return` を書く |


---

## まとめ

- ラムダ式は、処理を短く書くための記法
- 基本形は `(引数) -> { 処理 }`
- 引数が1つなら `()` を省略できる
- 処理が1行なら `{}` を省略できる
- ラムダ式は関数型インターフェースに代入できる
- 関数型インターフェースは抽象メソッドを1つだけ持つ
- `@FunctionalInterface` を付けるとミスを見つけやすい
- `Consumer` は値を受け取って処理する
- `Predicate` は値を受け取って `true` / `false` を返す
- `Function` は値を受け取って別の値を返す
- `forEach()` や `removeIf()` でラムダ式をよく使う
- メソッド参照を使うと、さらに短く書ける場合がある
- ラムダ式は次章のStream APIでよく使う