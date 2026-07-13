# 第23章 ファイル入出力

## 学習目標

- ファイル入出力とは何かを理解する
- テキストファイルに文字を書き込める
- テキストファイルから文字を読み込める
- `FileWriter` と `FileReader` の基本を理解する
- `BufferedReader` を使って1行ずつ読み込める
- `try-with-resources` の使い方を理解する
- ファイル操作で発生する例外を処理できる

---

## ファイル入出力とは

ファイル入出力とは、プログラムからファイルを読み書きすることです。

これまでのプログラムでは、結果を画面に表示していました。

```java
System.out.println("Hello");
```

しかし、画面に表示した内容は、プログラムを終了すると基本的に残りません。

ファイルに書き込むことで、データを保存できます。

たとえば、次のようなことができます。

- メモをファイルに保存する
- 点数一覧をファイルに保存する
- ファイルから設定を読み込む
- ログを記録する
- CSVファイルを読み込む

---

## ファイルに書き込む

Javaでファイルに文字を書き込むには、`FileWriter` を使えます。

```java
import java.io.FileWriter;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        try {
            FileWriter writer = new FileWriter("sample.txt");

            writer.write("Hello, Java!");
            writer.close();

            System.out.println("ファイルに書き込みました");
        } catch (IOException e) {
            System.out.println("ファイル書き込み中にエラーが発生しました");
        }
    }
}
```

実行すると、同じフォルダに次のファイルが作成されます。

```text
sample.txt
```

ファイルの中身：

```text
Hello, Java!
```

---

## FileWriterとは

`FileWriter` は、テキストファイルに文字を書き込むためのクラスです。

```java
FileWriter writer = new FileWriter("sample.txt");
```

このコードは、`sample.txt` というファイルに書き込む準備をしています。

ファイルが存在しない場合は、新しく作成されます。

---

## writeメソッド

ファイルに文字を書き込むには、`write()` を使います。

```java
writer.write("Hello, Java!");
```

このコードは、`sample.txt` に `Hello, Java!` を書き込みます。

---

## closeメソッド

ファイルを使い終わったら、`close()` で閉じます。

```java
writer.close();
```

ファイルを閉じることで、書き込み内容が正しく保存されます。

ファイル操作では、使い終わったリソースを閉じることが大切です。

---

## IOException

ファイル操作では、`IOException` が発生する可能性があります。

たとえば、次のような場合です。

- ファイルを作成できない
- ファイルに書き込めない
- ファイルが見つからない
- 読み込み中に問題が発生した

そのため、ファイル操作は `try-catch` で囲みます。

```java
try {
    FileWriter writer = new FileWriter("sample.txt");
    writer.write("Hello");
    writer.close();
} catch (IOException e) {
    System.out.println("エラーが発生しました");
}
```

---

## 複数行を書き込む

複数行を書き込みたい場合は、改行文字 `\n` を使います。

```java
import java.io.FileWriter;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        try {
            FileWriter writer = new FileWriter("sample.txt");

            writer.write("1行目\n");
            writer.write("2行目\n");
            writer.write("3行目\n");

            writer.close();

            System.out.println("書き込み完了");
        } catch (IOException e) {
            System.out.println("エラーが発生しました");
        }
    }
}
```

ファイルの中身：

```text
1行目
2行目
3行目
```

`\n` は改行を表します。

---

## 上書きに注意

`FileWriter` は、通常の使い方ではファイルの内容を上書きします。

```java
FileWriter writer = new FileWriter("sample.txt");
```

すでに `sample.txt` が存在していた場合、元の内容は消えて新しい内容になります。

---

## 追記する

既存のファイルに追記したい場合は、`FileWriter` の第2引数に `true` を指定します。

```java
FileWriter writer = new FileWriter("sample.txt", true);
```

例：

```java
import java.io.FileWriter;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        try {
            FileWriter writer = new FileWriter("sample.txt", true);

            writer.write("追加の行です\n");

            writer.close();

            System.out.println("追記しました");
        } catch (IOException e) {
            System.out.println("エラーが発生しました");
        }
    }
}
```

`true` を指定すると、既存の内容を残したまま末尾に追加されます。

---

## ファイルを読み込む

ファイルから文字を読み込むには、`FileReader` を使えます。

```java
import java.io.FileReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        try {
            FileReader reader = new FileReader("sample.txt");

            int data = reader.read();

            System.out.println((char) data);

            reader.close();
        } catch (IOException e) {
            System.out.println("ファイル読み込み中にエラーが発生しました");
        }
    }
}
```

`read()` は、ファイルから1文字分のデータを読み込みます。

---

## readメソッド

`read()` は、1文字を読み込み、その文字コードを `int` として返します。

```java
int data = reader.read();
```

文字として表示したい場合は、`char` に変換します。

```java
System.out.println((char) data);
```

---

## ファイル全体を1文字ずつ読む

`read()` は、読み込む文字がなくなると `-1` を返します。

これを利用して、ファイル全体を読み込めます。

```java
import java.io.FileReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        try {
            FileReader reader = new FileReader("sample.txt");

            int data;

            while ((data = reader.read()) != -1) {
                System.out.print((char) data);
            }

            reader.close();
        } catch (IOException e) {
            System.out.println("ファイル読み込み中にエラーが発生しました");
        }
    }
}
```

実行例：

```text
Hello, Java!
```

`while ((data = reader.read()) != -1)` は、  
読み込める文字がある間、処理を繰り返すという意味です。

---

## BufferedReader

ファイルを1行ずつ読み込みたい場合は、`BufferedReader` を使うと便利です。

```java
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        try {
            BufferedReader reader = new BufferedReader(new FileReader("sample.txt"));

            String line = reader.readLine();

            System.out.println(line);

            reader.close();
        } catch (IOException e) {
            System.out.println("ファイル読み込み中にエラーが発生しました");
        }
    }
}
```

`BufferedReader` を使うと、`readLine()` で1行ずつ読み込めます。

---

## readLineメソッド

`readLine()` は、ファイルから1行読み込みます。

```java
String line = reader.readLine();
```

読み込む行がなくなると、`null` を返します。

---

## ファイルを1行ずつすべて読み込む

```java
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        try {
            BufferedReader reader = new BufferedReader(new FileReader("sample.txt"));

            String line;

            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }

            reader.close();
        } catch (IOException e) {
            System.out.println("ファイル読み込み中にエラーが発生しました");
        }
    }
}
```

ファイルの中身：

```text
Taro
Hanako
Jiro
```

実行結果：

```text
Taro
Hanako
Jiro
```

`readLine()` が `null` になるまで、1行ずつ読み込んでいます。

---

## try-with-resources

ファイル操作では、使い終わったあとに `close()` が必要です。

しかし、`close()` を書き忘れることがあります。

そこで便利なのが **try-with-resources** です。

```java
try (リソースを作成する処理) {
    処理
} catch (例外型 e) {
    例外が発生したときの処理
}
```

try-with-resources を使うと、処理が終わったあとに自動で `close()` されます。

---

## try-with-resourcesで書き込む

```java
import java.io.FileWriter;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        try (FileWriter writer = new FileWriter("sample.txt")) {
            writer.write("Hello, Java!");

            System.out.println("書き込み完了");
        } catch (IOException e) {
            System.out.println("ファイル書き込み中にエラーが発生しました");
        }
    }
}
```

この書き方では、`writer.close();` を自分で書く必要がありません。

`try` の処理が終わると、自動的にファイルが閉じられます。

---

## try-with-resourcesで読み込む

```java
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        try (BufferedReader reader = new BufferedReader(new FileReader("sample.txt"))) {
            String line;

            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
        } catch (IOException e) {
            System.out.println("ファイル読み込み中にエラーが発生しました");
        }
    }
}
```

こちらも `reader.close();` は不要です。

ファイル操作では、try-with-resources を使う書き方がよく使われます。

---

## ファイルに点数を保存する

配列に入っている点数をファイルに保存してみます。

```java
import java.io.FileWriter;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        int[] scores = {80, 90, 75};

        try (FileWriter writer = new FileWriter("scores.txt")) {
            for (int score : scores) {
                writer.write(score + "\n");
            }

            System.out.println("点数を保存しました");
        } catch (IOException e) {
            System.out.println("保存中にエラーが発生しました");
        }
    }
}
```

`scores.txt` の中身：

```text
80
90
75
```

---

## ファイルから点数を読み込む

次に、`scores.txt` から点数を読み込みます。

```java
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        try (BufferedReader reader = new BufferedReader(new FileReader("scores.txt"))) {
            String line;

            while ((line = reader.readLine()) != null) {
                int score = Integer.parseInt(line);

                System.out.println(score);
            }
        } catch (IOException e) {
            System.out.println("読み込み中にエラーが発生しました");
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

ファイルから読み込んだ内容は文字列です。

そのため、整数として使いたい場合は `Integer.parseInt()` で変換します。

---

## 読み込んだ点数の合計を求める

```java
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        int total = 0;

        try (BufferedReader reader = new BufferedReader(new FileReader("scores.txt"))) {
            String line;

            while ((line = reader.readLine()) != null) {
                int score = Integer.parseInt(line);
                total += score;
            }

            System.out.println("合計: " + total);
        } catch (IOException e) {
            System.out.println("読み込み中にエラーが発生しました");
        }
    }
}
```

`scores.txt`：

```text
80
90
75
```

実行結果：

```text
合計: 245
```

---

## NumberFormatExceptionにも注意する

ファイルの中身が数値とは限りません。

たとえば、`scores.txt` に次のような内容があるとします。

```text
80
abc
75
```

この場合、`Integer.parseInt("abc")` で `NumberFormatException` が発生します。

---

## 複数の例外を処理する

```java
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        int total = 0;

        try (BufferedReader reader = new BufferedReader(new FileReader("scores.txt"))) {
            String line;

            while ((line = reader.readLine()) != null) {
                int score = Integer.parseInt(line);
                total += score;
            }

            System.out.println("合計: " + total);
        } catch (IOException e) {
            System.out.println("ファイル読み込み中にエラーが発生しました");
        } catch (NumberFormatException e) {
            System.out.println("数値に変換できないデータがあります");
        }
    }
}
```

ファイル操作では、ファイルの読み込みエラーだけでなく、  
読み込んだデータの形式にも注意が必要です。

---

## ファイルが存在しない場合

存在しないファイルを読み込もうとすると、例外が発生します。

```java
import java.io.FileReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        try {
            FileReader reader = new FileReader("not_found.txt");

            reader.close();
        } catch (IOException e) {
            System.out.println("ファイルが見つかりません");
        }
    }
}
```

実行例：

```text
ファイルが見つかりません
```

ファイルを読み込む場合は、そのファイルが存在するかどうかに注意しましょう。

---

## Fileクラス

`File` クラスを使うと、ファイルが存在するかどうかを確認できます。

```java
import java.io.File;

public class Main {
    public static void main(String[] args) {
        File file = new File("sample.txt");

        if (file.exists()) {
            System.out.println("ファイルは存在します");
        } else {
            System.out.println("ファイルは存在しません");
        }
    }
}
```

`exists()` は、ファイルが存在する場合に `true` を返します。

---

## ファイル名とパス

ファイル名だけを指定した場合、そのファイルはプログラムを実行している場所を基準に扱われます。

```java
new FileWriter("sample.txt")
```

これは、実行しているフォルダに `sample.txt` を作成します。

フォルダを指定することもできます。

```java
new FileWriter("data/sample.txt")
```

この場合、`data` フォルダの中に `sample.txt` を作成します。

ただし、`data` フォルダが存在しない場合はエラーになることがあります。

---

## CSVファイルとは

CSVファイルとは、データをカンマ `,` で区切ったテキストファイルです。

例：

```csv
Taro,80
Hanako,90
Jiro,75
```

表のようなデータを保存するときによく使われます。

---

## CSVファイルを書き込む

```java
import java.io.FileWriter;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        try (FileWriter writer = new FileWriter("students.csv")) {
            writer.write("Taro,80\n");
            writer.write("Hanako,90\n");
            writer.write("Jiro,75\n");

            System.out.println("CSVを書き込みました");
        } catch (IOException e) {
            System.out.println("書き込み中にエラーが発生しました");
        }
    }
}
```

`students.csv` の中身：

```csv
Taro,80
Hanako,90
Jiro,75
```

---

## CSVファイルを読み込む

CSVファイルを読み込むには、1行ずつ読み込んで `split()` で分けます。

```java
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        try (BufferedReader reader = new BufferedReader(new FileReader("students.csv"))) {
            String line;

            while ((line = reader.readLine()) != null) {
                String[] data = line.split(",");

                String name = data[0];
                int score = Integer.parseInt(data[1]);

                System.out.println(name + ": " + score);
            }
        } catch (IOException e) {
            System.out.println("読み込み中にエラーが発生しました");
        }
    }
}
```

`students.csv`：

```csv
Taro,80
Hanako,90
Jiro,75
```

実行結果：

```text
Taro: 80
Hanako: 90
Jiro: 75
```

`split(",")` は、文字列をカンマで分割します。

---

## Filesクラス

Javaには、より簡単にファイルを扱える `Files` クラスもあります。

```java
import java.nio.file.Files;
import java.nio.file.Path;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        try {
            Files.writeString(Path.of("sample.txt"), "Hello, Files!");

            System.out.println("書き込み完了");
        } catch (IOException e) {
            System.out.println("エラーが発生しました");
        }
    }
}
```

`Files.writeString()` を使うと、文字列を簡単にファイルへ書き込めます。

---

## Filesで読み込む

```java
import java.nio.file.Files;
import java.nio.file.Path;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        try {
            String text = Files.readString(Path.of("sample.txt"));

            System.out.println(text);
        } catch (IOException e) {
            System.out.println("エラーが発生しました");
        }
    }
}
```

`Files.readString()` を使うと、ファイル全体を文字列として読み込めます。

---

## FileWriterとFilesの使い分け

| 使い方 | 向いている場面 |
|---|---|
| `FileWriter` | 少しずつ書き込みたい |
| `BufferedReader` | 1行ずつ読み込みたい |
| `Files.writeString()` | 短い文字列を簡単に保存したい |
| `Files.readString()` | ファイル全体を一度に読み込みたい |

学習の最初は、`FileWriter` と `BufferedReader` の基本を理解しておくとよいです。

そのあと、便利な `Files` クラスを使うとさらに書きやすくなります。

---

## よくあるエラー

| エラー | 原因 | 解決方法 |
|---|---|---|
| `FileNotFoundException` | 読み込むファイルが存在しない | ファイル名や場所を確認する |
| `IOException` | ファイル操作中に問題が発生した | `try-catch` で処理する |
| `NumberFormatException` | 数値に変換できない文字列を変換した | ファイルの中身を確認する |
| `ArrayIndexOutOfBoundsException` | CSVの列数が足りない | `split()` 後の配列の長さを確認する |
| 文字化けする | 文字コードが合っていない | UTF-8で保存する |
| ファイルが上書きされる | `FileWriter` が上書きモードになっている | 追記する場合は第2引数に `true` を指定する |

---


## まとめ

- ファイル入出力を使うと、データをファイルに保存したり読み込んだりできる
- `FileWriter` を使うと、テキストファイルに文字を書き込める
- `FileReader` を使うと、テキストファイルから文字を読み込める
- `BufferedReader` を使うと、ファイルを1行ずつ読み込める
- `write()` で文字を書き込む
- `readLine()` で1行読み込む
- ファイル操作では `IOException` が発生する可能性がある
- try-with-resources を使うと、自動でファイルを閉じられる
- `FileWriter("file.txt", true)` と書くと追記できる
- CSVファイルはカンマ区切りのテキストファイル
- `Files` クラスを使うと、より簡単にファイルを読み書きできる