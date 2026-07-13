# 第29章 マルチスレッド

## 学習目標

- スレッドとは何かを理解する
- マルチスレッドとは何かを理解する
- `Thread` クラスを使って処理を並行実行できる
- `Runnable` を使ってスレッドを作成できる
- ラムダ式でスレッド処理を書ける
- `sleep()` と `join()` の基本を理解する
- 複数スレッドで同じデータを扱うときの注意点を知る
- `synchronized` の基本を理解する

---

## スレッドとは

スレッドとは、プログラムの中で処理を実行する流れのことです。

これまで書いてきたJavaプログラムは、基本的に上から順番に処理が実行されていました。

```java
System.out.println("A");
System.out.println("B");
System.out.println("C");
```

実行結果：

```text
A
B
C
```

このように、1つの流れで順番に処理するのが基本です。

この処理の流れをスレッドと考えることができます。

---

## メインスレッド

Javaプログラムは、`main` メソッドから始まります。

```java
public static void main(String[] args) {
}
```

この `main` メソッドを実行するスレッドを、**メインスレッド** と呼びます。

普通にプログラムを書いているときは、ほとんどの場合、このメインスレッドだけで処理しています。

---

## マルチスレッドとは

マルチスレッドとは、複数のスレッドを使って処理を実行することです。

たとえば、次のような処理を同時に進めたい場合があります。

- ファイルをダウンロードしながら画面を操作する
- 音楽を再生しながら別の処理をする
- 複数のユーザーからのリクエストを処理する
- 重い計算を裏側で実行する
- タイマー処理を動かす

このような場面で、マルチスレッドが使われます。

---

## シングルスレッドのイメージ

シングルスレッドでは、1つの処理が終わってから次の処理に進みます。

```text
処理A → 処理B → 処理C
```

処理Aが長い場合、処理Bや処理Cは待たされます。

---

## マルチスレッドのイメージ

マルチスレッドでは、複数の処理を並行して進められます。

```text
スレッド1: 処理A → 処理A → 処理A
スレッド2: 処理B → 処理B → 処理B
```

実際にはコンピュータの仕組みによって細かく切り替えながら動きます。

そのため、完全に同時ではなくても、同時に動いているように見えます。

---

## Threadクラス

Javaでスレッドを扱うには、`Thread` クラスを使えます。

スレッドで実行したい処理は、`run()` メソッドに書きます。

```java
class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("スレッドで実行しています");
    }
}
```

---

## Threadクラスを継承する例

```java
public class Main {
    public static void main(String[] args) {
        MyThread thread = new MyThread();

        thread.start();

        System.out.println("mainメソッドの処理です");
    }
}

class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("別スレッドの処理です");
    }
}
```

実行結果の例：

```text
mainメソッドの処理です
別スレッドの処理です
```

または、次のようになることもあります。

```text
別スレッドの処理です
mainメソッドの処理です
```

マルチスレッドでは、実行順序が毎回同じとは限りません。

---

## start()を使う

スレッドを開始するには、`start()` を使います。

```java
thread.start();
```

`start()` を呼ぶと、新しいスレッドが作られ、その中で `run()` が実行されます。

---

## run()を直接呼ばない

次のように `run()` を直接呼ぶと、新しいスレッドは作られません。

```java
thread.run();
```

これは普通のメソッド呼び出しと同じです。

新しいスレッドとして動かしたい場合は、必ず `start()` を使います。

---

## start()とrun()の違い

| 呼び出し | 意味 |
|---|---|
| `start()` | 新しいスレッドを開始する |
| `run()` | 普通のメソッドとして実行する |

正しい例：

```java
thread.start();
```

避けたい例：

```java
thread.run();
```

---

## 複数のスレッドを作る

スレッドは複数作ることができます。

```java
public class Main {
    public static void main(String[] args) {
        MyThread thread1 = new MyThread("A");
        MyThread thread2 = new MyThread("B");

        thread1.start();
        thread2.start();
    }
}

class MyThread extends Thread {
    String name;

    MyThread(String name) {
        this.name = name;
    }

    @Override
    public void run() {
        for (int i = 1; i <= 5; i++) {
            System.out.println(name + ": " + i);
        }
    }
}
```

実行結果の例：

```text
A: 1
B: 1
A: 2
A: 3
B: 2
B: 3
A: 4
B: 4
A: 5
B: 5
```

表示順は実行するたびに変わることがあります。

---

## スレッドの実行順序は決まっていない

マルチスレッドでは、どのスレッドが先に実行されるかは基本的に決まっていません。

次のコードでも：

```java
thread1.start();
thread2.start();
```

必ず `thread1` が先に全部終わるわけではありません。

スレッドは切り替わりながら動くため、実行順序に依存したコードを書くと問題が起きやすくなります。

---

## sleep()

`sleep()` は、指定した時間だけスレッドを一時停止するメソッドです。

```java
Thread.sleep(1000);
```

`1000` は1000ミリ秒、つまり1秒です。

`sleep()` を使うと、一定時間待ってから次の処理を実行できます。

---

## sleep()の例

```java
public class Main {
    public static void main(String[] args) {
        CountThread thread = new CountThread();

        thread.start();
    }
}

class CountThread extends Thread {
    @Override
    public void run() {
        for (int i = 1; i <= 5; i++) {
            System.out.println(i);

            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                System.out.println("スレッドが中断されました");
            }
        }
    }
}
```

実行結果の例：

```text
1
2
3
4
5
```

数字が1秒ごとに表示されます。

---

## InterruptedException

`Thread.sleep()` は、`InterruptedException` が発生する可能性があります。

そのため、`try-catch` で囲む必要があります。

```java
try {
    Thread.sleep(1000);
} catch (InterruptedException e) {
    System.out.println("中断されました");
}
```

この章では、まず `sleep()` を使うときは `try-catch` が必要だと覚えておきましょう。

---

## Runnableとは

`Runnable` は、スレッドで実行する処理を表すインターフェースです。

```java
class MyTask implements Runnable {
    @Override
    public void run() {
        System.out.println("Runnableの処理です");
    }
}
```

`Runnable` を使うと、処理とスレッドを分けて考えられます。

---

## Runnableを使う例

```java
public class Main {
    public static void main(String[] args) {
        MyTask task = new MyTask();

        Thread thread = new Thread(task);

        thread.start();
    }
}

class MyTask implements Runnable {
    @Override
    public void run() {
        System.out.println("Runnableで実行しています");
    }
}
```

実行結果：

```text
Runnableで実行しています
```

`MyTask` は実行したい処理です。

`Thread` は、その処理を別スレッドで実行するためのものです。

---

## Thread継承とRunnableの違い

スレッドの作り方には、主に次の2つがあります。

| 方法 | 書き方 |
|---|---|
| `Thread` を継承する | `class MyThread extends Thread` |
| `Runnable` を実装する | `class MyTask implements Runnable` |

一般的には、`Runnable` を使うことが多いです。

理由は、Javaではクラスの継承が1つしかできないためです。

```java
class MyThread extends Thread {
}
```

このように `Thread` を継承すると、ほかのクラスを継承できなくなります。

一方、`Runnable` はインターフェースなので、ほかのクラスを継承しながら使うこともできます。

---

## Runnableとラムダ式

`Runnable` は抽象メソッドを1つだけ持つ関数型インターフェースです。

そのため、ラムダ式で書けます。

```java
Runnable task = () -> {
    System.out.println("ラムダ式の処理です");
};
```

---

## ラムダ式でスレッドを作る

```java
public class Main {
    public static void main(String[] args) {
        Thread thread = new Thread(() -> {
            System.out.println("ラムダ式でスレッドを実行しています");
        });

        thread.start();
    }
}
```

実行結果：

```text
ラムダ式でスレッドを実行しています
```

短い処理なら、ラムダ式を使うとシンプルに書けます。

---

## ラムダ式でカウントする

```java
public class Main {
    public static void main(String[] args) {
        Thread thread = new Thread(() -> {
            for (int i = 1; i <= 5; i++) {
                System.out.println(i);
            }
        });

        thread.start();
    }
}
```

実行結果：

```text
1
2
3
4
5
```

`Runnable` を別クラスとして作らず、その場で処理を書いています。

---

## 複数のラムダ式スレッド

```java
public class Main {
    public static void main(String[] args) {
        Thread thread1 = new Thread(() -> {
            for (int i = 1; i <= 5; i++) {
                System.out.println("A: " + i);
            }
        });

        Thread thread2 = new Thread(() -> {
            for (int i = 1; i <= 5; i++) {
                System.out.println("B: " + i);
            }
        });

        thread1.start();
        thread2.start();
    }
}
```

実行結果の例：

```text
A: 1
B: 1
A: 2
B: 2
B: 3
A: 3
A: 4
B: 4
A: 5
B: 5
```

これも表示順は毎回同じとは限りません。

---

## join()

`join()` は、スレッドが終わるまで待つためのメソッドです。

```java
thread.join();
```

`join()` を使うと、そのスレッドの処理が終わるまで、呼び出し元のスレッドが待ちます。

---

## join()を使わない場合

```java
public class Main {
    public static void main(String[] args) {
        Thread thread = new Thread(() -> {
            for (int i = 1; i <= 5; i++) {
                System.out.println("スレッド: " + i);
            }
        });

        thread.start();

        System.out.println("main終了");
    }
}
```

実行結果の例：

```text
main終了
スレッド: 1
スレッド: 2
スレッド: 3
スレッド: 4
スレッド: 5
```

`main終了` が先に表示されることがあります。

メインスレッドは、別スレッドの終了を待たずに進むからです。

---

## join()を使う場合

```java
public class Main {
    public static void main(String[] args) {
        Thread thread = new Thread(() -> {
            for (int i = 1; i <= 5; i++) {
                System.out.println("スレッド: " + i);
            }
        });

        thread.start();

        try {
            thread.join();
        } catch (InterruptedException e) {
            System.out.println("中断されました");
        }

        System.out.println("main終了");
    }
}
```

実行結果：

```text
スレッド: 1
スレッド: 2
スレッド: 3
スレッド: 4
スレッド: 5
main終了
```

`thread.join()` によって、別スレッドが終わるまで待っています。

---

## スレッド名

スレッドには名前を付けることができます。

```java
Thread thread = new Thread(task, "Worker-1");
```

また、現在実行中のスレッド名は次のように取得できます。

```java
Thread.currentThread().getName()
```

---

## スレッド名を表示する

```java
public class Main {
    public static void main(String[] args) {
        Thread thread = new Thread(() -> {
            String name = Thread.currentThread().getName();

            System.out.println("実行中のスレッド: " + name);
        }, "Worker-1");

        thread.start();

        System.out.println("mainのスレッド: " + Thread.currentThread().getName());
    }
}
```

実行結果の例：

```text
mainのスレッド: main
実行中のスレッド: Worker-1
```

メインスレッドの名前は通常 `main` です。

---

## スレッドでよくある問題

マルチスレッドでは、複数のスレッドが同じデータを同時に扱うことがあります。

このとき、思わぬ結果になることがあります。

たとえば、複数のスレッドで同じカウンターを増やす場合を考えます。

---

## 共有データの例

```java
public class Main {
    public static void main(String[] args) {
        Counter counter = new Counter();

        Thread thread1 = new Thread(() -> {
            for (int i = 0; i < 10000; i++) {
                counter.increment();
            }
        });

        Thread thread2 = new Thread(() -> {
            for (int i = 0; i < 10000; i++) {
                counter.increment();
            }
        });

        thread1.start();
        thread2.start();

        try {
            thread1.join();
            thread2.join();
        } catch (InterruptedException e) {
            System.out.println("中断されました");
        }

        System.out.println(counter.count);
    }
}

class Counter {
    int count = 0;

    void increment() {
        count++;
    }
}
```

期待する結果は次の値です。

```text
20000
```

しかし、実行すると `20000` より小さい値になることがあります。

---

## なぜ結果がずれるのか

`count++` は、実は1つの処理ではありません。

ざっくり分けると、次のような処理です。

```text
1. countの値を読む
2. 1を足す
3. countに戻す
```

複数のスレッドが同時にこの処理をすると、値の更新がぶつかることがあります。

このような問題を **競合状態** と呼びます。

---

## 競合状態

競合状態とは、複数のスレッドが同じデータを同時に変更することで、結果が不安定になる状態です。

```text
スレッドA: countを読む
スレッドB: countを読む
スレッドA: 1を足して保存
スレッドB: 1を足して保存
```

本当は2回増えるはずなのに、1回分しか増えないことがあります。

---

## synchronized

`synchronized` を使うと、同時に実行されると困る処理を1つずつ実行させることができます。

```java
synchronized void increment() {
    count++;
}
```

このように書くと、複数のスレッドが同時に `increment()` を実行しないようになります。

---

## synchronizedの例

```java
public class Main {
    public static void main(String[] args) {
        Counter counter = new Counter();

        Thread thread1 = new Thread(() -> {
            for (int i = 0; i < 10000; i++) {
                counter.increment();
            }
        });

        Thread thread2 = new Thread(() -> {
            for (int i = 0; i < 10000; i++) {
                counter.increment();
            }
        });

        thread1.start();
        thread2.start();

        try {
            thread1.join();
            thread2.join();
        } catch (InterruptedException e) {
            System.out.println("中断されました");
        }

        System.out.println(counter.getCount());
    }
}

class Counter {
    private int count = 0;

    synchronized void increment() {
        count++;
    }

    int getCount() {
        return count;
    }
}
```

実行結果：

```text
20000
```

`synchronized` によって、`increment()` が安全に実行されます。

---

## synchronizedを使う場面

`synchronized` は、複数スレッドで共有するデータを変更するときに使います。

たとえば：

- 共有カウンターを増やす
- 共有リストに値を追加する
- 共有設定を書き換える
- 残高を変更する

複数スレッドから同じデータを変更する場合は、注意が必要です。

---

## synchronizedを使いすぎない

`synchronized` は便利ですが、使いすぎると処理が遅くなることがあります。

なぜなら、同時に実行できる処理を1つずつに制限するからです。

そのため、本当に共有データを守る必要がある場所だけに使います。

---

## デッドロック

マルチスレッドでは、デッドロックという問題が起きることがあります。

デッドロックとは、複数のスレッドがお互いに相手の処理が終わるのを待ち続け、処理が進まなくなる状態です。

```text
スレッドA: スレッドBを待つ
スレッドB: スレッドAを待つ
```

この状態になると、どちらも先に進めません。

この章では詳しく扱いませんが、マルチスレッドでは「待ち合わせ」が複雑になることがあると覚えておきましょう。

---

## ExecutorService

実際の開発では、`Thread` を直接たくさん作るより、`ExecutorService` を使うことがあります。

`ExecutorService` は、スレッドを管理してくれる仕組みです。

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
```

---

## ExecutorServiceの例

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Main {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(2);

        executor.submit(() -> {
            System.out.println("タスク1");
        });

        executor.submit(() -> {
            System.out.println("タスク2");
        });

        executor.shutdown();
    }
}
```

実行結果の例：

```text
タスク1
タスク2
```

`newFixedThreadPool(2)` は、最大2つのスレッドを使って処理するという意味です。

---

## shutdown()

`ExecutorService` を使い終わったら、`shutdown()` を呼び出します。

```java
executor.shutdown();
```

これにより、新しいタスクの受付を終了します。

`ExecutorService` は実用的ですが、最初は `Thread` と `Runnable` の基本を理解してからで大丈夫です。

---

## マルチスレッドが向いている場面

マルチスレッドは、次のような処理に向いています。

| 場面 | 例 |
|---|---|
| 時間がかかる処理 | ファイル読み込み、通信、重い計算 |
| 裏側で動かしたい処理 | ログ保存、通知、タイマー |
| 複数の仕事を並行したい | 複数ユーザーの処理 |
| 待ち時間がある処理 | ダウンロード、API通信 |

---

## マルチスレッドが向いていない場面

次のような場合は、無理にマルチスレッドにしなくてもよいです。

- 処理が短くて単純
- 順番に実行する必要がある
- 共有データが多く、管理が難しい
- 初心者向けの小さなプログラム

マルチスレッドは便利ですが、コードが複雑になりやすいです。

必要な場面で使うことが大切です。

---

## スレッドを使うときの注意点

スレッドを使うときは、次の点に注意しましょう。

| 注意点 | 説明 |
|---|---|
| 実行順序は決まらない | 表示順や処理順が変わることがある |
| 共有データに注意 | 同じ変数を同時に変更すると結果がずれる |
| 例外処理が必要 | `sleep()` や `join()` では `InterruptedException` が出る |
| 終了待ちが必要な場合がある | `join()` を使う |
| 複雑にしすぎない | 読みにくいコードになりやすい |

---

## よくあるエラー

| エラー | 原因 | 解決方法 |
|---|---|---|
| `run()` を呼んでも並行実行されない | `run()` を直接呼んでいる | `start()` を使う |
| `IllegalThreadStateException` | 同じThreadを2回 `start()` した | 新しいThreadを作る |
| `InterruptedException` | `sleep()` や `join()` で発生する可能性がある | `try-catch` で処理する |
| 結果が毎回変わる | 複数スレッドで共有データを変更している | `synchronized` などで守る |
| 表示順がバラバラ | スレッドの実行順序は決まっていない | 順序が必要なら `join()` などを使う |
| プログラムが終わらない | スレッドやExecutorServiceが残っている | `shutdown()` などで終了させる |

---

## まとめ

- スレッドは、プログラムの処理の流れ
- Javaプログラムは、通常 `main` メソッドをメインスレッドで実行する
- マルチスレッドは、複数のスレッドで処理を並行して進める仕組み
- `Thread` クラスを継承すると、スレッドを作れる
- スレッドを開始するには `start()` を使う
- `run()` を直接呼ぶと、新しいスレッドにはならない
- `Runnable` は、スレッドで実行する処理を表すインターフェース
- `Runnable` はラムダ式で書ける
- `Thread.sleep()` で一定時間待てる
- `join()` でスレッドの終了を待てる
- マルチスレッドでは実行順序が毎回同じとは限らない
- 複数スレッドで共有データを変更すると、結果がずれることがある
- `synchronized` を使うと、共有データを安全に扱いやすくなる
- 実際の開発では `ExecutorService` を使ってスレッドを管理することもある