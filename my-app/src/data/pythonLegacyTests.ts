import type { PythonQuestion } from "./pythonQuestions";
import { cases, numbers } from "./pythonLessons/builders";
export const pythonLegacyCases:Record<string,NonNullable<PythonQuestion["testCases"]>>={
  "python-input-q1":cases(["7\n8","-5\n5","0\n0"],s=>numbers(s).reduce((a,b)=>a+b,0)),
  "python-input-q2":cases(["Taro","Aya","花子"],s=>`Hello, ${s}!`),
  "python-if-q1":cases(["75","60","59","0"],s=>Number(s)>=60?"Pass":"Fail"),
  "python-if-q2":cases(["85","80","79","60","59"],s=>Number(s)>=80?"A":Number(s)>=60?"B":"C"),
  "python-while-q2":cases(["3\n4\n0","0","-1\n5\n-2\n0"],s=>numbers(s).reduce((a,b)=>a+b,0)),
  "python-exception-q1":cases(["abc","0","-12","+7"],s=>/^[+-]?\d+$/.test(s)?Number(s):"Invalid"),
  "python-exception-q2":cases(["0","5","-5","2"],s=>Number(s)===0?"Cannot divide by zero":(10/Number(s)).toFixed(1)),
  "python-score-app-q1":cases(["3\n70\n80\n90","1\n0","2\n59\n60"],s=>{const a=numbers(s),total=a.slice(1).reduce((x,y)=>x+y,0);return`${total}\n${(total/a[0]).toFixed(1)}`;}),
  "python-score-app-q2":cases(["5\n45\n60\n90\n75\n50","1\n0","3\n59\n60\n61"],s=>{const a=numbers(s).slice(1);return`${Math.max(...a)}\n${Math.min(...a)}\n${a.filter(v=>v>=60).length}`;}),
};
export const pythonLegacyVerifications:Record<string,string>={
  "python-function-q1":"assert add(-3,5)==2\nassert add(0,0)==0",
  "python-function-q2":"assert is_even(-2) is True\nassert is_even(0) is True\nassert is_even(3) is False",
  "python-class-q1":'p=Person("Aya")\nassert p.name=="Aya"',
  "python-class-q2":"a=Counter()\nb=Counter()\na.increment()\na.increment()\nassert a.count==2 and b.count==0",
};
