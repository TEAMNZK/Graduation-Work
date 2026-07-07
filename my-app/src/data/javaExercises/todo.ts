import type { JavaExerciseQuestion } from "@/data/javaExercises/types";

export const projectTodoExercise: JavaExerciseQuestion = {
  id: "project-todo",
  no: "演習",
  title: "Todoリスト",
  description:
    "クラスやコレクションを使って、簡単なTodoリストを作成してください。",
  hint: "タスクを追加・表示できる形を目指します。",
  expectedOutput: "",
  starterCode: `public class Main {
  public static void main(String[] args) {

  }
}`,
  requiredPatterns: [],
  forbiddenPatterns: [],
  type: "mini_project",
};

export const projectTodoAnswerCode = `import java.util.ArrayList;

class Todo {
  String title;

  Todo(String title) {
    this.title = title;
  }
}

public class Main {
  public static void main(String[] args) {
    ArrayList<Todo> todos = new ArrayList<>();
    todos.add(new Todo("勉強する"));
  }
}`;

export const projectTodoCustomQuestions: JavaExerciseQuestion[] = [];
