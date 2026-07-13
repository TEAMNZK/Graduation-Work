# 第28章 日付と時刻

## 学習目標

- Javaで日付と時刻を扱う方法を理解する
- `LocalDate` を使って日付を扱える
- `LocalTime` を使って時刻を扱える
- `LocalDateTime` を使って日付と時刻を扱える
- 日付や時刻の加算・減算ができる
- 日付を比較できる
- `DateTimeFormatter` を使って表示形式を変更できる
- 文字列から日付へ変換できる

---

## 日付と時刻を扱う

プログラムでは、日付や時刻を扱う場面がよくあります。

たとえば：

- 今日の日付を表示する
- 現在時刻を表示する
- 誕生日から年齢を計算する
- 予約日を管理する
- 締切日を計算する
- ログに日時を記録する

Javaでは、日付や時刻を扱うために `java.time` パッケージのクラスを使います。

代表的なクラスは次のとおりです。

| クラス | 役割 |
|---|---|
| `LocalDate` | 日付を扱う |
| `LocalTime` | 時刻を扱う |
| `LocalDateTime` | 日付と時刻を扱う |
| `DateTimeFormatter` | 日付や時刻の表示形式を指定する |
| `Period` | 日付同士の差を扱う |
| `Duration` | 時刻同士の差を扱う |

---

## LocalDateとは

`LocalDate` は、日付を扱うクラスです。

年・月・日を管理できます。

```java
2026-06-29
```

`LocalDate` を使うには、次の `import` が必要です。

```java
import java.time.LocalDate;
```

---

## 今日の日付を取得する

今日の日付を取得するには、`LocalDate.now()` を使います。

```java
import java.time.LocalDate;

public class Main {
    public static void main(String[] args) {
        LocalDate today = LocalDate.now();

        System.out.println(today);
    }
}
```

実行結果の例：

```text
2026-06-29
```

実行した日によって表示される日付は変わります。

---

## 日付を指定して作る

特定の日付を作るには、`LocalDate.of()` を使います。

```java
LocalDate date = LocalDate.of(2026, 6, 29);
```

例：

```java
import java.time.LocalDate;

public class Main {
    public static void main(String[] args) {
        LocalDate birthday = LocalDate.of(2000, 5, 10);

        System.out.println(birthday);
    }
}
```

実行結果：

```text
2000-05-10
```

`LocalDate.of(年, 月, 日)` の順番で指定します。

---

## 年・月・日を取り出す

`LocalDate` から、年・月・日を取り出せます。

```java
import java.time.LocalDate;

public class Main {
    public static void main(String[] args) {
        LocalDate date = LocalDate.of(2026, 6, 29);

        System.out.println(date.getYear());
        System.out.println(date.getMonthValue());
        System.out.println(date.getDayOfMonth());
    }
}
```

実行結果：

```text
2026
6
29
```

| メソッド | 取得できるもの |
|---|---|
| `getYear()` | 年 |
| `getMonthValue()` | 月 |
| `getDayOfMonth()` | 日 |

---

## 曜日を取得する

曜日を取得するには、`getDayOfWeek()` を使います。

```java
import java.time.LocalDate;

public class Main {
    public static void main(String[] args) {
        LocalDate date = LocalDate.of(2026, 6, 29);

        System.out.println(date.getDayOfWeek());
    }
}
```

実行結果：

```text
MONDAY
```

曜日は英語の大文字で表示されます。

| 表示 | 意味 |
|---|---|
| `MONDAY` | 月曜日 |
| `TUESDAY` | 火曜日 |
| `WEDNESDAY` | 水曜日 |
| `THURSDAY` | 木曜日 |
| `FRIDAY` | 金曜日 |
| `SATURDAY` | 土曜日 |
| `SUNDAY` | 日曜日 |

---

## 日付を加算する

日付に日数・月数・年数を足すには、次のメソッドを使います。

| メソッド | 説明 |
|---|---|
| `plusDays()` | 日を足す |
| `plusMonths()` | 月を足す |
| `plusYears()` | 年を足す |

例：

```java
import java.time.LocalDate;

public class Main {
    public static void main(String[] args) {
        LocalDate today = LocalDate.of(2026, 6, 29);

        System.out.println(today.plusDays(7));
        System.out.println(today.plusMonths(1));
        System.out.println(today.plusYears(1));
    }
}
```

実行結果：

```text
2026-07-06
2026-07-29
2027-06-29
```

---

## 日付を減算する

日付から日数・月数・年数を引くには、次のメソッドを使います。

| メソッド | 説明 |
|---|---|
| `minusDays()` | 日を引く |
| `minusMonths()` | 月を引く |
| `minusYears()` | 年を引く |

例：

```java
import java.time.LocalDate;

public class Main {
    public static void main(String[] args) {
        LocalDate today = LocalDate.of(2026, 6, 29);

        System.out.println(today.minusDays(7));
        System.out.println(today.minusMonths(1));
        System.out.println(today.minusYears(1));
    }
}
```

実行結果：

```text
2026-06-22
2026-05-29
2025-06-29
```

---

## LocalDateは元の日付を変更しない

`LocalDate` は、値を変更できないオブジェクトです。

たとえば、次のコードを見てください。

```java
import java.time.LocalDate;

public class Main {
    public static void main(String[] args) {
        LocalDate date = LocalDate.of(2026, 6, 29);

        date.plusDays(1);

        System.out.println(date);
    }
}
```

実行結果：

```text
2026-06-29
```

`plusDays(1)` を呼び出しても、元の `date` は変わっていません。

---

## 変更後の日付を使う

変更後の日付を使いたい場合は、戻り値を受け取ります。

```java
import java.time.LocalDate;

public class Main {
    public static void main(String[] args) {
        LocalDate date = LocalDate.of(2026, 6, 29);

        LocalDate nextDay = date.plusDays(1);

        System.out.println(date);
        System.out.println(nextDay);
    }
}
```

実行結果：

```text
2026-06-29
2026-06-30
```

`plusDays()` は、新しい `LocalDate` を返します。

---

## 日付を比較する

日付の前後を比較するには、次のメソッドを使います。

| メソッド | 説明 |
|---|---|
| `isBefore()` | 指定した日付より前か |
| `isAfter()` | 指定した日付より後か |
| `isEqual()` | 指定した日付と同じか |

例：

```java
import java.time.LocalDate;

public class Main {
    public static void main(String[] args) {
        LocalDate today = LocalDate.of(2026, 6, 29);
        LocalDate deadline = LocalDate.of(2026, 7, 10);

        System.out.println(today.isBefore(deadline));
        System.out.println(today.isAfter(deadline));
        System.out.println(today.isEqual(deadline));
    }
}
```

実行結果：

```text
true
false
false
```

`today` は `deadline` より前なので、`isBefore()` が `true` になります。

---

## 締切日を判定する

```java
import java.time.LocalDate;

public class Main {
    public static void main(String[] args) {
        LocalDate today = LocalDate.now();
        LocalDate deadline = LocalDate.of(2026, 7, 10);

        if (today.isAfter(deadline)) {
            System.out.println("締切を過ぎています");
        } else if (today.isEqual(deadline)) {
            System.out.println("今日が締切です");
        } else {
            System.out.println("締切前です");
        }
    }
}
```

実行結果の例：

```text
締切前です
```

日付を比較することで、期限チェックのような処理を書けます。

---

## LocalTimeとは

`LocalTime` は、時刻を扱うクラスです。

時・分・秒を管理できます。

```java
14:30:00
```

`LocalTime` を使うには、次の `import` が必要です。

```java
import java.time.LocalTime;
```

---

## 現在時刻を取得する

現在時刻を取得するには、`LocalTime.now()` を使います。

```java
import java.time.LocalTime;

public class Main {
    public static void main(String[] args) {
        LocalTime now = LocalTime.now();

        System.out.println(now);
    }
}
```

実行結果の例：

```text
14:30:15.123456
```

実行した時刻によって結果は変わります。

---

## 時刻を指定して作る

特定の時刻を作るには、`LocalTime.of()` を使います。

```java
LocalTime time = LocalTime.of(14, 30);
```

例：

```java
import java.time.LocalTime;

public class Main {
    public static void main(String[] args) {
        LocalTime time = LocalTime.of(14, 30, 0);

        System.out.println(time);
    }
}
```

実行結果：

```text
14:30
```

`LocalTime.of(時, 分, 秒)` の順番で指定します。

秒は省略できます。

```java
LocalTime time = LocalTime.of(14, 30);
```

---

## 時・分・秒を取り出す

```java
import java.time.LocalTime;

public class Main {
    public static void main(String[] args) {
        LocalTime time = LocalTime.of(14, 30, 45);

        System.out.println(time.getHour());
        System.out.println(time.getMinute());
        System.out.println(time.getSecond());
    }
}
```

実行結果：

```text
14
30
45
```

| メソッド | 取得できるもの |
|---|---|
| `getHour()` | 時 |
| `getMinute()` | 分 |
| `getSecond()` | 秒 |

---

## 時刻を加算する

```java
import java.time.LocalTime;

public class Main {
    public static void main(String[] args) {
        LocalTime time = LocalTime.of(14, 30);

        System.out.println(time.plusHours(2));
        System.out.println(time.plusMinutes(15));
        System.out.println(time.plusSeconds(30));
    }
}
```

実行結果：

```text
16:30
14:45
14:30:30
```

| メソッド | 説明 |
|---|---|
| `plusHours()` | 時を足す |
| `plusMinutes()` | 分を足す |
| `plusSeconds()` | 秒を足す |

---

## 時刻を減算する

```java
import java.time.LocalTime;

public class Main {
    public static void main(String[] args) {
        LocalTime time = LocalTime.of(14, 30);

        System.out.println(time.minusHours(2));
        System.out.println(time.minusMinutes(15));
        System.out.println(time.minusSeconds(30));
    }
}
```

実行結果：

```text
12:30
14:15
14:29:30
```

---

## 時刻を比較する

時刻も日付と同じように比較できます。

```java
import java.time.LocalTime;

public class Main {
    public static void main(String[] args) {
        LocalTime start = LocalTime.of(9, 0);
        LocalTime now = LocalTime.of(10, 30);

        System.out.println(now.isAfter(start));
        System.out.println(now.isBefore(start));
    }
}
```

実行結果：

```text
true
false
```

`10:30` は `9:00` より後なので、`isAfter()` が `true` になります。

---

## LocalDateTimeとは

`LocalDateTime` は、日付と時刻をまとめて扱うクラスです。

```java
2026-06-29T14:30
```

`LocalDateTime` を使うには、次の `import` が必要です。

```java
import java.time.LocalDateTime;
```

---

## 現在の日付と時刻を取得する

```java
import java.time.LocalDateTime;

public class Main {
    public static void main(String[] args) {
        LocalDateTime now = LocalDateTime.now();

        System.out.println(now);
    }
}
```

実行結果の例：

```text
2026-06-29T14:30:15.123456
```

日付と時刻の間に `T` が表示されます。

---

## 日付と時刻を指定して作る

```java
import java.time.LocalDateTime;

public class Main {
    public static void main(String[] args) {
        LocalDateTime dateTime = LocalDateTime.of(2026, 6, 29, 14, 30);

        System.out.println(dateTime);
    }
}
```

実行結果：

```text
2026-06-29T14:30
```

`LocalDateTime.of(年, 月, 日, 時, 分)` の順番で指定します。

---

## LocalDateとLocalTimeから作る

`LocalDate` と `LocalTime` を組み合わせて `LocalDateTime` を作れます。

```java
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;

public class Main {
    public static void main(String[] args) {
        LocalDate date = LocalDate.of(2026, 6, 29);
        LocalTime time = LocalTime.of(14, 30);

        LocalDateTime dateTime = LocalDateTime.of(date, time);

        System.out.println(dateTime);
    }
}
```

実行結果：

```text
2026-06-29T14:30
```

---

## 日付部分と時刻部分を取り出す

`LocalDateTime` から日付部分と時刻部分を取り出せます。

```java
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;

public class Main {
    public static void main(String[] args) {
        LocalDateTime dateTime = LocalDateTime.of(2026, 6, 29, 14, 30);

        LocalDate date = dateTime.toLocalDate();
        LocalTime time = dateTime.toLocalTime();

        System.out.println(date);
        System.out.println(time);
    }
}
```

実行結果：

```text
2026-06-29
14:30
```

---

## DateTimeFormatterとは

`DateTimeFormatter` は、日付や時刻の表示形式を指定するためのクラスです。

標準の表示では、次のように表示されます。

```text
2026-06-29
```

これを次のような形に変えられます。

```text
2026年06月29日
2026/06/29
06-29-2026
```

`DateTimeFormatter` を使うには、次の `import` が必要です。

```java
import java.time.format.DateTimeFormatter;
```

---

## 日付を好きな形式で表示する

```java
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class Main {
    public static void main(String[] args) {
        LocalDate date = LocalDate.of(2026, 6, 29);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy年MM月dd日");

        String text = date.format(formatter);

        System.out.println(text);
    }
}
```

実行結果：

```text
2026年06月29日
```

`format()` を使うと、指定した形式の文字列に変換できます。

---

## よく使う日付形式

| パターン | 表示例 |
|---|---|
| `yyyy-MM-dd` | `2026-06-29` |
| `yyyy/MM/dd` | `2026/06/29` |
| `yyyy年MM月dd日` | `2026年06月29日` |
| `MM/dd/yyyy` | `06/29/2026` |

例：

```java
DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd");
```

---

## 時刻を好きな形式で表示する

```java
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

public class Main {
    public static void main(String[] args) {
        LocalTime time = LocalTime.of(14, 30, 5);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH時mm分ss秒");

        String text = time.format(formatter);

        System.out.println(text);
    }
}
```

実行結果：

```text
14時30分05秒
```

---

## よく使う時刻形式

| パターン | 表示例 |
|---|---|
| `HH:mm` | `14:30` |
| `HH:mm:ss` | `14:30:05` |
| `HH時mm分` | `14時30分` |
| `HH時mm分ss秒` | `14時30分05秒` |

`HH` は24時間表記の時を表します。

---

## 日付と時刻を好きな形式で表示する

```java
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Main {
    public static void main(String[] args) {
        LocalDateTime dateTime = LocalDateTime.of(2026, 6, 29, 14, 30);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm");

        String text = dateTime.format(formatter);

        System.out.println(text);
    }
}
```

実行結果：

```text
2026/06/29 14:30
```

---

## 文字列から日付に変換する

文字列を `LocalDate` に変換するには、`parse()` を使います。

```java
import java.time.LocalDate;

public class Main {
    public static void main(String[] args) {
        String text = "2026-06-29";

        LocalDate date = LocalDate.parse(text);

        System.out.println(date);
    }
}
```

実行結果：

```text
2026-06-29
```

`yyyy-MM-dd` の形式なら、そのまま `LocalDate.parse()` で変換できます。

---

## 指定した形式の文字列を日付に変換する

`2026/06/29` のような文字列を変換する場合は、`DateTimeFormatter` を使います。

```java
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class Main {
    public static void main(String[] args) {
        String text = "2026/06/29";

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd");

        LocalDate date = LocalDate.parse(text, formatter);

        System.out.println(date);
    }
}
```

実行結果：

```text
2026-06-29
```

文字列の形式と、`ofPattern()` に指定する形式を合わせる必要があります。

---

## 文字列から時刻に変換する

```java
import java.time.LocalTime;

public class Main {
    public static void main(String[] args) {
        String text = "14:30";

        LocalTime time = LocalTime.parse(text);

        System.out.println(time);
    }
}
```

実行結果：

```text
14:30
```

---

## 文字列から日時に変換する

```java
import java.time.LocalDateTime;

public class Main {
    public static void main(String[] args) {
        String text = "2026-06-29T14:30";

        LocalDateTime dateTime = LocalDateTime.parse(text);

        System.out.println(dateTime);
    }
}
```

実行結果：

```text
2026-06-29T14:30
```

`LocalDateTime` の標準形式では、日付と時刻の間に `T` を使います。

---

## 独自形式の日時文字列を変換する

```java
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Main {
    public static void main(String[] args) {
        String text = "2026/06/29 14:30";

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm");

        LocalDateTime dateTime = LocalDateTime.parse(text, formatter);

        System.out.println(dateTime);
    }
}
```

実行結果：

```text
2026-06-29T14:30
```

---

## Periodとは

`Period` は、日付同士の差を扱うクラスです。

たとえば、誕生日から今日までの年数を求めるときに使えます。

`Period` を使うには、次の `import` が必要です。

```java
import java.time.Period;
```

---

## 日付同士の差を求める

```java
import java.time.LocalDate;
import java.time.Period;

public class Main {
    public static void main(String[] args) {
        LocalDate birthday = LocalDate.of(2000, 5, 10);
        LocalDate today = LocalDate.of(2026, 6, 29);

        Period period = Period.between(birthday, today);

        System.out.println(period.getYears());
        System.out.println(period.getMonths());
        System.out.println(period.getDays());
    }
}
```

実行結果：

```text
26
1
19
```

`Period.between(開始日, 終了日)` の順番で指定します。

---

## 年齢を計算する

```java
import java.time.LocalDate;
import java.time.Period;

public class Main {
    public static void main(String[] args) {
        LocalDate birthday = LocalDate.of(2000, 5, 10);
        LocalDate today = LocalDate.now();

        int age = Period.between(birthday, today).getYears();

        System.out.println("年齢: " + age);
    }
}
```

実行結果の例：

```text
年齢: 26
```

実行した日によって結果は変わります。

---

## Durationとは

`Duration` は、時刻同士の差を扱うクラスです。

たとえば、開始時刻から終了時刻まで何分あるかを求められます。

`Duration` を使うには、次の `import` が必要です。

```java
import java.time.Duration;
```

---

## 時刻同士の差を求める

```java
import java.time.LocalTime;
import java.time.Duration;

public class Main {
    public static void main(String[] args) {
        LocalTime start = LocalTime.of(9, 0);
        LocalTime end = LocalTime.of(10, 30);

        Duration duration = Duration.between(start, end);

        System.out.println(duration.toMinutes());
    }
}
```

実行結果：

```text
90
```

`9:00` から `10:30` までは90分です。

---

## 秒や時間で取得する

`Duration` では、差を時間・分・秒で取得できます。

```java
import java.time.LocalTime;
import java.time.Duration;

public class Main {
    public static void main(String[] args) {
        LocalTime start = LocalTime.of(9, 0);
        LocalTime end = LocalTime.of(10, 30);

        Duration duration = Duration.between(start, end);

        System.out.println(duration.toHours());
        System.out.println(duration.toMinutes());
        System.out.println(duration.toSeconds());
    }
}
```

実行結果：

```text
1
90
5400
```

| メソッド | 説明 |
|---|---|
| `toHours()` | 時間で取得 |
| `toMinutes()` | 分で取得 |
| `toSeconds()` | 秒で取得 |

---

## 予約時間の判定

現在時刻が予約時間より前か後かを判定してみます。

```java
import java.time.LocalDateTime;

public class Main {
    public static void main(String[] args) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime reservation = LocalDateTime.of(2026, 7, 1, 15, 0);

        if (now.isBefore(reservation)) {
            System.out.println("予約時間前です");
        } else if (now.isEqual(reservation)) {
            System.out.println("予約時間です");
        } else {
            System.out.println("予約時間を過ぎています");
        }
    }
}
```

実行結果の例：

```text
予約時間前です
```

`LocalDateTime` も `isBefore()` や `isAfter()` で比較できます。

---

## 日付の入力を受け取る

`Scanner` で日付文字列を入力し、`LocalDate` に変換できます。

```java
import java.time.LocalDate;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("日付を入力してください yyyy-MM-dd: ");
        String input = scanner.next();

        LocalDate date = LocalDate.parse(input);

        System.out.println("入力された日付: " + date);

        scanner.close();
    }
}
```

実行例：

```text
日付を入力してください yyyy-MM-dd: 2026-06-29
入力された日付: 2026-06-29
```

---

## 日付入力のエラーに注意

形式が間違っていると、例外が発生します。

```text
2026/06/29
```

`LocalDate.parse()` は標準では `yyyy-MM-dd` の形式を期待します。

次のように `try-catch` で処理すると安全です。

```java
import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        try {
            System.out.print("日付を入力してください yyyy-MM-dd: ");
            String input = scanner.next();

            LocalDate date = LocalDate.parse(input);

            System.out.println("入力された日付: " + date);
        } catch (DateTimeParseException e) {
            System.out.println("日付の形式が正しくありません");
        }

        scanner.close();
    }
}
```

---

## 古いDateクラスについて

Javaには、昔からある `Date` クラスもあります。

```java
java.util.Date
```

しかし、現在は `LocalDate`、`LocalTime`、`LocalDateTime` などの `java.time` パッケージを使うことが多いです。

これから新しく日付や時刻を扱う場合は、基本的に `java.time` を使うと覚えておきましょう。

---

## よく使うクラスまとめ

| クラス | 使う場面 |
|---|---|
| `LocalDate` | 日付だけ扱う |
| `LocalTime` | 時刻だけ扱う |
| `LocalDateTime` | 日付と時刻を扱う |
| `DateTimeFormatter` | 表示形式を変える |
| `Period` | 日付同士の差を扱う |
| `Duration` | 時刻同士の差を扱う |

---

## よくあるエラー

| エラー | 原因 | 解決方法 |
|---|---|---|
| `cannot find symbol` | `import` 忘れ | `import java.time.LocalDate;` などを書く |
| `DateTimeParseException` | 日付文字列の形式が違う | 文字列とフォーマットを合わせる |
| `DateTimeException` | 存在しない日付を作ろうとした | 月や日を確認する |
| 期待した表示形式にならない | `DateTimeFormatter` のパターンが違う | `yyyy/MM/dd` などを確認する |
| 元の日付が変わらない | `plusDays()` などの戻り値を受け取っていない | 新しい変数に代入する |
| `NullPointerException` | 日付変数が `null` | `null` でないか確認する |

---

## まとめ

- Javaでは `java.time` パッケージで日付と時刻を扱う
- `LocalDate` は日付を扱う
- `LocalTime` は時刻を扱う
- `LocalDateTime` は日付と時刻を扱う
- `now()` で現在の日付や時刻を取得できる
- `of()` で指定した日付や時刻を作成できる
- `plusDays()` や `minusDays()` で日付を加算・減算できる
- `isBefore()`、`isAfter()`、`isEqual()` で比較できる
- `DateTimeFormatter` を使うと表示形式を変更できる
- `parse()` を使うと文字列を日付や時刻に変換できる
- `Period` は日付同士の差を扱う
- `Duration` は時刻同士の差を扱う
- 新しく日付や時刻を扱う場合は、基本的に `java.time` を使う