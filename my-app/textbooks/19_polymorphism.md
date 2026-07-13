# 第19章 ポリモーフィズム

## 学習目標

- ポリモーフィズムとは何かを理解する
- 親クラス型の変数に子クラスのオブジェクトを代入できる
- オーバーライドされたメソッドが実行される仕組みを理解する
- 配列を使って複数種類のオブジェクトをまとめて扱える
- メソッドの引数に親クラス型を使うメリットを理解する

---

## ポリモーフィズムとは

ポリモーフィズムとは、同じ呼び出し方でも、実際のオブジェクトによって動きが変わる仕組みです。

日本語では **多態性** と呼ばれることもあります。

たとえば、`Animal` という親クラスがあり、  
それを継承した `Dog` と `Cat` があるとします。

```text
Animal
  ├── Dog
  └── Cat
```

どちらも `makeSound()` というメソッドを持っているとしても、  
犬なら「ワン」、猫なら「ニャー」と鳴き方が違います。

このように、同じ `makeSound()` でも、  
実際のオブジェクトによって処理が変わるのがポリモーフィズムです。

---

## まずは普通に呼び出す例

```java
public class Main {
    public static void main(String[] args) {
        Dog dog = new Dog();
        Cat cat = new Cat();

        dog.makeSound();
        cat.makeSound();
    }
}

class Dog {
    void makeSound() {
        System.out.println("ワン");
    }
}

class Cat {
    void makeSound() {
        System.out.println("ニャー");
    }
}
```

実行結果：

```text
ワン
ニャー
```

このコードでも動きます。

しかし、`Dog` と `Cat` は別々の型として扱われています。

---

## 親クラスを用意する

共通する部分を親クラスにまとめてみます。

```java
class Animal {
    void makeSound() {
        System.out.println("動物が鳴きます");
    }
}
```

そして、`Dog` と `Cat` が `Animal` を継承します。

```java
class Dog extends Animal {
}

class Cat extends Animal {
}
```

これで、`Dog` と `Cat` はどちらも `Animal` の一種になります。

---

## メソッドをオーバーライドする

犬と猫では鳴き方が違うので、子クラスで `makeSound()` をオーバーライドします。

```java
class Animal {
    void makeSound() {
        System.out.println("動物が鳴きます");
    }
}

class Dog extends Animal {
    @Override
    void makeSound() {
        System.out.println("ワン");
    }
}

class Cat extends Animal {
    @Override
    void makeSound() {
        System.out.println("ニャー");
    }
}
```

`Dog` では「ワン」、`Cat` では「ニャー」と表示するようにしています。

---

## 親クラス型の変数に子クラスを代入する

Javaでは、親クラス型の変数に、子クラスのオブジェクトを代入できます。

```java
Animal animal1 = new Dog();
Animal animal2 = new Cat();
```

`Dog` は `Animal` の一種なので、`Animal` 型の変数に入れられます。

`Cat` も `Animal` の一種なので、同じように入れられます。

---

## ポリモーフィズムの基本例

```java
public class Main {
    public static void main(String[] args) {
        Animal animal1 = new Dog();
        Animal animal2 = new Cat();

        animal1.makeSound();
        animal2.makeSound();
    }
}

class Animal {
    void makeSound() {
        System.out.println("動物が鳴きます");
    }
}

class Dog extends Animal {
    @Override
    void makeSound() {
        System.out.println("ワン");
    }
}

class Cat extends Animal {
    @Override
    void makeSound() {
        System.out.println("ニャー");
    }
}
```

実行結果：

```text
ワン
ニャー
```

変数の型はどちらも `Animal` です。

```java
Animal animal1
Animal animal2
```

しかし、実際に入っているオブジェクトは違います。

```java
new Dog()
new Cat()
```

そのため、`makeSound()` を呼び出したときの動きも変わります。

---

## 実際のオブジェクトのメソッドが呼ばれる

次のコードを見てください。

```java
Animal animal = new Dog();

animal.makeSound();
```

変数の型は `Animal` です。

しかし、実際に入っているオブジェクトは `Dog` です。

そのため、呼び出されるのは `Dog` クラスでオーバーライドされた `makeSound()` です。

```text
ワン
```

Javaでは、実行時に実際のオブジェクトを見て、呼び出すメソッドを決めます。

---

## 親クラス型でまとめて扱う

ポリモーフィズムを使うと、複数種類のオブジェクトをまとめて扱えます。

```java
Animal[] animals = {
    new Dog(),
    new Cat(),
    new Dog()
};
```

`Dog` と `Cat` はどちらも `Animal` の一種なので、  
`Animal` 型の配列に入れられます。

---

## 配列でまとめて処理する

```java
public class Main {
    public static void main(String[] args) {
        Animal[] animals = {
            new Dog(),
            new Cat(),
            new Dog()
        };

        for (Animal animal : animals) {
            animal.makeSound();
        }
    }
}

class Animal {
    void makeSound() {
        System.out.println("動物が鳴きます");
    }
}

class Dog extends Animal {
    @Override
    void makeSound() {
        System.out.println("ワン");
    }
}

class Cat extends Animal {
    @Override
    void makeSound() {
        System.out.println("ニャー");
    }
}
```

実行結果：

```text
ワン
ニャー
ワン
```

`for` 文の中では、すべて `Animal` として扱っています。

```java
for (Animal animal : animals)
```

それでも、実際のオブジェクトが `Dog` なら犬の処理、  
`Cat` なら猫の処理が実行されます。

---

## ポリモーフィズムを使わない場合

ポリモーフィズムを使わない場合、犬用と猫用で別々に処理を書くことになります。

```java
Dog[] dogs = {
    new Dog(),
    new Dog()
};

Cat[] cats = {
    new Cat(),
    new Cat()
};

for (Dog dog : dogs) {
    dog.makeSound();
}

for (Cat cat : cats) {
    cat.makeSound();
}
```

この書き方では、種類が増えるたびに配列や処理を増やす必要があります。

---

## ポリモーフィズムを使う場合

```java
Animal[] animals = {
    new Dog(),
    new Cat(),
    new Dog(),
    new Cat()
};

for (Animal animal : animals) {
    animal.makeSound();
}
```

`Animal` 型でまとめることで、  
`Dog` も `Cat` も同じ繰り返し処理で扱えます。

コードがシンプルになります。

---

## メソッドの引数に親クラス型を使う

ポリモーフィズムは、メソッドの引数でもよく使います。

```java
public static void playSound(Animal animal) {
    animal.makeSound();
}
```

このメソッドは、`Animal` 型の値を受け取ります。

そのため、`Animal` を継承した `Dog` や `Cat` を渡せます。

---

## 引数に子クラスを渡す例

```java
public class Main {
    public static void main(String[] args) {
        Dog dog = new Dog();
        Cat cat = new Cat();

        playSound(dog);
        playSound(cat);
    }

    public static void playSound(Animal animal) {
        animal.makeSound();
    }
}

class Animal {
    void makeSound() {
        System.out.println("動物が鳴きます");
    }
}

class Dog extends Animal {
    @Override
    void makeSound() {
        System.out.println("ワン");
    }
}

class Cat extends Animal {
    @Override
    void makeSound() {
        System.out.println("ニャー");
    }
}
```

実行結果：

```text
ワン
ニャー
```

`playSound()` の引数は `Animal` 型です。

```java
public static void playSound(Animal animal)
```

しかし、`Dog` も `Cat` も `Animal` の一種なので渡せます。

---

## 引数を親クラス型にするメリット

もし `Dog` 用と `Cat` 用に別々のメソッドを作ると、次のようになります。

```java
public static void playDogSound(Dog dog) {
    dog.makeSound();
}

public static void playCatSound(Cat cat) {
    cat.makeSound();
}
```

種類が増えるたびにメソッドも増えてしまいます。

親クラス型を使えば、1つのメソッドでまとめられます。

```java
public static void playSound(Animal animal) {
    animal.makeSound();
}
```

これがポリモーフィズムの大きなメリットです。

---

## Employeeの例

もう少し実用的な例として、従業員を表すクラスを考えます。

```text
Employee
  ├── FullTimeEmployee
  └── PartTimeEmployee
```

正社員とアルバイトでは、給料の計算方法が違うとします。

---

## 給料計算の例

```java
public class Main {
    public static void main(String[] args) {
        Employee[] employees = {
            new FullTimeEmployee("Taro", 300000),
            new PartTimeEmployee("Hanako", 1200, 80)
        };

        for (Employee employee : employees) {
            employee.showSalary();
        }
    }
}

class Employee {
    String name;

    Employee(String name) {
        this.name = name;
    }

    void showSalary() {
        System.out.println(name + "の給料を表示します");
    }
}

class FullTimeEmployee extends Employee {
    int monthlySalary;

    FullTimeEmployee(String name, int monthlySalary) {
        super(name);
        this.monthlySalary = monthlySalary;
    }

    @Override
    void showSalary() {
        System.out.println(name + "の月給: " + monthlySalary + "円");
    }
}

class PartTimeEmployee extends Employee {
    int hourlyWage;
    int hours;

    PartTimeEmployee(String name, int hourlyWage, int hours) {
        super(name);
        this.hourlyWage = hourlyWage;
        this.hours = hours;
    }

    @Override
    void showSalary() {
        int salary = hourlyWage * hours;
        System.out.println(name + "の給料: " + salary + "円");
    }
}
```

実行結果：

```text
Taroの月給: 300000円
Hanakoの給料: 96000円
```

`Employee[]` の中に、`FullTimeEmployee` と `PartTimeEmployee` をまとめて入れています。

そして、同じ `showSalary()` を呼び出しています。

しかし、実際に実行される処理は、それぞれのクラスで違います。

---

## 同じ命令で違う動きをする

ポリモーフィズムの重要なポイントは、次の部分です。

```java
employee.showSalary();
```

この1行だけを見ると、どのクラスの処理が実行されるかは分かりません。

実際に入っているオブジェクトが `FullTimeEmployee` なら、  
正社員用の `showSalary()` が実行されます。

実際に入っているオブジェクトが `PartTimeEmployee` なら、  
アルバイト用の `showSalary()` が実行されます。

これが「同じ呼び出し方で、実際の動きが変わる」ということです。

---

## 親クラス型の変数で使えるメソッド

親クラス型の変数では、基本的に親クラスに定義されているメソッドを呼び出せます。

```java
Animal animal = new Dog();

animal.makeSound();
```

これは、`Animal` クラスに `makeSound()` が定義されているので呼び出せます。

---

## 子クラス独自のメソッドは直接呼べない

次の例を見てみます。

```java
Animal animal = new Dog();

animal.bark(); // エラー
```

実際のオブジェクトは `Dog` です。

しかし、変数の型は `Animal` です。

`Animal` クラスには `bark()` が定義されていないため、  
このままでは呼び出せません。

---

## 子クラス独自のメソッドを呼びたい場合

子クラス独自のメソッドを呼びたい場合は、型変換を使います。

```java
Dog dog = (Dog) animal;
dog.bark();
```

例：

```java
public class Main {
    public static void main(String[] args) {
        Animal animal = new Dog();

        Dog dog = (Dog) animal;
        dog.bark();
    }
}

class Animal {
    void makeSound() {
        System.out.println("動物が鳴きます");
    }
}

class Dog extends Animal {
    @Override
    void makeSound() {
        System.out.println("ワン");
    }

    void bark() {
        System.out.println("犬が吠えます");
    }
}
```

実行結果：

```text
犬が吠えます
```

このように、親クラス型から子クラス型へ変換することを **ダウンキャスト** と呼びます。

---

## ダウンキャストに注意

ダウンキャストは、実際のオブジェクトの型と合っていないとエラーになります。

```java
Animal animal = new Cat();

Dog dog = (Dog) animal; // エラー
```

`animal` に入っている実体は `Cat` です。

それを `Dog` として扱おうとしているため、実行時にエラーになります。

---

## instanceof

`instanceof` を使うと、オブジェクトが特定の型かどうかを確認できます。

```java
if (animal instanceof Dog) {
    Dog dog = (Dog) animal;
    dog.bark();
}
```

`animal` が `Dog` のインスタンスである場合だけ、  
`Dog` 型に変換しています。

---

## instanceofの例

```java
public class Main {
    public static void main(String[] args) {
        Animal animal = new Dog();

        if (animal instanceof Dog) {
            Dog dog = (Dog) animal;
            dog.bark();
        }
    }
}

class Animal {
    void makeSound() {
        System.out.println("動物が鳴きます");
    }
}

class Dog extends Animal {
    @Override
    void makeSound() {
        System.out.println("ワン");
    }

    void bark() {
        System.out.println("犬が吠えます");
    }
}
```

実行結果：

```text
犬が吠えます
```

`instanceof` を使うことで、安全にダウンキャストできます。

---

## ただしダウンキャストは使いすぎない

ダウンキャストは便利ですが、使いすぎるとコードが複雑になります。

ポリモーフィズムの基本は、親クラスに共通メソッドを用意し、  
子クラスでオーバーライドすることです。

良い例：

```java
animal.makeSound();
```

避けたい例：

```java
if (animal instanceof Dog) {
    Dog dog = (Dog) animal;
    dog.bark();
}
```

必要な場面では使いますが、まずは共通メソッドで表現できないか考えるのが大切です。

---

## ポリモーフィズムのメリット

ポリモーフィズムには、次のようなメリットがあります。

| メリット | 説明 |
|---|---|
| 複数の子クラスをまとめて扱える | 親クラス型で管理できる |
| コードの重複を減らせる | 種類ごとの処理を共通化できる |
| 拡張しやすい | 新しい子クラスを追加しやすい |
| 呼び出し側がシンプルになる | 同じメソッド名で扱える |

---

## 新しい子クラスを追加する

たとえば、`Bird` クラスを追加したい場合を考えます。

```java
class Bird extends Animal {
    @Override
    void makeSound() {
        System.out.println("チュン");
    }
}
```

あとは配列に追加するだけです。

```java
Animal[] animals = {
    new Dog(),
    new Cat(),
    new Bird()
};
```

繰り返し処理はそのまま使えます。

```java
for (Animal animal : animals) {
    animal.makeSound();
}
```

新しい種類が増えても、呼び出し側の処理を大きく変えなくてよいのが強みです。

---

## よくあるエラー

| エラー | 原因 | 解決方法 |
|---|---|---|
| `cannot find symbol` | 親クラス型にないメソッドを呼んでいる | 親クラスに定義されているメソッドか確認する |
| `ClassCastException` | 実体と違う型にダウンキャストした | `instanceof` で確認する |
| `method does not override or implement a method` | `@Override` したメソッドが親クラスにない | メソッド名や引数を確認する |
| 期待した処理が呼ばれない | オーバーライドできていない | `@Override` を付けて確認する |
| `constructor ... cannot be applied` | コンストラクタの引数が合っていない | `new` するときの引数を確認する |

---

## まとめ

- ポリモーフィズムは、同じ呼び出し方で実際の動きが変わる仕組み
- 親クラス型の変数に子クラスのオブジェクトを代入できる
- オーバーライドされたメソッドは、実際のオブジェクトに応じて実行される
- 親クラス型の配列を使うと、複数種類の子クラスをまとめて扱える
- メソッドの引数に親クラス型を使うと、さまざまな子クラスを受け取れる
- 親クラス型の変数では、親クラスに定義されたメソッドを呼び出せる
- 子クラス独自のメソッドを呼ぶには、ダウンキャストが必要になることがある
- ダウンキャストするときは `instanceof` で確認すると安全
- ポリモーフィズムを使うと、コードを拡張しやすく、読みやすくできる