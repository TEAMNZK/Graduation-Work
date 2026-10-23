// Runs trusted repository reference answers only. Learner code belongs in Judge0.
const fs=require("node:fs");
const os=require("node:os");
const path=require("node:path");
const {spawnSync}=require("node:child_process");
const load=require("./load-ts.cjs");
const {pythonQuestionEntriesById}=load("src/data/pythonQuestions.ts");
const {buildPythonGradingCode}=load("src/lib/pythonGrading.ts");
const interpreter=process.env.PYTHON||"python";
const version=spawnSync(interpreter,["--version"],{encoding:"utf8",windowsHide:true});
if(version.error||version.status!==0){console.error("Python 3をPATHへ追加するか、PYTHONに実行ファイルを指定してください。");process.exit(1);}
console.log(version.stdout.trim()||version.stderr.trim());
const directory=fs.mkdtempSync(path.join(os.tmpdir(),"codex-python-answers-"));
const failures=[];
let caseCount=0;
const normalize=value=>value.replace(/\r\n?/g,"\n").trim();
try {
  const questions=Object.values(pythonQuestionEntriesById).filter(question=>!process.env.PYTHON_QUESTION_FILTER||question.id.startsWith(process.env.PYTHON_QUESTION_FILTER));
  for(const [index,question] of questions.entries()) {
    try {
      if(!question.testCases?.length)throw new Error("Missing test cases");
      for(const [caseIndex,testCase] of question.testCases.entries()) {
        const cwd=path.join(directory,`${question.id}-${caseIndex}`);fs.mkdirSync(cwd);
        const file=path.join(cwd,"check.py");
        fs.writeFileSync(file,buildPythonGradingCode(question.answerCode,question,testCase),"utf8");
        const result=spawnSync(interpreter,["-I","-X","utf8",file],{cwd,input:testCase.stdin,encoding:"utf8",windowsHide:true,timeout:10000,maxBuffer:1024*1024});
        if(result.error||result.status!==0||normalize(result.stdout)!==normalize(testCase.expectedOutput))throw new Error(JSON.stringify({caseIndex,input:testCase.stdin,expected:testCase.expectedOutput,actual:result.stdout,status:result.status,error:result.error?.message||result.stderr}));
        caseCount++;
      }
    }catch(error){failures.push({id:question.id,error:error.message});}
    if((index+1)%25===0)console.log(`Checked ${index+1}/${questions.length} answers`);
  }
  console.log(JSON.stringify({questions:questions.length,caseCount,failures},null,2));
  if(failures.length)process.exitCode=1;
}finally{
  const resolved=path.resolve(directory);
  if(path.dirname(resolved)!==path.resolve(os.tmpdir())||!path.basename(resolved).startsWith("codex-python-answers-"))throw new Error("Unexpected cleanup path");
  fs.rmSync(resolved,{recursive:true,force:true});
}
