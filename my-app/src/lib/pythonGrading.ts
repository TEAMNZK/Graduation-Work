import type { PythonQuestion } from "@/data/pythonQuestions";
import type { JavaExecutor } from "@/lib/javaGrading";

/** This program runs in Judge0, not in the Next.js host process. */
export function buildPythonGradingCode(code:string,question:PythonQuestion,testCase:NonNullable<PythonQuestion["testCases"]>[number]):string {
  const policy={requiredPatterns:question.requiredPatterns??[],forbiddenPatterns:question.forbiddenPatterns??[],requiredNodes:question.requiredNodes??[],initialFiles:testCase.initialFiles??{},fileChecks:testCase.fileChecks??[],verificationCode:question.verificationCode??"",recursiveFunctions:question.recursiveFunctions??[],minLoopDepth:question.minLoopDepth??0};
  return `import ast as _ast
import io as _io
import json as _json
import tokenize as _tokenize
import contextlib as _contextlib
from pathlib import Path as _Path
_source=${JSON.stringify(code)}
_policy=_json.loads(${JSON.stringify(JSON.stringify(policy))})
_tree=_ast.parse(_source, filename="answer.py", feature_version=(3,8))
def _tokens(text):
    result=[]
    ignored={_tokenize.ENCODING,_tokenize.COMMENT,_tokenize.NL,_tokenize.NEWLINE,_tokenize.INDENT,_tokenize.DEDENT,_tokenize.ENDMARKER,_tokenize.STRING}
    try:
        for token in _tokenize.generate_tokens(_io.StringIO(text).readline):
            if token.type not in ignored:
                result.append(token.string)
    except (_tokenize.TokenError,IndentationError):
        pass
    return result
_actual_tokens=_tokens(_source)
def _contains(pattern):
    expected=_tokens(pattern)
    return bool(expected) and any(_actual_tokens[i:i+len(expected)]==expected for i in range(len(_actual_tokens)))
for _pattern in _policy["requiredPatterns"]:
    if not _contains(_pattern):
        raise AssertionError("required code element missing: "+_pattern)
for _pattern in _policy["forbiddenPatterns"]:
    if _contains(_pattern):
        raise AssertionError("forbidden code element: "+_pattern)
_node_names={type(node).__name__ for node in _ast.walk(_tree)}
for _node in _policy["requiredNodes"]:
    if _node not in _node_names:
        raise AssertionError("required syntax missing: "+_node)
for _name in _policy["recursiveFunctions"]:
    _definitions=[node for node in _ast.walk(_tree) if isinstance(node,_ast.FunctionDef) and node.name==_name]
    if not any(isinstance(node,_ast.Call) and isinstance(node.func,_ast.Name) and node.func.id==_name for definition in _definitions for node in _ast.walk(definition)):
        raise AssertionError("recursive call missing: "+_name)
def _loop_depth(node,depth=0):
    depth+=int(isinstance(node,(_ast.For,_ast.While)))
    return max([depth]+[_loop_depth(child,depth) for child in _ast.iter_child_nodes(node)])
if _loop_depth(_tree)<_policy["minLoopDepth"]:
    raise AssertionError("nested loop missing")
for _name,_content in _policy["initialFiles"].items():
    _Path(_name).write_text(_content,encoding="utf-8")
_namespace={"__name__":"__main__","__file__":"answer.py"}
try:
    exec(compile(_tree,"answer.py","exec"),_namespace)
except SystemExit as _exit:
    if _exit.code not in (None,0):
        raise
if _policy["verificationCode"]:
    with _contextlib.redirect_stdout(_io.StringIO()):
        exec(_policy["verificationCode"],_namespace)
for _file in _policy["fileChecks"]:
    _path=_Path(_file["path"])
    if "json" in _file:
        with _path.open(encoding="utf-8") as _stream:
            _value=_json.load(_stream)
        if _json.dumps(_value,sort_keys=True,separators=(",",":"))!=_json.dumps(_file["json"],sort_keys=True,separators=(",",":")):
            raise AssertionError("saved JSON differs")
    elif _path.read_text(encoding="utf-8")!=_file["text"]:
        raise AssertionError("saved text differs")
`;
}

export async function gradePythonQuestion(question:PythonQuestion,code:string,execute:JavaExecutor) {
  const cases=question.testCases??[{stdin:question.sampleInput??"",expectedOutput:question.expectedOutput}];
  const normalize=(value:string)=>value.replace(/\r\n?/g,"\n").trim();
  let passedCount=0;
  for(const testCase of cases) {
    const result=await execute(buildPythonGradingCode(code,question,testCase),testCase.stdin);
    if(result.statusId!==3||result.stderr||normalize(result.stdout)!==normalize(testCase.expectedOutput)) {
      return {correct:false,message:`テスト${passedCount+1}/${cases.length}に合格しませんでした。出力・入力の境界・指定された構文${question.verificationCode?"・関数やクラスの仕様":""}${testCase.fileChecks?.length?"・保存内容":""}を確認してください。`,passedCount,testCount:cases.length};
    }
    passedCount++;
  }
  return {correct:true,message:`${cases.length}件のテストに合格しました。`,passedCount,testCount:cases.length};
}
