import { pythonQuestionMap } from "./pythonQuestions";
const chapters=[
  {id:"python-basics",sectionTitle:"第1章 入力と判断 → お会計アプリ",description:"出力・計算・入力・条件分岐を学び、買い物の合計を計算します。",topics:["hello","variables","arithmetic","input","if","logic","project-checkout"]},
  {id:"python-data",sectionTitle:"第2章 データの集計 → 成績集計アプリ",description:"繰り返し・コレクション・検索・関数を組み合わせ、データを集計します。",topics:["for","while","nested","list","tuple","set","range","search","sort","dict","function","score-app"]},
  {id:"python-tasks",sectionTitle:"第3章 データの更新 → タスク管理アプリ",description:"文字列・内包表記・入力検証・レコード処理を使ってタスクを管理します。",topics:["string","comprehension","validation","records","project-tasks"]},
  {id:"python-storage",sectionTitle:"第4章 保存・復元できるタスク管理へ",description:"例外処理・クラス・再帰・ファイル・JSONを学び、保存と復元を2段階で作ります。",topics:["exception","class","recursion","files","json","project-task-storage"]},
];
const titles:Record<string,string>={hello:"画面への出力",variables:"変数",arithmetic:"演算",input:"標準入力",if:"条件分岐",logic:"論理演算",for:"for文",while:"while文",nested:"二重ループ",list:"リスト",tuple:"タプル",set:"集合",range:"範囲と同時走査",search:"検索",sort:"並べ替え",dict:"辞書",function:"関数",string:"文字列",comprehension:"内包表記",validation:"入力の検証",records:"レコード処理",exception:"例外処理",class:"クラス",recursion:"再帰",files:"ファイル操作",json:"JSON"};
export const pythonCurriculum=chapters.map(({topics,...chapter})=>({...chapter,items:topics.map(topic=>{
  const id=`python-${topic}`,question=pythonQuestionMap[id][0];
  return {id,no:question.no,title:titles[topic]??question.title,type:question.type,project:question.project};
})}));
