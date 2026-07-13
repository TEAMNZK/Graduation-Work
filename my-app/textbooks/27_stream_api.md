# 第27章 Stream API

## 学習目標

- Stream APIとは何かを理解する
- `stream()` の基本を理解する
- `forEach()` で要素を処理できる
- `filter()` で条件に合う要素だけを取り出せる
- `map()` で要素を変換できる
- `collect()` で結果をリストに戻せる
- `count()`、`anyMatch()`、`allMatch()` などの基本を使える

---

## Stream APIとは

Stream APIとは、コレクションのデータを流れるように処理するための仕組みです。

たとえば、`ArrayList` に入っているデータに対して、次のような処理ができます。

- すべて表示する
- 条件に合うものだけ取り出す
- 値を別の形に変換する
- 合計や件数を求める
- 条件を満たすデータがあるか調べる

Stream APIを使うと、これらの処理を短く読みやすく書けます。

---

## Streamのイメージ

Streamは、データが流れていくイメージです。

```text
リスト
  ↓
stream()
  ↓
filter()
  ↓
map()
  ↓
forEach()
```

元のデータを流しながら、途中で絞り込んだり、変換したり、最後に表示したりします。

---

## まずは通常のfor文

名前の一覧を表示するコードを、まずは拡張for文で書いてみます。

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> names = new ArrayList<>();

        names.add("Taro");
        names.add("Hanako");
        names.add("Jiro");

        for (String name : names) {
            System.out.println(name);
        }
    }
}
```

実行結果：

```text
Taro
Hanako
Jiro
```

これでも問題ありません。

---

## Stream APIで書く

同じ処理をStream APIで書くと、次のようになります。

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> names = new ArrayList<>();

        names.add("Taro");
        names.add("Hanako");
        names.add("Jiro");

        names.stream()
             .forEach(name -> System.out.println(name));
    }
}
```

実行結果：

```text
Taro
Hanako
Jiro
```

`names.stream()` で、`names` の要素をStreamとして扱っています。

---

## stream()

`stream()` は、コレクションからStreamを作るメソッドです。

```java
names.stream()
```

`ArrayList` などのコレクションに対して使えます。

```java
names.stream()
scores.stream()
students.stream()
```

Streamにすると、`filter()` や `map()` などの便利な処理をつなげて使えます。

---

## forEach()

`forEach()` は、要素を1つずつ処理するためのメソッドです。

```java
names.stream()
     .forEach(name -> System.out.println(name));
```

このコードでは、`names` の要素を1つずつ取り出し、表示しています。

ラムダ式の部分：

```java
name -> System.out.println(name)
```

これは、受け取った `name` を表示する処理です。

---

## メソッドチェーン

Stream APIでは、メソッドをつなげて書くことが多いです。

```java
names.stream()
     .forEach(name -> System.out.println(name));
```

このように、`.` で処理をつなげる書き方を **メソッドチェーン** と呼びます。

1行で書くこともできます。

```java
names.stream().forEach(name -> System.out.println(name));
```

ただし、処理が長くなる場合は、改行したほうが読みやすくなります。

---

## メソッド参照でさらに短く書く

前章で学んだメソッド参照を使うと、さらに短く書けます。

```java
names.stream()
     .forEach(System.out::println);
```

例：

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> names = new ArrayList<>();

        names.add("Taro");
        names.add("Hanako");
        names.add("Jiro");

        names.stream()
             .forEach(System.out::println);
    }
}
```

実行結果：

```text
Taro
Hanako
Jiro
```

`System.out::println` は、受け取った値をそのまま表示するという意味です。

---

## filter()

`filter()` は、条件に合う要素だけを残すためのメソッドです。

```java
names.stream()
     .filter(name -> name.length() >= 5)
     .forEach(System.out::println);
```

この例では、名前の長さが5文字以上のものだけを残しています。

---

## filter()の例

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> names = new ArrayList<>();

        names.add("Taro");
        names.add("Hanako");
        names.add("Jiro");
        names.add("Sakura");

        names.stream()
             .filter(name -> name.length() >= 5)
             .forEach(System.out::println);
    }
}
```

実行結果：

```text
Hanako
Sakura
```

`Taro` と `Jiro` は4文字なので、条件に合わず除外されます。

---

## filter()の条件

`filter()` には、`true` または `false` を返す条件を書きます。

```java
name -> name.length() >= 5
```

このラムダ式は、名前の長さが5以上なら `true` を返します。

`filter()` は、結果が `true` になった要素だけを残します。

---

## 数値をfilter()する

点数のリストから、80点以上の点数だけを表示してみます。

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<Integer> scores = new ArrayList<>();

        scores.add(80);
        scores.add(65);
        scores.add(90);
        scores.add(70);

        scores.stream()
              .filter(score -> score >= 80)
              .forEach(System.out::println);
    }
}
```

実行結果：

```text
80
90
```

`score -> score >= 80` が `true` になる要素だけが残ります。

---

## map()

`map()` は、要素を別の形に変換するためのメソッドです。

たとえば、名前の前に `"Mr. "` を付けたい場合に使えます。

```java
names.stream()
     .map(name -> "Mr. " + name)
     .forEach(System.out::println);
```

---

## map()の例

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> names = new ArrayList<>();

        names.add("Taro");
        names.add("Hanako");
        names.add("Jiro");

        names.stream()
             .map(name -> "Mr. " + name)
             .forEach(System.out::println);
    }
}
```

実行結果：

```text
Mr. Taro
Mr. Hanako
Mr. Jiro
```

`map()` によって、各名前が別の文字列に変換されています。

---

## 文字列を長さに変換する

`map()` を使うと、文字列を数値に変換することもできます。

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> names = new ArrayList<>();

        names.add("Taro");
        names.add("Hanako");
        names.add("Jiro");

        names.stream()
             .map(name -> name.length())
             .forEach(System.out::println);
    }
}
```

実行結果：

```text
4
6
4
```

`String` のリストを、文字数を表す `Integer` の流れに変換しています。

---

## 数値を変換する

点数に10点加算して表示してみます。

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<Integer> scores = new ArrayList<>();

        scores.add(70);
        scores.add(80);
        scores.add(90);

        scores.stream()
              .map(score -> score + 10)
              .forEach(System.out::println);
    }
}
```

実行結果：

```text
80
90
100
```

`map()` は、元の値を別の値に変換するときに使います。

---

## filter()とmap()を組み合わせる

Stream APIでは、複数の処理をつなげられます。

```java
names.stream()
     .filter(name -> name.length() >= 5)
     .map(name -> "名前: " + name)
     .forEach(System.out::println);
```

---

## 組み合わせの例

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> names = new ArrayList<>();

        names.add("Taro");
        names.add("Hanako");
        names.add("Jiro");
        names.add("Sakura");

        names.stream()
             .filter(name -> name.length() >= 5)
             .map(name -> "名前: " + name)
             .forEach(System.out::println);
    }
}
```

実行結果：

```text
名前: Hanako
名前: Sakura
```

処理の流れは次のようになります。

```text
Taro, Hanako, Jiro, Sakura
  ↓ filter
Hanako, Sakura
  ↓ map
名前: Hanako, 名前: Sakura
  ↓ forEach
表示
```

---

## collect()

`collect()` は、Streamの結果を別の形にまとめるためのメソッドです。

よく使うのは、Streamの結果を `List` に戻す処理です。

```java
List<String> result = names.stream()
                           .filter(name -> name.length() >= 5)
                           .collect(Collectors.toList());
```

`collect(Collectors.toList())` を使うには、次の `import` が必要です。

```java
import java.util.List;
import java.util.stream.Collectors;
```

---

## collect()でリストにする

```java
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> names = new ArrayList<>();

        names.add("Taro");
        names.add("Hanako");
        names.add("Jiro");
        names.add("Sakura");

        List<String> longNames = names.stream()
                                      .filter(name -> name.length() >= 5)
                                      .collect(Collectors.toList());

        System.out.println(longNames);
    }
}
```

実行結果：

```text
[Hanako, Sakura]
```

`filter()` で絞り込んだ結果を、`List` として受け取っています。

---

## 元のリストは変わらない

Stream APIの多くの処理は、元のリストを直接変更しません。

```java
List<String> longNames = names.stream()
                              .filter(name -> name.length() >= 5)
                              .collect(Collectors.toList());
```

この場合、`names` 自体はそのままです。

```java
System.out.println(names);
System.out.println(longNames);
```

例：

```java
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> names = new ArrayList<>();

        names.add("Taro");
        names.add("Hanako");
        names.add("Jiro");
        names.add("Sakura");

        List<String> longNames = names.stream()
                                      .filter(name -> name.length() >= 5)
                                      .collect(Collectors.toList());

        System.out.println(names);
        System.out.println(longNames);
    }
}
```

実行結果：

```text
[Taro, Hanako, Jiro, Sakura]
[Hanako, Sakura]
```

元の `names` は変更されていません。

---

## count()

`count()` は、Streamの要素数を数えるメソッドです。

```java
long count = names.stream()
                  .filter(name -> name.length() >= 5)
                  .count();
```

戻り値は `long` 型です。

---

## count()の例

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> names = new ArrayList<>();

        names.add("Taro");
        names.add("Hanako");
        names.add("Jiro");
        names.add("Sakura");

        long count = names.stream()
                          .filter(name -> name.length() >= 5)
                          .count();

        System.out.println(count);
    }
}
```

実行結果：

```text
2
```

5文字以上の名前は、`Hanako` と `Sakura` の2つです。

---

## anyMatch()

`anyMatch()` は、条件を満たす要素が1つでもあるかを調べます。

```java
boolean result = scores.stream()
                       .anyMatch(score -> score >= 90);
```

1つでも条件を満たせば `true` になります。

---

## anyMatch()の例

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<Integer> scores = new ArrayList<>();

        scores.add(70);
        scores.add(85);
        scores.add(95);

        boolean hasHighScore = scores.stream()
                                     .anyMatch(score -> score >= 90);

        System.out.println(hasHighScore);
    }
}
```

実行結果：

```text
true
```

`95` が90以上なので、結果は `true` になります。

---

## allMatch()

`allMatch()` は、すべての要素が条件を満たすかを調べます。

```java
boolean result = scores.stream()
                       .allMatch(score -> score >= 60);
```

すべての要素が条件を満たす場合だけ `true` になります。

---

## allMatch()の例

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<Integer> scores = new ArrayList<>();

        scores.add(70);
        scores.add(85);
        scores.add(95);

        boolean allPassed = scores.stream()
                                  .allMatch(score -> score >= 60);

        System.out.println(allPassed);
    }
}
```

実行結果：

```text
true
```

すべての点数が60点以上なので、結果は `true` です。

---

## noneMatch()

`noneMatch()` は、条件を満たす要素が1つもないかを調べます。

```java
boolean result = scores.stream()
                       .noneMatch(score -> score < 0);
```

条件を満たす要素が1つもなければ `true` になります。

---

## noneMatch()の例

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<Integer> scores = new ArrayList<>();

        scores.add(70);
        scores.add(85);
        scores.add(95);

        boolean hasNoNegative = scores.stream()
                                      .noneMatch(score -> score < 0);

        System.out.println(hasNoNegative);
    }
}
```

実行結果：

```text
true
```

負の点数が1つもないため、結果は `true` です。

---

## sorted()

`sorted()` は、要素を並び替えるためのメソッドです。

```java
scores.stream()
      .sorted()
      .forEach(System.out::println);
```

---

## sorted()の例

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<Integer> scores = new ArrayList<>();

        scores.add(90);
        scores.add(70);
        scores.add(85);

        scores.stream()
              .sorted()
              .forEach(System.out::println);
    }
}
```

実行結果：

```text
70
85
90
```

`sorted()` を使うと、自然な順番で並び替えられます。

数値なら小さい順、文字列なら辞書順になります。

---

## 文字列をsorted()する

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> names = new ArrayList<>();

        names.add("Taro");
        names.add("Hanako");
        names.add("Jiro");
        names.add("Sakura");

        names.stream()
             .sorted()
             .forEach(System.out::println);
    }
}
```

実行結果の例：

```text
Hanako
Jiro
Sakura
Taro
```

文字列の場合は、文字の並びにしたがって並び替えられます。

---

## distinct()

`distinct()` は、重複した要素を取り除くメソッドです。

```java
names.stream()
     .distinct()
     .forEach(System.out::println);
```

---

## distinct()の例

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> names = new ArrayList<>();

        names.add("Taro");
        names.add("Hanako");
        names.add("Taro");
        names.add("Jiro");

        names.stream()
             .distinct()
             .forEach(System.out::println);
    }
}
```

実行結果：

```text
Taro
Hanako
Jiro
```

2回出てきた `"Taro"` は、1回だけ表示されます。

---

## limit()

`limit()` は、先頭から指定した数だけ取り出すメソッドです。

```java
names.stream()
     .limit(3)
     .forEach(System.out::println);
```

---

## limit()の例

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> names = new ArrayList<>();

        names.add("Taro");
        names.add("Hanako");
        names.add("Jiro");
        names.add("Sakura");

        names.stream()
             .limit(2)
             .forEach(System.out::println);
    }
}
```

実行結果：

```text
Taro
Hanako
```

先頭から2件だけ表示されます。

---

## skip()

`skip()` は、先頭から指定した数だけ飛ばすメソッドです。

```java
names.stream()
     .skip(2)
     .forEach(System.out::println);
```

---

## skip()の例

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> names = new ArrayList<>();

        names.add("Taro");
        names.add("Hanako");
        names.add("Jiro");
        names.add("Sakura");

        names.stream()
             .skip(2)
             .forEach(System.out::println);
    }
}
```

実行結果：

```text
Jiro
Sakura
```

先頭の2件を飛ばして、その後の要素を表示しています。

---

## reduce()

`reduce()` は、複数の値を1つにまとめるためのメソッドです。

たとえば、数値の合計を求めることができます。

```java
int total = scores.stream()
                  .reduce(0, (a, b) -> a + b);
```

`0` は初期値です。

`(a, b) -> a + b` は、2つの値を足す処理です。

---

## reduce()で合計を求める

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<Integer> scores = new ArrayList<>();

        scores.add(80);
        scores.add(90);
        scores.add(75);

        int total = scores.stream()
                          .reduce(0, (a, b) -> a + b);

        System.out.println(total);
    }
}
```

実行結果：

```text
245
```

`80 + 90 + 75` の結果が `245` になります。

---

## mapToInt()

数値を扱う場合は、`mapToInt()` を使うと便利です。

```java
int total = scores.stream()
                  .mapToInt(score -> score)
                  .sum();
```

`sum()` を使って合計を求められます。

---

## mapToInt()で合計を求める

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<Integer> scores = new ArrayList<>();

        scores.add(80);
        scores.add(90);
        scores.add(75);

        int total = scores.stream()
                          .mapToInt(score -> score)
                          .sum();

        System.out.println(total);
    }
}
```

実行結果：

```text
245
```

`reduce()` よりも、合計を求めていることが分かりやすい書き方です。

---

## average()

`average()` を使うと、平均を求められます。

```java
double average = scores.stream()
                       .mapToInt(score -> score)
                       .average()
                       .orElse(0);
```

`average()` の結果は、値がない可能性もあるため、`orElse(0)` を使っています。

---

## average()の例

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<Integer> scores = new ArrayList<>();

        scores.add(80);
        scores.add(90);
        scores.add(75);

        double average = scores.stream()
                               .mapToInt(score -> score)
                               .average()
                               .orElse(0);

        System.out.println(average);
    }
}
```

実行結果：

```text
81.66666666666667
```

`orElse(0)` は、平均を求められなかった場合に `0` を使うという意味です。

---

## max()

`max()` を使うと、最大値を求められます。

```java
int max = scores.stream()
                .mapToInt(score -> score)
                .max()
                .orElse(0);
```

---

## max()の例

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<Integer> scores = new ArrayList<>();

        scores.add(80);
        scores.add(90);
        scores.add(75);

        int max = scores.stream()
                        .mapToInt(score -> score)
                        .max()
                        .orElse(0);

        System.out.println(max);
    }
}
```

実行結果：

```text
90
```

---

## min()

`min()` を使うと、最小値を求められます。

```java
int min = scores.stream()
                .mapToInt(score -> score)
                .min()
                .orElse(0);
```

---

## min()の例

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<Integer> scores = new ArrayList<>();

        scores.add(80);
        scores.add(90);
        scores.add(75);

        int min = scores.stream()
                        .mapToInt(score -> score)
                        .min()
                        .orElse(0);

        System.out.println(min);
    }
}
```

実行結果：

```text
75
```

---

## オブジェクトのリストをStreamで扱う

自分で作ったクラスのリストにも、Stream APIを使えます。

```java
ArrayList<Student> students = new ArrayList<>();
```

学生の点数で絞り込んだり、名前だけ取り出したりできます。

---

## Studentクラスの例

```java
class Student {
    String name;
    int score;

    Student(String name, int score) {
        this.name = name;
        this.score = score;
    }
}
```

この `Student` クラスを使って、Stream APIを試してみます。

---

## 点数で絞り込む

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<Student> students = new ArrayList<>();

        students.add(new Student("Taro", 80));
        students.add(new Student("Hanako", 95));
        students.add(new Student("Jiro", 70));

        students.stream()
                .filter(student -> student.score >= 80)
                .forEach(student -> System.out.println(student.name));
    }
}

class Student {
    String name;
    int score;

    Student(String name, int score) {
        this.name = name;
        this.score = score;
    }
}
```

実行結果：

```text
Taro
Hanako
```

`student.score >= 80` で、80点以上の学生だけを残しています。

---

## 名前だけを取り出す

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<Student> students = new ArrayList<>();

        students.add(new Student("Taro", 80));
        students.add(new Student("Hanako", 95));
        students.add(new Student("Jiro", 70));

        students.stream()
                .map(student -> student.name)
                .forEach(System.out::println);
    }
}

class Student {
    String name;
    int score;

    Student(String name, int score) {
        this.name = name;
        this.score = score;
    }
}
```

実行結果：

```text
Taro
Hanako
Jiro
```

`map(student -> student.name)` によって、`Student` から名前だけを取り出しています。

---

## 80点以上の学生名をリストにする

```java
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        ArrayList<Student> students = new ArrayList<>();

        students.add(new Student("Taro", 80));
        students.add(new Student("Hanako", 95));
        students.add(new Student("Jiro", 70));

        List<String> names = students.stream()
                                     .filter(student -> student.score >= 80)
                                     .map(student -> student.name)
                                     .collect(Collectors.toList());

        System.out.println(names);
    }
}

class Student {
    String name;
    int score;

    Student(String name, int score) {
        this.name = name;
        this.score = score;
    }
}
```

実行結果：

```text
[Taro, Hanako]
```

処理の流れは次のとおりです。

```text
学生一覧
  ↓ filter
80点以上の学生
  ↓ map
名前だけ
  ↓ collect
リストにまとめる
```

---

## Stream APIの処理の種類

Stream APIの処理は、大きく2種類に分けられます。

| 種類 | 説明 | 例 |
|---|---|---|
| 中間操作 | Streamを返し、処理をつなげられる | `filter()`, `map()`, `sorted()` |
| 終端操作 | 最後に結果を出す | `forEach()`, `collect()`, `count()` |

---

## 中間操作

中間操作は、Streamの途中で行う処理です。

```java
filter()
map()
sorted()
distinct()
limit()
skip()
```

中間操作は、結果としてまたStreamを返します。

そのため、次のように処理をつなげられます。

```java
names.stream()
     .filter(name -> name.length() >= 5)
     .map(name -> "名前: " + name)
     .forEach(System.out::println);
```

---

## 終端操作

終端操作は、Streamの最後に行う処理です。

```java
forEach()
collect()
count()
anyMatch()
allMatch()
noneMatch()
reduce()
```

終端操作を実行すると、Streamの処理が実際に行われます。

---

## Streamは使い回せない

Streamは、一度終端操作を行うと使い回せません。

```java
var stream = names.stream();

stream.forEach(System.out::println);
stream.count(); // エラー
```

Streamをもう一度使いたい場合は、再度 `stream()` を呼び出します。

```java
names.stream().forEach(System.out::println);
long count = names.stream().count();
```

---

## Stream APIのメリット

Stream APIには、次のようなメリットがあります。

| メリット | 説明 |
|---|---|
| 処理の流れが読みやすい | 絞り込み、変換、出力を順番に書ける |
| コードが短くなる | for文より簡潔に書ける場合がある |
| ラムダ式と相性がよい | 条件や変換処理をその場で書ける |
| コレクション処理が得意 | リストの絞り込みや集計を書きやすい |

---

## Stream APIを使いすぎない

Stream APIは便利ですが、何でもStreamで書けばよいわけではありません。

シンプルなfor文のほうが分かりやすい場合もあります。

たとえば、複雑な条件分岐や途中で細かく状態を変える処理は、for文のほうが読みやすいことがあります。

Stream APIは、次のような処理に向いています。

- 絞り込み
- 変換
- 集計
- 条件チェック
- 一覧表示

読みやすさを大切にして使い分けましょう。

---

## よくあるエラー

| エラー | 原因 | 解決方法 |
|---|---|---|
| `cannot find symbol` | `Collectors` のimport忘れ | `import java.util.stream.Collectors;` を書く |
| `incompatible types` | `map()` 後の型が想定と違う | Streamの型の変化を確認する |
| `stream has already been operated upon or closed` | Streamを使い回している | もう一度 `stream()` を呼ぶ |
| `NullPointerException` | リストや要素が `null` | `null` でないか確認する |
| `NoSuchElementException` | 空のStreamから値を直接取り出した | `orElse()` などを使う |
| 結果が表示されない | 終端操作を書いていない | `forEach()` や `collect()` を書く |

---


## まとめ

- Stream APIは、コレクションのデータを流れるように処理する仕組み
- `stream()` でコレクションからStreamを作る
- `forEach()` で要素を1つずつ処理する
- `filter()` で条件に合う要素だけを残す
- `map()` で要素を別の形に変換する
- `collect(Collectors.toList())` でStreamの結果をリストにまとめられる
- `count()` で要素数を数えられる
- `anyMatch()` は条件を満たす要素が1つでもあるか調べる
- `allMatch()` はすべての要素が条件を満たすか調べる
- `sorted()` で並び替えできる
- `distinct()` で重複を取り除ける
- `mapToInt()`、`sum()`、`average()` で数値の集計ができる
- Stream APIはラムダ式と組み合わせて使うことが多い
- 複雑すぎる処理は、無理にStreamで書かずfor文と使い分ける