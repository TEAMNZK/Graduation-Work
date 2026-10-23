const {test}=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const os=require("node:os");
const path=require("node:path");
const {spawnSync}=require("node:child_process");
const load=require("../scripts/load-ts.cjs");
const {pythonQuestionEntriesById:questions,pythonQuestionMap}=load("src/data/pythonQuestions.ts");
const {pythonCurriculum}=load("src/data/pythonCurriculum.ts");
const {buildPythonGradingCode,gradePythonQuestion}=load("src/lib/pythonGrading.ts");
const accepted=stdout=>({stdout,stderr:"",statusId:3,statusDescription:"Accepted"});
const interpreter=process.env.PYTHON||"python";
const probe=spawnSync(interpreter,["--version"],{windowsHide:true});

function run(code,question,testCase=question.testCases[0]) {
  const directory=fs.mkdtempSync(path.join(os.tmpdir(),"codex-python-test-"));
  try {
    const file=path.join(directory,"check.py");fs.writeFileSync(file,buildPythonGradingCode(code,question,testCase),"utf8");
    return spawnSync(interpreter,["-I","-X","utf8",file],{input:testCase.stdin,cwd:directory,encoding:"utf8",timeout:10000,windowsHide:true});
  }finally{
    const resolved=path.resolve(directory);
    if(path.dirname(resolved)!==path.resolve(os.tmpdir())||!path.basename(resolved).startsWith("codex-python-test-"))throw new Error("Unexpected cleanup path");
    fs.rmSync(resolved,{recursive:true,force:true});
  }
}

test("Python catalog preserves 26 old IDs, provides 160 unique answers and ordered project prerequisites",()=>{
  assert.equal(Object.keys(questions).length,160);
  assert.deepEqual(pythonCurriculum.flatMap(chapter=>chapter.items.map(item=>item.id)),Object.keys(pythonQuestionMap));
  for(const topic of ["hello","variables","arithmetic","input","if","for","while","list","dict","function","exception","class","score-app"])
    for(const suffix of ["q1","q2"])assert.ok(questions[`python-${topic}-${suffix}`]);
  const source=Object.values(questions).map(question=>question.answerCode.replace(/\s+/g," ").trim());
  assert.equal(new Set(source).size,160);
  const topics=Object.keys(pythonQuestionMap);
  for(const question of Object.values(questions)) {
    assert.ok(question.testCases.length);
    assert.ok(question.testCases.some(item=>item.stdin===(question.sampleInput??"")&&item.expectedOutput===question.expectedOutput),question.id);
    if(question.sampleInput)assert.ok(question.testCases.length>=3,question.id);
    if(question.project)for(const prerequisite of question.project.prerequisiteTopicIds)assert.ok(topics.indexOf(prerequisite)>=0&&topics.indexOf(prerequisite)<topics.indexOf(question.topicId),question.id);
    if(question.project?.previousQuestionId)assert.equal(question.starterCode,questions[question.project.previousQuestionId].answerCode);
  }
});

test("Python grader checks multiple server cases and rejects hardcoded sample output",async()=>{
  const question=questions["python-if-q1"];
  const calls=[];
  const good=await gradePythonQuestion(question,question.answerCode,async(code,stdin)=>{calls.push(code);return accepted(Number(stdin)>=60?"Pass":"Fail");});
  assert.equal(good.correct,true);
  assert.equal(calls.length,question.testCases.length);
  assert.ok(calls.every(code=>code.includes("_ast.parse")));
  const hardcoded=await gradePythonQuestion(question,'print("Pass")',async()=>accepted("Pass"));
  assert.equal(hardcoded.correct,false);
  assert.equal((await gradePythonQuestion(question,"bad",async()=>({...accepted("Pass"),statusId:11}))).correct,false);
});

test("Python API validates question IDs and ignores client answers",async()=>{
  const calls=[];
  const {POST}=load("src/app/api/execute/route.ts",{"@/lib/judge0":{executePython:async(code,stdin)=>{calls.push(code);return accepted(Number(stdin)>=60?"Pass":"Fail");}}});
  const request=body=>({json:async()=>body});
  const response=await POST(request({language:"python",code:questions["python-if-q1"].answerCode,questionId:"python-if-q1",stdin:"75\n",expectedOutput:"fake"}));
  assert.equal(response.status,200);
  assert.equal((await response.json()).grading.correct,true);
  assert.equal(calls.length,questions["python-if-q1"].testCases.length+1);
  for(const questionId of ["missing","c-if-q1","toString",1])assert.equal((await POST(request({language:"python",code:"x",questionId}))).status,400);
});

test("real Python rejects comments and strings as substitutes for required syntax",{skip:!!probe.error},()=>{
  const question=questions["python-comprehension-squares"];
  const fake='# [x*x for x in values]\nnote="[x*x for x in values]"\nprint("9 1 0 64")';
  assert.notEqual(run(fake,question).status,0);
  assert.equal(run(question.answerCode,question).status,0);
});

test("real Python verifies function return values and independent class instances",{skip:!!probe.error},()=>{
  const fn=questions["python-function-maximum"];
  assert.notEqual(run('def max2(a,b):\n    return 5\na,b=map(int,input().split())\nprint(max2(a,b))',fn).status,0);
  const counter=questions["python-class-counter"];
  assert.notEqual(run('class Counter:\n    count=0\n    def add(self,n):\n        Counter.count+=n\nvalue=int(input())\nx=Counter()\nx.add(value)\nx.add(value)\nprint(x.count)',counter).status,0);
  assert.equal(run(counter.answerCode,counter).status,0);
});

test("real Python verifies file contents, JSON types and checks after sys.exit(0)",{skip:!!probe.error},()=>{
  const question=questions["python-json-file"];
  assert.notEqual(run('import json\nvalues=json.loads(input())\nwith open("values.json","w") as file:\n    json.dump([True,2,3],file)\nprint(sum(values))',question,question.testCases[1]).status,0);
  const file=questions["python-files-text"];
  assert.notEqual(run('import sys\ntext=input()\nprint(text)\nsys.exit(0)',file).status,0);
  assert.equal(run(file.answerCode,file).status,0);
});

test("task restore preserves current tasks on malformed JSON, duplicate IDs and invalid fields",{skip:!!probe.error},()=>{
  const question=questions["python-project-task-storage-q2"];
  for(const testCase of question.testCases) {
    const result=run(question.answerCode,question,testCase);
    assert.equal(result.status,0,result.stderr);
    assert.equal(result.stdout.replace(/\r\n/g,"\n").trim(),testCase.expectedOutput);
  }
});
