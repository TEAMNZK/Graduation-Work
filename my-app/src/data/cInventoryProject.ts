import type { CQuestion } from "./cQuestions";
import { cProjects } from "./cProjects";

// All stages share the same menu so the previous program can be extended.
function answer(dynamic: boolean, persistence: boolean, flags = false): string {
  return `#include <stdio.h>
#include <stdlib.h>
struct Product { int id, stock; ${flags ? "unsigned int flags;" : ""} };
int find_product(const struct Product *items, int count, int id) {
    for (int i=0;i<count;i++) if(items[i].id==id) return i;
    return -1;
}
${dynamic ? `int ensure_capacity(struct Product **items,int *capacity,int needed) {
    if(needed<=*capacity)return 1;
    int next=*capacity?*capacity*2:2;
    while(next<needed)next*=2;
    struct Product *grown=realloc(*items,(size_t)next*sizeof **items);
    if(!grown)return 0;
    *items=grown; *capacity=next; return 1;
}` : ""}
${persistence ? `int save_products(const struct Product *items,int count) {
    FILE *file=fopen("inventory.txt","w");
    if(!file)return 0;
    int ok=fprintf(file,"%d\\n",count)>=0;
    for(int i=0;i<count;i++)if(fprintf(file,"%d %d${flags ? " %u" : ""}\\n",items[i].id,items[i].stock${flags ? ",items[i].flags" : ""})<0)ok=0;
    if(fclose(file)!=0)ok=0;
    return ok;
}
int load_products(struct Product **items,int *count,int *capacity) {
    FILE *file=fopen("inventory.txt","r");
    if(!file)return 0;
    int total;
    if(fscanf(file,"%d",&total)!=1||total<0||total>50){fclose(file);return -1;}
    struct Product *loaded=malloc((size_t)(total?total:1)*sizeof *loaded);
    if(!loaded){fclose(file);return -1;}
    for(int i=0;i<total;i++)if(fscanf(file,"%d%d${flags ? "%u" : ""}",&loaded[i].id,&loaded[i].stock${flags ? ",&loaded[i].flags" : ""})!=${flags ? 3 : 2}){free(loaded);fclose(file);return -1;}
    if(fclose(file)!=0){free(loaded);return -1;}
    free(*items); *items=loaded; *count=total; *capacity=total?total:1;
    return 1;
}` : ""}
int main(void) {
    int commands,count=0,capacity=${dynamic ? 2 : 10};
    ${dynamic ? "struct Product *items=malloc((size_t)capacity*sizeof *items);\n    if(!items)return 1;" : "struct Product storage[10];\n    struct Product *items=storage;"}
    scanf("%d",&commands);
    for(int step=0;step<commands;step++) {
        int operation;scanf("%d",&operation);
        if(operation==1) {
            int id,stock;scanf("%d%d",&id,&stock);
            if(find_product(items,count,id)>=0){puts("Exists");continue;}
            ${dynamic ? 'if(!ensure_capacity(&items,&capacity,count+1)){free(items);return 1;}' : 'if(count==capacity){puts("Full");continue;}'}
            items[count].id=id;items[count].stock=stock;${flags ? "items[count].flags=1u;" : ""}count++;puts("Added");
        } else if(operation==2) {
            int id;scanf("%d",&id);int index=find_product(items,count,id);
            if(index<0)puts("Missing");else printf("%d %d\\n",items[index].id,items[index].stock);
        } else if(operation==3) {
            printf("%d\\n",count);
            for(int i=0;i<count;i++)printf("%d %d\\n",items[i].id,items[i].stock);
        } else if(operation==4||operation==5) {
            int id,quantity;scanf("%d%d",&id,&quantity);int index=find_product(items,count,id);
            if(index<0)puts("Missing");
            else if(operation==5&&items[index].stock<quantity)puts("Short");
            else {items[index].stock+=operation==4?quantity:-quantity;puts("OK");}
        }
        ${persistence ? `else if(operation==6)puts(save_products(items,count)?"Saved":"IOError");
        else if(operation==7){int result=load_products(&items,&count,&capacity);puts(result==1?"Loaded":result==0?"MissingFile":"IOError");}
        else if(operation==8){free(items);items=NULL;count=0;capacity=0;puts("Cleared");}` : ""}
        ${flags ? `else if(operation==9){int id;unsigned int bit;scanf("%d%u",&id,&bit);int index=find_product(items,count,id);if(index<0)puts("Missing");else{items[index].flags^=bit;puts("Updated");}}
        else if(operation==10){int id;scanf("%d",&id);int index=find_product(items,count,id);if(index<0)puts("Missing");else printf("%d %u\\n",items[index].id,items[index].flags);}` : ""}
    }
    ${dynamic ? "free(items);" : ""}
    return 0;
}
`;
}

// Independent model supplies expected console output and the final saved file.
function scenario(input: string, flags = false): CQuestion["testCases"][number] {
  const tokens=input.trim().split(/\s+/).map(Number);let cursor=1;
  type Product = { id:number; stock:number; flags:number };
  let items: Product[] = [], saved: Product[] | undefined;
  const output: string[]=[];
  for(let step=0;step<tokens[0];step++) {
    const op=tokens[cursor++];
    if(op===1){const id=tokens[cursor++],stock=tokens[cursor++];if(items.some(item=>item.id===id))output.push("Exists");else{items.push({id,stock,flags:1});output.push("Added");}}
    else if(op===2||op===10){const id=tokens[cursor++],item=items.find(item=>item.id===id);output.push(item?`${item.id} ${op===10?item.flags:item.stock}`:"Missing");}
    else if(op===3){output.push(String(items.length),...items.map(item=>`${item.id} ${item.stock}`));}
    else if(op===4||op===5){const id=tokens[cursor++],quantity=tokens[cursor++],item=items.find(item=>item.id===id);if(!item)output.push("Missing");else if(op===5&&item.stock<quantity)output.push("Short");else{item.stock+=op===4?quantity:-quantity;output.push("OK");}}
    else if(op===6){saved=items.map(item=>({...item}));output.push("Saved");}
    else if(op===7){if(saved){items=saved.map(item=>({...item}));output.push("Loaded");}else output.push("MissingFile");}
    else if(op===8){items=[];output.push("Cleared");}
    else if(op===9){const id=tokens[cursor++],bit=tokens[cursor++],item=items.find(item=>item.id===id);if(item){item.flags^=bit;output.push("Updated");}else output.push("Missing");}
    else throw new Error(`Unknown operation ${op}`);
  }
  if(cursor!==tokens.length)throw new Error("Unexpected scenario input length");
  return {stdin:input,expectedOutput:output.join("\n"),fileChecks:saved?[{
    path:"inventory.txt",text:`${saved.length}\n`+saved.map(item=>`${item.id} ${item.stock}${flags?` ${item.flags}`:""}\n`).join(""),
  }]:undefined};
}

const common = "最初に操作回数q（1〜50）を読み取ります。IDは1〜9999、初期在庫は0〜1000、入出庫数は1〜100です。\n操作1 id stock：登録しAdded。同じIDならExistsで変更しません。\n操作2 id：見つかればid stock、なければMissing。\n操作3：件数を表示し、登録順にid stockを1行ずつ表示します。\n操作4 id quantity：入庫しOK。未登録ならMissing。\n操作5 id quantity：出庫しOK。在庫不足ならShortで変更せず、未登録ならMissing。\n入力を促すメッセージは表示しません。";
const persistence = "\n操作6：inventory.txtに件数と商品一覧を保存しSaved。ファイルは1行目が件数、以降はid stockを1行ずつ、末尾改行ありです。\n操作7：保存済みデータでメモリ上の一覧を置き換えてLoaded。ファイルがなければMissingFileで変更しません。\n操作8：メモリ上の全商品を削除してCleared。保存ファイルは残します。\n操作6→8→7で再起動に相当する保存・解放・復元を試してください。実行ごとのファイルは独立しているため、別の実行への引き継ぎは採点対象外です。";

function stage(index:number,title:string,description:string,hint:string,steps:string[],code:string,inputs:string[],flags=false): CQuestion {
  const testCases=inputs.map(input=>scenario(input,flags));
  return {
    id:flags?"c-project-inventory-flags-q1":`c-project-inventory-advanced-q${index}`,
    no:flags?"発展":"制作4",title,description,hint,explanation:hint,type:"final_project",
    starterCode:index===1?cProjects["c-project-inventory"].answerCode:answer(index>=3,index>=4),
    answerCode:code,sampleInput:testCases[0].stdin,expectedOutput:testCases[0].expectedOutput,testCases,
    requiredPatterns:index>=2?["realloc","free",...(index>=3?["fopen","fclose"]:[]),...(flags?["^"]:[])]:["struct Product"],
    project:{goal:title,prerequisiteTopicIds:index===1?["c-records","c-function"]:flags?["c-bits","c-enum"]:index===2?["c-memory"]:["c-files"],steps,optional:flags,stage:index,previousQuestionId:flags?"c-project-inventory-advanced-q3":index>1?`c-project-inventory-advanced-q${index-1}`:"c-project-inventory-q1"},
  };
}

const basicScenarios=[
  "7\n1 101 5\n1 102 2\n2 101\n4 102 3\n5 101 8\n5 101 5\n3\n",
  "5\n3\n2 9\n1 1 0\n1 1 100\n3\n",
  "5\n1 5 2\n4 99 3\n5 99 1\n2 5\n3\n",
];
const savedScenarios=[
  "8\n1 101 5\n1 102 2\n6\n4 101 7\n8\n7\n2 101\n3\n",
  "4\n6\n1 1 5\n7\n3\n",
  "6\n7\n1 3 8\n6\n5 3 8\n7\n3\n",
  "10\n1 1 2\n6\n1 2 3\n1 3 4\n6\n8\n7\n1 4 5\n2 4\n3\n",
];
export const cInventoryStages = [
  stage(1,"在庫管理を育てる① 複数商品の登録・検索",common+"\nstruct Product { int id; int stock; }の固定長配列で実装します。登録される商品は最大10件です。", "最初は動的メモリやファイルを使わず、構造体配列とID検索を完成させます。",["商品配列と現在の件数を用意する","重複しない商品の登録・ID検索・一覧を実装する","IDで対象を探し、既存の入出庫処理につなぐ"],answer(false,false),basicScenarios),
  stage(2,"在庫管理を育てる② 件数に応じたメモリ拡張",common+"\n商品数は最大50件です。前段階の固定長配列を、初期容量2件のmallocと容量不足時のreallocに置き換えます。容量は2倍ずつ拡張し、既存商品を保ちます。確保失敗を確認し、終了時にfreeしてください。", "reallocの戻り値は一時ポインタで受けます。登録前に容量を確認し、重複登録では件数を増やしません。",["前段階の操作仕様をそのまま保つ","固定長配列を初期容量2件の動的配列に変える","3件目・5件目の登録で拡張し、既存商品が残ることを確かめる","失敗時と終了時の解放を実装する"],answer(true,false),[...basicScenarios,"8\n1 1 10\n1 2 20\n1 3 30\n1 4 40\n1 5 50\n2 1\n2 5\n3\n",`50\n${Array.from({length:49},(_,i)=>`1 ${i+1} ${i}`).join("\n")}\n3\n`]),
  stage(3,"在庫管理を育てる③ 保存・復元して完成",common+persistence+"\n動的配列を引き続き使い、読込時に必要な領域を確保してください。保存・復元は成功する入力とファイルで検証しますが、オープンや確保の失敗も確認してください。", "読み込むデータは別の領域に作り、全て読み込めてから現在の配列を置き換えると、途中失敗で元の一覧を壊しません。",["前段階の動的配列と操作メニューを保つ","件数と登録順の商品情報をテキスト形式で保存する","保存した件数に合わせて領域を確保し、一覧を復元する","保存→全削除→復元で在庫が戻ることを確かめる","復元後も商品を追加できることを確かめる"],answer(true,true),savedScenarios),
];
export const cInventoryFlags = stage(4,"任意の発展：販売状態のフラグ",common+persistence+"\nこの課題は任意です。完成版のProductにunsigned int flagsを追加し、登録時は1（販売中）にします。ビット1は販売中、ビット2は要補充を表します。\n操作9 id bit：bit（1または2）をXORで反転しUpdated。未登録ならMissing。\n操作10 id：id flagsを表示。未登録ならMissing。\n保存形式もid stock flagsに拡張し、復元でフラグを保ってください。", "販売中と要補充は独立したビットです。必修の完成版はフラグなしで完成として扱い、この機能は追加挑戦にします。",["完成版に状態フィールドを追加する","XORによる状態切替と確認操作を追加する","保存・復元の項目にもフラグを追加する"],answer(true,true,true),[
  "8\n1 1 5\n10 1\n9 1 2\n10 1\n6\n8\n7\n10 1\n",
  "6\n1 2 0\n9 2 1\n10 2\n9 2 2\n10 2\n3\n",
  "5\n9 9 1\n10 9\n6\n7\n3\n",
],true);
