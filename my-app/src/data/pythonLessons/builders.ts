import type { PythonQuestion } from "../pythonQuestions";
export const numbers = (value: string) => value.trim().split(/\s+/).map(Number);
export const cases = (inputs: string[], solve: (input: string) => string | number): NonNullable<PythonQuestion["testCases"]> =>
  inputs.map((stdin) => ({ stdin: `${stdin}\n`, expectedOutput: String(solve(stdin)) }));
type Options = Pick<PythonQuestion,"verificationCode"|"requiredNodes"|"requiredPatterns">;
export function lesson(topic:string,slug:string,title:string,description:string,hint:string,answerCode:string,
  testCases:NonNullable<PythonQuestion["testCases"]>,options:Options={}):PythonQuestion {
  const node:Record<string,string>={if:"If",for:"For",while:"While",function:"FunctionDef",exception:"Try",class:"ClassDef",recursion:"FunctionDef"};
  return { id:`python-${topic}-${slug}`,topicId:`python-${topic}`,no:"",title,
    description:`${description}\n入力を促すメッセージは表示せず、指定した結果だけを出力してください。`,hint,explanation:hint,
    starterCode:"# ここにコードを書いてください\n",answerCode:`${answerCode}\n`,
    sampleInput:testCases[0].stdin,expectedOutput:testCases[0].expectedOutput,testCases,type:"lesson",
    requiredNodes:node[topic]?[node[topic]]:[],
    recursiveFunctions:topic==="recursion"?[answerCode.match(/def\s+(\w+)/)?.[1]??""]:[],
    minLoopDepth:topic==="nested"?2:0,...options };
}
