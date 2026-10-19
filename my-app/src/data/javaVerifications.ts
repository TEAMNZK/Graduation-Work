// mainの実行前に、戻り値や宣言の構造も実際のJava上で確認する。
export const javaVerifications: Record<string, string> = {
  "13-method-q3": 'if (getNumber() != 5) throw new AssertionError("getNumber");',
  "13-method-q5": 'if (add(3, 4) != 7 || add(-2, 5) != 3 || add(0, 0) != 0) throw new AssertionError("add");',
  "14-overload-q1": `
    java.lang.reflect.Method one = Main.class.getDeclaredMethod("printData", String.class);
    java.lang.reflect.Method two = Main.class.getDeclaredMethod("printData", int.class, String.class);
    if (one.getReturnType() != void.class || two.getReturnType() != void.class) throw new AssertionError("printData");`,
  "14-overload-q3": 'if (sum(1, 2) != 3 || sum(-2, 5, 1) != 4) throw new AssertionError("sum");',
  "15-class-object-q1": 'if (Student.class.getDeclaredField("name").getType() != String.class) throw new AssertionError("name");',
  "16-constructor-q1": `
    java.lang.reflect.Field nameField = Student.class.getDeclaredField("name");
    nameField.setAccessible(true);
    if (!"Test".equals(nameField.get(new Student("Test")))) throw new AssertionError("Student");`,
  "17-static-q1": `
    int originalCount = count;
    addCount();
    if (count != originalCount + 1) throw new AssertionError("addCount");
    count = originalCount;`,
  "18-inheritance-q1": 'if (Student.class.getSuperclass() != Person.class) throw new AssertionError("extends Person");',
  "19-polymorphism-q1": 'if (!Parent.class.isAssignableFrom(Child.class)) throw new AssertionError("Parent/Child");',
  "32-final-exercise-q1": 'if (sumScores(new Student[] {new Student("A", 10), new Student("B", 20)}) != 30 || sumScores(new Student[] {}) != 0) throw new AssertionError("sumScores");',
  "32-final-exercise-q4": 'if (!isPass(60) || isPass(59) || !isPass(100)) throw new AssertionError("isPass");',
};

const gradeCheck = 'if (!"A".equals(judge(80)) || !"B".equals(judge(79)) || !"B".equals(judge(60)) || !"C".equals(judge(59)) || !"C".equals(judge(0))) throw new AssertionError("judge");';
for (let index = 1; index <= 3; index++) {
  javaVerifications[`project-score-app-q${index}`] = gradeCheck;
}
