import Ajv from "ajv";
import addFormats from "ajv-formats";
import ontology from "./ontology.json" with { type: "json" };

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
ajv.addSchema(ontology, "ontology");

export function validator(entityName) {
  return ajv.compile({ $ref: `ontology#/$defs/${entityName}` });
}

export function validate(entityName, data) {
  const v = validator(entityName);
  return { valid: v(data), errors: v.errors };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const cases = [
    ["Song", { name: "Hey Jude", created_at: "2026-04-26T12:00:00Z" }],
    ["Song", { name: "Bad Date", created_at: "yesterday" }],
    ["Essay", { name: "On Time", content: "draft" }],
    ["Page", { name: "Hi", extra: "nope" }],
    ["Vision", { name: "A2SYNTH", statement: "A personal content system rooted in beauty.", content: "The full elaboration of what this is for...", created_at: "2026-04-27T09:00:00Z" }]
  ];
  for (const [type, data] of cases) {
    const { valid, errors } = validate(type, data);
    console.log(type, JSON.stringify(data), "=>", valid ? "VALID" : `INVALID (${ajv.errorsText(errors)})`);
  }
}
