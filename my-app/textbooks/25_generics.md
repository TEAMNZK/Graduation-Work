# 第25章 ジェネリクス

## 学習目標

- ジェネリクスとは何かを理解する
- `<String>` や `<Integer>` の意味を理解する
- 型を指定するメリットを知る
- 型安全なコレクションを使える
- 自分でジェネリッククラスを作成できる
- ジェネリックメソッドの基本を理解する

---

## ジェネリクスとは

ジェネリクスとは、クラスやメソッドで扱う型をあとから指定できる仕組みです。

これまで `ArrayList` を使うときに、次のような書き方をしました。

```java
ArrayList<String> names = new ArrayList<>();
```

この `<String>` がジェネリクスです。

`<String>` と書くことで、この `ArrayList` には `String` 型の値を入れると決めています。

---

## ジェネリクスのイメージ

ジェネリクスは、「中に入れる型を指定できる箱」のようなものです。

```java
ArrayList<String>
```

これは、文字列を入れるリストです。

```java
ArrayList<Integer>
```

これは、整数を入れるリストです。

同じ `ArrayList` でも、入れるデータの型を変えられます。

---

## ジェネリクスを使う例

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> names = new ArrayList<>();

        names.add("Taro");
        names.add("Hanako");

        String name = names.get(0);

        System.out.println(name);
    }
}
```

実行結果：

```text
Taro
```

`ArrayList<String>` と書いているので、  
このリストには文字列だけを入れられます。

---

## 型を指定するメリット

ジェネリクスを使うと、入れられる値の型を制限できます。

```java
ArrayList<String> names = new ArrayList<>();
```

このリストには `String` だけを入れられます。

```java
names.add("Taro"); // OK
names.add(100);    // エラー
```

間違った型の値を入れようとすると、コンパイル時にエラーになります。

---

## 型安全とは

型安全とは、型の間違いを防げることです。

ジェネリクスを使うと、プログラムを実行する前に型のミスを見つけやすくなります。

```java
ArrayList<Integer> scores = new ArrayList<>();

scores.add(80);
scores.add(90);
scores.add("abc"); // エラー
```

`ArrayList<Integer>` には整数を入れると決めているため、  
文字列 `"abc"` は追加できません。

---

## ジェネリクスを使わない場合

昔のJavaでは、次のように型を指定せずに `ArrayList` を使うこともできました。

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList list = new ArrayList();

        list.add("Taro");
        list.add(100);

        String name = (String) list.get(0);

        System.out.println(name);
    }
}
```

この書き方では、文字列も整数も同じリストに入ってしまいます。

また、取り出すときに型変換が必要になります。

```java
String name = (String) list.get(0);
```

---

## 型変換の危険

型を指定しないと、間違った型変換でエラーになることがあります。

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList list = new ArrayList();

        list.add("Taro");
        list.add(100);

        String text = (String) list.get(1);

        System.out.println(text);
    }
}
```

実行すると、エラーになります。

```text
ClassCastException
```

`list.get(1)` は `100` です。

それを `String` として扱おうとしているため、エラーになります。

---

## ジェネリクスを使うと安全

ジェネリクスを使えば、最初から型を決められます。

```java
ArrayList<String> names = new ArrayList<>();

names.add("Taro");
names.add("Hanako");
names.add(100); // エラー
```

整数を入れようとした時点でエラーになります。

実行してから失敗するより、コンパイル時にミスを見つけられるほうが安全です。

---

## 取り出すときに型変換がいらない

ジェネリクスを使うと、値を取り出すときに型変換が不要です。

```java
ArrayList<String> names = new ArrayList<>();

names.add("Taro");

String name = names.get(0);
```

`names` は `ArrayList<String>` なので、  
`get(0)` の結果は `String` として扱えます。

---

## Integerを使う

整数を扱う場合は、`Integer` を使います。

```java
ArrayList<Integer> scores = new ArrayList<>();
```

例：

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<Integer> scores = new ArrayList<>();

        scores.add(80);
        scores.add(90);
        scores.add(75);

        for (int score : scores) {
            System.out.println(score);
        }
    }
}
```

実行結果：

```text
80
90
75
```

`int` ではなく `Integer` を使う点に注意しましょう。

---

## 基本データ型は使えない

ジェネリクスには、基本データ型を直接指定できません。

間違った例：

```java
ArrayList<int> numbers = new ArrayList<>(); // エラー
```

正しい例：

```java
ArrayList<Integer> numbers = new ArrayList<>();
```

---

## ラッパークラス

基本データ型に対応する参照型を **ラッパークラス** と呼びます。

| 基本データ型 | ラッパークラス |
|---|---|
| `int` | `Integer` |
| `double` | `Double` |
| `char` | `Character` |
| `boolean` | `Boolean` |
| `long` | `Long` |
| `float` | `Float` |

ジェネリクスでは、ラッパークラスを使います。

---

## Doubleを使う

小数を扱う場合は、`Double` を使います。

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<Double> heights = new ArrayList<>();

        heights.add(170.5);
        heights.add(160.2);
        heights.add(180.0);

        for (double height : heights) {
            System.out.println(height);
        }
    }
}
```

実行結果：

```text
170.5
160.2
180.0
```

---

## Booleanを使う

真偽値を扱う場合は、`Boolean` を使います。

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<Boolean> results = new ArrayList<>();

        results.add(true);
        results.add(false);
        results.add(true);

        for (boolean result : results) {
            System.out.println(result);
        }
    }
}
```

実行結果：

```text
true
false
true
```

---

## HashMapとジェネリクス

`HashMap` でもジェネリクスを使います。

```java
HashMap<String, Integer> scores = new HashMap<>();
```

これは、キーが `String`、値が `Integer` の `HashMap` です。

例：

```java
import java.util.HashMap;

public class Main {
    public static void main(String[] args) {
        HashMap<String, Integer> scores = new HashMap<>();

        scores.put("Taro", 80);
        scores.put("Hanako", 90);

        int score = scores.get("Taro");

        System.out.println(score);
    }
}
```

実行結果：

```text
80
```

---

## HashMapの型指定

`HashMap<K, V>` のように、2つの型を指定します。

```java
HashMap<キーの型, 値の型>
```

例：

```java
HashMap<String, Integer>
```

これは、次のような対応を表します。

```text
String  -> Integer
名前      -> 点数
```

ほかにも、次のような組み合わせができます。

```java
HashMap<Integer, String> users = new HashMap<>();
HashMap<String, String> capitals = new HashMap<>();
HashMap<String, Double> prices = new HashMap<>();
```

---

## HashSetとジェネリクス

`HashSet` でもジェネリクスを使います。

```java
HashSet<String> names = new HashSet<>();
```

例：

```java
import java.util.HashSet;

public class Main {
    public static void main(String[] args) {
        HashSet<String> names = new HashSet<>();

        names.add("Taro");
        names.add("Hanako");
        names.add("Taro");

        for (String name : names) {
            System.out.println(name);
        }
    }
}
```

実行結果の例：

```text
Hanako
Taro
```

`HashSet<String>` なので、文字列だけを管理できます。

---

## 自分で作ったクラスを使う

ジェネリクスには、自分で作ったクラスも指定できます。

```java
ArrayList<Student> students = new ArrayList<>();
```

例：

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<Student> students = new ArrayList<>();

        students.add(new Student("Taro", 80));
        students.add(new Student("Hanako", 90));

        for (Student student : students) {
            student.showInfo();
        }
    }
}

class Student {
    String name;
    int score;

    Student(String name, int score) {
        this.name = name;
        this.score = score;
    }

    void showInfo() {
        System.out.println(name + ": " + score);
    }
}
```

実行結果：

```text
Taro: 80
Hanako: 90
```

`ArrayList<Student>` と書くことで、`Student` オブジェクトだけを入れるリストになります。

---

## ダイヤモンド演算子

次のように、右側の `<>` の中は省略できます。

```java
ArrayList<String> names = new ArrayList<>();
```

この `<>` を **ダイヤモンド演算子** と呼びます。

昔は次のように右側にも型を書いていました。

```java
ArrayList<String> names = new ArrayList<String>();
```

現在は、左側の型から判断できるため、右側は `<>` と書くことが多いです。

---

## ジェネリッククラスとは

ジェネリッククラスとは、型をあとから指定できるクラスです。

たとえば、次のような箱を表すクラスを作るとします。

```java
class Box<T> {
}
```

`<T>` は、あとから指定される型を表します。

`T` は type の頭文字としてよく使われます。

---

## ジェネリッククラスの基本形

```java
class クラス名<T> {
    T フィールド名;
}
```

例：

```java
class Box<T> {
    T value;
}
```

この `Box` クラスは、どんな型の値でも入れられる箱です。

---

## Boxクラスの例

```java
public class Main {
    public static void main(String[] args) {
        Box<String> stringBox = new Box<>();

        stringBox.value = "Java";

        System.out.println(stringBox.value);
    }
}

class Box<T> {
    T value;
}
```

実行結果：

```text
Java
```

`Box<String>` と書いているので、  
この `Box` の `value` は `String` 型として扱われます。

---

## Integerを入れるBox

同じ `Box` クラスを、`Integer` 用として使うこともできます。

```java
public class Main {
    public static void main(String[] args) {
        Box<Integer> intBox = new Box<>();

        intBox.value = 100;

        System.out.println(intBox.value);
    }
}

class Box<T> {
    T value;
}
```

実行結果：

```text
100
```

`Box<Integer>` と書いているので、  
`value` は `Integer` 型として扱われます。

---

## メソッドを持つジェネリッククラス

ジェネリッククラスには、メソッドも定義できます。

```java
class Box<T> {
    private T value;

    void setValue(T value) {
        this.value = value;
    }

    T getValue() {
        return value;
    }
}
```

使用例：

```java
public class Main {
    public static void main(String[] args) {
        Box<String> box = new Box<>();

        box.setValue("Java");

        String value = box.getValue();

        System.out.println(value);
    }
}

class Box<T> {
    private T value;

    void setValue(T value) {
        this.value = value;
    }

    T getValue() {
        return value;
    }
}
```

実行結果：

```text
Java
```

`T` は、指定された型として扱われます。

---

## 複数の型パラメータ

ジェネリッククラスでは、複数の型を指定することもできます。

```java
class Pair<K, V> {
    K key;
    V value;
}
```

`K` は key、`V` は value の意味でよく使われます。

例：

```java
public class Main {
    public static void main(String[] args) {
        Pair<String, Integer> pair = new Pair<>();

        pair.key = "Taro";
        pair.value = 80;

        System.out.println(pair.key + ": " + pair.value);
    }
}

class Pair<K, V> {
    K key;
    V value;
}
```

実行結果：

```text
Taro: 80
```

`Pair<String, Integer>` と書くことで、  
`key` は `String`、`value` は `Integer` として扱われます。

---

## 型パラメータの名前

型パラメータには、慣習的によく使われる名前があります。

| 名前 | 意味 |
|---|---|
| `T` | Type |
| `E` | Element |
| `K` | Key |
| `V` | Value |
| `N` | Number |

たとえば、`ArrayList<E>` の `E` は要素の型を表します。

自分で作る場合は、まず `T` を使うと分かりやすいです。

---

## ジェネリックメソッドとは

ジェネリックメソッドとは、メソッド単位で型を指定できるメソッドです。

```java
public static <T> void printValue(T value) {
    System.out.println(value);
}
```

`<T>` は、このメソッドで使う型を表します。

---

## ジェネリックメソッドの例

```java
public class Main {
    public static void main(String[] args) {
        printValue("Java");
        printValue(100);
        printValue(3.14);
    }

    public static <T> void printValue(T value) {
        System.out.println(value);
    }
}
```

実行結果：

```text
Java
100
3.14
```

`printValue()` は、文字列、整数、小数など、さまざまな型を受け取れます。

---

## ジェネリックメソッドで値を返す

ジェネリックメソッドは、受け取った値をそのまま返すこともできます。

```java
public class Main {
    public static void main(String[] args) {
        String text = getValue("Java");
        Integer number = getValue(100);

        System.out.println(text);
        System.out.println(number);
    }

    public static <T> T getValue(T value) {
        return value;
    }
}
```

実行結果：

```text
Java
100
```

`getValue("Java")` の戻り値は `String` として扱われます。

`getValue(100)` の戻り値は `Integer` として扱われます。

---

## ジェネリクスのメリット

ジェネリクスには、次のようなメリットがあります。

| メリット | 説明 |
|---|---|
| 型のミスを防げる | 間違った型を入れるとコンパイルエラーになる |
| 型変換が不要になる | 取り出した値をそのまま使える |
| 汎用的なクラスを作れる | さまざまな型に対応できる |
| コードを再利用しやすい | 同じ処理を複数の型で使える |

---

## ジェネリクスを使う場面

ジェネリクスは、次のような場面でよく使います。

- `ArrayList<String>`
- `ArrayList<Integer>`
- `HashMap<String, Integer>`
- `HashSet<String>`
- 自作の箱クラス
- 共通処理のメソッド

特に、コレクションではほぼ必ず使います。

---

## よくあるエラー

| エラー | 原因 | 解決方法 |
|---|---|---|
| `unexpected type` | `ArrayList<int>` のように基本データ型を指定している | `Integer` などのラッパークラスを使う |
| `incompatible types` | 指定した型と違う値を入れている | ジェネリクスの型を確認する |
| `cannot find symbol` | クラス名や型名のミス | 名前を確認する |
| `ClassCastException` | 型変換を間違えている | ジェネリクスで型を指定する |
| `unchecked warning` | 型を指定せずにコレクションを使っている | `ArrayList<String>` のように型を書く |


---

## まとめ

- ジェネリクスは、扱う型をあとから指定できる仕組み
- `<String>` や `<Integer>` は、入れる値の型を指定している
- ジェネリクスを使うと、型のミスをコンパイル時に見つけやすい
- 値を取り出すときに型変換が不要になる
- `ArrayList<int>` は使えないため、`ArrayList<Integer>` を使う
- 基本データ型に対応するラッパークラスがある
- 自分でジェネリッククラスを作ることもできる
- `<T>` は型パラメータを表す
- ジェネリックメソッドを使うと、メソッド単位で型を柔軟に扱える