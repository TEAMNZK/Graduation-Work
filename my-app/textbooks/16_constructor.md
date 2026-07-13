# 第16章 コンストラクタ

## 学習目標

- コンストラクタとは何かを理解する
- オブジェクト作成時に初期値を設定できる
- 引数ありコンストラクタを作成できる
- `this` の使い方を理解する
- コンストラクタをオーバーロードできる
- 初期化処理を整理できる

---

## コンストラクタとは

コンストラクタとは、オブジェクトを作成するときに自動で呼び出される特別なメソッドのようなものです。

オブジェクトを作るとき、次のように `new` を使いました。

```java
Person person = new Person();
```

この `new Person()` の部分で呼び出されるのがコンストラクタです。

コンストラクタを使うと、オブジェクトを作成すると同時に、フィールドへ値を設定できます。

---

## コンストラクタを使わない例

まず、コンストラクタを使わずにオブジェクトを作る例を見てみます。

```java
public class Main {
    public static void main(String[] args) {
        Person person = new Person();

        person.name = "Taro";
        person.age = 20;

        person.introduce();
    }
}

class Person {
    String name;
    int age;

    void introduce() {
        System.out.println("私の名前は" + name + "です");
        System.out.println("年齢は" + age + "歳です");
    }
}
```

実行結果：

```text
私の名前はTaroです
年齢は20歳です
```

この書き方でも動きます。

しかし、オブジェクトを作ったあとに、毎回フィールドへ値を代入する必要があります。

```java
person.name = "Taro";
person.age = 20;
```

オブジェクトを作るたびにこの処理を書くのは少し面倒です。

---

## コンストラクタを使う例

コンストラクタを使うと、オブジェクト作成時に値を渡せます。

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
        System.out.println("私の名前は" + name + "です");
        System.out.println("年齢は" + age + "歳です");
    }
}
```

実行結果：

```text
私の名前はTaroです
年齢は20歳です
```

`new Person("Taro", 20)` のように書くことで、  
オブジェクトを作ると同時に `name` と `age` に値を設定しています。

---

## コンストラクタの基本形

コンストラクタは次のように書きます。

```java
クラス名(引数) {
    初期化処理
}
```

例：

```java
class Person {
    String name;
    int age;

    Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}
```

コンストラクタの名前は、必ずクラス名と同じにします。

---

## コンストラクタの特徴

コンストラクタには、普通のメソッドとは違う特徴があります。

| 特徴 | 説明 |
|---|---|
| クラス名と同じ名前にする | `Person` クラスなら `Person()` |
| 戻り値を書かない | `void` も書かない |
| `new` したときに呼び出される | `new Person()` で実行される |
| 主に初期化に使う | フィールドに値を入れる |

---

## 戻り値を書かない

コンストラクタには戻り値を書きません。

正しい例：

```java
Person(String name, int age) {
    this.name = name;
    this.age = age;
}
```

間違った例：

```java
void Person(String name, int age) {
    this.name = name;
    this.age = age;
}
```

`void` を書くと、コンストラクタではなく普通のメソッドとして扱われます。

> コンストラクタには `void` を書かない。  
> ここはかなり間違えやすいポイントです。

---

## コンストラクタは自動で呼び出される

コンストラクタは、`new` でオブジェクトを作成したときに自動で呼び出されます。

```java
Person person = new Person("Taro", 20);
```

このとき、次のコンストラクタが呼び出されます。

```java
Person(String name, int age) {
    this.name = name;
    this.age = age;
}
```

そのため、あとから次のように代入しなくてもよくなります。

```java
person.name = "Taro";
person.age = 20;
```

---

## thisとは

`this` は、現在のオブジェクト自身を表します。

```java
this.name = name;
this.age = age;
```

このコードでは、左側の `this.name` がフィールドです。

右側の `name` は、コンストラクタの引数です。

```java
Person(String name, int age) {
    this.name = name;
    this.age = age;
}
```

つまり、次のような意味です。

```text
このオブジェクトのnameフィールドに、引数nameの値を入れる
このオブジェクトのageフィールドに、引数ageの値を入れる
```

---

## thisを使わないとどうなるか

次のコードを見てみます。

```java
class Person {
    String name;
    int age;

    Person(String name, int age) {
        name = name;
        age = age;
    }
}
```

一見よさそうですが、この書き方ではフィールドに値が入りません。

`name = name;` は、引数の `name` に引数の `name` を代入しているだけになります。

フィールドを明確に指定するために、`this` を使います。

```java
this.name = name;
this.age = age;
```

---

## 引数名を変える方法

`this` を使わずに、引数名を変える方法もあります。

```java
class Person {
    String name;
    int age;

    Person(String personName, int personAge) {
        name = personName;
        age = personAge;
    }
}
```

この場合、フィールド名と引数名が違うため、`this` がなくても区別できます。

ただし、Javaでは次のようにフィールド名と引数名を同じにして、`this` で区別する書き方がよく使われます。

```java
Person(String name, int age) {
    this.name = name;
    this.age = age;
}
```

---

## 複数のオブジェクトを作る

コンストラクタを使うと、複数のオブジェクトも作りやすくなります。

```java
public class Main {
    public static void main(String[] args) {
        Person person1 = new Person("Taro", 20);
        Person person2 = new Person("Hanako", 25);

        person1.introduce();
        person2.introduce();
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
Hanakoさんは25歳です
```

`new Person("Taro", 20)` と `new Person("Hanako", 25)` で、  
それぞれ違う値を持つオブジェクトを作成しています。

---

## デフォルトコンストラクタ

コンストラクタを1つも書かなかった場合、Javaは自動的に引数なしのコンストラクタを用意します。

これを **デフォルトコンストラクタ** と呼びます。

```java
class Person {
    String name;
    int age;
}
```

この場合、次のようにオブジェクトを作成できます。

```java
Person person = new Person();
```

コンストラクタを書いていなくても動くのは、Javaが自動でデフォルトコンストラクタを用意しているためです。

---

## コンストラクタを書くとデフォルトコンストラクタは作られない

自分でコンストラクタを書くと、Javaはデフォルトコンストラクタを自動作成しません。

```java
class Person {
    String name;
    int age;

    Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}
```

この場合、次のコードはエラーになります。

```java
Person person = new Person(); // エラー
```

`Person(String name, int age)` はありますが、  
`Person()` という引数なしコンストラクタは存在しないためです。

---

## 引数なしコンストラクタを自分で作る

引数なしでもオブジェクトを作れるようにしたい場合は、自分でコンストラクタを書きます。

```java
class Person {
    String name;
    int age;

    Person() {
        name = "未設定";
        age = 0;
    }

    Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}
```

これで、次の2つの書き方ができます。

```java
Person person1 = new Person();
Person person2 = new Person("Taro", 20);
```

---

## コンストラクタのオーバーロード

コンストラクタも、メソッドと同じようにオーバーロードできます。

```java
public class Main {
    public static void main(String[] args) {
        Person person1 = new Person();
        Person person2 = new Person("Taro");
        Person person3 = new Person("Hanako", 25);

        person1.introduce();
        person2.introduce();
        person3.introduce();
    }
}

class Person {
    String name;
    int age;

    Person() {
        this.name = "未設定";
        this.age = 0;
    }

    Person(String name) {
        this.name = name;
        this.age = 0;
    }

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
未設定さんは0歳です
Taroさんは0歳です
Hanakoさんは25歳です
```

引数の数が違うため、複数のコンストラクタを定義できます。

---

## this()で別のコンストラクタを呼ぶ

コンストラクタの中から、同じクラスの別のコンストラクタを呼び出すことができます。

そのときは `this()` を使います。

```java
class Person {
    String name;
    int age;

    Person() {
        this("未設定", 0);
    }

    Person(String name) {
        this(name, 0);
    }

    Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}
```

`this("未設定", 0);` は、  
`Person(String name, int age)` のコンストラクタを呼び出しています。

---

## this()は最初に書く

`this()` を使う場合、コンストラクタの最初の行に書く必要があります。

正しい例：

```java
Person() {
    this("未設定", 0);
}
```

間違った例：

```java
Person() {
    System.out.println("初期化します");
    this("未設定", 0); // エラー
}
```

`this()` は、必ずコンストラクタの先頭に書きます。

---

## thisとthis()の違い

`this` と `this()` は似ていますが、意味が違います。

| 書き方 | 意味 |
|---|---|
| `this.name` | このオブジェクトのフィールド |
| `this.age` | このオブジェクトのフィールド |
| `this()` | 同じクラスの別のコンストラクタを呼ぶ |

例：

```java
Person(String name, int age) {
    this.name = name;
    this.age = age;
}
```

これはフィールドを表す `this` です。

```java
Person() {
    this("未設定", 0);
}
```

これは別のコンストラクタを呼び出す `this()` です。

---

## コンストラクタで初期化するメリット

コンストラクタでフィールドを初期化すると、次のようなメリットがあります。

| メリット | 説明 |
|---|---|
| 初期値の設定忘れを防げる | オブジェクト作成時に必ず値を入れられる |
| コードが短くなる | あとから代入する行を減らせる |
| オブジェクトの状態が分かりやすい | 作成時点で必要な値がそろう |
| 不正な値を防ぎやすい | コンストラクタ内でチェックできる |

---

## コンストラクタで値をチェックする

コンストラクタでは、渡された値をチェックすることもできます。

```java
public class Main {
    public static void main(String[] args) {
        Person person = new Person("Taro", -5);

        person.introduce();
    }
}

class Person {
    String name;
    int age;

    Person(String name, int age) {
        this.name = name;

        if (age < 0) {
            this.age = 0;
        } else {
            this.age = age;
        }
    }

    void introduce() {
        System.out.println(name + "さんは" + age + "歳です");
    }
}
```

実行結果：

```text
Taroさんは0歳です
```

年齢に負の値が渡された場合、`0` を設定しています。

このように、コンストラクタで不正な値を防ぐことができます。

---

## Bookクラスの例

本を表す `Book` クラスを作ってみます。

```java
public class Main {
    public static void main(String[] args) {
        Book book = new Book("Java入門", 2500);

        book.showInfo();
    }
}

class Book {
    String title;
    int price;

    Book(String title, int price) {
        this.title = title;
        this.price = price;
    }

    void showInfo() {
        System.out.println("タイトル: " + title);
        System.out.println("価格: " + price + "円");
    }
}
```

実行結果：

```text
タイトル: Java入門
価格: 2500円
```

---

## Productクラスの例

商品の名前、価格、個数をコンストラクタで設定する例です。

```java
public class Main {
    public static void main(String[] args) {
        Product product = new Product("りんご", 120, 5);

        product.showTotal();
    }
}

class Product {
    String name;
    int price;
    int count;

    Product(String name, int price, int count) {
        this.name = name;
        this.price = price;
        this.count = count;
    }

    int getTotal() {
        return price * count;
    }

    void showTotal() {
        System.out.println(name + "の合計金額: " + getTotal() + "円");
    }
}
```

実行結果：

```text
りんごの合計金額: 600円
```

---

## 配列とコンストラクタ

コンストラクタを使うと、オブジェクトの配列も書きやすくなります。

```java
public class Main {
    public static void main(String[] args) {
        Person[] people = {
            new Person("Taro", 20),
            new Person("Hanako", 25),
            new Person("Jiro", 18)
        };

        for (Person person : people) {
            person.introduce();
        }
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
Hanakoさんは25歳です
Jiroさんは18歳です
```

コンストラクタを使うことで、配列に入れるオブジェクトを短く作成できます。

---

## よくあるエラー

| エラー | 原因 | 解決方法 |
|---|---|---|
| `constructor Person cannot be applied to given types` | コンストラクタの引数が合っていない | 引数の数や型を確認する |
| `invalid method declaration; return type required` | コンストラクタ名がクラス名と違う | クラス名と同じ名前にする |
| `cannot find symbol` | フィールド名や引数名のミス | 名前を確認する |
| `call to this must be first statement in constructor` | `this()` を最初に書いていない | `this()` を先頭に書く |
| フィールドに値が入らない | `this` を使わず引数同士で代入している | `this.name = name;` のように書く |

---


## まとめ

- コンストラクタは、オブジェクト作成時に呼び出される特別な処理
- コンストラクタ名はクラス名と同じにする
- コンストラクタには戻り値を書かない
- `new` したときにコンストラクタが実行される
- コンストラクタを使うと、フィールドの初期化ができる
- `this` は現在のオブジェクト自身を表す
- `this.name = name;` のように書くと、フィールドと引数を区別できる
- コンストラクタもオーバーロードできる
- `this()` を使うと、別のコンストラクタを呼び出せる
- コンストラクタで値をチェックすると、不正な状態を防ぎやすい