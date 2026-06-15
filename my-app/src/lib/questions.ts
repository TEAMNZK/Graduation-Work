export type Question = {
  id: number;
  language: string;
  text: string;
  level?: number;
};

export const questionsByLanguage: Record<string, Question[]> = {
  javascript: [
    {
      id: 1,
      language: "JavaScript",
      text: "console.log('Hello World');",
      level: 1,
    },
    {
      id: 2,
      language: "JavaScript",
      text: "let score = 0;",
      level: 1,
    },
    {
      id: 3,
      language: "JavaScript",
      text: "if (x > 10) { return x; }",
      level: 2,
    },
  ],
  python: [
    {
      id: 1,
      language: "Python",
      text: "print('Hello World')",
      level: 1,
    },
    {
      id: 2,
      language: "Python",
      text: "score = 0",
      level: 1,
    },
    {
      id: 3,
      language: "Python",
      text: "if x > 10:\n    print(x)",
      level: 2,
    },
  ],
  java: [
    {
      id: 1,
      language: "Java",
      text: "System.out.println(\"Hello World\");",
      level: 1,
    },
  ],
};