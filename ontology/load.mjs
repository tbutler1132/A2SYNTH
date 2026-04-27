import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import { validate } from "./validate.mjs";

const ENTITIES_DIR = path.resolve("data/entities");
const BODY_FIELDS = { Vision: "content", Page: "content", Essay: "content" };
const FRONTMATTER = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/;

const typeFromFolder = (folder) => {
  const cap = folder[0].toUpperCase() + folder.slice(1);
  return cap.endsWith("s") ? cap.slice(0, -1) : cap;
};

const parseEntity = (filePath, type) => {
  const raw = fs.readFileSync(filePath, "utf8");
  const match = raw.match(FRONTMATTER);
  if (!match) throw new Error(`${filePath}: missing frontmatter`);
  const data = yaml.load(match[1], { schema: yaml.CORE_SCHEMA }) || {};
  const body = match[2].trim();
  const field = BODY_FIELDS[type];
  if (field && body) data[field] = body;
  return data;
};

export function load() {
  if (!fs.existsSync(ENTITIES_DIR)) return [];
  const entities = [];
  for (const folder of fs.readdirSync(ENTITIES_DIR)) {
    const dir = path.join(ENTITIES_DIR, folder);
    if (!fs.statSync(dir).isDirectory()) continue;
    const type = typeFromFolder(folder);
    for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".md"))) {
      const filePath = path.join(dir, file);
      const data = parseEntity(filePath, type);
      const { valid, errors } = validate(type, data);
      entities.push({
        type,
        file: path.relative(process.cwd(), filePath),
        data,
        valid,
        errors,
      });
    }
  }
  return entities;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const entities = load();
  let pass = 0;
  let fail = 0;
  for (const e of entities) {
    if (e.valid) {
      console.log(`  ok    ${e.type.padEnd(7)} ${e.file}`);
      pass++;
    } else {
      console.log(`  FAIL  ${e.type.padEnd(7)} ${e.file}`);
      for (const err of e.errors) {
        console.log(`        ${err.instancePath || "/"} ${err.message}`);
      }
      fail++;
    }
  }
  console.log(`\n${pass} valid, ${fail} invalid`);
  process.exit(fail ? 1 : 0);
}
