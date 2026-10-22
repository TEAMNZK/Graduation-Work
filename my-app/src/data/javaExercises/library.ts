import type { JavaExerciseQuestion } from "@/data/javaExercises/types";

export const projectLibraryEnhanceExercise: JavaExerciseQuestion = {
  id: "project-library-enhance",
  no: "演習",
  title: "図書管理アプリ強化",
  description:
    "コレクション、日付処理、Stream APIを使って、貸出状況や返却期限を管理できる図書管理アプリを作成してください。",
  hint: "Bookクラスに書名、貸出状態、返却期限を持たせ、ArrayList<Book>で管理します。",
  expectedOutput: `貸出中の本
Java入門（返却期限: 2026-07-28）`,
  starterCode: `import java.time.LocalDate;
import java.util.ArrayList;

class Book {
  // 書籍の情報を定義してください
}

public class Main {
  public static void main(String[] args) {
    // 図書管理処理を作成してください
  }
}`,
  requiredPatterns: ["class Book", "LocalDate", "ArrayList<Book>"],
  forbiddenPatterns: [],
  type: "mini_project",
};

export const projectLibraryEnhanceAnswerCode = `import java.time.LocalDate;
import java.util.ArrayList;

class Book {
  String title;
  boolean borrowed;
  LocalDate dueDate;

  Book(String title) {
    this.title = title;
    this.borrowed = false;
    this.dueDate = null;
  }

  void borrow(LocalDate borrowedDate) {
    borrowed = true;
    dueDate = borrowedDate.plusDays(14);
  }
}

public class Main {
  public static void main(String[] args) {
    ArrayList<Book> books = new ArrayList<>();
    Book book = new Book("Java入門");
    books.add(book);
    book.borrow(LocalDate.of(2026, 7, 14));

    System.out.println("貸出中の本");
    books.stream()
        .filter(item -> item.borrowed)
        .forEach(item -> System.out.println(
            item.title + "（返却期限: " + item.dueDate + "）"));
  }
}`;

const libraryEnhanceStarterCode = `import java.time.LocalDate;
import java.util.ArrayList;

class Book {
  // Bookクラスを作成してください
}

public class Main {
  public static void main(String[] args) {
    // ここに入力してください
  }
}`;

export const projectLibraryEnhanceCustomQuestions: JavaExerciseQuestion[] = [
  {
    id: "project-library-enhance-q1",
    no: "演習-1",
    title: "図書管理アプリ強化 書籍クラス",
    description:
      "書名と著者名を管理するBookクラスを作成してください。「Java入門」「山田太郎」を渡してオブジェクトを作り、書籍情報を表示します。",
    hint: "Bookクラスにtitleとauthorフィールドを用意し、コンストラクタで初期化しましょう。",
    expectedOutput: "Java入門 / 山田太郎",
    starterCode: libraryEnhanceStarterCode,
    answerCode: `import java.time.LocalDate;
import java.util.ArrayList;

class Book {
  String title;
  String author;

  Book(String title, String author) {
    this.title = title;
    this.author = author;
  }
}

public class Main {
  public static void main(String[] args) {
    Book book = new Book("Java入門", "山田太郎");
    System.out.println(book.title + " / " + book.author);
  }
}`,
    requiredPatterns: ["class Book", "String title", "String author", "Book(", "new Book"],
    forbiddenPatterns: [],
    type: "mini_project",
  },
  {
    id: "project-library-enhance-q2",
    no: "演習-2",
    title: "図書管理アプリ強化 蔵書一覧",
    description:
      "ArrayListに3冊の本を登録し、拡張for文ですべての書名を表示してください。",
    hint: "ArrayList<Book>を作り、addメソッドでBookオブジェクトを追加します。",
    expectedOutput: `Java入門
Python基礎
データベース入門`,
    starterCode: libraryEnhanceStarterCode,
    inheritPreviousCode: true,
    answerCode: `import java.time.LocalDate;
import java.util.ArrayList;

class Book {
  String title;
  String author;

  Book(String title, String author) {
    this.title = title;
    this.author = author;
  }
}

public class Main {
  public static void main(String[] args) {
    ArrayList<Book> books = new ArrayList<>();
    books.add(new Book("Java入門", "山田太郎"));
    books.add(new Book("Python基礎", "佐藤花子"));
    books.add(new Book("データベース入門", "鈴木一郎"));

    for (Book book : books) {
      System.out.println(book.title);
    }
  }
}`,
    requiredPatterns: ["ArrayList<Book>", ".add(", "for (Book", "System.out.println"],
    forbiddenPatterns: [],
    type: "mini_project",
  },
  {
    id: "project-library-enhance-q3",
    no: "演習-3",
    title: "図書管理アプリ強化 貸出処理",
    description:
      "Bookクラスに貸出状態を追加してください。「Java入門」を貸出中に変更し、全書籍の状態を表示します。",
    hint: "boolean型のborrowedを用意し、borrowメソッドでtrueに変更しましょう。",
    expectedOutput: `Java入門: 貸出中
Python基礎: 貸出可能`,
    starterCode: libraryEnhanceStarterCode,
    inheritPreviousCode: true,
    answerCode: `import java.time.LocalDate;
import java.util.ArrayList;

class Book {
  String title;
  boolean borrowed;

  Book(String title) {
    this.title = title;
    this.borrowed = false;
  }

  void borrow() {
    borrowed = true;
  }

  String getStatus() {
    return borrowed ? "貸出中" : "貸出可能";
  }
}

public class Main {
  public static void main(String[] args) {
    ArrayList<Book> books = new ArrayList<>();
    books.add(new Book("Java入門"));
    books.add(new Book("Python基礎"));
    books.get(0).borrow();

    for (Book book : books) {
      System.out.println(book.title + ": " + book.getStatus());
    }
  }
}`,
    requiredPatterns: ["boolean borrowed", "void borrow(", "borrowed = true", "getStatus("],
    forbiddenPatterns: [],
    type: "mini_project",
  },
  {
    id: "project-library-enhance-q4",
    no: "演習-4",
    title: "図書管理アプリ強化 返却期限",
    description:
      "貸出日から14日後の返却期限を計算してください。2026年7月14日に「Java入門」を貸し出し、書名と返却期限を表示します。",
    hint: "LocalDate.ofで貸出日を作り、plusDays(14)で返却期限を計算します。",
    expectedOutput: "Java入門（返却期限: 2026-07-28）",
    starterCode: libraryEnhanceStarterCode,
    inheritPreviousCode: true,
    answerCode: `import java.time.LocalDate;
import java.util.ArrayList;

class Book {
  String title;
  boolean borrowed;
  LocalDate dueDate;

  Book(String title) {
    this.title = title;
    this.borrowed = false;
    this.dueDate = null;
  }

  void borrow(LocalDate borrowedDate) {
    borrowed = true;
    dueDate = borrowedDate.plusDays(14);
  }
}

public class Main {
  public static void main(String[] args) {
    Book book = new Book("Java入門");
    book.borrow(LocalDate.of(2026, 7, 14));
    System.out.println(book.title + "（返却期限: " + book.dueDate + "）");
  }
}`,
    requiredPatterns: ["LocalDate", "LocalDate.of(", "plusDays(14)", "dueDate"],
    forbiddenPatterns: [],
    type: "mini_project",
  },
  {
    id: "project-library-enhance-q5",
    no: "演習-5",
    title: "図書管理アプリ強化 貸出中の本を検索",
    description:
      "図書管理アプリを完成させてください。3冊を登録して2冊を貸し出し、Stream APIで貸出中の本だけを絞り込んで返却期限とともに表示します。",
    hint: "books.stream()にfilterをつなぎ、borrowedがtrueのBookだけをforEachで表示しましょう。",
    expectedOutput: `貸出中の本
Java入門（返却期限: 2026-07-28）
データベース入門（返却期限: 2026-08-03）`,
    starterCode: libraryEnhanceStarterCode,
    inheritPreviousCode: true,
    answerCode: `import java.time.LocalDate;
import java.util.ArrayList;

class Book {
  String title;
  boolean borrowed;
  LocalDate dueDate;

  Book(String title) {
    this.title = title;
    this.borrowed = false;
    this.dueDate = null;
  }

  void borrow(LocalDate borrowedDate) {
    borrowed = true;
    dueDate = borrowedDate.plusDays(14);
  }
}

public class Main {
  public static void main(String[] args) {
    ArrayList<Book> books = new ArrayList<>();
    books.add(new Book("Java入門"));
    books.add(new Book("Python基礎"));
    books.add(new Book("データベース入門"));
    books.get(0).borrow(LocalDate.of(2026, 7, 14));
    books.get(2).borrow(LocalDate.of(2026, 7, 20));

    System.out.println("貸出中の本");
    books.stream()
        .filter(book -> book.borrowed)
        .forEach(book -> System.out.println(
            book.title + "（返却期限: " + book.dueDate + "）"));
  }
}`,
    requiredPatterns: ["ArrayList<Book>", "LocalDate", ".stream()", ".filter(", ".forEach("],
    forbiddenPatterns: [],
    type: "mini_project",
  },
];

export const projectLibraryFinalExercise: JavaExerciseQuestion = {
  id: "project-library-final",
  no: "総合",
  title: "図書管理アプリ完成",
  description:
    "最終課題として、図書管理アプリを完成させてください。",
  hint: "本の登録、一覧表示、検索、貸出管理などを組み合わせると完成度が上がります。",
  expectedOutput: "Java入門",
  starterCode: `public class Main {
  public static void main(String[] args) {

  }
}`,
  requiredPatterns: [],
  forbiddenPatterns: [],
  type: "final_project",
};

export const projectLibraryFinalAnswerCode = `import java.util.ArrayList;

class Book {
  String title;
  boolean borrowed;

  Book(String title) {
    this.title = title;
  }
}

public class Main {
  public static void main(String[] args) {
    ArrayList<Book> books = new ArrayList<>();
    books.add(new Book("Java入門"));
    System.out.println(books.get(0).title);
  }
}`;

export const projectLibraryFinalCustomQuestions: JavaExerciseQuestion[] = [];
