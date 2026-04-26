# A2SYNTH

A personal content system. Songs, posts, pages, essays — defined by an
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
data/
  entities/      Authored content. One subfolder per entity type.
                 Markdown with frontmatter (metadata) + body (prose).
  assets/        Audio, images, etc.
UI/              Frontend. Vanilla now, Next.js later.
docs/            Project docs (when needed).
```

## Ontology

`ontology/ontology.json` is a JSON Schema. Each entity lives under `$defs`.
The schema is the **logical contract** — storage-agnostic. Markdown today,
SQLite tomorrow; the schema doesn't move.

Current entities: `Song`, `Post`, `Page`, `Essay`.

- Songs are written by the user; body field is `lyrics`.
- Posts are markdown content; body field is `content`.
- Pages are richer (think full HTML); body field is `content`.
- Essays are long-form prose; body field is `content`.

Only `name` is required. Drafts validate.

## Storage convention

Entities are markdown files with YAML frontmatter:

- Frontmatter holds structured metadata (`name`, timestamps, …).
- The markdown body becomes the entity's body field (`content` or `lyrics`).
- Loaders map body → target field per type, then validate the resulting
  object against the schema.

## Validating

```sh
node ontology/validate.mjs        # demo run
```

In code:

```js
import { validate } from "./ontology/validate.mjs";
validate("Song", { name: "Hey Jude", lyrics: "..." });
```

## Coming later

- A loader that walks `data/entities/` and lands rows in SQLite.
- Next.js UI consuming the ontology and content.

Both should arrive only when needed. Keep the surface small until then.
