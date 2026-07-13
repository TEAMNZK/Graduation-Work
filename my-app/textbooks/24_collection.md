# 第24章 コレクション

## 学習目標

- コレクションとは何かを理解する
- `ArrayList` を使って複数の値を管理できる
- 配列と `ArrayList` の違いを理解する
- `HashMap` を使ってキーと値を管理できる
- `HashSet` を使って重複しない値を管理できる
- 拡張for文でコレクションを処理できる

---

## コレクションとは

コレクションとは、複数のデータをまとめて扱うための仕組みです。

これまで、複数の値を扱うために配列を使いました。

```java
int[] scores = {80, 90, 75};
```

配列は便利ですが、要素数をあとから自由に増やしたり減らしたりするのは苦手です。

そこで使うのがコレクションです。

Javaには、複数のデータを扱うための便利なクラスが用意されています。

代表的なものは次のとおりです。

| クラス | 特徴 |
|---|---|
| `ArrayList` | 順番にデータを管理する |
| `HashMap` | キーと値の組み合わせで管理する |
| `HashSet` | 重複しないデータを管理する |

---

## 配列の弱点

配列は、作成するときに要素数を決めます。

```java
String[] names = new String[3];
```

この配列には、3つの値しか入れられません。

```java
names[0] = "Taro";
names[1] = "Hanako";
names[2] = "Jiro";
```

あとから4人目を追加しようとしても、そのままでは追加できません。

```java
names[3] = "Sakura"; // エラー
```

配列は要素数が固定されているため、あとから増やすのが苦手です。

---

## ArrayListとは

`ArrayList` は、複数の値を順番に管理するためのクラスです。

配列と似ていますが、あとから要素を追加したり削除したりできます。

`ArrayList` を使うには、次の `import` が必要です。

```java
import java.util.ArrayList;
```

---

## ArrayListの基本形

`ArrayList` は次のように作成します。

```java
ArrayList<型> 変数名 = new ArrayList<>();
```

例：

```java
ArrayList<String> names = new ArrayList<>();
```

これは、文字列を複数管理できる `ArrayList` です。

`<String>` は、このリストに `String` 型の値を入れるという意味です。

> `<String>` のような書き方はジェネリクスと呼ばれます。  
> 詳しくは次の章で学びます。

---

## ArrayListに値を追加する

`ArrayList` に値を追加するには、`add()` を使います。

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> names = new ArrayList<>();

        names.add("Taro");
        names.add("Hanako");
        names.add("Jiro");

        System.out.println(names);
    }
}
```

実行結果：

```text
[Taro, Hanako, Jiro]
```

`add()` を使うと、リストの末尾に値が追加されます。

---

## ArrayListの要素を取り出す

`ArrayList` の要素を取り出すには、`get()` を使います。

```java
names.get(0)
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

        System.out.println(names.get(0));
        System.out.println(names.get(1));
        System.out.println(names.get(2));
    }
}
```

実行結果：

```text
Taro
Hanako
Jiro
```

`ArrayList` も配列と同じように、インデックスは `0` から始まります。

---

## ArrayListのサイズを取得する

`ArrayList` の要素数を取得するには、`size()` を使います。

```java
names.size()
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

        System.out.println(names.size());
    }
}
```

実行結果：

```text
3
```

配列では `length` を使いました。

```java
scores.length
```

`ArrayList` では `size()` を使います。

```java
names.size()
```

---

## ArrayListをfor文で処理する

`ArrayList` は、通常の `for` 文で処理できます。

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> names = new ArrayList<>();

        names.add("Taro");
        names.add("Hanako");
        names.add("Jiro");

        for (int i = 0; i < names.size(); i++) {
            System.out.println(names.get(i));
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

`names.size()` を使うことで、要素数に合わせて繰り返せます。

---

## 拡張for文で処理する

`ArrayList` は、拡張for文でも処理できます。

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

要素を順番に取り出すだけなら、拡張for文がシンプルです。

---

## 要素を変更する

`ArrayList` の要素を変更するには、`set()` を使います。

```java
names.set(1, "Sakura");
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

        names.set(1, "Sakura");

        System.out.println(names);
    }
}
```

実行結果：

```text
[Taro, Sakura, Jiro]
```

インデックス `1` の `"Hanako"` が `"Sakura"` に変更されました。

---

## 要素を削除する

`ArrayList` の要素を削除するには、`remove()` を使います。

```java
names.remove(1);
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

        names.remove(1);

        System.out.println(names);
    }
}
```

実行結果：

```text
[Taro, Jiro]
```

インデックス `1` の `"Hanako"` が削除されました。

---

## 値を指定して削除する

`remove()` では、値を指定して削除することもできます。

```java
names.remove("Hanako");
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

        names.remove("Hanako");

        System.out.println(names);
    }
}
```

実行結果：

```text
[Taro, Jiro]
```

---

## 要素が含まれているか調べる

`ArrayList` に特定の値が含まれているか調べるには、`contains()` を使います。

```java
names.contains("Taro")
```

例：

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> names = new ArrayList<>();

        names.add("Taro");
        names.add("Hanako");

        if (names.contains("Taro")) {
            System.out.println("Taroが含まれています");
        } else {
            System.out.println("Taroは含まれていません");
        }
    }
}
```

実行結果：

```text
Taroが含まれています
```

`contains()` の結果は `true` または `false` です。

---

## ArrayListと数値

`ArrayList` に整数を入れたい場合は、`Integer` を使います。

```java
ArrayList<Integer> numbers = new ArrayList<>();
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

`int` ではなく `Integer` と書く点に注意しましょう。

---

## intではなくIntegerを使う理由

`ArrayList<int>` のようには書けません。

```java
ArrayList<int> numbers = new ArrayList<>(); // エラー
```

`ArrayList` には、基本データ型ではなく参照型を指定します。

そのため、`int` の代わりに `Integer` を使います。

| 基本データ型 | 対応する型 |
|---|---|
| `int` | `Integer` |
| `double` | `Double` |
| `char` | `Character` |
| `boolean` | `Boolean` |

このような型をラッパークラスと呼びます。

---

## ArrayListで合計を求める

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<Integer> scores = new ArrayList<>();

        scores.add(80);
        scores.add(90);
        scores.add(75);

        int total = 0;

        for (int score : scores) {
            total += score;
        }

        System.out.println("合計: " + total);
    }
}
```

実行結果：

```text
合計: 245
```

`ArrayList<Integer>` の値も、通常の数値のように計算できます。

---

## ArrayListと配列の違い

| 比較 | 配列 | ArrayList |
|---|---|---|
| 要素数 | 固定 | 追加・削除できる |
| 長さの取得 | `length` | `size()` |
| 要素の取得 | `array[0]` | `list.get(0)` |
| 要素の変更 | `array[0] = 値` | `list.set(0, 値)` |
| 要素の追加 | 苦手 | `add()` |
| 要素の削除 | 苦手 | `remove()` |

要素数が決まっている場合は配列でも十分です。

あとから追加や削除をしたい場合は、`ArrayList` が便利です。

---

## HashMapとは

`HashMap` は、キーと値の組み合わせでデータを管理するクラスです。

たとえば、名前と点数を対応させたい場合に使えます。

```text
Taro   -> 80
Hanako -> 90
Jiro   -> 75
```

`HashMap` を使うには、次の `import` が必要です。

```java
import java.util.HashMap;
```

---

## HashMapの基本形

`HashMap` は次のように作成します。

```java
HashMap<キーの型, 値の型> 変数名 = new HashMap<>();
```

例：

```java
HashMap<String, Integer> scores = new HashMap<>();
```

これは、`String` のキーと `Integer` の値を管理する `HashMap` です。

---

## HashMapに値を追加する

`HashMap` に値を追加するには、`put()` を使います。

```java
import java.util.HashMap;

public class Main {
    public static void main(String[] args) {
        HashMap<String, Integer> scores = new HashMap<>();

        scores.put("Taro", 80);
        scores.put("Hanako", 90);
        scores.put("Jiro", 75);

        System.out.println(scores);
    }
}
```

実行結果の例：

```text
{Jiro=75, Hanako=90, Taro=80}
```

`HashMap` は順番を保証しません。

そのため、表示される順番が追加した順番と違うことがあります。

---

## HashMapの値を取り出す

`HashMap` の値を取り出すには、`get()` を使います。

```java
scores.get("Taro")
```

例：

```java
import java.util.HashMap;

public class Main {
    public static void main(String[] args) {
        HashMap<String, Integer> scores = new HashMap<>();

        scores.put("Taro", 80);
        scores.put("Hanako", 90);

        System.out.println(scores.get("Taro"));
    }
}
```

実行結果：

```text
80
```

キー `"Taro"` に対応する値 `80` が取り出されます。

---

## キーが存在するか調べる

キーが含まれているか調べるには、`containsKey()` を使います。

```java
scores.containsKey("Taro")
```

例：

```java
import java.util.HashMap;

public class Main {
    public static void main(String[] args) {
        HashMap<String, Integer> scores = new HashMap<>();

        scores.put("Taro", 80);

        if (scores.containsKey("Taro")) {
            System.out.println("Taroの点数: " + scores.get("Taro"));
        } else {
            System.out.println("Taroは登録されていません");
        }
    }
}
```

実行結果：

```text
Taroの点数: 80
```

---

## HashMapの値を変更する

同じキーで `put()` すると、値が上書きされます。

```java
import java.util.HashMap;

public class Main {
    public static void main(String[] args) {
        HashMap<String, Integer> scores = new HashMap<>();

        scores.put("Taro", 80);
        scores.put("Taro", 95);

        System.out.println(scores.get("Taro"));
    }
}
```

実行結果：

```text
95
```

最初の `80` が、あとから指定した `95` に変更されました。

---

## HashMapから削除する

`HashMap` からデータを削除するには、`remove()` を使います。

```java
scores.remove("Taro");
```

例：

```java
import java.util.HashMap;

public class Main {
    public static void main(String[] args) {
        HashMap<String, Integer> scores = new HashMap<>();

        scores.put("Taro", 80);
        scores.put("Hanako", 90);

        scores.remove("Taro");

        System.out.println(scores);
    }
}
```

実行結果の例：

```text
{Hanako=90}
```

---

## HashMapを繰り返し処理する

`HashMap` のキーを順番に取り出すには、`keySet()` を使います。

```java
import java.util.HashMap;

public class Main {
    public static void main(String[] args) {
        HashMap<String, Integer> scores = new HashMap<>();

        scores.put("Taro", 80);
        scores.put("Hanako", 90);
        scores.put("Jiro", 75);

        for (String name : scores.keySet()) {
            int score = scores.get(name);
            System.out.println(name + ": " + score);
        }
    }
}
```

実行結果の例：

```text
Jiro: 75
Hanako: 90
Taro: 80
```

`HashMap` は順番を保証しないため、表示順は変わることがあります。

---

## HashSetとは

`HashSet` は、重複しない値を管理するためのクラスです。

同じ値を追加しても、1つだけ保存されます。

`HashSet` を使うには、次の `import` が必要です。

```java
import java.util.HashSet;
```

---

## HashSetの基本例

```java
import java.util.HashSet;

public class Main {
    public static void main(String[] args) {
        HashSet<String> names = new HashSet<>();

        names.add("Taro");
        names.add("Hanako");
        names.add("Taro");

        System.out.println(names);
    }
}
```

実行結果の例：

```text
[Hanako, Taro]
```

`"Taro"` を2回追加していますが、保存されるのは1つだけです。

---

## HashSetの特徴

`HashSet` には、次のような特徴があります。

| 特徴 | 説明 |
|---|---|
| 重複しない | 同じ値は1つだけ保存される |
| 順番を保証しない | 追加した順番通りとは限らない |
| 検索がしやすい | `contains()` で存在確認できる |

---

## HashSetで存在確認する

```java
import java.util.HashSet;

public class Main {
    public static void main(String[] args) {
        HashSet<String> names = new HashSet<>();

        names.add("Taro");
        names.add("Hanako");

        if (names.contains("Taro")) {
            System.out.println("Taroが含まれています");
        }
    }
}
```

実行結果：

```text
Taroが含まれています
```

---

## HashSetを繰り返し処理する

```java
import java.util.HashSet;

public class Main {
    public static void main(String[] args) {
        HashSet<String> names = new HashSet<>();

        names.add("Taro");
        names.add("Hanako");
        names.add("Jiro");

        for (String name : names) {
            System.out.println(name);
        }
    }
}
```

実行結果の例：

```text
Jiro
Hanako
Taro
```

`HashSet` も順番を保証しません。

表示順が追加順と違うことがあります。

---

## List, Map, Setの違い

Javaのコレクションには、いくつかの種類があります。

| 種類 | 代表クラス | 特徴 |
|---|---|---|
| `List` | `ArrayList` | 順番に並べて管理する |
| `Map` | `HashMap` | キーと値で管理する |
| `Set` | `HashSet` | 重複しない値を管理する |

ざっくり使い分けると、次のようになります。

| やりたいこと | 使うもの |
|---|---|
| 名前一覧を管理したい | `ArrayList` |
| 名前と点数を対応させたい | `HashMap` |
| 重複しない名前だけ管理したい | `HashSet` |

---

## ArrayListが向いている場面

`ArrayList` は、順番にデータを管理したいときに向いています。

例：

- 点数一覧
- 名前一覧
- 商品一覧
- 入力された履歴

```java
ArrayList<String> names = new ArrayList<>();
```

追加した順番を使いたい場合は、`ArrayList` が便利です。

---

## HashMapが向いている場面

`HashMap` は、キーから値を取り出したいときに向いています。

例：

- 名前から点数を取り出す
- 商品コードから商品名を取り出す
- ユーザーIDからユーザー情報を取り出す

```java
HashMap<String, Integer> scores = new HashMap<>();
```

「このキーに対応する値は何か」を扱いたいときに便利です。

---

## HashSetが向いている場面

`HashSet` は、重複をなくしたいときに向いています。

例：

- 登録済みユーザー名
- 一度出た単語一覧
- 重複しないタグ一覧

```java
HashSet<String> tags = new HashSet<>();
```

同じ値を複数持たせたくない場合に便利です。

---

## よくあるエラー

| エラー | 原因 | 解決方法 |
|---|---|---|
| `cannot find symbol` | `import` 忘れ、または名前のミス | `import java.util.ArrayList;` などを書く |
| `IndexOutOfBoundsException` | 存在しないインデックスを指定した | `size()` とインデックスを確認する |
| `NullPointerException` | `null` のコレクションを使った | `new ArrayList<>()` などで作成する |
| `ClassCastException` | 型の扱いを間違えた | コレクションに入れる型をそろえる |
| 値が上書きされる | `HashMap` で同じキーを使った | キーが重複していないか確認する |
| 順番が違う | `HashMap` や `HashSet` を使っている | 順番が必要なら `ArrayList` を使う |

---


## まとめ

- コレクションは、複数のデータをまとめて扱うための仕組み
- `ArrayList` は、順番にデータを管理する
- `ArrayList` では `add()` で追加、`get()` で取得する
- `ArrayList` の要素数は `size()` で取得する
- `ArrayList` はあとから要素を追加・削除できる
- 数値を入れる場合は `Integer` や `Double` を使う
- `HashMap` は、キーと値の組み合わせでデータを管理する
- `HashMap` では `put()` で登録、`get()` で取得する
- `HashSet` は、重複しない値を管理する
- 順番が必要なら `ArrayList`
- キーで値を取り出したいなら `HashMap`
- 重複をなくしたいなら `HashSet`