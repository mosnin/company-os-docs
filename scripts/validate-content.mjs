import { readFileSync, readdirSync } from "node:fs";
import { extname, join, relative } from "node:path";

const root = new URL("../", import.meta.url).pathname;
const extensions = new Set([".ts", ".tsx", ".css", ".md", ".mjs", ".json"]);
const ignored = new Set(["node_modules", ".next", "out", ".git"]);

function filesIn(directory) {
  const files = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...filesIn(path));
    else if (extensions.has(extname(entry.name))) files.push(path);
  }
  return files;
}

const sourceFiles = filesIn(root);
const source = sourceFiles.map((path) => readFileSync(path, "utf8")).join("\n");
const problems = [];

for (const path of sourceFiles) {
  const text = readFileSync(path, "utf8");
  if (text.includes("\u2014") || text.includes("\u2013")) {
    problems.push(`${relative(root, path)} contains a prohibited long dash character`);
  }
  if (/companyos\.xyz/i.test(text)) {
    problems.push(`${relative(root, path)} references an unowned domain`);
  }
}

const requiredStrings = [
  "https://docs.companyos.sh",
  "https://www.companyos.sh/api/mcp",
  "@mosnin/companyos",
  "2025-06-18",
  "company-os-ledger 1.6.0",
  "Not published yet",
];

const toolNames = [
  "config_pull",
  "document_get",
  "document_put",
  "branch_create",
  "context_search",
  "feedback_list",
  "feedback_add",
  "context_changes",
  "document_history",
  "run_append",
  "document_list",
  "branch_list",
  "branch_diff",
  "branch_merge",
  "document_revert",
  "merge_revert",
  "merge_list",
  "schema_describe",
];

for (const value of [...requiredStrings, ...toolNames]) {
  if (!source.includes(value)) problems.push(`required documentation string is missing: ${value}`);
}

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}

console.log(`content validation passed: ${sourceFiles.length} files, ${toolNames.length} MCP tools`);
