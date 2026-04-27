# A2SYNTH

A personal content system. Songs, pages, essays — defined by an
ontology, stored as markdown, eventually surfaced through a UI.

## North star: aesthetics

Beauty and elegance are paramount — in the code, the structure, the prose,
the file names. Prefer fewer, well-named files over many small ones. Prefer
plain mechanisms over clever abstractions. If something feels ugly, it is.

## Layout

```
ontology/        Logical schema for all entity types.
  ontology.json    JSON Schema with $defs per entity.
  validate.mjs     Ajv + ajv-formats validator (exports validate, validator).
  load.mjs         Walks data/entities/, parses, validates, returns entities.
data/
  entities/      Authored content. One subfolder per entity type (plural).
                 Markdown with frontmatter (metadata) + body (prose).
  assets/        Audio, images, etc.
UI/              Frontend. Vanilla now, Next.js later.
docs/            Project docs (when needed).
```

## Ontology

`ontology/ontology.json` is a JSON Schema. Each entity lives under `$defs`.
The schema is the **logical contract** — storage-agnostic. Markdown today,
SQLite tomorrow; the schema doesn't move.

Current entities: `Song`, `Page`, `Essay`, `Vision`.

- Songs are written by the user; body field is TBD (no body yet).
- Pages are richer (think full HTML); body field is `content`.
- Essays are long-form prose; body field is `content`.
- Visions declare what a productive unit is *for*; `statement` is the
  one-line distillation, `content` is the long-form elaboration.

Only `name` is required. Drafts validate.

## Storage convention

Entities are markdown files with YAML frontmatter:

- Frontmatter holds structured metadata (`name`, timestamps, …).
- The markdown body becomes the entity's body field (`content` for Page,
  Essay, and Vision; Song has no body field yet).
- Loaders map body → target field per type, then validate the resulting
  object against the schema.

## Validating

```sh
npm run load                      # walk data/entities/, validate everything
node ontology/validate.mjs        # demo run on inline cases
```

In code:

```js
import { validate } from "./ontology/validate.mjs";
import { load } from "./ontology/load.mjs";

validate("Vision", { name: "Too Synthetic" });
const entities = load();          // [{ type, file, data, valid, errors }]
```

## Coming later

- SQLite sink for the loader, when something needs to query entities.
- Next.js UI consuming the ontology and content.

Both should arrive only when needed. Keep the surface small until then.
