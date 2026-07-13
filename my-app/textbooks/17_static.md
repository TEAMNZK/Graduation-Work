# 第17章 static

## 学習目標

- `static` とは何かを理解する
- インスタンスフィールドとstaticフィールドの違いを理解する
- インスタンスメソッドとstaticメソッドの違いを理解する
- `static` を使った共通データを扱える
- `main` メソッドに `static` が付いている理由を知る

---

## staticとは

`static` は、クラスそのものに属するメンバーを作るためのキーワードです。

Javaでは、フィールドやメソッドは通常、オブジェクトに属します。

```java
Person person = new Person();
person.name = "Taro";
```

この場合、`name` は `person` というオブジェクトが持つデータです。

一方、`static` を付けると、オブジェクトではなくクラスに属するものになります。

---

## インスタンスとは

クラスから作られたオブジェクトのことを **インスタンス** と呼びます。

```java
Person person1 = new Person("Taro", 20);
Person person2 = new Person("Hanako", 25);
```

この場合、`person1` と `person2` は、どちらも `Person` クラスのインスタンスです。

---

## インスタンスフィールド

通常のフィールドは、インスタンスごとに別々の値を持ちます。

```java
class Person {
    String name;
    int age;
}
```

使用例：

```java
public class Main {
    public static void main(String[] args) {
        Person person1 = new Person();
        person1.name = "Taro";

        Person person2 = new Person();
        person2.name = "Hanako";

        System.out.println(person1.name);
        System.out.println(person2.name);
    }
}

class Person {
    String name;
}
```

実行結果：

```text
Taro
Hanako
```

`person1.name` と `person2.name` は別々の値を持っています。

---

## staticフィールド

`static` を付けたフィールドは、クラスに属するフィールドになります。

```java
class Person {
    static int count = 0;
}
```

`static` フィールドは、オブジェクトごとではなく、クラス全体で共有されます。

---

## staticフィールドの例

作成された `Person` オブジェクトの数を数えてみます。

```java
public class Main {
    public static void main(String[] args) {
        Person person1 = new Person();
        Person person2 = new Person();
        Person person3 = new Person();

        System.out.println(Person.count);
    }
}

class Person {
    static int count = 0;

    Person() {
        count++;
    }
}
```

実行結果：

```text
3
```

`new Person()` が実行されるたびに、コンストラクタで `count++` しています。

`count` は `static` フィールドなので、すべての `Person` オブジェクトで共有されます。

---

## staticフィールドへのアクセス

`static` フィールドには、クラス名を使ってアクセスします。

```java
Person.count
```

例：

```java
System.out.println(Person.count);
```

オブジェクトからもアクセスできますが、基本的にはクラス名でアクセスします。

避けたい書き方：

```java
person.count
```

おすすめの書き方：

```java
Person.count
```

`static` はクラスに属するため、クラス名で書くほうが分かりやすいです。

---

## インスタンスフィールドとstaticフィールドの違い

| 種類 | 属する場所 | 値の持ち方 |
|---|---|---|
| インスタンスフィールド | オブジェクト | オブジェクトごとに別 |
| staticフィールド | クラス | クラス全体で共有 |

例：

```java
class Person {
    String name;
    static int count;
}
```

`name` は人ごとに違う値を持ちます。

`count` は `Person` クラス全体で共有されます。

---

## staticフィールドが向いているもの

`static` フィールドは、クラス全体で共有したい値に向いています。

たとえば、次のような値です。

- 作成されたオブジェクト数
- 共通の設定値
- 定数
- アプリ全体で共有する値

一方、名前や年齢のように、オブジェクトごとに違う値には向いていません。

---

## staticメソッド

`static` を付けたメソッドは、クラスに属するメソッドになります。

```java
class Calculator {
    static int add(int a, int b) {
        return a + b;
    }
}
```

`static` メソッドは、オブジェクトを作らずに呼び出せます。

```java
Calculator.add(10, 5);
```

---

## staticメソッドの例

```java
public class Main {
    public static void main(String[] args) {
        int result = Calculator.add(10, 5);

        System.out.println(result);
    }
}

class Calculator {
    static int add(int a, int b) {
        return a + b;
    }
}
```

実行結果：

```text
15
```

`Calculator` オブジェクトを作らなくても、`Calculator.add()` を呼び出せます。

---

## staticメソッドへのアクセス

`static` メソッドも、クラス名を使って呼び出します。

```java
クラス名.メソッド名()
```

例：

```java
Calculator.add(10, 5);
```

`static` メソッドは、特定のオブジェクトに依存しない処理に向いています。

---

## staticメソッドが向いている処理

`static` メソッドは、オブジェクトの状態を使わない処理に向いています。

たとえば、計算処理です。

```java
class MathUtil {
    static int square(int number) {
        return number * number;
    }
}
```

使用例：

```java
public class Main {
    public static void main(String[] args) {
        System.out.println(MathUtil.square(5));
    }
}

class MathUtil {
    static int square(int number) {
        return number * number;
    }
}
```

実行結果：

```text
25
```

この処理は、特定のオブジェクトの名前や年齢を使っていません。

そのため、`static` メソッドとして書いても自然です。

---

## インスタンスメソッド

`static` が付いていないメソッドは、インスタンスメソッドです。

インスタンスメソッドは、オブジェクトを作ってから呼び出します。

```java
public class Main {
    public static void main(String[] args) {
        Person person = new Person("Taro", 20);

        person.introduce();
    }
}

class Person {
    String name;
    int age;

    Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    void introduce() {
        System.out.println(name + "さんは" + age + "歳です");
    }
}
```

実行結果：

```text
Taroさんは20歳です
```

`introduce()` は、`name` や `age` というオブジェクトごとのデータを使っています。

そのため、インスタンスメソッドとして書くのが自然です。

---

## staticメソッドとインスタンスメソッドの違い

| 種類 | 呼び出し方 | 向いている処理 |
|---|---|---|
| staticメソッド | `クラス名.メソッド名()` | オブジェクトに依存しない処理 |
| インスタンスメソッド | `オブジェクト名.メソッド名()` | オブジェクトのデータを使う処理 |

例：

```java
Calculator.add(10, 5);
person.introduce();
```

`Calculator.add()` は計算するだけなので、`static` に向いています。

`person.introduce()` は、その人の名前や年齢を使うので、インスタンスメソッドに向いています。

---

## staticメソッドからインスタンスフィールドは直接使えない

`static` メソッドから、インスタンスフィールドを直接使うことはできません。

次のコードはエラーになります。

```java
public class Main {
    String name = "Taro";

    public static void main(String[] args) {
        System.out.println(name); // エラー
    }
}
```

`main` メソッドは `static` メソッドです。

しかし、`name` はインスタンスフィールドです。

`static` メソッドは、特定のオブジェクトに属していないため、どのオブジェクトの `name` を使えばよいか分かりません。

---

## オブジェクトを作れば使える

`static` メソッドの中でも、オブジェクトを作ればインスタンスフィールドを使えます。

```java
public class Main {
    String name = "Taro";

    public static void main(String[] args) {
        Main main = new Main();

        System.out.println(main.name);
    }
}
```

実行結果：

```text
Taro
```

`new Main()` でオブジェクトを作り、`main.name` としてアクセスしています。

---

## staticメソッドからインスタンスメソッドは直接呼べない

インスタンスメソッドも、`static` メソッドから直接呼び出すことはできません。

```java
public class Main {
    public static void main(String[] args) {
        hello(); // エラー
    }

    void hello() {
        System.out.println("こんにちは");
    }
}
```

`hello()` はインスタンスメソッドです。

そのため、呼び出すにはオブジェクトが必要です。

```java
public class Main {
    public static void main(String[] args) {
        Main main = new Main();

        main.hello();
    }

    void hello() {
        System.out.println("こんにちは");
    }
}
```

実行結果：

```text
こんにちは
```

---

## mainメソッドにstaticが付いている理由

Javaプログラムは、最初に `main` メソッドから実行されます。

```java
public static void main(String[] args) {
}
```

プログラム開始時点では、まだ `Main` クラスのオブジェクトは作られていません。

そのため、オブジェクトを作らなくても呼び出せるように、`main` メソッドには `static` が付いています。

---

## staticな定数

変更しない値には、`static final` を使うことがあります。

```java
class Tax {
    static final double RATE = 0.1;
}
```

`final` は、値をあとから変更できないことを表します。

```java
Tax.RATE = 0.2; // エラー
```

---

## 定数の例

消費税率を定数として定義してみます。

```java
public class Main {
    public static void main(String[] args) {
        int price = 1000;
        int tax = Tax.calculateTax(price);

        System.out.println("税額: " + tax + "円");
    }
}

class Tax {
    static final double RATE = 0.1;

    static int calculateTax(int price) {
        return (int) (price * RATE);
    }
}
```

実行結果：

```text
税額: 100円
```

`RATE` はクラス全体で共通の値です。

また、あとから変更しない値なので、`static final` にしています。

---

## 定数名は大文字で書く

Javaでは、定数名は大文字で書くことが多いです。

```java
static final double TAX_RATE = 0.1;
static final int MAX_COUNT = 100;
static final String APP_NAME = "Java App";
```

複数の単語を使う場合は、`_` で区切ります。

```java
MAX_COUNT
TAX_RATE
APP_NAME
```

---

## staticを使いすぎない

`static` は便利ですが、何でも `static` にすればよいわけではありません。

名前や年齢のように、オブジェクトごとに違う値は `static` にしません。

悪い例：

```java
class Person {
    static String name;
    static int age;
}
```

このようにすると、すべての `Person` が同じ `name` と `age` を共有してしまいます。

---

## staticを使いすぎた例

```java
public class Main {
    public static void main(String[] args) {
        Person person1 = new Person();
        person1.name = "Taro";

        Person person2 = new Person();
        person2.name = "Hanako";

        System.out.println(person1.name);
        System.out.println(person2.name);
    }
}

class Person {
    static String name;
}
```

実行結果：

```text
Hanako
Hanako
```

`name` が `static` なので、`person1` と `person2` で同じ値を共有しています。

そのため、あとから代入した `"Hanako"` に上書きされました。

---

## 正しい例

名前は人ごとに違う値なので、`static` を付けません。

```java
public class Main {
    public static void main(String[] args) {
        Person person1 = new Person();
        person1.name = "Taro";

        Person person2 = new Person();
        person2.name = "Hanako";

        System.out.println(person1.name);
        System.out.println(person2.name);
    }
}

class Person {
    String name;
}
```

実行結果：

```text
Taro
Hanako
```

---

## staticを使う判断基準

`static` を使うか迷ったときは、次のように考えます。

| 質問 | 答え | 判断 |
|---|---|---|
| オブジェクトごとに違う値か | はい | `static` にしない |
| クラス全体で共有する値か | はい | `static` を使う |
| オブジェクトの状態を使う処理か | はい | インスタンスメソッドにする |
| 単独の便利な処理か | はい | `static` メソッドにできる |

---

## よくあるエラー

| エラー | 原因 | 解決方法 |
|---|---|---|
| `non-static variable cannot be referenced from a static context` | staticメソッドからインスタンスフィールドを直接使っている | オブジェクトを作ってから使う |
| `non-static method cannot be referenced from a static context` | staticメソッドからインスタンスメソッドを直接呼んでいる | オブジェクトを作ってから呼ぶ |
| 意図せず値が共有される | フィールドに `static` を付けている | オブジェクトごとに持つ値なら `static` を外す |
| `cannot assign a value to final variable` | `final` の値を変更しようとしている | 定数は変更しない |
| `cannot find symbol` | クラス名やフィールド名のミス | 名前を確認する |

---



## まとめ

- `static` はクラスに属するメンバーを作るためのキーワード
- 通常のフィールドはオブジェクトごとに値を持つ
- `static` フィールドはクラス全体で値を共有する
- `static` メソッドはオブジェクトを作らずに呼び出せる
- `static` メソッドからインスタンスフィールドは直接使えない
- `static` メソッドからインスタンスメソッドは直接呼べない
- `main` メソッドは、オブジェクト作成前に呼び出されるため `static` が付いている
- 変更しない共通値には `static final` を使う
- オブジェクトごとに違う値には `static` を付けない