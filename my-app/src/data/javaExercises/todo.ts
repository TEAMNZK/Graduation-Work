import type { JavaExerciseQuestion } from "@/data/javaExercises/types";

export const projectTodoExercise: JavaExerciseQuestion = {
  id: "project-todo",
  no: "演習",
  title: "Todoリスト",
  description:
    "Scannerから操作を受け取り、タスクの追加・一覧表示・完了・削除を繰り返し実行できるTodoリストアプリを作成してください。",
  hint: "TodoとTodoListにデータ処理をまとめ、Mainではwhile文でコマンドを受け取ります。",
  sampleInput: `1
Javaを勉強する
2
0`,
  expectedOutput: `追加: Javaを勉強する
1. [未完了] Javaを勉強する
終了`,
  starterCode: `import java.util.ArrayList;
import java.util.Scanner;

class Todo {
  // タスクの情報を定義してください
}

class TodoList {
  // タスクを操作するメソッドを定義してください
}

public class Main {
  public static void main(String[] args) {
    // メニュー処理を作成してください
  }
}`,
  requiredPatterns: ["Scanner", "ArrayList<Todo>", "while", "switch"],
  forbiddenPatterns: [],
  type: "mini_project",
};

export const projectTodoAnswerCode = `import java.util.ArrayList;
import java.util.Scanner;

class Todo {
  String title;
  boolean completed;

  Todo(String title) {
    this.title = title;
    this.completed = false;
  }
}

class TodoList {
  ArrayList<Todo> todos = new ArrayList<>();

  void add(String title) {
    todos.add(new Todo(title));
    System.out.println("追加: " + title);
  }

  void show() {
    for (int i = 0; i < todos.size(); i++) {
      Todo todo = todos.get(i);
      String status = todo.completed ? "[完了]" : "[未完了]";
      System.out.println((i + 1) + ". " + status + " " + todo.title);
    }
  }
}

public class Main {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    TodoList todoList = new TodoList();
    boolean running = true;

    while (running && scanner.hasNextLine()) {
      String command = scanner.nextLine();

      switch (command) {
        case "1":
          if (scanner.hasNextLine()) {
            todoList.add(scanner.nextLine());
          }
          break;
        case "2":
          todoList.show();
          break;
        case "0":
          running = false;
          System.out.println("終了");
          break;
        default:
          System.out.println("無効な操作です");
      }
    }
  }
}`;

const todoStarterCode = `import java.util.ArrayList;
import java.util.Scanner;

class Todo {
  // Todoクラスを作成してください
}

class TodoList {
  // TodoListクラスを作成してください
}

public class Main {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    // ここに入力してください
  }
}`;

export const projectTodoCustomQuestions: JavaExerciseQuestion[] = [
  {
    id: "project-todo-q1",
    no: "演習-1",
    title: "動的Todoリスト 入力からタスクを作る",
    description:
      "標準入力からタスク名を1行受け取り、Todoオブジェクトを作成して「追加: タスク名」と表示してください。",
    hint: "ScannerのnextLineで文字列を受け取り、Todoのコンストラクタへ渡します。",
    sampleInput: "Javaを勉強する",
    expectedOutput: "追加: Javaを勉強する",
    starterCode: todoStarterCode,
    answerCode: `import java.util.ArrayList;
import java.util.Scanner;

class Todo {
  String title;

  Todo(String title) {
    this.title = title;
  }
}

public class Main {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    String title = scanner.nextLine();
    Todo todo = new Todo(title);
    System.out.println("追加: " + todo.title);
  }
}`,
    requiredPatterns: ["class Todo", "Scanner", "nextLine", "new Todo"],
    forbiddenPatterns: [],
    type: "mini_project",
  },
  {
    id: "project-todo-q2",
    no: "演習-2",
    title: "動的Todoリスト タスクを複数追加する",
    description:
      "最初の入力でタスク数を受け取り、その回数だけタスク名を入力してArrayListへ追加してください。最後に番号付きで一覧表示します。",
    hint: "最初の行をInteger.parseIntで数値に変換し、for文で入力とaddを繰り返します。",
    sampleInput: `2
Javaを勉強する
レポートを書く`,
    expectedOutput: `1. Javaを勉強する
2. レポートを書く`,
    starterCode: todoStarterCode,
    inheritPreviousCode: true,
    answerCode: `import java.util.ArrayList;
import java.util.Scanner;

class Todo {
  String title;

  Todo(String title) {
    this.title = title;
  }
}

class TodoList {
  ArrayList<Todo> todos = new ArrayList<>();

  void add(String title) {
    todos.add(new Todo(title));
  }

  void show() {
    for (int i = 0; i < todos.size(); i++) {
      System.out.println((i + 1) + ". " + todos.get(i).title);
    }
  }
}

public class Main {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    TodoList todoList = new TodoList();
    int count = Integer.parseInt(scanner.nextLine());

    for (int i = 0; i < count; i++) {
      todoList.add(scanner.nextLine());
    }

    todoList.show();
  }
}`,
    requiredPatterns: ["ArrayList<Todo>", "Integer.parseInt", "for (", ".add("],
    forbiddenPatterns: [],
    type: "mini_project",
  },
  {
    id: "project-todo-q3",
    no: "演習-3",
    title: "動的Todoリスト 番号で完了にする",
    description:
      "2件のタスクを入力したあと、完了にするタスク番号を受け取って状態を変更し、全件を表示してください。番号は1から始まります。",
    hint: "入力された番号から1を引いてArrayListのインデックスに変換し、completedをtrueにします。",
    sampleInput: `Javaを勉強する
レポートを書く
1`,
    expectedOutput: `1. [完了] Javaを勉強する
2. [未完了] レポートを書く`,
    starterCode: todoStarterCode,
    inheritPreviousCode: true,
    answerCode: `import java.util.ArrayList;
import java.util.Scanner;

class Todo {
  String title;
  boolean completed;

  Todo(String title) {
    this.title = title;
    this.completed = false;
  }
}

class TodoList {
  ArrayList<Todo> todos = new ArrayList<>();

  void add(String title) {
    todos.add(new Todo(title));
  }

  void complete(int number) {
    todos.get(number - 1).completed = true;
  }

  void show() {
    for (int i = 0; i < todos.size(); i++) {
      Todo todo = todos.get(i);
      String status = todo.completed ? "[完了]" : "[未完了]";
      System.out.println((i + 1) + ". " + status + " " + todo.title);
    }
  }
}

public class Main {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    TodoList todoList = new TodoList();
    todoList.add(scanner.nextLine());
    todoList.add(scanner.nextLine());
    todoList.complete(Integer.parseInt(scanner.nextLine()));
    todoList.show();
  }
}`,
    requiredPatterns: ["boolean completed", "void complete(", "number - 1", "Integer.parseInt"],
    forbiddenPatterns: [],
    type: "mini_project",
  },
  {
    id: "project-todo-q4",
    no: "演習-4",
    title: "動的Todoリスト 番号で削除する",
    description:
      "2件のタスクを入力したあと、削除するタスク番号を受け取って削除してください。削除したタスク名と残りの一覧を表示します。",
    hint: "remove(number - 1)の戻り値を受け取ると、削除したTodoの情報を表示できます。",
    sampleInput: `Javaを勉強する
レポートを書く
2`,
    expectedOutput: `削除: レポートを書く
1. Javaを勉強する`,
    starterCode: todoStarterCode,
    inheritPreviousCode: true,
    answerCode: `import java.util.ArrayList;
import java.util.Scanner;

class Todo {
  String title;

  Todo(String title) {
    this.title = title;
  }
}

class TodoList {
  ArrayList<Todo> todos = new ArrayList<>();

  void add(String title) {
    todos.add(new Todo(title));
  }

  void remove(int number) {
    Todo removed = todos.remove(number - 1);
    System.out.println("削除: " + removed.title);
  }

  void show() {
    for (int i = 0; i < todos.size(); i++) {
      System.out.println((i + 1) + ". " + todos.get(i).title);
    }
  }
}

public class Main {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    TodoList todoList = new TodoList();
    todoList.add(scanner.nextLine());
    todoList.add(scanner.nextLine());
    todoList.remove(Integer.parseInt(scanner.nextLine()));
    todoList.show();
  }
}`,
    requiredPatterns: ["void remove(", ".remove(", "number - 1", "Integer.parseInt"],
    forbiddenPatterns: [],
    type: "mini_project",
  },
  {
    id: "project-todo-q5",
    no: "演習-5",
    title: "動的Todoリスト メニューを繰り返す",
    description:
      "コマンドを繰り返し受け取る処理を作ってください。1の次の行はタスク名、2は一覧表示、0は終了です。",
    hint: "runningがtrueの間while文を繰り返し、switch文でコマンドごとの処理を分けます。",
    sampleInput: `1
Javaを勉強する
1
レポートを書く
2
0`,
    expectedOutput: `追加: Javaを勉強する
追加: レポートを書く
1. Javaを勉強する
2. レポートを書く
終了`,
    starterCode: todoStarterCode,
    inheritPreviousCode: true,
    answerCode: `import java.util.ArrayList;
import java.util.Scanner;

class Todo {
  String title;

  Todo(String title) {
    this.title = title;
  }
}

class TodoList {
  ArrayList<Todo> todos = new ArrayList<>();

  void add(String title) {
    todos.add(new Todo(title));
    System.out.println("追加: " + title);
  }

  void show() {
    for (int i = 0; i < todos.size(); i++) {
      System.out.println((i + 1) + ". " + todos.get(i).title);
    }
  }
}

public class Main {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    TodoList todoList = new TodoList();
    boolean running = true;

    while (running && scanner.hasNextLine()) {
      String command = scanner.nextLine();

      switch (command) {
        case "1":
          todoList.add(scanner.nextLine());
          break;
        case "2":
          todoList.show();
          break;
        case "0":
          running = false;
          System.out.println("終了");
          break;
        default:
          System.out.println("無効な操作です");
      }
    }
  }
}`,
    requiredPatterns: ["Scanner", "while (", "switch (", "case \"1\"", "case \"2\"", "case \"0\""],
    forbiddenPatterns: [],
    type: "mini_project",
  },
  {
    id: "project-todo-q6",
    no: "演習-6",
    title: "動的Todoリスト 完成",
    description:
      "Todoリストアプリを完成させてください。1は追加、2は一覧、3の次の行は完了番号、4の次の行は削除番号、0は終了です。存在しない番号も安全に処理します。",
    hint: "TodoListにadd、show、complete、removeを作り、番号が1以上かつsize以下かを確認してから操作します。",
    sampleInput: `1
Javaを勉強する
1
レポートを書く
3
1
2
4
2
2
0`,
    expectedOutput: `追加: Javaを勉強する
追加: レポートを書く
完了: Javaを勉強する
1. [完了] Javaを勉強する
2. [未完了] レポートを書く
削除: レポートを書く
1. [完了] Javaを勉強する
終了`,
    starterCode: todoStarterCode,
    inheritPreviousCode: true,
    answerCode: `import java.util.ArrayList;
import java.util.Scanner;

class Todo {
  String title;
  boolean completed;

  Todo(String title) {
    this.title = title;
    this.completed = false;
  }
}

class TodoList {
  ArrayList<Todo> todos = new ArrayList<>();

  void add(String title) {
    todos.add(new Todo(title));
    System.out.println("追加: " + title);
  }

  void show() {
    if (todos.isEmpty()) {
      System.out.println("タスクはありません");
      return;
    }

    for (int i = 0; i < todos.size(); i++) {
      Todo todo = todos.get(i);
      String status = todo.completed ? "[完了]" : "[未完了]";
      System.out.println((i + 1) + ". " + status + " " + todo.title);
    }
  }

  void complete(int number) {
    if (!isValidNumber(number)) {
      System.out.println("存在しない番号です");
      return;
    }

    Todo todo = todos.get(number - 1);
    todo.completed = true;
    System.out.println("完了: " + todo.title);
  }

  void remove(int number) {
    if (!isValidNumber(number)) {
      System.out.println("存在しない番号です");
      return;
    }

    Todo removed = todos.remove(number - 1);
    System.out.println("削除: " + removed.title);
  }

  boolean isValidNumber(int number) {
    return number >= 1 && number <= todos.size();
  }
}

public class Main {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    TodoList todoList = new TodoList();
    boolean running = true;

    while (running && scanner.hasNextLine()) {
      String command = scanner.nextLine();

      switch (command) {
        case "1":
          if (scanner.hasNextLine()) {
            todoList.add(scanner.nextLine());
          }
          break;
        case "2":
          todoList.show();
          break;
        case "3":
          if (scanner.hasNextLine()) {
            todoList.complete(Integer.parseInt(scanner.nextLine()));
          }
          break;
        case "4":
          if (scanner.hasNextLine()) {
            todoList.remove(Integer.parseInt(scanner.nextLine()));
          }
          break;
        case "0":
          running = false;
          System.out.println("終了");
          break;
        default:
          System.out.println("無効な操作です");
      }
    }
  }
}`,
    requiredPatterns: [
      "class TodoList",
      "ArrayList<Todo>",
      "Scanner",
      "while (",
      "switch (",
      "void add(",
      "void show(",
      "void complete(",
      "void remove(",
      "isValidNumber(",
    ],
    forbiddenPatterns: [],
    type: "mini_project",
  },
];
