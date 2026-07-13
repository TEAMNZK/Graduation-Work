# 第20章 抽象クラスとインターフェース

## 学習目標

- 抽象クラスとは何かを理解する
- 抽象メソッドを定義できる
- 抽象クラスを継承して使える
- インターフェースとは何かを理解する
- `implements` の使い方を理解する
- 抽象クラスとインターフェースの違いを理解する
- ポリモーフィズムと組み合わせて使える

---

## 抽象クラスとは

抽象クラスとは、直接オブジェクトを作ることができないクラスです。

主に、複数の子クラスに共通する部分をまとめるために使います。

抽象クラスは `abstract` を付けて定義します。

```java
abstract class Animal {
}
```

この `Animal` クラスは抽象クラスです。

---

## 抽象クラスはnewできない

抽象クラスは、直接 `new` できません。

```java
abstract class Animal {
}

public class Main {
    public static void main(String[] args) {
        Animal animal = new Animal(); // エラー
    }
}
```

`Animal` は抽象的な存在だからです。

たとえば、「動物」という概念はありますが、  
実際に存在するのは犬や猫などの具体的な動物です。

```text
Animal 動物
  ├── Dog 犬
  └── Cat 猫
```

そのため、抽象クラスは子クラスに継承して使います。

---

## 抽象クラスを継承する

抽象クラスも、通常のクラスと同じように `extends` で継承できます。

```java
abstract class Animal {
    String name;

    void eat() {
        System.out.println(name + "は食べています");
    }
}

class Dog extends Animal {
}
```

`Dog` クラスは `Animal` クラスを継承しています。

そのため、`Animal` のフィールドやメソッドを使えます。

---

## 抽象クラスの基本例

```java
public class Main {
    public static void main(String[] args) {
        Dog dog = new Dog();

        dog.name = "Pochi";
        dog.eat();
    }
}

abstract class Animal {
    String name;

    void eat() {
        System.out.println(name + "は食べています");
    }
}

class Dog extends Animal {
}
```

実行結果：

```text
Pochiは食べています
```

`Animal` は直接 `new` できませんが、  
`Animal` を継承した `Dog` は `new` できます。

---

## 抽象メソッドとは

抽象メソッドとは、処理の中身を持たないメソッドです。

抽象メソッドも `abstract` を付けて定義します。

```java
abstract void makeSound();
```

通常のメソッドのように `{}` は書きません。

```java
abstract void makeSound();
```

このメソッドは、「鳴く」という処理が必要であることだけを表しています。

実際の鳴き方は、子クラスで決めます。

---

## 抽象メソッドを持つクラス

抽象メソッドを持つクラスは、必ず抽象クラスにする必要があります。

```java
abstract class Animal {
    abstract void makeSound();
}
```

`Animal` クラスには `makeSound()` があります。

しかし、動物によって鳴き方は違います。

犬なら「ワン」、猫なら「ニャー」です。

そのため、親クラスでは処理を書かず、子クラスで具体的な処理を書きます。

---

## 抽象メソッドを実装する

抽象クラスを継承した子クラスは、抽象メソッドをオーバーライドして実装します。

```java
class Dog extends Animal {
    @Override
    void makeSound() {
        System.out.println("ワン");
    }
}
```

抽象メソッドの中身を子クラスで書くことを **実装する** といいます。

---

## 抽象メソッドの例

```java
public class Main {
    public static void main(String[] args) {
        Dog dog = new Dog();
        Cat cat = new Cat();

        dog.makeSound();
        cat.makeSound();
    }
}

abstract class Animal {
    abstract void makeSound();
}

class Dog extends Animal {
    @Override
    void makeSound() {
        System.out.println("ワン");
    }
}

class Cat extends Animal {
    @Override
    void makeSound() {
        System.out.println("ニャー");
    }
}
```

実行結果：

```text
ワン
ニャー
```

`Animal` クラスでは、`makeSound()` の中身を書いていません。

`Dog` と `Cat` が、それぞれ具体的な処理を書いています。

---

## 抽象メソッドを実装しないとエラーになる

抽象クラスを継承したのに、抽象メソッドを実装しないとエラーになります。

```java
abstract class Animal {
    abstract void makeSound();
}

class Dog extends Animal {
    // makeSound() を実装していないのでエラー
}
```

`Dog` は `Animal` を継承しているため、  
`makeSound()` を実装する必要があります。

正しくは次のように書きます。

```java
class Dog extends Animal {
    @Override
    void makeSound() {
        System.out.println("ワン");
    }
}
```

---

## 抽象クラスにも通常のメソッドを書ける

抽象クラスには、抽象メソッドだけでなく、通常のメソッドも書けます。

```java
abstract class Animal {
    String name;

    void eat() {
        System.out.println(name + "は食べています");
    }

    abstract void makeSound();
}
```

`eat()` は、どの動物でも共通の処理です。

`makeSound()` は、動物によって違う処理です。

このように、共通する処理は親クラスに書き、  
違いがある処理は抽象メソッドにできます。

---

## 抽象クラスの実用例

```java
public class Main {
    public static void main(String[] args) {
        Dog dog = new Dog("Pochi");
        Cat cat = new Cat("Tama");

        dog.eat();
        dog.makeSound();

        cat.eat();
        cat.makeSound();
    }
}

abstract class Animal {
    String name;

    Animal(String name) {
        this.name = name;
    }

    void eat() {
        System.out.println(name + "は食べています");
    }

    abstract void makeSound();
}

class Dog extends Animal {
    Dog(String name) {
        super(name);
    }

    @Override
    void makeSound() {
        System.out.println("ワン");
    }
}

class Cat extends Animal {
    Cat(String name) {
        super(name);
    }

    @Override
    void makeSound() {
        System.out.println("ニャー");
    }
}
```

実行結果：

```text
Pochiは食べています
ワン
Tamaは食べています
ニャー
```

`eat()` は `Animal` クラスで共通化しています。

`makeSound()` は、`Dog` と `Cat` で別々に実装しています。

---

## 抽象クラスとポリモーフィズム

抽象クラスも、親クラス型として使えます。

```java
Animal animal = new Dog("Pochi");
```

`Animal` は抽象クラスなので直接 `new` できません。

しかし、`Dog` は `Animal` の子クラスなので、  
`Animal` 型の変数に代入できます。

---

## 抽象クラス型の配列

抽象クラス型の配列に、子クラスのオブジェクトをまとめて入れられます。

```java
public class Main {
    public static void main(String[] args) {
        Animal[] animals = {
            new Dog("Pochi"),
            new Cat("Tama"),
            new Dog("Kuro")
        };

        for (Animal animal : animals) {
            animal.eat();
            animal.makeSound();
        }
    }
}

abstract class Animal {
    String name;

    Animal(String name) {
        this.name = name;
    }

    void eat() {
        System.out.println(name + "は食べています");
    }

    abstract void makeSound();
}

class Dog extends Animal {
    Dog(String name) {
        super(name);
    }

    @Override
    void makeSound() {
        System.out.println("ワン");
    }
}

class Cat extends Animal {
    Cat(String name) {
        super(name);
    }

    @Override
    void makeSound() {
        System.out.println("ニャー");
    }
}
```

実行結果：

```text
Pochiは食べています
ワン
Tamaは食べています
ニャー
Kuroは食べています
ワン
```

`Animal[]` の中に、`Dog` と `Cat` をまとめて入れています。

そして、同じ `makeSound()` を呼び出しています。

実際に実行される処理は、それぞれの子クラスによって変わります。

---

## 抽象クラスを使うメリット

抽象クラスには、次のようなメリットがあります。

| メリット | 説明 |
|---|---|
| 共通処理をまとめられる | 子クラスで同じ処理を書かなくてよい |
| 必ず実装すべきメソッドを指定できる | 子クラスに処理の実装を強制できる |
| ポリモーフィズムと相性がよい | 親クラス型でまとめて扱える |
| 設計が分かりやすくなる | 共通部分と個別部分を分けられる |

---

## インターフェースとは

インターフェースとは、クラスが持つべき機能の約束を定義するものです。

インターフェースは `interface` を使って定義します。

```java
interface Flyable {
    void fly();
}
```

この例では、`Flyable` というインターフェースを定義しています。

`Flyable` は「飛べる」という機能を表しています。

---

## インターフェースの基本形

```java
interface インターフェース名 {
    戻り値の型 メソッド名();
}
```

例：

```java
interface Flyable {
    void fly();
}
```

インターフェースに書かれたメソッドは、基本的に中身を持ちません。

実際の処理は、インターフェースを使うクラスで書きます。

---

## implements

クラスがインターフェースを使うときは、`implements` を使います。

```java
class Bird implements Flyable {
}
```

これは、`Bird` クラスが `Flyable` インターフェースを実装するという意味です。

`implements` は「実装する」という意味です。

---

## インターフェースを実装する

インターフェースを実装したクラスは、インターフェースのメソッドを必ず実装します。

```java
interface Flyable {
    void fly();
}

class Bird implements Flyable {
    @Override
    public void fly() {
        System.out.println("鳥が飛びます");
    }
}
```

`Bird` クラスは `Flyable` を実装しているため、  
`fly()` メソッドを書く必要があります。

---

## インターフェースの基本例

```java
public class Main {
    public static void main(String[] args) {
        Bird bird = new Bird();

        bird.fly();
    }
}

interface Flyable {
    void fly();
}

class Bird implements Flyable {
    @Override
    public void fly() {
        System.out.println("鳥が飛びます");
    }
}
```

実行結果：

```text
鳥が飛びます
```

`Bird` クラスは、`Flyable` インターフェースを実装しています。

そのため、`fly()` メソッドを持っています。

---

## publicを付ける理由

インターフェースのメソッドは、基本的に `public` として扱われます。

そのため、実装するクラス側でも `public` を付けます。

```java
interface Flyable {
    void fly();
}

class Bird implements Flyable {
    @Override
    public void fly() {
        System.out.println("鳥が飛びます");
    }
}
```

`public` を付け忘れるとエラーになることがあります。

---

## インターフェースはnewできない

インターフェースも、直接 `new` できません。

```java
Flyable flyable = new Flyable(); // エラー
```

インターフェースは「機能の約束」であり、具体的な実体ではないからです。

ただし、インターフェース型の変数に、実装クラスのオブジェクトを代入できます。

```java
Flyable flyable = new Bird();
```

---

## インターフェース型で扱う

```java
public class Main {
    public static void main(String[] args) {
        Flyable flyable = new Bird();

        flyable.fly();
    }
}

interface Flyable {
    void fly();
}

class Bird implements Flyable {
    @Override
    public void fly() {
        System.out.println("鳥が飛びます");
    }
}
```

実行結果：

```text
鳥が飛びます
```

変数の型は `Flyable` です。

実際に入っているオブジェクトは `Bird` です。

これもポリモーフィズムの一種です。

---

## 複数のクラスで同じインターフェースを実装する

同じインターフェースを、複数のクラスで実装できます。

```java
interface Flyable {
    void fly();
}

class Bird implements Flyable {
    @Override
    public void fly() {
        System.out.println("鳥が飛びます");
    }
}

class Airplane implements Flyable {
    @Override
    public void fly() {
        System.out.println("飛行機が飛びます");
    }
}
```

`Bird` も `Airplane` も、どちらも「飛べるもの」です。

そのため、どちらも `Flyable` を実装できます。

---

## インターフェース型の配列

```java
public class Main {
    public static void main(String[] args) {
        Flyable[] flyables = {
            new Bird(),
            new Airplane()
        };

        for (Flyable flyable : flyables) {
            flyable.fly();
        }
    }
}

interface Flyable {
    void fly();
}

class Bird implements Flyable {
    @Override
    public void fly() {
        System.out.println("鳥が飛びます");
    }
}

class Airplane implements Flyable {
    @Override
    public void fly() {
        System.out.println("飛行機が飛びます");
    }
}
```

実行結果：

```text
鳥が飛びます
飛行機が飛びます
```

`Bird` と `Airplane` はまったく別の種類のクラスです。

しかし、どちらも `Flyable` を実装しているため、  
`Flyable` 型としてまとめて扱えます。

---

## インターフェースを使うメリット

インターフェースを使うと、「そのクラスが何をできるか」を表せます。

たとえば：

```java
interface Flyable {
    void fly();
}
```

これは「飛べる」という能力を表しています。

```java
interface Printable {
    void print();
}
```

これは「印刷できる」という能力を表しています。

```java
interface Playable {
    void play();
}
```

これは「再生できる」または「遊べる」という能力を表しています。

クラスの種類ではなく、機能に注目して設計できるのがインターフェースの強みです。

---

## クラス継承との違い

クラスの継承は、「AはBの一種である」という関係を表します。

```java
class Dog extends Animal {
}
```

これは「犬は動物の一種」です。

一方、インターフェースは「Aはこの機能を持っている」という関係を表します。

```java
class Bird implements Flyable {
}
```

これは「鳥は飛べる」という意味です。

---

## extendsとimplementsの違い

| キーワード | 使う場面 | 例 |
|---|---|---|
| `extends` | クラスを継承する | `class Dog extends Animal` |
| `implements` | インターフェースを実装する | `class Bird implements Flyable` |

`extends` は親クラスを引き継ぐときに使います。

`implements` はインターフェースの機能を実装するときに使います。

---

## 複数のインターフェースを実装する

Javaでは、1つのクラスが複数のインターフェースを実装できます。

```java
class Robot implements Movable, Speakable {
}
```

例：

```java
public class Main {
    public static void main(String[] args) {
        Robot robot = new Robot();

        robot.move();
        robot.speak();
    }
}

interface Movable {
    void move();
}

interface Speakable {
    void speak();
}

class Robot implements Movable, Speakable {
    @Override
    public void move() {
        System.out.println("ロボットが移動します");
    }

    @Override
    public void speak() {
        System.out.println("ロボットが話します");
    }
}
```

実行結果：

```text
ロボットが移動します
ロボットが話します
```

クラスの継承は1つだけですが、  
インターフェースは複数実装できます。

---

## クラス継承とインターフェースを同時に使う

クラスを継承しながら、インターフェースを実装することもできます。

```java
class Bird extends Animal implements Flyable {
}
```

この場合、先に `extends`、あとに `implements` を書きます。

```java
class 子クラス extends 親クラス implements インターフェース {
}
```

例：

```java
public class Main {
    public static void main(String[] args) {
        Bird bird = new Bird("Sparrow");

        bird.eat();
        bird.fly();
    }
}

abstract class Animal {
    String name;

    Animal(String name) {
        this.name = name;
    }

    void eat() {
        System.out.println(name + "は食べています");
    }
}

interface Flyable {
    void fly();
}

class Bird extends Animal implements Flyable {
    Bird(String name) {
        super(name);
    }

    @Override
    public void fly() {
        System.out.println(name + "が飛びます");
    }
}
```

実行結果：

```text
Sparrowは食べています
Sparrowが飛びます
```

---

## インターフェースの定数

インターフェースには定数を定義できます。

```java
interface AppConfig {
    String APP_NAME = "Java Study";
}
```

インターフェースのフィールドは、基本的に `public static final` として扱われます。

そのため、次のように使えます。

```java
System.out.println(AppConfig.APP_NAME);
```

例：

```java
public class Main {
    public static void main(String[] args) {
        System.out.println(AppConfig.APP_NAME);
    }
}

interface AppConfig {
    String APP_NAME = "Java Study";
}
```

実行結果：

```text
Java Study
```

---

## defaultメソッド

インターフェースには、`default` メソッドを書くこともできます。

`default` メソッドは、インターフェース内に処理の中身を持つメソッドです。

```java
interface Greeter {
    default void hello() {
        System.out.println("こんにちは");
    }
}
```

実装クラスは、この `hello()` をそのまま使えます。

---

## defaultメソッドの例

```java
public class Main {
    public static void main(String[] args) {
        User user = new User();

        user.hello();
    }
}

interface Greeter {
    default void hello() {
        System.out.println("こんにちは");
    }
}

class User implements Greeter {
}
```

実行結果：

```text
こんにちは
```

`User` クラスには `hello()` を書いていません。

しかし、`Greeter` インターフェースの `default` メソッドを使えます。

---

## defaultメソッドをオーバーライドする

`default` メソッドは、実装クラス側でオーバーライドできます。

```java
public class Main {
    public static void main(String[] args) {
        User user = new User();

        user.hello();
    }
}

interface Greeter {
    default void hello() {
        System.out.println("こんにちは");
    }
}

class User implements Greeter {
    @Override
    public void hello() {
        System.out.println("Hello");
    }
}
```

実行結果：

```text
Hello
```

実装クラス側で書いた `hello()` が優先されます。

---

## 抽象クラスとインターフェースの違い

抽象クラスとインターフェースは似ています。

どちらも直接 `new` できず、子クラスや実装クラスで具体的な処理を書きます。

ただし、目的が少し違います。

| 比較 | 抽象クラス | インターフェース |
|---|---|---|
| 表すもの | 共通する性質 | できること・機能 |
| キーワード | `abstract class` | `interface` |
| 使うキーワード | `extends` | `implements` |
| 複数指定 | 1つだけ継承できる | 複数実装できる |
| フィールド | 持てる | 基本的に定数 |
| コンストラクタ | 持てる | 持てない |
| 通常メソッド | 持てる | `default` で持てる |

---

## 抽象クラスを使う場面

抽象クラスは、共通するフィールドや処理をまとめたいときに使います。

例：

```text
Animal
  ├── Dog
  └── Cat
```

犬も猫も、名前を持ち、食べるという共通処理があります。

```java
abstract class Animal {
    String name;

    void eat() {
        System.out.println(name + "は食べています");
    }

    abstract void makeSound();
}
```

このように、共通の状態や処理を持たせたい場合は抽象クラスが向いています。

---

## インターフェースを使う場面

インターフェースは、クラスに特定の機能を持たせたいときに使います。

例：

```java
interface Flyable {
    void fly();
}
```

飛べるものは、鳥だけとは限りません。

飛行機、ドローン、虫なども飛べます。

```java
class Bird implements Flyable {
}

class Airplane implements Flyable {
}

class Drone implements Flyable {
}
```

これらは同じ親クラスを持つとは限りません。

しかし、どれも「飛べる」という機能を持っています。

このような場合はインターフェースが向いています。

---

## 使い分けの目安

| 判断 | 使うもの |
|---|---|
| 共通のフィールドを持たせたい | 抽象クラス |
| 共通の処理を持たせたい | 抽象クラス |
| 「〜の一種」と表せる | 抽象クラス・継承 |
| 「〜できる」と表せる | インターフェース |
| 複数の能力を持たせたい | インターフェース |

たとえば：

```text
Dog is an Animal.
犬は動物の一種。
```

この場合は継承が自然です。

```text
Bird can fly.
鳥は飛べる。
```

この場合はインターフェースが自然です。

---

## よくあるエラー

| エラー | 原因 | 解決方法 |
|---|---|---|
| `Animal is abstract; cannot be instantiated` | 抽象クラスを直接newしている | 子クラスをnewする |
| `does not override abstract method` | 抽象メソッドを実装していない | 子クラスでメソッドを実装する |
| `interface expected here` | `implements` にクラスを書いている | インターフェース名を書く |
| `no interface expected here` | `extends` と `implements` の使い方が逆 | クラスは `extends`、インターフェースは `implements` |
| `attempting to assign weaker access privileges` | `public` が必要なメソッドに付いていない | 実装メソッドに `public` を付ける |

---


## まとめ

- 抽象クラスは、直接 `new` できないクラス
- 抽象クラスは `abstract class` で定義する
- 抽象メソッドは、処理の中身を持たないメソッド
- 抽象メソッドを持つクラスは抽象クラスにする
- 抽象クラスを継承した子クラスは、抽象メソッドを実装する必要がある
- 抽象クラスには通常のフィールドやメソッドを書ける
- インターフェースは、クラスが持つべき機能の約束を定義するもの
- インターフェースは `interface` で定義する
- インターフェースを実装するには `implements` を使う
- インターフェース型でもポリモーフィズムを使える
- クラスは複数のインターフェースを実装できる
- 抽象クラスは共通する性質、インターフェースはできることを表すのに向いている