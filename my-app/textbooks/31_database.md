# 第31章 データベース

## 学習目標

- データベースとは何かを理解する
- テーブル、行、列の考え方を理解する
- SQLの基本を理解する
- Javaからデータベースに接続する流れを知る
- JDBCの基本を理解する
- `Connection`、`PreparedStatement`、`ResultSet` を使える
- データの追加、取得、更新、削除の基本を理解する
- SQLインジェクションと `PreparedStatement` の重要性を知る

---

## データベースとは

データベースとは、データを整理して保存するための仕組みです。

アプリでは、さまざまなデータを保存する必要があります。

たとえば：

- ユーザー情報
- 商品情報
- 注文履歴
- 投稿内容
- 点数データ
- 予約情報
- ログイン情報

これらのデータを安全に、検索しやすく、管理しやすい形で保存するためにデータベースを使います。

---

## ファイル保存との違い

前の章では、ファイルにデータを保存しました。

```text
Taro,80
Hanako,90
Jiro,75
```

ファイル保存はシンプルで便利です。

しかし、データが増えてくると、次のような処理が難しくなります。

- 特定の名前だけ検索する
- 点数が80点以上の人だけ取り出す
- データを並び替える
- 一部のデータだけ更新する
- 複数人が同時に使う
- データの整合性を守る

このような場面では、データベースが向いています。

---

## データベースでできること

データベースを使うと、次のようなことができます。

| できること | 例 |
|---|---|
| データを保存する | 学生を登録する |
| データを検索する | 名前がTaroの学生を探す |
| データを更新する | 点数を変更する |
| データを削除する | 学生情報を削除する |
| データを並び替える | 点数が高い順に表示する |
| 条件で絞り込む | 80点以上だけ表示する |

アプリの裏側では、データベースがとてもよく使われます。

---

## RDBとは

よく使われるデータベースに、**RDB** があります。

RDBは、Relational Database の略です。

日本語では **リレーショナルデータベース** と呼ばれます。

RDBでは、データを表の形で管理します。

---

## テーブル

データベースでは、データを **テーブル** という表に保存します。

たとえば、学生を管理する `students` テーブルを考えます。

| id | name | score |
|---|---|---|
| 1 | Taro | 80 |
| 2 | Hanako | 90 |
| 3 | Jiro | 75 |

このように、表の形でデータを保存します。

---

## 行と列

テーブルは、行と列でできています。

| 用語 | 意味 |
|---|---|
| 行 | 1件分のデータ |
| 列 | データの項目 |

たとえば、次の1行は1人分の学生データです。

| id | name | score |
|---|---|---|
| 1 | Taro | 80 |

列は、`id`、`name`、`score` のような項目です。

---

## 主キー

主キーとは、データを一意に識別するための値です。

学生テーブルでは、`id` を主キーにすることが多いです。

| id | name | score |
|---|---|---|
| 1 | Taro | 80 |
| 2 | Hanako | 90 |
| 3 | Jiro | 75 |

`id` があれば、同じ名前の学生がいても区別できます。

```text
id 1 の Taro
id 4 の Taro
```

アプリでは、データを更新・削除するときに主キーをよく使います。

---

## SQLとは

SQLとは、データベースを操作するための言語です。

SQLを使うと、次のような操作ができます。

| 操作 | SQL |
|---|---|
| データを追加する | `INSERT` |
| データを取得する | `SELECT` |
| データを更新する | `UPDATE` |
| データを削除する | `DELETE` |
| テーブルを作る | `CREATE TABLE` |

Javaからデータベースを使う場合も、基本的にはSQLを書いて操作します。

---

## テーブルを作る

テーブルを作るには、`CREATE TABLE` を使います。

```sql
CREATE TABLE students (
    id INTEGER PRIMARY KEY,
    name TEXT,
    score INTEGER
);
```

これは、`students` というテーブルを作るSQLです。

| 列名 | 型 | 意味 |
|---|---|---|
| `id` | `INTEGER` | 学生ID |
| `name` | `TEXT` | 名前 |
| `score` | `INTEGER` | 点数 |

---

## データを追加する

データを追加するには、`INSERT` を使います。

```sql
INSERT INTO students (id, name, score)
VALUES (1, 'Taro', 80);
```

これで、`students` テーブルに1件のデータが追加されます。

---

## データを取得する

データを取得するには、`SELECT` を使います。

```sql
SELECT * FROM students;
```

`*` は、すべての列を取得するという意味です。

実行結果のイメージ：

```text
1 Taro 80
2 Hanako 90
3 Jiro 75
```

---

## 条件を指定して取得する

条件を指定するには、`WHERE` を使います。

```sql
SELECT * FROM students
WHERE score >= 80;
```

これは、点数が80点以上の学生だけを取得するSQLです。

---

## データを更新する

データを更新するには、`UPDATE` を使います。

```sql
UPDATE students
SET score = 95
WHERE id = 1;
```

これは、`id` が1の学生の点数を95に変更するSQLです。

`WHERE` を書かないと、すべてのデータが更新されてしまうことがあるので注意しましょう。

---

## データを削除する

データを削除するには、`DELETE` を使います。

```sql
DELETE FROM students
WHERE id = 1;
```

これは、`id` が1の学生を削除するSQLです。

`DELETE` でも、`WHERE` の書き忘れに注意が必要です。

---

## CRUD

データベース操作の基本は、CRUDと呼ばれます。

| 文字 | 意味 | SQL |
|---|---|---|
| C | Create | `INSERT` |
| R | Read | `SELECT` |
| U | Update | `UPDATE` |
| D | Delete | `DELETE` |

アプリ開発では、このCRUD操作がとてもよく出てきます。

---

# Javaからデータベースを使う

## JDBCとは

JDBCとは、Javaからデータベースを操作するための仕組みです。

JDBCは、Java Database Connectivity の略です。

Javaプログラムからデータベースに接続し、SQLを実行できます。

---

## JDBCで使う主なクラス

JDBCでは、主に次のクラスやインターフェースを使います。

| 名前 | 役割 |
|---|---|
| `DriverManager` | データベース接続を作る |
| `Connection` | データベースとの接続を表す |
| `PreparedStatement` | SQLを安全に実行する |
| `ResultSet` | SELECTの結果を受け取る |
| `SQLException` | データベース関連の例外 |

これらは `java.sql` パッケージにあります。

```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
```

---

## JDBCドライバ

Javaからデータベースに接続するには、使うデータベースに対応した **JDBCドライバ** が必要です。

たとえば：

| データベース | JDBC URLの例 |
|---|---|
| SQLite | `jdbc:sqlite:sample.db` |
| MySQL | `jdbc:mysql://localhost:3306/java_study` |
| PostgreSQL | `jdbc:postgresql://localhost:5432/java_study` |

実際に動かすには、それぞれのデータベース用のJDBCドライバをプロジェクトに追加する必要があります。

この章では、JDBCの書き方を理解することを目的にします。

---

## データベース接続の基本形

データベースに接続するには、`DriverManager.getConnection()` を使います。

```java
Connection connection = DriverManager.getConnection(url);
```

例：

```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Main {
    public static void main(String[] args) {
        String url = "jdbc:sqlite:sample.db";

        try (Connection connection = DriverManager.getConnection(url)) {
            System.out.println("データベースに接続しました");
        } catch (SQLException e) {
            System.out.println("データベース接続中にエラーが発生しました");
        }
    }
}
```

`try-with-resources` を使うことで、接続を自動で閉じられます。

---

## Connectionとは

`Connection` は、データベースとの接続を表します。

```java
Connection connection = DriverManager.getConnection(url);
```

データベースにSQLを送るには、この `Connection` を使います。

ファイル操作でファイルを開いて使ったように、データベースも接続を開いて操作します。

---

## SQLException

データベース操作では、`SQLException` が発生する可能性があります。

たとえば：

- 接続先が間違っている
- SQL文が間違っている
- テーブルが存在しない
- データ型が合っていない
- データベースに接続できない

そのため、JDBCの処理は `try-catch` で囲みます。

```java
try {
    // データベース処理
} catch (SQLException e) {
    System.out.println("データベースエラーが発生しました");
}
```

---

## テーブルを作成する

JavaからSQLを実行して、テーブルを作ってみます。

```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class Main {
    public static void main(String[] args) {
        String url = "jdbc:sqlite:sample.db";

        String sql = """
                CREATE TABLE IF NOT EXISTS students (
                    id INTEGER PRIMARY KEY,
                    name TEXT,
                    score INTEGER
                )
                """;

        try (Connection connection = DriverManager.getConnection(url);
             PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.executeUpdate();

            System.out.println("テーブルを作成しました");
        } catch (SQLException e) {
            System.out.println("エラーが発生しました");
            System.out.println(e.getMessage());
        }
    }
}
```

`CREATE TABLE IF NOT EXISTS` は、テーブルが存在しない場合だけ作成するSQLです。

---

## PreparedStatementとは

`PreparedStatement` は、SQLを実行するためのものです。

```java
PreparedStatement statement = connection.prepareStatement(sql);
```

`PreparedStatement` を使うと、SQLを安全に実行できます。

特に、ユーザー入力をSQLに使う場合は `PreparedStatement` が重要です。

---

## executeUpdate()

`INSERT`、`UPDATE`、`DELETE`、`CREATE TABLE` など、データを変更するSQLでは `executeUpdate()` を使います。

```java
statement.executeUpdate();
```

たとえば、次のようなSQLで使います。

```sql
INSERT INTO students ...
UPDATE students ...
DELETE FROM students ...
CREATE TABLE ...
```

---

## データを追加する

`students` テーブルにデータを追加してみます。

```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class Main {
    public static void main(String[] args) {
        String url = "jdbc:sqlite:sample.db";

        String sql = "INSERT INTO students (id, name, score) VALUES (?, ?, ?)";

        try (Connection connection = DriverManager.getConnection(url);
             PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setInt(1, 1);
            statement.setString(2, "Taro");
            statement.setInt(3, 80);

            statement.executeUpdate();

            System.out.println("データを追加しました");
        } catch (SQLException e) {
            System.out.println("追加中にエラーが発生しました");
            System.out.println(e.getMessage());
        }
    }
}
```

---

## ? プレースホルダ

SQLの中にある `?` は、あとから値を入れる場所です。

```java
String sql = "INSERT INTO students (id, name, score) VALUES (?, ?, ?)";
```

この `?` に、次のように値を設定します。

```java
statement.setInt(1, 1);
statement.setString(2, "Taro");
statement.setInt(3, 80);
```

番号は1から始まります。

| 番号 | 対応する値 |
|---|---|
| 1 | `id` |
| 2 | `name` |
| 3 | `score` |

---

## setIntとsetString

`PreparedStatement` では、入れる値の型に応じてメソッドを使います。

| メソッド | 使う値 |
|---|---|
| `setInt()` | 整数 |
| `setString()` | 文字列 |
| `setDouble()` | 小数 |
| `setBoolean()` | 真偽値 |

例：

```java
statement.setString(1, "Taro");
statement.setInt(2, 80);
```

---

## 複数のデータを追加する

複数の学生を追加してみます。

```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class Main {
    public static void main(String[] args) {
        String url = "jdbc:sqlite:sample.db";

        String sql = "INSERT INTO students (id, name, score) VALUES (?, ?, ?)";

        try (Connection connection = DriverManager.getConnection(url);
             PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setInt(1, 1);
            statement.setString(2, "Taro");
            statement.setInt(3, 80);
            statement.executeUpdate();

            statement.setInt(1, 2);
            statement.setString(2, "Hanako");
            statement.setInt(3, 90);
            statement.executeUpdate();

            statement.setInt(1, 3);
            statement.setString(2, "Jiro");
            statement.setInt(3, 75);
            statement.executeUpdate();

            System.out.println("複数のデータを追加しました");
        } catch (SQLException e) {
            System.out.println("追加中にエラーが発生しました");
            System.out.println(e.getMessage());
        }
    }
}
```

同じ `PreparedStatement` に値を入れ直して、複数回実行しています。

---

## データを取得する

データを取得するには、`SELECT` を使います。

Javaでは、`SELECT` の結果を `ResultSet` で受け取ります。

```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class Main {
    public static void main(String[] args) {
        String url = "jdbc:sqlite:sample.db";

        String sql = "SELECT id, name, score FROM students";

        try (Connection connection = DriverManager.getConnection(url);
             PreparedStatement statement = connection.prepareStatement(sql);
             ResultSet resultSet = statement.executeQuery()) {

            while (resultSet.next()) {
                int id = resultSet.getInt("id");
                String name = resultSet.getString("name");
                int score = resultSet.getInt("score");

                System.out.println(id + ": " + name + " " + score);
            }
        } catch (SQLException e) {
            System.out.println("取得中にエラーが発生しました");
            System.out.println(e.getMessage());
        }
    }
}
```

実行結果の例：

```text
1: Taro 80
2: Hanako 90
3: Jiro 75
```

---

## executeQuery()

`SELECT` を実行するときは、`executeQuery()` を使います。

```java
ResultSet resultSet = statement.executeQuery();
```

`executeQuery()` は、検索結果を `ResultSet` として返します。

---

## ResultSetとは

`ResultSet` は、`SELECT` の結果を表すものです。

```java
ResultSet resultSet = statement.executeQuery();
```

`ResultSet` には、検索結果の行が入っています。

`next()` を使うことで、1行ずつ取り出せます。

```java
while (resultSet.next()) {
    // 1行分のデータを取り出す
}
```

---

## resultSet.next()

`resultSet.next()` は、次の行に進むメソッドです。

```java
while (resultSet.next()) {
}
```

次の行がある場合は `true` を返します。

次の行がない場合は `false` を返します。

そのため、`while` 文と組み合わせてすべての行を処理できます。

---

## 列の値を取り出す

`ResultSet` から列の値を取り出すには、列名を指定します。

```java
int id = resultSet.getInt("id");
String name = resultSet.getString("name");
int score = resultSet.getInt("score");
```

| メソッド | 取得する値 |
|---|---|
| `getInt()` | 整数 |
| `getString()` | 文字列 |
| `getDouble()` | 小数 |
| `getBoolean()` | 真偽値 |

---

## 条件付きで取得する

80点以上の学生だけを取得してみます。

```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class Main {
    public static void main(String[] args) {
        String url = "jdbc:sqlite:sample.db";

        String sql = "SELECT id, name, score FROM students WHERE score >= ?";

        try (Connection connection = DriverManager.getConnection(url);
             PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setInt(1, 80);

            try (ResultSet resultSet = statement.executeQuery()) {
                while (resultSet.next()) {
                    int id = resultSet.getInt("id");
                    String name = resultSet.getString("name");
                    int score = resultSet.getInt("score");

                    System.out.println(id + ": " + name + " " + score);
                }
            }
        } catch (SQLException e) {
            System.out.println("取得中にエラーが発生しました");
            System.out.println(e.getMessage());
        }
    }
}
```

実行結果の例：

```text
1: Taro 80
2: Hanako 90
```

`WHERE score >= ?` の `?` に、`80` を設定しています。

---

## 名前で検索する

```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class Main {
    public static void main(String[] args) {
        String url = "jdbc:sqlite:sample.db";

        String sql = "SELECT id, name, score FROM students WHERE name = ?";

        try (Connection connection = DriverManager.getConnection(url);
             PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setString(1, "Taro");

            try (ResultSet resultSet = statement.executeQuery()) {
                while (resultSet.next()) {
                    int id = resultSet.getInt("id");
                    String name = resultSet.getString("name");
                    int score = resultSet.getInt("score");

                    System.out.println(id + ": " + name + " " + score);
                }
            }
        } catch (SQLException e) {
            System.out.println("検索中にエラーが発生しました");
            System.out.println(e.getMessage());
        }
    }
}
```

文字列を条件に使う場合は、`setString()` を使います。

---

## データを更新する

学生の点数を更新してみます。

```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class Main {
    public static void main(String[] args) {
        String url = "jdbc:sqlite:sample.db";

        String sql = "UPDATE students SET score = ? WHERE id = ?";

        try (Connection connection = DriverManager.getConnection(url);
             PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setInt(1, 95);
            statement.setInt(2, 1);

            int count = statement.executeUpdate();

            System.out.println(count + "件更新しました");
        } catch (SQLException e) {
            System.out.println("更新中にエラーが発生しました");
            System.out.println(e.getMessage());
        }
    }
}
```

実行結果の例：

```text
1件更新しました
```

`executeUpdate()` は、影響を受けた行数を返します。

---

## 更新時のWHEREに注意

次のSQLは危険です。

```sql
UPDATE students SET score = 0;
```

`WHERE` がないため、すべての学生の点数が `0` になってしまいます。

安全な例：

```sql
UPDATE students SET score = 95
WHERE id = 1;
```

更新するときは、どのデータを更新するのかを `WHERE` で指定しましょう。

---

## データを削除する

学生データを削除してみます。

```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class Main {
    public static void main(String[] args) {
        String url = "jdbc:sqlite:sample.db";

        String sql = "DELETE FROM students WHERE id = ?";

        try (Connection connection = DriverManager.getConnection(url);
             PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setInt(1, 3);

            int count = statement.executeUpdate();

            System.out.println(count + "件削除しました");
        } catch (SQLException e) {
            System.out.println("削除中にエラーが発生しました");
            System.out.println(e.getMessage());
        }
    }
}
```

実行結果の例：

```text
1件削除しました
```

---

## 削除時のWHEREに注意

次のSQLはとても危険です。

```sql
DELETE FROM students;
```

`WHERE` がないため、すべての学生データが削除されます。

安全な例：

```sql
DELETE FROM students
WHERE id = 3;
```

`UPDATE` と `DELETE` では、`WHERE` を特に注意して確認しましょう。

---

## SQLインジェクションとは

SQLインジェクションとは、ユーザー入力を悪用してSQLを書き換える攻撃です。

たとえば、次のように文字列連結でSQLを作るのは危険です。

```java
String name = inputName;

String sql = "SELECT * FROM students WHERE name = '" + name + "'";
```

ユーザーが普通の名前ではなく、SQLの一部のような文字列を入力すると、意図しないSQLになる可能性があります。

---

## 危険なSQLの作り方

避けたい例：

```java
String sql = "SELECT * FROM students WHERE name = '" + name + "'";
```

このように、ユーザー入力を直接SQL文字列に連結するのは避けましょう。

安全な例：

```java
String sql = "SELECT * FROM students WHERE name = ?";
PreparedStatement statement = connection.prepareStatement(sql);
statement.setString(1, name);
```

`PreparedStatement` を使うことで、入力値をSQLそのものではなく、値として扱えます。

---

## PreparedStatementを使う理由

`PreparedStatement` を使う主な理由は次のとおりです。

| 理由 | 説明 |
|---|---|
| 安全 | SQLインジェクションを防ぎやすい |
| 読みやすい | SQLと値を分けて書ける |
| 型を指定できる | `setString()` や `setInt()` を使える |
| 再利用しやすい | 同じSQLに違う値を入れられる |

JavaでSQLを実行するときは、基本的に `PreparedStatement` を使うと覚えておきましょう。

---

## Studentクラスを使う

データベースから取得したデータを、オブジェクトとして扱うこともできます。

```java
class Student {
    int id;
    String name;
    int score;

    Student(int id, String name, int score) {
        this.id = id;
        this.name = name;
        this.score = score;
    }

    void showInfo() {
        System.out.println(id + ": " + name + " " + score);
    }
}
```

データベースの1行を、1つの `Student` オブジェクトとして扱えます。

---

## ResultSetからStudentを作る

```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        String url = "jdbc:sqlite:sample.db";

        ArrayList<Student> students = new ArrayList<>();

        String sql = "SELECT id, name, score FROM students";

        try (Connection connection = DriverManager.getConnection(url);
             PreparedStatement statement = connection.prepareStatement(sql);
             ResultSet resultSet = statement.executeQuery()) {

            while (resultSet.next()) {
                int id = resultSet.getInt("id");
                String name = resultSet.getString("name");
                int score = resultSet.getInt("score");

                Student student = new Student(id, name, score);
                students.add(student);
            }
        } catch (SQLException e) {
            System.out.println("取得中にエラーが発生しました");
            System.out.println(e.getMessage());
        }

        for (Student student : students) {
            student.showInfo();
        }
    }
}

class Student {
    int id;
    String name;
    int score;

    Student(int id, String name, int score) {
        this.id = id;
        this.name = name;
        this.score = score;
    }

    void showInfo() {
        System.out.println(id + ": " + name + " " + score);
    }
}
```

データベースから取得したデータを `ArrayList<Student>` に入れています。

---

## DAOとは

DAOとは、Data Access Object の略です。

データベース操作を担当するクラスのことです。

たとえば、学生データを扱うなら `StudentDao` のようなクラスを作ります。

```text
Main
  ↓
StudentDao
  ↓
Database
```

`Main` にSQLを直接たくさん書くと、コードが読みにくくなります。

そこで、データベース処理を `StudentDao` に分けます。

---

## StudentDaoのイメージ

```java
class StudentDao {
    void insert(Student student) {
        // 学生を追加するSQL
    }

    ArrayList<Student> findAll() {
        // 学生をすべて取得するSQL
        return new ArrayList<>();
    }

    void updateScore(int id, int score) {
        // 点数を更新するSQL
    }

    void delete(int id) {
        // 学生を削除するSQL
    }
}
```

このように、データベース操作を専用クラスにまとめると管理しやすくなります。

---

## DAOを使うメリット

DAOを使うと、次のようなメリットがあります。

| メリット | 説明 |
|---|---|
| 役割が分かれる | Mainは画面や流れ、DAOはDB操作 |
| SQLをまとめられる | SQLがあちこちに散らばらない |
| 修正しやすい | DB操作の変更場所が分かりやすい |
| 再利用しやすい | 同じDB操作を別の場所から使える |

実際のアプリでは、データベース操作をクラスに分けることがよくあります。

---

## 自動採番

多くのデータベースでは、`id` を自動で増やす仕組みがあります。

たとえば、SQLiteでは次のように書けます。

```sql
CREATE TABLE students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    score INTEGER
);
```

この場合、`INSERT` するときに `id` を指定しなくても、自動で番号が入ります。

```sql
INSERT INTO students (name, score)
VALUES ('Taro', 80);
```

自動採番の書き方は、使うデータベースによって少し違います。

---

## データ型

データベースにも、Javaと同じようにデータ型があります。

代表的なものは次のとおりです。

| データベースの型 | 意味 |
|---|---|
| `INTEGER` | 整数 |
| `TEXT` | 文字列 |
| `REAL` | 小数 |
| `DATE` | 日付 |
| `BOOLEAN` | 真偽値 |

ただし、使える型や名前はデータベースによって少し違います。

---

## Javaの型との対応

Javaとデータベースの型は、だいたい次のように対応します。

| Java | データベース |
|---|---|
| `int` | `INTEGER` |
| `String` | `TEXT` / `VARCHAR` |
| `double` | `REAL` / `DOUBLE` |
| `boolean` | `BOOLEAN` |
| `LocalDate` | `DATE` または文字列 |

データベース製品によって違いがあるため、実際の開発では使うDBの仕様を確認します。

---

## トランザクションとは

トランザクションとは、複数の処理を1つのまとまりとして扱う仕組みです。

たとえば、銀行の送金を考えます。

```text
1. Aさんの残高を減らす
2. Bさんの残高を増やす
```

この2つは、両方成功する必要があります。

途中で失敗して、Aさんの残高だけ減ると困ります。

このようなときに、トランザクションを使います。

---

## commitとrollback

トランザクションでは、主に次の考え方があります。

| 用語 | 意味 |
|---|---|
| `commit` | 処理を確定する |
| `rollback` | 処理を取り消す |

すべて成功したら `commit`。

途中で失敗したら `rollback`。

このようにして、データの不整合を防ぎます。

---

## トランザクションのイメージ

```java
try {
    // トランザクション開始

    // Aさんの残高を減らす
    // Bさんの残高を増やす

    // 成功したらcommit
} catch (Exception e) {
    // 失敗したらrollback
}
```

この章では、まず「複数のDB操作をひとまとまりとして扱う仕組み」と覚えておけば大丈夫です。

---

## データベースを使うときの注意点

データベースを使うときは、次の点に注意しましょう。

| 注意点 | 説明 |
|---|---|
| 接続情報を間違えない | URL、ユーザー名、パスワードを確認する |
| SQL文を確認する | 文法ミスがあると実行できない |
| `WHERE` を忘れない | 更新・削除で特に重要 |
| `PreparedStatement` を使う | SQLインジェクション対策になる |
| 接続を閉じる | try-with-resourcesを使う |
| 例外処理を書く | `SQLException` に対応する |
| データ型を合わせる | JavaとDBの型を意識する |

---

## よくあるエラー

| エラー | 原因 | 解決方法 |
|---|---|---|
| `SQLException` | DB操作中に問題が発生した | エラーメッセージを確認する |
| `No suitable driver found` | JDBCドライバが見つからない | 対応するドライバを追加する |
| `database is locked` | DBが他の処理で使用中 | 接続やトランザクションを確認する |
| `no such table` | テーブルが存在しない | `CREATE TABLE` を実行する |
| `syntax error` | SQLの文法ミス | SQL文を確認する |
| `column not found` | 列名が間違っている | テーブル定義を確認する |
| `UNIQUE constraint failed` | 主キーなどが重複している | `id` の重複を避ける |
| 更新・削除しすぎた | `WHERE` を忘れた | 実行前にSQLを確認する |

---

## まとめ

- データベースは、データを整理して保存するための仕組み
- RDBでは、データをテーブルとして管理する
- テーブルは行と列でできている
- 主キーは、データを一意に識別するための値
- SQLを使ってデータベースを操作する
- `INSERT` は追加、`SELECT` は取得、`UPDATE` は更新、`DELETE` は削除
- CRUDは、データ操作の基本
- JDBCを使うと、Javaからデータベースを操作できる
- `Connection` はデータベース接続を表す
- `PreparedStatement` はSQLを安全に実行するために使う
- `ResultSet` は `SELECT` の結果を受け取るために使う
- データベース操作では `SQLException` が発生する可能性がある
- `try-with-resources` を使うと接続を自動で閉じられる
- `UPDATE` と `DELETE` では `WHERE` の書き忘れに注意する
- ユーザー入力をSQLに使うときは、文字列連結ではなく `PreparedStatement` を使う
- 実際のアプリでは、DAOのようなクラスにデータベース処理をまとめることが多い