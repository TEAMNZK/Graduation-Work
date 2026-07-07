import type { JavaExerciseQuestion } from "@/data/javaExercises/types";

export const projectLibraryEnhanceExercise: JavaExerciseQuestion = {
  id: "project-library-enhance",
  no: "演習",
  title: "図書管理アプリ強化",
  description:
    "コレクションや日付処理などを使って、図書管理アプリを強化してください。",
  hint: "本の一覧、貸出日、返却予定日などを扱えるようにすると発展らしくなります。",
  expectedOutput: "",
  starterCode: `public class Main {
  public static void main(String[] args) {

  }
}`,
  requiredPatterns: [],
  forbiddenPatterns: [],
  type: "mini_project",
};

export const projectLibraryEnhanceAnswerCode = `import java.time.LocalDate;
import java.util.ArrayList;

class Book {
  String title;
  LocalDate dueDate;
}

public class Main {
  public static void main(String[] args) {
    ArrayList<Book> books = new ArrayList<>();
  }
}`;

export const projectLibraryEnhanceCustomQuestions: JavaExerciseQuestion[] = [];

export const projectLibraryFinalExercise: JavaExerciseQuestion = {
  id: "project-library-final",
  no: "総合",
  title: "図書管理アプリ完成",
  description:
    "最終課題として、図書管理アプリを完成させてください。",
  hint: "本の登録、一覧表示、検索、貸出管理などを組み合わせると完成度が上がります。",
  expectedOutput: "",
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
  }
}`;

export const projectLibraryFinalCustomQuestions: JavaExerciseQuestion[] = [];
