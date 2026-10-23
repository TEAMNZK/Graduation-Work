import type { PythonQuestion } from "./pythonQuestions";
import { cases } from "./pythonLessons/builders";

const checkoutCode='price=int(input())\ncount=int(input())\npaid=int(input())\ntotal=price*count\nprint(total)\nif paid>=total:\n    print("Change")\n    print(paid-total)\nelse:\n    print("Short")\n    print(total-paid)\n';
function taskCode(storage:number):string {
  return `${storage?"import json\n":""}tasks={}
commands=int(input())
for _ in range(commands):
    parts=input().split()
    operation=int(parts[0])
    if operation==1:
        task_id=int(parts[1])
        if task_id in tasks:
            print("Exists")
        else:
            tasks[task_id]={"id":task_id,"title":parts[2],"done":False}
            print("Added")
    elif operation==2:
        task_id=int(parts[1])
        if task_id in tasks:
            tasks[task_id]["done"]=True
            print("Done")
        else:
            print("Missing")
    elif operation==3:
        print(len(tasks))
        for task_id in sorted(tasks):
            task=tasks[task_id]
            print(task_id,task["title"],"Done" if task["done"] else "Pending")
    elif operation==4:
        task_id=int(parts[1])
        if task_id in tasks:
            del tasks[task_id]
            print("Deleted")
        else:
            print("Missing")
${storage?`    elif operation==5:
        with open("tasks.json","w",encoding="utf-8") as file:
            json.dump([tasks[task_id] for task_id in sorted(tasks)],file)
        print("Saved")
`:""}${storage===2?`    elif operation==6:
        try:
            with open("tasks.json",encoding="utf-8") as file:
                loaded=json.load(file)
            if not isinstance(loaded,list):
                raise ValueError("list required")
            restored={}
            for task in loaded:
                if not isinstance(task,dict) or set(task)!={"id","title","done"}:
                    raise ValueError("invalid task")
                task_id=task["id"]
                title=task["title"]
                if type(task_id) is not int or not 1<=task_id<=9999 or task_id in restored:
                    raise ValueError("invalid ID")
                if not isinstance(title,str) or not 1<=len(title)<=20 or not title.isascii() or not title.isalpha() or type(task["done"]) is not bool:
                    raise ValueError("invalid fields")
                restored[task_id]=task
            tasks=restored
            print("Loaded")
        except FileNotFoundError:
            print("MissingFile")
        except (ValueError,TypeError):
            print("InvalidFile")
    elif operation==7:
        tasks={}
        print("Cleared")
`:""}`;
}

function scenario(input:string,initialFiles?:Record<string,string>):NonNullable<PythonQuestion["testCases"]>[number] {
  type Task={id:number;title:string;done:boolean};
  let tasks=new Map<number,Task>(),file=initialFiles?.["tasks.json"],written=false;
  const output:string[]=[],lines=input.trim().split("\n");
  if(Number(lines[0])!==lines.length-1)throw new Error("Invalid task scenario length");
  for(const line of lines.slice(1)) {
    const [command,key,title]=line.split(" "),id=Number(key);
    if(command==="1"){if(tasks.has(id))output.push("Exists");else{tasks.set(id,{id,title,done:false});output.push("Added");}}
    else if(command==="2"){const task=tasks.get(id);if(task){task.done=true;output.push("Done");}else output.push("Missing");}
    else if(command==="3"){output.push(String(tasks.size),...Array.from(tasks.values()).sort((a,b)=>a.id-b.id).map(task=>`${task.id} ${task.title} ${task.done?"Done":"Pending"}`));}
    else if(command==="4")output.push(tasks.delete(id)?"Deleted":"Missing");
    else if(command==="5"){file=JSON.stringify([...tasks.values()].sort((a,b)=>a.id-b.id));written=true;output.push("Saved");}
    else if(command==="6"){
      if(file===undefined){output.push("MissingFile");continue;}
      try {
        const parsed:unknown=JSON.parse(file);if(!Array.isArray(parsed))throw new Error();
        const restored=new Map<number,Task>();
        for(const task of parsed){if(!task||typeof task!=="object"||Object.keys(task).sort().join(",")!=="done,id,title"||!Number.isInteger(task.id)||task.id<1||task.id>9999||restored.has(task.id)||typeof task.title!=="string"||!/^[A-Za-z]{1,20}$/.test(task.title)||typeof task.done!=="boolean")throw new Error();restored.set(task.id,{...task});}
        tasks=restored;output.push("Loaded");
      }catch{output.push("InvalidFile");}
    }else if(command==="7"){tasks=new Map();output.push("Cleared");}
    else throw new Error("Unknown task operation");
  }
  return {stdin:input,expectedOutput:output.join("\n"),initialFiles,fileChecks:written?[{path:"tasks.json",json:JSON.parse(file!)}]:undefined};
}

const menu="1行目の操作回数q（1〜50）に続き、q行の操作を読み取ります。IDは1〜9999、タイトルはASCII英字1〜20文字です。\n1 id title：未登録なら未完了で追加しAdded。同じIDならExistsで変更しません。\n2 id：完了へ変更しDone。未登録ならMissing。\n3：件数を表示し、ID昇順にid title Pending（完了済みならDone）を1行ずつ表示。\n4 id：削除しDeleted。未登録ならMissing。\n入力を促すメッセージは表示しません。";
const baseInputs=["7\n1 2 Study\n1 1 Read\n2 2\n3\n4 1\n4 9\n3\n","5\n3\n2 9\n1 1 Work\n1 1 Other\n3\n","4\n1 5 Read\n2 5\n2 5\n3\n"];
function taskProject(id:string,title:string,storage:number,tests:NonNullable<PythonQuestion["testCases"]>):PythonQuestion {
  const extra=storage?"\n5：ID昇順のタスク配列をtasks.jsonへUTF-8でJSON保存しSaved。各タスクはid（整数）,title（文字列）,done（真偽値）の3キーだけを持ちます。":"";
  const load=storage===2?"\n6：tasks.jsonから全データを復元しLoaded。ファイルがなければMissingFile、不正なJSON・スキーマ・重複IDならInvalidFile。失敗時は現在のタスクを変更しません。\n7：メモリ上のタスクだけを全削除しCleared。\n保存→全削除→復元で再起動に相当する動作を確認します。採点の各実行間でファイルは共有しません。":"";
  return {id:`${id}-q${storage===2?2:1}`,topicId:id,no:storage?"制作4":"制作3",title,description:menu+extra+load,
    hint:storage===2?"一時的な辞書へ全レコードを検証してから置き換えると、読込失敗で現在のタスクを失いません。IDはboolと区別し、タイトルはASCII英字1〜20文字、doneはboolで検証します。":storage?"json.dumpで辞書のリストを保存します。withで閉じた後にファイル内容を確かめましょう。":"IDをキーにした辞書に、タイトルと完了状態を保存します。一覧表示だけsortedで順序を揃えます。",
    starterCode:storage?taskCode(storage-1):"# タスクの辞書と操作メニューを作りましょう\n",answerCode:taskCode(storage),
    sampleInput:tests[0].stdin,expectedOutput:tests[0].expectedOutput,testCases:tests,type:storage?"final_project":"mini_project",
    requiredNodes:storage===2?["For","With","Try"]:storage?["For","With"]:["For"],
    requiredPatterns:storage?["json . dump(",...(storage===2?["json . load("]:[])]:[],
    project:{goal:storage===2?"終了しても記録を戻せるタスク管理を完成させる。":storage?"作ったタスクをJSONへ保存できるようにする。":"タスクの登録・完了・一覧・削除ができるアプリを作る。",prerequisiteTopicIds:storage===2?["python-json","python-exception","python-validation"]:storage?["python-files","python-json"]:["python-dict","python-records","python-function"],steps:storage===2?["前段階の登録・保存機能を保つ","読込内容を検証し、一時辞書に復元する","成功時だけ現在の辞書を置き換える","保存→全削除→復元と、不正ファイルからの回復を試す"]:storage?["前段階のタスク管理を保つ","JSON保存の操作を追加する","ID・タイトル・完了状態が全て保存されることを確認する"]:["IDごとのタスクを保存する辞書を作る","追加・完了・削除の操作を実装する","一覧をID順で表示する"],previousQuestionId:storage===2?`${id}-q1`:storage?"python-project-tasks-q1":undefined}};
}
export const pythonProjects:PythonQuestion[]=[
  {id:"python-project-checkout-q1",topicId:"python-project-checkout",no:"制作1",title:"お会計アプリ",description:"単価（1〜1000）、個数（1〜100）、預かり金（0〜100000）を3行から読み取ります。1行目に合計金額、足りれば2行目にChangeと3行目にお釣り、不足なら2行目にShortと3行目に不足額を表示してください。",hint:"合計を計算してから支払額と比較します。ちょうど支払える場合はお釣り0です。",starterCode:"# 入力・計算・条件分岐で完成させましょう\n",answerCode:checkoutCode,type:"mini_project",requiredNodes:["If"],sampleInput:"120\n3\n500\n",expectedOutput:"360\nChange\n140",testCases:cases(["120\n3\n500","250\n2\n500","300\n2\n400","1\n1\n0"],s=>{const[p,count,paid]=s.split("\n").map(Number),total=p*count;return`${total}\n${paid>=total?"Change":"Short"}\n${Math.abs(paid-total)}`;}),project:{goal:"合計・お釣り・不足額を計算するお会計アプリを作る。",prerequisiteTopicIds:["python-input","python-arithmetic","python-if"],steps:["単価・個数・預かり金を読み取る","合計を計算する","支払いが足りるか分岐し、差額を表示する"]}},
  taskProject("python-project-tasks","タスク管理アプリ",0,baseInputs.map(input=>scenario(input))),
  taskProject("python-project-task-storage","保存できるタスク管理① JSON保存",1,[...baseInputs.map(input=>scenario(input)),scenario("5\n1 2 Study\n1 1 Read\n2 2\n5\n3\n"),scenario("1\n5\n")]),
  taskProject("python-project-task-storage","保存できるタスク管理② 検証と復元",2,[
    scenario("7\n1 1 Read\n2 1\n5\n7\n6\n3\n1 2 Study\n"),
    scenario("4\n5\n1 1 Work\n6\n3\n"),
    scenario("3\n1 1 Work\n6\n3\n"),
    scenario("3\n1 1 Work\n6\n3\n",{"tasks.json":"{broken"}),
    scenario("3\n1 1 Work\n6\n3\n",{"tasks.json":'[{"id":true,"title":"Read","done":false}]'}),
    scenario("3\n1 1 Work\n6\n3\n",{"tasks.json":'{}'}),
    scenario("3\n1 1 Work\n6\n3\n",{"tasks.json":'[{"id":2,"title":"Read","done":1}]'}),
    scenario("3\n1 1 Work\n6\n3\n",{"tasks.json":'[{"id":2,"title":"Bad Title","done":false}]'}),
    scenario("3\n1 1 Work\n6\n3\n",{"tasks.json":'[{"id":2,"title":"Read","done":false},{"id":2,"title":"Other","done":true}]'}),
    scenario("2\n6\n3\n",{"tasks.json":'[{"id":9,"title":"Read","done":true},{"id":2,"title":"Work","done":false}]'}),
  ]),
];
