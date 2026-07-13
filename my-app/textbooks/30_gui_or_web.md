# 第30章 GUIとWebアプリの入口

## 学習目標

- CUI、GUI、Webアプリの違いを理解する
- JavaでGUIアプリを作る基本を知る
- `JFrame`、`JLabel`、`JButton` の基本を理解する
- ボタンを押したときの処理を書ける
- Webアプリの基本的な仕組みを理解する
- ブラウザ、サーバー、リクエスト、レスポンスの関係を理解する
- JavaがGUIアプリやWebアプリで使われるイメージを持つ

---

## これまで作ってきたプログラム

これまでの章では、主にターミナルで動くプログラムを書いてきました。

```java
System.out.println("Hello");
```

実行結果：

```text
Hello
```

このように、文字で入力したり、文字で結果を表示したりするプログラムを **CUIアプリ** と呼ぶことがあります。

CUIは、Character User Interface の略です。

---

## CUIアプリとは

CUIアプリは、文字を中心に操作するアプリです。

たとえば：

```text
名前を入力してください: Taro
こんにちは、Taroさん
```

CUIアプリはシンプルで、Javaの基礎を学ぶにはとても向いています。

ただし、実際によく使うアプリには、ボタンや入力欄などの画面があることも多いです。

---

## GUIアプリとは

GUIアプリは、画面・ボタン・入力欄などを使って操作するアプリです。

GUIは、Graphical User Interface の略です。

たとえば：

- 電卓アプリ
- メモ帳アプリ
- 音楽プレイヤー
- 画像編集ソフト
- デスクトップアプリ

GUIアプリでは、ユーザーがボタンを押したり、文字を入力したりして操作します。

---

## Webアプリとは

Webアプリは、ブラウザから使うアプリです。

たとえば：

- 検索サイト
- SNS
- ネットショップ
- 予約システム
- 学習管理システム
- ブログ
- チャットアプリ

Webアプリでは、ユーザーはブラウザを使って画面を操作します。

裏側では、サーバー上でJavaなどのプログラムが動いていることがあります。

---

## CUI、GUI、Webアプリの違い

| 種類 | 操作方法 | 例 |
|---|---|---|
| CUI | ターミナルで文字入力 | 練習用プログラム |
| GUI | ボタンや入力欄で操作 | 電卓、メモ帳 |
| Webアプリ | ブラウザで操作 | SNS、予約サイト |

Javaでは、これらのいろいろな種類のアプリを作れます。

---

# GUIアプリの基本

## JavaでGUIアプリを作る

JavaでGUIアプリを作る方法はいくつかあります。

代表的なものに、次のようなものがあります。

| 技術 | 説明 |
|---|---|
| Swing | Javaに標準で用意されているGUIライブラリ |
| JavaFX | より新しいGUIアプリ向けの技術 |
| AWT | 古くからあるGUIライブラリ |

この章では、Javaだけで試しやすい **Swing** を使って、GUIアプリの基本を見ていきます。

---

## Swingとは

Swingは、Javaで画面を作るためのライブラリです。

ボタン、ラベル、入力欄、ウィンドウなどを作れます。

Swingを使うには、次のような `import` を使います。

```java
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JButton;
```

`javax.swing` パッケージには、GUI部品がたくさん用意されています。

---

## 最小のGUIアプリ

まずは、ウィンドウを表示するだけのプログラムです。

```java
import javax.swing.JFrame;

public class Main {
    public static void main(String[] args) {
        JFrame frame = new JFrame("はじめてのGUI");

        frame.setSize(300, 200);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setVisible(true);
    }
}
```

このプログラムを実行すると、タイトルが「はじめてのGUI」のウィンドウが表示されます。

---

## JFrameとは

`JFrame` は、GUIアプリのウィンドウを表すクラスです。

```java
JFrame frame = new JFrame("はじめてのGUI");
```

`new JFrame("はじめてのGUI")` の `"はじめてのGUI"` は、ウィンドウのタイトルです。

---

## ウィンドウサイズを指定する

ウィンドウのサイズは `setSize()` で指定します。

```java
frame.setSize(300, 200);
```

この場合、幅300、高さ200のウィンドウになります。

```java
frame.setSize(幅, 高さ);
```

---

## 閉じるボタンの動作を指定する

ウィンドウの右上にある閉じるボタンを押したときの動作は、次のように指定します。

```java
frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
```

`JFrame.EXIT_ON_CLOSE` は、ウィンドウを閉じたらプログラムも終了するという意味です。

これを書かないと、ウィンドウを閉じてもプログラムが終了しないことがあります。

---

## ウィンドウを表示する

ウィンドウを表示するには、`setVisible(true)` を使います。

```java
frame.setVisible(true);
```

`true` は「表示する」という意味です。

GUIでは、部品を作ったあと、最後に表示する流れがよくあります。

---

## ラベルを表示する

画面に文字を表示するには、`JLabel` を使います。

```java
import javax.swing.JFrame;
import javax.swing.JLabel;

public class Main {
    public static void main(String[] args) {
        JFrame frame = new JFrame("ラベルの例");

        JLabel label = new JLabel("こんにちは、Java GUI");

        frame.add(label);

        frame.setSize(300, 200);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setVisible(true);
    }
}
```

`JLabel` は、画面に文字を表示するための部品です。

---

## JLabelとは

`JLabel` は、文字や画像を表示するためのGUI部品です。

```java
JLabel label = new JLabel("こんにちは");
```

作ったラベルは、ウィンドウに追加します。

```java
frame.add(label);
```

これで、ウィンドウの中に文字が表示されます。

---

## ボタンを表示する

ボタンを表示するには、`JButton` を使います。

```java
import javax.swing.JFrame;
import javax.swing.JButton;

public class Main {
    public static void main(String[] args) {
        JFrame frame = new JFrame("ボタンの例");

        JButton button = new JButton("押してください");

        frame.add(button);

        frame.setSize(300, 200);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setVisible(true);
    }
}
```

実行すると、「押してください」と書かれたボタンが表示されます。

---

## JButtonとは

`JButton` は、ボタンを表すGUI部品です。

```java
JButton button = new JButton("押してください");
```

`"押してください"` は、ボタンに表示される文字です。

---

## ボタンを押したときの処理

ボタンを押したときの処理は、`addActionListener()` を使って書きます。

```java
button.addActionListener(e -> {
    System.out.println("ボタンが押されました");
});
```

これは、ボタンが押されたら `{}` の中の処理を実行するという意味です。

ここではラムダ式を使っています。

---

## ボタンを押すと文字を表示する

```java
import javax.swing.JFrame;
import javax.swing.JButton;

public class Main {
    public static void main(String[] args) {
        JFrame frame = new JFrame("ボタンイベント");

        JButton button = new JButton("押してください");

        button.addActionListener(e -> {
            System.out.println("ボタンが押されました");
        });

        frame.add(button);

        frame.setSize(300, 200);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setVisible(true);
    }
}
```

ボタンを押すと、ターミナルに次のように表示されます。

```text
ボタンが押されました
```

---

## イベントとは

GUIアプリでは、ユーザーの操作によって処理が実行されます。

たとえば：

- ボタンを押す
- 文字を入力する
- マウスを動かす
- ウィンドウを閉じる
- メニューを選ぶ

このような操作を **イベント** と呼びます。

ボタンが押されたときの処理を書くことを、イベント処理と呼びます。

---

## ラベルの文字を変更する

ボタンを押したときに、ラベルの文字を変更してみます。

```java
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JButton;
import java.awt.FlowLayout;

public class Main {
    public static void main(String[] args) {
        JFrame frame = new JFrame("ラベル変更");

        frame.setLayout(new FlowLayout());

        JLabel label = new JLabel("まだ押されていません");
        JButton button = new JButton("押す");

        button.addActionListener(e -> {
            label.setText("ボタンが押されました");
        });

        frame.add(label);
        frame.add(button);

        frame.setSize(300, 200);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setVisible(true);
    }
}
```

ボタンを押すと、ラベルの文字が変わります。

---

## setText()

`JLabel` の文字を変更するには、`setText()` を使います。

```java
label.setText("ボタンが押されました");
```

`setText()` は、画面に表示されている文字を変更するメソッドです。

---

## FlowLayoutとは

`FlowLayout` は、部品を左から右へ順番に並べるレイアウトです。

```java
frame.setLayout(new FlowLayout());
```

GUIアプリでは、部品をどのように配置するかを指定する必要があります。

この配置方法を **レイアウト** と呼びます。

`FlowLayout` はシンプルなので、最初の学習に向いています。

---

## 入力欄を使う

文字を入力する欄を作るには、`JTextField` を使います。

```java
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JButton;
import javax.swing.JTextField;
import java.awt.FlowLayout;

public class Main {
    public static void main(String[] args) {
        JFrame frame = new JFrame("入力欄の例");

        frame.setLayout(new FlowLayout());

        JTextField textField = new JTextField(10);
        JButton button = new JButton("表示");
        JLabel label = new JLabel("ここに表示されます");

        button.addActionListener(e -> {
            String text = textField.getText();
            label.setText(text);
        });

        frame.add(textField);
        frame.add(button);
        frame.add(label);

        frame.setSize(350, 200);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setVisible(true);
    }
}
```

入力欄に文字を入れてボタンを押すと、ラベルに入力内容が表示されます。

---

## JTextFieldとは

`JTextField` は、1行の文字入力欄です。

```java
JTextField textField = new JTextField(10);
```

`10` は、入力欄のだいたいの幅を表します。

---

## 入力された文字を取得する

`JTextField` に入力された文字は、`getText()` で取得できます。

```java
String text = textField.getText();
```

取得した文字列は、普通の `String` として扱えます。

---

## 簡単なあいさつアプリ

入力された名前を使って、あいさつを表示するアプリを作ってみます。

```java
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JButton;
import javax.swing.JTextField;
import java.awt.FlowLayout;

public class Main {
    public static void main(String[] args) {
        JFrame frame = new JFrame("あいさつアプリ");

        frame.setLayout(new FlowLayout());

        JLabel inputLabel = new JLabel("名前:");
        JTextField nameField = new JTextField(10);
        JButton button = new JButton("あいさつ");
        JLabel resultLabel = new JLabel("結果がここに表示されます");

        button.addActionListener(e -> {
            String name = nameField.getText();
            resultLabel.setText("こんにちは、" + name + "さん");
        });

        frame.add(inputLabel);
        frame.add(nameField);
        frame.add(button);
        frame.add(resultLabel);

        frame.setSize(400, 200);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setVisible(true);
    }
}
```

このアプリでは、次の流れで処理が進みます。

```text
1. 名前を入力する
2. ボタンを押す
3. 入力欄から文字を取得する
4. ラベルに結果を表示する
```

---

## 数値を扱うGUIアプリ

入力欄の内容は文字列です。

数値として扱いたい場合は、`Integer.parseInt()` などで変換します。

```java
int number = Integer.parseInt(text);
```

ただし、数値以外が入力されると例外が発生します。

---

## 簡単な足し算アプリ

```java
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JButton;
import javax.swing.JTextField;
import java.awt.FlowLayout;

public class Main {
    public static void main(String[] args) {
        JFrame frame = new JFrame("足し算アプリ");

        frame.setLayout(new FlowLayout());

        JTextField field1 = new JTextField(5);
        JTextField field2 = new JTextField(5);
        JButton button = new JButton("足し算");
        JLabel resultLabel = new JLabel("結果:");

        button.addActionListener(e -> {
            try {
                int number1 = Integer.parseInt(field1.getText());
                int number2 = Integer.parseInt(field2.getText());

                int result = number1 + number2;

                resultLabel.setText("結果: " + result);
            } catch (NumberFormatException ex) {
                resultLabel.setText("数値を入力してください");
            }
        });

        frame.add(field1);
        frame.add(field2);
        frame.add(button);
        frame.add(resultLabel);

        frame.setSize(400, 200);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setVisible(true);
    }
}
```

入力欄に数値を入れてボタンを押すと、足し算の結果が表示されます。

数値以外を入力した場合は、エラーメッセージを表示します。

---

## GUIアプリでこれまでの知識を使う

GUIアプリでも、これまで学んだJavaの知識を使います。

| 学んだ内容 | GUIでの使い道 |
|---|---|
| 変数 | 入力値や結果を保存する |
| if文 | 入力チェックをする |
| メソッド | 処理を分ける |
| クラス | 画面やデータを整理する |
| 例外処理 | 入力ミスに対応する |
| ラムダ式 | ボタンイベントを書く |
| コレクション | 一覧データを管理する |

GUIは特別なものに見えますが、中身では普通のJava文法をたくさん使います。

---

## GUIアプリの注意点

GUIアプリでは、次の点に注意しましょう。

| 注意点 | 説明 |
|---|---|
| 部品が多くなる | コードが長くなりやすい |
| 配置を考える必要がある | レイアウトを指定する |
| イベント処理が必要 | ボタンなどの操作に反応する |
| 入力チェックが必要 | ユーザーは予想外の入力をする |
| 処理を分けると読みやすい | メソッドやクラスに分ける |

最初は小さな画面から作るのがおすすめです。

---

# Webアプリの基本

## Webアプリの仕組み

Webアプリは、ブラウザとサーバーがやり取りして動きます。

```text
ブラウザ  →  サーバー
ブラウザ  ←  サーバー
```

ユーザーがブラウザでボタンを押したり、URLを開いたりすると、ブラウザからサーバーにリクエストが送られます。

サーバーはリクエストを受け取り、結果をレスポンスとして返します。

---

## ブラウザとは

ブラウザは、Webページを見るためのアプリです。

たとえば：

- Google Chrome
- Safari
- Microsoft Edge
- Firefox

ユーザーはブラウザを使って、Webアプリを操作します。

---

## サーバーとは

サーバーは、ブラウザからのリクエストを受け取り、結果を返すコンピュータやプログラムです。

Webアプリでは、サーバー側でJavaプログラムが動いていることがあります。

たとえば、次のような処理をします。

- ログインできるか確認する
- 商品一覧を取得する
- 予約情報を保存する
- データベースから情報を取り出す
- HTMLやJSONを返す

---

## リクエストとは

リクエストとは、ブラウザからサーバーへ送るお願いのことです。

たとえば：

```text
このページを見せてください
この商品を検索してください
この内容で登録してください
```

Webアプリでは、ブラウザがサーバーにリクエストを送ります。

---

## レスポンスとは

レスポンスとは、サーバーからブラウザへ返す結果のことです。

たとえば：

```text
HTMLページ
検索結果
登録完了メッセージ
エラーメッセージ
JSONデータ
```

サーバーはリクエストを処理し、レスポンスを返します。

---

## HTTPとは

HTTPは、ブラウザとサーバーが通信するときのルールです。

Webアプリでは、主にHTTPを使ってやり取りします。

代表的なHTTPメソッドには、次のようなものがあります。

| メソッド | 役割 |
|---|---|
| GET | データを取得する |
| POST | データを送信する |
| PUT | データを更新する |
| DELETE | データを削除する |

最初は、`GET` と `POST` をよく使います。

---

## GET

`GET` は、データを取得するときに使います。

たとえば：

```text
商品一覧を見る
検索結果を見る
ユーザー情報を見る
```

ブラウザでURLを開くときは、多くの場合 `GET` リクエストです。

---

## POST

`POST` は、データを送信するときに使います。

たとえば：

```text
ログインする
会員登録する
お問い合わせ内容を送る
商品を注文する
```

入力フォームの内容をサーバーに送るときによく使われます。

---

## WebアプリでJavaが担当するところ

Webアプリでは、画面そのものはHTML、CSS、JavaScriptで作ることが多いです。

Javaは、主にサーバー側の処理を担当します。

```text
ブラウザ
  HTML / CSS / JavaScript
        ↓
サーバー
  Java
        ↓
データベース
```

Javaは、ユーザーからのリクエストを受け取り、必要な処理を行い、結果を返します。

---

## HTMLとは

HTMLは、Webページの内容を表す言語です。

たとえば：

```html
<h1>Hello</h1>
<p>こんにちは</p>
```

HTMLは、見出し、文章、ボタン、入力欄などを表します。

Javaとは別の言語ですが、Webアプリを作るときにはよく一緒に使われます。

---

## CSSとは

CSSは、Webページの見た目を整える言語です。

たとえば：

```css
h1 {
    color: red;
}
```

文字の色、大きさ、配置、余白などを指定します。

---

## JavaScriptとは

JavaScriptは、ブラウザ上で動くプログラミング言語です。

たとえば：

- ボタンを押したときに画面を変える
- 入力チェックをする
- サーバーと通信する
- 画面を動的に変更する

名前は似ていますが、JavaとJavaScriptは別の言語です。

---

## JavaとJavaScriptは別物

JavaとJavaScriptは、名前が似ていますが別の言語です。

| 言語 | 主な使い道 |
|---|---|
| Java | サーバー側、Android、業務アプリなど |
| JavaScript | ブラウザ上の動き、Web画面など |

Webアプリでは、Javaがサーバー側、JavaScriptがブラウザ側を担当することがよくあります。

---

## JavaのWeb開発で使われるもの

JavaでWebアプリを作るときは、次のような技術が使われます。

| 技術 | 説明 |
|---|---|
| Servlet | JavaでWebリクエストを処理する基本技術 |
| JSP | HTMLの中にJavaの処理を埋め込む技術 |
| Spring Boot | Webアプリを作りやすくするフレームワーク |
| Tomcat | JavaのWebアプリを動かすサーバー |
| JDBC | Javaからデータベースを扱う技術 |

この章では詳しく扱いませんが、JavaでWeb開発をする場合によく出てくる名前です。

---

## フレームワークとは

フレームワークとは、アプリ開発を楽にするための土台です。

Webアプリでは、毎回すべてを自分で作ると大変です。

たとえば：

- URLごとに処理を分ける
- フォーム入力を受け取る
- データベースと接続する
- HTMLを返す
- JSONを返す
- エラー処理をする

フレームワークを使うと、このような処理を作りやすくなります。

JavaのWeb開発では、Spring Bootがよく使われます。

---

## Webアプリの処理の流れ

たとえば、ログイン画面では次のような流れになります。

```text
1. ユーザーがIDとパスワードを入力する
2. ブラウザがサーバーに送信する
3. JavaプログラムがIDとパスワードを確認する
4. データベースの情報と照合する
5. 成功ならログイン後の画面を返す
6. 失敗ならエラーメッセージを返す
```

このように、Webアプリではブラウザ、サーバー、データベースが協力して動きます。

---

## Webアプリとデータベース

Webアプリでは、データベースを使うことが多いです。

たとえば：

- ユーザー情報
- 商品情報
- 注文履歴
- 投稿内容
- 予約情報
- 点数データ

これらの情報を保存するために、データベースを使います。

次の章では、Javaからデータベースを扱う基本を学びます。

---

## GUIアプリとWebアプリの違い

| 比較 | GUIアプリ | Webアプリ |
|---|---|---|
| 操作する場所 | 自分のPC上の画面 | ブラウザ |
| 画面 | JavaのGUI部品など | HTML、CSS、JavaScript |
| 通信 | 基本的に不要なことが多い | ブラウザとサーバーが通信する |
| データ保存 | ファイルやDB | DBを使うことが多い |
| 配布 | アプリを配布する | URLでアクセスできる |

GUIアプリは、自分のPCで直接動くアプリに向いています。

Webアプリは、複数のユーザーがブラウザから使うアプリに向いています。

---

## どちらを学ぶべきか

目的によって、学ぶ方向が変わります。

| 作りたいもの | 向いている方向 |
|---|---|
| 電卓やメモ帳のようなデスクトップアプリ | GUI |
| 社内システムや予約サイト | Web |
| ネットショップ | Web |
| 学習用の小さな画面アプリ | GUI |
| 多くの人がブラウザで使うサービス | Web |

Javaの仕事では、Webアプリ開発で使われることが多いです。

ただし、GUIアプリを作ると、イベント処理や画面の考え方を学びやすいです。

---

## この章で大切なこと

この章では、GUIやWebアプリを完璧に作れるようになることが目的ではありません。

大切なのは、これまで学んだJavaの基礎が、実際のアプリ作りにどうつながるかを知ることです。

たとえば：

- 変数は入力値を保存する
- if文は入力チェックに使う
- クラスはデータや処理を整理する
- 例外処理はエラー対応に使う
- コレクションは一覧データに使う
- ファイルやDBはデータ保存に使う

基礎文法は、画面が付いてもWebになっても使い続けます。

---

## よくあるエラー

| エラー | 原因 | 解決方法 |
|---|---|---|
| ウィンドウが表示されない | `setVisible(true)` を書いていない | 最後に `frame.setVisible(true);` を書く |
| 閉じてもプログラムが終わらない | `setDefaultCloseOperation` を指定していない | `JFrame.EXIT_ON_CLOSE` を指定する |
| ボタンを押しても反応しない | `addActionListener()` を書いていない | ボタンにイベント処理を登録する |
| 入力値でエラーになる | 数値以外を `parseInt()` している | `try-catch` で処理する |
| 部品がうまく並ばない | レイアウトを指定していない | `FlowLayout` などを使う |
| `cannot find symbol` | import忘れ、またはクラス名のミス | `import javax.swing.*;` などを確認する |
| Webの仕組みが分からない | ブラウザとサーバーの役割が混ざっている | リクエストとレスポンスで考える |

---


## まとめ

- CUIアプリは、ターミナルで文字を使って操作するアプリ
- GUIアプリは、画面・ボタン・入力欄などを使って操作するアプリ
- Webアプリは、ブラウザから使うアプリ
- JavaではSwingを使ってGUIアプリを作れる
- `JFrame` はウィンドウを表す
- `JLabel` は文字を表示する部品
- `JButton` はボタンを表す部品
- `JTextField` は文字入力欄を表す部品
- `addActionListener()` でボタンを押したときの処理を書ける
- GUIアプリでも、変数、if文、例外処理、クラスなどの基礎文法を使う
- Webアプリは、ブラウザとサーバーが通信して動く
- ブラウザからサーバーへ送るものをリクエストと呼ぶ
- サーバーからブラウザへ返すものをレスポンスと呼ぶ
- JavaはWebアプリのサーバー側でよく使われる
- 次章では、アプリで重要になるデータベースを学ぶ