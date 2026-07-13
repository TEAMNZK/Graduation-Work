# 第3章 Hello World

## 学習目標

- Javaの基本的なプログラムを書ける
- Javaファイルを作成できる
- プログラムをコンパイルして実行できる
- `main` メソッドの役割を理解する

---

## はじめてのJavaプログラム

この章では、Javaで最初のプログラムを書きます。

画面に次の文字を表示するプログラムを作成します。

```text
Hello, World!
```

プログラミング学習では、最初に文字を表示するプログラムを書くことがよくあります。

このような最初のプログラムを **Hello World** と呼びます。

---

## Javaファイルを作成する

まず、作業フォルダの中に次のファイルを作成します。

```text
Main.java
```

Javaのファイル名は、基本的にクラス名と同じにします。

今回のクラス名は `Main` なので、ファイル名は `Main.java` です。

---

## プログラムを書く

`Main.java` に次のコードを書きます。

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

---

## プログラムをコンパイルする

Javaのプログラムは、そのままでは実行できません。

まず、コンパイルという作業を行います。

ターミナルで次のコマンドを実行します。

```bash
javac Main.java
```

エラーが出なければ成功です。

コンパイルに成功すると、次のファイルが作成されます。

```text
Main.class
```

---

## プログラムを実行する

次に、コンパイルしたプログラムを実行します。

```bash
java Main
```

次のように表示されれば成功です。

```text
Hello, World!
```

---

## コードの意味

ここからは、書いたコードの意味を少しずつ確認します。

---

### `public class Main`

```java
public class Main {
}
```

これは、`Main` という名前のクラスを定義しています。

Javaでは、プログラムを **クラス** という単位で書きます。

今回は `Main` というクラスを作りました。

> クラスについては、後の章で詳しく学びます。  
> この時点では「Javaのプログラムを書くための入れ物」と考えておけば大丈夫です。

---

### `main` メソッド

```java
public static void main(String[] args) {
}
```

これは、プログラムの開始地点です。

Javaでは、プログラムを実行すると、まず `main` メソッドが呼び出されます。

つまり、Javaプログラムはここから動き始めます。

---

### `System.out.println`

```java
System.out.println("Hello, World!");
```

これは、画面に文字を表示する命令です。

`println` は、文字を表示したあとに改行します。

今回の場合、画面には次の文字が表示されます。

```text
Hello, World!
```

---

## セミコロン

Javaでは、多くの命令の最後に `;` を書きます。

```java
System.out.println("Hello, World!");
```

この `;` を忘れるとエラーになります。

---

## 文字列

Javaでは、文字を表示するときに `"` で囲みます。

```java
"Hello, World!"
```

このように `"` で囲まれた文字のまとまりを **文字列** と呼びます。

---

## よくあるエラー

| エラー | 原因 | 解決方法 |
|---|---|---|
| `';' expected` | セミコロン忘れ | 行末に `;` を付ける |
| `class Main is public, should be declared in a file named Main.java` | クラス名とファイル名が違う | ファイル名を `Main.java` にする |
| `cannot find symbol` | 命令や名前の入力ミス | スペルを確認する |
| `Could not find or load main class Main` | 実行する場所やクラス名が違う | `Main.class` がある場所で `java Main` を実行する |

---

## まとめ

- Javaのファイルは `.java` で作成する
- `javac` コマンドでコンパイルする
- `java` コマンドで実行する
- `main` メソッドはプログラムの開始地点
- `System.out.println()` で文字を表示できる
- 命令の最後には `;` を書く