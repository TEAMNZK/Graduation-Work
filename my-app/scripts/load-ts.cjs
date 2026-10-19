const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");
const cache = new Map();
const root = path.resolve(__dirname, "..");

module.exports = function loadTs(file, overrides = {}) {
  const absolute = path.resolve(root, file);
  if (cache.has(absolute) && Object.keys(overrides).length === 0) return cache.get(absolute);
  const exports = {};
  const code = ts.transpileModule(fs.readFileSync(absolute, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const requireModule = (name) => {
    if (Object.hasOwn(overrides, name)) return overrides[name];
    if (name.startsWith("@/")) return module.exports(path.join("src", name.slice(2)) + ".ts", overrides);
    if (name.startsWith(".")) return module.exports(path.resolve(path.dirname(absolute), name) + ".ts", overrides);
    return require(name);
  };
  new Function("require", "exports", code)(requireModule, exports);
  if (Object.keys(overrides).length === 0) cache.set(absolute, exports);
  return exports;
};
