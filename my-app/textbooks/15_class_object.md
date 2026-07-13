# 第15章 クラスとオブジェクト

## 学習目標

- クラスとは何かを理解する
- オブジェクトとは何かを理解する
- クラスからオブジェクトを作成できる
- フィールドを使ってデータを持たせられる
- メソッドを使って動作を定義できる
- 複数のオブジェクトを扱える

---

## クラスとは

クラスとは、データや処理をまとめるための設計図です。

たとえば、人を表すプログラムを作る場合、  
人には次のような情報があります。

- 名前
- 年齢
- 身長

また、人には次のような動作があります。

- 自己紹介する
- 年齢を表示する
- あいさつする

このような「情報」と「動作」をまとめたものがクラスです。

---

## オブジェクトとは

オブジェクトとは、クラスという設計図から作られた実体です。

たとえば、`Person` というクラスがあるとします。

```text
Personクラス
```

これは「人」を作るための設計図です。

そこから、実際の人を表すオブジェクトを作れます。

```text
Taroさん
Hanakoさん
Jiroさん
```

クラスは設計図、オブジェクトはその設計図から作られた実体です。

---

## クラスとオブジェクトのイメージ

| 用語 | イメージ |
|---|---|
| クラス | 設計図 |
| オブジェクト | 設計図から作られた実体 |
| フィールド | オブジェクトが持つデータ |
| メソッド | オブジェクトが行う処理 |

---

## クラスを作る

まず、`Person` クラスを作ってみます。

```java
class Person {
    String name;
    int age;
}
```

この `Person` クラスには、次の2つのフィールドがあります。

```java
String name;
int age;
```

`name` は名前を表すフィールドです。

`age` は年齢を表すフィールドです。

---

## フィールドとは

フィールドとは、クラスの中に定義する変数のことです。

```java
class Person {
    String name;
    int age;
}
```

この場合、`name` と `age` がフィールドです。

フィールドを使うと、オブジェクトにデータを持たせることができます。

---

## オブジェクトを作る

クラスからオブジェクトを作るには、`new` を使います。

```java
Person person = new Person();
```

これは、`Person` クラスから新しいオブジェクトを作成し、  
`person` という変数に代入しています。

---

## フィールドに値を入れる

オブジェクトのフィールドには、`.` を使ってアクセスします。

```java
person.name = "Taro";
person.age = 20;
```

`.` は「そのオブジェクトの中にあるもの」を指定するために使います。

---

## フィールドの値を表示する

フィールドの値も、`.` を使って取り出せます。

```java
System.out.println(person.name);
System.out.println(person.age);
```

---

## クラスとオブジェクトの基本例

```java
public class Main {
    public static void main(String[] args) {
        Person person = new Person();

        person.name = "Taro";
        person.age = 20;

        System.out.println(person.name);
        System.out.println(person.age);
    }
}

class Person {
    String name;
    int age;
}
```

実行結果：

```text
Taro
20
```

`new Person()` によって、`Person` クラスからオブジェクトを作っています。

---

## MainクラスとPersonクラス

この例では、1つのファイルに2つのクラスを書いています。

```java
public class Main {
}

class Person {
}
```

`public class Main` は、プログラムを実行するためのクラスです。

`class Person` は、人を表すためのクラスです。

> `public` が付いたクラス名は、ファイル名と同じにする必要があります。  
> 今回は `public class Main` なので、ファイル名は `Main.java` です。

---

## 複数のオブジェクトを作る

同じクラスから、複数のオブジェクトを作れます。

```java
public class Main {
    public static void main(String[] args) {
        Person person1 = new Person();
        person1.name = "Taro";
        person1.age = 20;

        Person person2 = new Person();
        person2.name = "Hanako";
        person2.age = 25;

        System.out.println(person1.name);
        System.out.println(person1.age);

        System.out.println(person2.name);
        System.out.println(person2.age);
    }
}

class Person {
    String name;
    int age;
}
```

実行結果：

```text
Taro
20
Hanako
25
```

`person1` と `person2` は、どちらも `Person` クラスから作られたオブジェクトです。

しかし、それぞれ別のデータを持っています。

---

## オブジェクトごとにデータは別

次のコードを見てみます。

```java
Person person1 = new Person();
person1.name = "Taro";

Person person2 = new Person();
person2.name = "Hanako";
```

`person1.name` は `"Taro"` です。

`person2.name` は `"Hanako"` です。

同じ `Person` クラスから作られていても、  
それぞれのオブジェクトは別々のフィールドを持っています。

---

## メソッドを持つクラス

クラスには、フィールドだけでなくメソッドも定義できます。

```java
class Person {
    String name;
    int age;

    void introduce() {
        System.out.println("こんにちは");
    }
}
```

この `introduce` メソッドは、`Person` オブジェクトの動作を表します。

---

## オブジェクトのメソッドを呼び出す

オブジェクトのメソッドも、`.` を使って呼び出します。

```java
person.introduce();
```

例：

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
        System.out.println("こんにちは");
    }
}
```

実行結果：

```text
こんにちは
```

---

## フィールドを使うメソッド

メソッドの中では、同じクラスのフィールドを使えます。

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

`introduce` メソッドの中で、`name` と `age` の値を使っています。

---

## オブジェクトごとにメソッドの結果が変わる

同じ `introduce` メソッドでも、オブジェクトが持つデータによって結果が変わります。

```java
public class Main {
    public static void main(String[] args) {
        Person person1 = new Person();
        person1.name = "Taro";
        person1.age = 20;

        Person person2 = new Person();
        person2.name = "Hanako";
        person2.age = 25;

        person1.introduce();
        person2.introduce();
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
私の名前はHanakoです
年齢は25歳です
```

`person1.introduce()` では `person1` のデータが使われます。

`person2.introduce()` では `person2` のデータが使われます。

---

## 引数を受け取るメソッド

クラスの中のメソッドも、引数を受け取れます。

```java
class Person {
    String name;

    void greet(String message) {
        System.out.println(name + "さん: " + message);
    }
}
```

使用例：

```java
public class Main {
    public static void main(String[] args) {
        Person person = new Person();

        person.name = "Taro";

        person.greet("こんにちは");
        person.greet("Javaを勉強しています");
    }
}

class Person {
    String name;

    void greet(String message) {
        System.out.println(name + "さん: " + message);
    }
}
```

実行結果：

```text
Taroさん: こんにちは
Taroさん: Javaを勉強しています
```

---

## 戻り値があるメソッド

クラスの中のメソッドも、戻り値を返せます。

```java
class Person {
    String name;
    int age;

    String getProfile() {
        return name + "さんは" + age + "歳です";
    }
}
```

使用例：

```java
public class Main {
    public static void main(String[] args) {
        Person person = new Person();

        person.name = "Taro";
        person.age = 20;

        String profile = person.getProfile();

        System.out.println(profile);
    }
}

class Person {
    String name;
    int age;

    String getProfile() {
        return name + "さんは" + age + "歳です";
    }
}
```

実行結果：

```text
Taroさんは20歳です
```

---

## クラスを使うメリット

クラスを使うと、関連するデータと処理をまとめられます。

たとえば、名前と年齢を別々の変数で管理すると、次のようになります。

```java
String name1 = "Taro";
int age1 = 20;

String name2 = "Hanako";
int age2 = 25;
```

人数が増えると、変数がどんどん増えます。

クラスを使うと、1人分の情報を1つのオブジェクトとして扱えます。

```java
Person person1 = new Person();
Person person2 = new Person();
```

これにより、データのまとまりが分かりやすくなります。

---

## 配列とオブジェクトを組み合わせる

オブジェクトは、配列に入れることもできます。

```java
public class Main {
    public static void main(String[] args) {
        Person[] people = new Person[3];

        people[0] = new Person();
        people[0].name = "Taro";
        people[0].age = 20;

        people[1] = new Person();
        people[1].name = "Hanako";
        people[1].age = 25;

        people[2] = new Person();
        people[2].name = "Jiro";
        people[2].age = 18;

        for (int i = 0; i < people.length; i++) {
            people[i].introduce();
        }
    }
}

class Person {
    String name;
    int age;

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

配列を使うと、複数のオブジェクトをまとめて扱えます。

---

## nullとは

オブジェクト型の変数には、`null` が入ることがあります。

`null` は、オブジェクトが入っていない状態を表します。

```java
Person person = null;
```

この状態でフィールドやメソッドを使おうとするとエラーになります。

```java
person.name = "Taro"; // エラー
```

オブジェクトを使う前には、`new` で作成する必要があります。

```java
Person person = new Person();
person.name = "Taro";
```

---

## newを忘れた場合

次のコードはエラーになります。

```java
Person person;
person.name = "Taro";
```

`Person person;` は、変数を用意しただけです。

まだオブジェクトは作られていません。

正しくは次のように書きます。

```java
Person person = new Person();
person.name = "Taro";
```

`new Person()` によって、実際のオブジェクトが作られます。

---

## フィールドの初期値

オブジェクトを作成した直後、フィールドには初期値が入っています。

```java
public class Main {
    public static void main(String[] args) {
        Person person = new Person();

        System.out.println(person.name);
        System.out.println(person.age);
        System.out.println(person.isStudent);
    }
}

class Person {
    String name;
    int age;
    boolean isStudent;
}
```

実行結果：

```text
null
0
false
```

代表的な初期値は次のとおりです。

| 型 | 初期値 |
|---|---|
| `int` | `0` |
| `double` | `0.0` |
| `boolean` | `false` |
| `String` | `null` |

---

## クラス名の付け方

Javaでは、クラス名は大文字で始めることが多いです。

良い例：

```java
Person
Student
Car
Book
```

複数の単語を使う場合は、単語の先頭を大文字にします。

```java
StudentScore
UserProfile
GameCharacter
```

この書き方を **パスカルケース** と呼びます。

---

## フィールド名とメソッド名の付け方

フィールド名とメソッド名は、小文字で始めることが多いです。

フィールド名の例：

```java
name
age
totalScore
userName
```

メソッド名の例：

```java
introduce()
showProfile()
calculateTotal()
```

Javaでは、フィールド名やメソッド名にはキャメルケースを使うことが多いです。

---

## 1つのファイルに複数のクラスを書く

学習用の小さなプログラムでは、次のように1つのファイルに複数のクラスを書くことがあります。

```java
public class Main {
    public static void main(String[] args) {
    }
}

class Person {
}
```

ただし、実際の開発では、クラスごとにファイルを分けることが多いです。

```text
Main.java
Person.java
```

この教科書では、最初は分かりやすさを優先して、  
1つのファイルに複数のクラスを書く例も使います。

---

## オブジェクト指向とは

Javaは、オブジェクト指向のプログラミング言語です。

オブジェクト指向とは、データと処理を1つのまとまりとして考える方法です。

たとえば、`Person` オブジェクトには、次のようなデータがあります。

```text
名前
年齢
```

そして、次のような処理があります。

```text
自己紹介する
あいさつする
```

このように、関連するデータと処理をまとめて扱う考え方がオブジェクト指向です。

---

## 手続き的な書き方との違い

クラスを使わずに書くと、データと処理が分かれやすくなります。

```java
String name = "Taro";
int age = 20;

System.out.println(name + "さんは" + age + "歳です");
```

クラスを使うと、データと処理をまとめられます。

```java
Person person = new Person();
person.name = "Taro";
person.age = 20;

person.introduce();
```

`person.introduce()` と書くことで、  
「personが自己紹介する」という形で読めるようになります。

---

## よくあるエラー

| エラー | 原因 | 解決方法 |
|---|---|---|
| `cannot find symbol` | クラス名、変数名、フィールド名のミス | 名前を確認する |
| `NullPointerException` | `null` のままフィールドやメソッドを使った | `new` でオブジェクトを作る |
| `non-static variable cannot be referenced from a static context` | オブジェクトを作らずにフィールドを使おうとした | `new` でオブジェクトを作ってから使う |
| `class Person is public, should be declared in a file named Person.java` | publicクラス名とファイル名が違う | ファイル名をクラス名に合わせる |
| `';' expected` | セミコロン忘れ | 文の最後を確認する |

---

## まとめ

- クラスはデータと処理をまとめるための設計図
- オブジェクトはクラスから作られた実体
- `new` を使ってオブジェクトを作成する
- フィールドはオブジェクトが持つデータ
- メソッドはオブジェクトが行う処理
- `.` を使ってフィールドやメソッドにアクセスする
- 同じクラスから複数のオブジェクトを作れる
- オブジェクトごとにフィールドの値は別々に管理される
- オブジェクトは配列に入れてまとめて扱える
- Javaはクラスとオブジェクトを中心に考える言語である