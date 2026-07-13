# 第18章 継承

## 学習目標

- 継承とは何かを理解する
- 既存のクラスをもとに新しいクラスを作れる
- `extends` の使い方を理解する
- 親クラスと子クラスの関係を理解する
- 子クラスでフィールドやメソッドを追加できる
- メソッドのオーバーライドを理解する
- `super` の基本を理解する

---

## 継承とは

継承とは、あるクラスの特徴を引き継いで、新しいクラスを作る仕組みです。

たとえば、`Person` クラスがあるとします。

```java
class Person {
    String name;
    int age;

    void introduce() {
        System.out.println(name + "さんは" + age + "歳です");
    }
}
```

この `Person` クラスをもとにして、`Student` クラスを作ることができます。

学生も人なので、名前や年齢を持っています。

さらに、学生には点数や学年など、学生特有の情報もあります。

このように、共通する部分を引き継いで新しいクラスを作るのが継承です。

---

## 親クラスと子クラス

継承では、もとになるクラスを **親クラス** と呼びます。

親クラスを引き継いで作られるクラスを **子クラス** と呼びます。

| 用語 | 意味 |
|---|---|
| 親クラス | 継承元のクラス |
| 子クラス | 継承して作られるクラス |

たとえば、次のような関係です。

```text
Person 親クラス
  └── Student 子クラス
```

`Student` は `Person` を継承します。

---

## extends

Javaで継承を使うには、`extends` を使います。

```java
class 子クラス extends 親クラス {
}
```

例：

```java
class Student extends Person {
}
```

これは、`Student` クラスが `Person` クラスを継承するという意味です。

---

## 継承の基本例

```java
public class Main {
    public static void main(String[] args) {
        Student student = new Student();

        student.name = "Taro";
        student.age = 20;
        student.score = 85;

        student.introduce();
        student.showScore();
    }
}

class Person {
    String name;
    int age;

    void introduce() {
        System.out.println(name + "さんは" + age + "歳です");
    }
}

class Student extends Person {
    int score;

    void showScore() {
        System.out.println("点数: " + score);
    }
}
```

実行結果：

```text
Taroさんは20歳です
点数: 85
```

`Student` クラスには `name` や `age` は書いていません。

しかし、`Person` クラスを継承しているため、`name` と `age` を使えます。

---

## 子クラスは親クラスのメンバーを使える

子クラスは、親クラスのフィールドやメソッドを使えます。

```java
class Person {
    String name;
    int age;

    void introduce() {
        System.out.println(name + "さんは" + age + "歳です");
    }
}

class Student extends Person {
    int score;
}
```

`Student` クラスには、実質的に次のようなメンバーがあると考えられます。

```text
name
age
score
introduce()
```

親クラスの内容を引き継ぎつつ、子クラス独自の内容を追加できます。

---

## 継承を使わない場合

継承を使わずに `Student` クラスと `Teacher` クラスを作ると、同じようなコードが重複します。

```java
class Student {
    String name;
    int age;
    int score;

    void introduce() {
        System.out.println(name + "さんは" + age + "歳です");
    }
}

class Teacher {
    String name;
    int age;
    String subject;

    void introduce() {
        System.out.println(name + "さんは" + age + "歳です");
    }
}
```

`name`、`age`、`introduce()` が重複しています。

このような共通部分は、親クラスにまとめると整理できます。

---

## 継承を使う場合

```java
class Person {
    String name;
    int age;

    void introduce() {
        System.out.println(name + "さんは" + age + "歳です");
    }
}

class Student extends Person {
    int score;
}

class Teacher extends Person {
    String subject;
}
```

`Student` と `Teacher` は、どちらも `Person` を継承しています。

そのため、共通する `name`、`age`、`introduce()` をそれぞれのクラスに書く必要がありません。

---

## 子クラスにメソッドを追加する

子クラスには、独自のメソッドを追加できます。

```java
class Student extends Person {
    int score;

    void showScore() {
        System.out.println("点数: " + score);
    }
}
```

`showScore()` は、`Student` クラスだけが持つメソッドです。

`Person` クラスにはありません。

---

## 複数の子クラス

1つの親クラスから、複数の子クラスを作れます。

```java
public class Main {
    public static void main(String[] args) {
        Student student = new Student();
        student.name = "Taro";
        student.age = 20;
        student.score = 85;

        Teacher teacher = new Teacher();
        teacher.name = "Sato";
        teacher.age = 35;
        teacher.subject = "数学";

        student.introduce();
        student.showScore();

        teacher.introduce();
        teacher.showSubject();
    }
}

class Person {
    String name;
    int age;

    void introduce() {
        System.out.println(name + "さんは" + age + "歳です");
    }
}

class Student extends Person {
    int score;

    void showScore() {
        System.out.println("点数: " + score);
    }
}

class Teacher extends Person {
    String subject;

    void showSubject() {
        System.out.println("担当科目: " + subject);
    }
}
```

実行結果：

```text
Taroさんは20歳です
点数: 85
Satoさんは35歳です
担当科目: 数学
```

`Student` と `Teacher` は、どちらも `Person` の機能を使えます。

それぞれに独自のフィールドやメソッドも追加できます。

---

## is-a関係

継承は、**is-a関係** が成り立つときに使います。

is-a関係とは、「AはBの一種である」と言える関係です。

例：

| 子クラス | 親クラス | 読み方 |
|---|---|---|
| `Student` | `Person` | 学生は人の一種 |
| `Teacher` | `Person` | 教師は人の一種 |
| `Dog` | `Animal` | 犬は動物の一種 |
| `Car` | `Vehicle` | 車は乗り物の一種 |

`Student extends Person` は自然です。

```java
class Student extends Person {
}
```

学生は人の一種だからです。

---

## 不自然な継承

is-a関係が成り立たない場合、継承は使わないほうがよいです。

たとえば、次のような関係は不自然です。

```java
class Engine extends Car {
}
```

エンジンは車の一種ではありません。

エンジンは車の部品です。

このような場合は、継承ではなく、クラスの中に別のクラスを持たせる設計のほうが自然です。

---

## メソッドのオーバーライド

子クラスでは、親クラスのメソッドを上書きできます。

これを **オーバーライド** と呼びます。

```java
class Person {
    void introduce() {
        System.out.println("私は人です");
    }
}

class Student extends Person {
    void introduce() {
        System.out.println("私は学生です");
    }
}
```

`Student` クラスでは、親クラスの `introduce()` を上書きしています。

---

## オーバーライドの例

```java
public class Main {
    public static void main(String[] args) {
        Person person = new Person();
        Student student = new Student();

        person.introduce();
        student.introduce();
    }
}

class Person {
    void introduce() {
        System.out.println("私は人です");
    }
}

class Student extends Person {
    void introduce() {
        System.out.println("私は学生です");
    }
}
```

実行結果：

```text
私は人です
私は学生です
```

`student.introduce()` では、`Student` クラスで上書きしたメソッドが呼び出されます。

---

## @Override

オーバーライドするときは、メソッドの前に `@Override` を付けることが多いです。

```java
class Student extends Person {
    @Override
    void introduce() {
        System.out.println("私は学生です");
    }
}
```

`@Override` を付けると、Javaが正しくオーバーライドできているか確認してくれます。

メソッド名や引数を間違えた場合、エラーとして教えてくれます。

---

## @Overrideを使うメリット

```java
class Person {
    void introduce() {
        System.out.println("私は人です");
    }
}

class Student extends Person {
    @Override
    void introdce() {
        System.out.println("私は学生です");
    }
}
```

このコードでは、`introduce` のつもりで `introdce` と書いてしまっています。

`@Override` があるため、Javaは「親クラスに同じメソッドがない」と判断してエラーにしてくれます。

タイプミスを見つけやすくなるため、オーバーライドするときは `@Override` を付けるのがおすすめです。

---

## super

`super` は、親クラスを表すキーワードです。

子クラスから親クラスのフィールドやメソッドを呼び出すときに使います。

```java
super.メソッド名();
```

例：

```java
super.introduce();
```

---

## superで親クラスのメソッドを呼ぶ

子クラスでオーバーライドしたあとに、親クラスの処理も使いたい場合があります。

そのときは `super` を使います。

```java
public class Main {
    public static void main(String[] args) {
        Student student = new Student();

        student.name = "Taro";
        student.age = 20;
        student.score = 85;

        student.introduce();
    }
}

class Person {
    String name;
    int age;

    void introduce() {
        System.out.println(name + "さんは" + age + "歳です");
    }
}

class Student extends Person {
    int score;

    @Override
    void introduce() {
        super.introduce();
        System.out.println("点数: " + score);
    }
}
```

実行結果：

```text
Taroさんは20歳です
点数: 85
```

`super.introduce();` によって、親クラスの `introduce()` を呼び出しています。

そのあと、子クラス独自の処理として点数を表示しています。

---

## 親クラスのコンストラクタ

親クラスにコンストラクタがある場合、子クラスのコンストラクタから呼び出すことができます。

そのときは `super()` を使います。

```java
class Person {
    String name;
    int age;

    Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}

class Student extends Person {
    int score;

    Student(String name, int age, int score) {
        super(name, age);
        this.score = score;
    }
}
```

`super(name, age);` は、親クラスのコンストラクタを呼び出しています。

---

## super()の例

```java
public class Main {
    public static void main(String[] args) {
        Student student = new Student("Taro", 20, 85);

        student.introduce();
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

class Student extends Person {
    int score;

    Student(String name, int age, int score) {
        super(name, age);
        this.score = score;
    }

    @Override
    void introduce() {
        super.introduce();
        System.out.println("点数: " + score);
    }
}
```

実行結果：

```text
Taroさんは20歳です
点数: 85
```

`Student` のコンストラクタでは、まず `super(name, age);` で親クラスの初期化をしています。

そのあと、`this.score = score;` で子クラス独自のフィールドを初期化しています。

---

## super()は最初に書く

`super()` は、子クラスのコンストラクタの最初の行に書く必要があります。

正しい例：

```java
Student(String name, int age, int score) {
    super(name, age);
    this.score = score;
}
```

間違った例：

```java
Student(String name, int age, int score) {
    this.score = score;
    super(name, age); // エラー
}
```

`super()` は必ず先頭に書きます。

---

## superとsuper()の違い

| 書き方 | 意味 |
|---|---|
| `super.introduce()` | 親クラスのメソッドを呼ぶ |
| `super.name` | 親クラスのフィールドを参照する |
| `super()` | 親クラスのコンストラクタを呼ぶ |

`super` は親クラスのメンバーを使うときに使います。

`super()` は親クラスのコンストラクタを呼ぶときに使います。

---

## 継承とアクセス修飾子

親クラスのメンバーは、アクセス修飾子によって子クラスから使えるかどうかが変わります。

代表的なアクセス修飾子は次のとおりです。

| 修飾子 | 説明 |
|---|---|
| `public` | どこからでも使える |
| `protected` | 同じパッケージ、または子クラスから使える |
| 指定なし | 同じパッケージ内から使える |
| `private` | 同じクラス内からだけ使える |

この章では、まず `public`、`protected`、`private` の違いをざっくり知っておけば大丈夫です。

---

## privateは子クラスから直接使えない

親クラスの `private` フィールドは、子クラスから直接使えません。

```java
class Person {
    private String name;
}

class Student extends Person {
    void showName() {
        System.out.println(name); // エラー
    }
}
```

`name` は `private` なので、`Person` クラスの中からしか使えません。

---

## protectedを使う例

子クラスから使いたい場合は、`protected` を使うことがあります。

```java
class Person {
    protected String name;
}

class Student extends Person {
    void showName() {
        System.out.println(name);
    }
}
```

`protected` にすると、子クラスから直接アクセスできます。

ただし、フィールドを直接触らせすぎると管理しづらくなることもあります。

実際の開発では、次のようなメソッドを使って値を取得・変更することも多いです。

```java
getName()
setName()
```

これらは後の章で扱います。

---

## Javaは多重継承できない

Javaでは、1つのクラスが複数のクラスを同時に継承することはできません。

次のような書き方はできません。

```java
class Student extends Person, Learner {
}
```

Javaのクラス継承では、親クラスは1つだけです。

```java
class Student extends Person {
}
```

ただし、後の章で学ぶ `interface` を使うと、複数の役割を持たせることができます。

---

## 継承を使うメリット

継承には、次のようなメリットがあります。

| メリット | 説明 |
|---|---|
| 共通部分をまとめられる | 重複したコードを減らせる |
| クラスの関係を表現できる | `Student` は `Person` の一種と表せる |
| 子クラスで機能を追加できる | 親クラスをもとに拡張できる |
| オーバーライドできる | 子クラスに合わせて処理を変更できる |

---

## 継承を使いすぎない

継承は便利ですが、何でも継承すればよいわけではありません。

継承を使うと、親クラスと子クラスの関係が強くなります。

親クラスを変更すると、子クラスにも影響が出ることがあります。

そのため、継承は **本当に is-a関係が成り立つとき** に使うのが基本です。

---

## よくあるエラー

| エラー | 原因 | 解決方法 |
|---|---|---|
| `cannot find symbol` | 親クラス名やメソッド名のミス | 名前を確認する |
| `constructor Person cannot be applied to given types` | 親クラスのコンストラクタ呼び出しが合っていない | `super()` の引数を確認する |
| `call to super must be first statement in constructor` | `super()` を先頭に書いていない | `super()` を最初の行に書く |
| `method does not override or implement a method` | `@Override` したメソッドが親クラスにない | メソッド名や引数を確認する |
| `has private access` | `private` メンバーに子クラスからアクセスしている | `protected` やメソッド経由にする |

---


## まとめ

- 継承は、既存のクラスをもとに新しいクラスを作る仕組み
- 継承には `extends` を使う
- 継承元のクラスを親クラスと呼ぶ
- 継承して作られるクラスを子クラスと呼ぶ
- 子クラスは親クラスのフィールドやメソッドを使える
- 子クラスには独自のフィールドやメソッドを追加できる
- 継承は is-a関係が成り立つときに使う
- 子クラスでは親クラスのメソッドをオーバーライドできる
- `@Override` を付けると、オーバーライドのミスを見つけやすい
- `super` で親クラスのメソッドやフィールドを使える
- `super()` で親クラスのコンストラクタを呼び出せる
- Javaでは1つのクラスが継承できる親クラスは1つだけ