---
layout: layout-documentation
product: weaviate-cli
sub-menu: Schema
product-order: 3
title: Truncate
intro: If a weaviate is empty, you can truncate the schema.
description: Truncate a schema
tags: ['weaviate-cli', 'schema', 'truncate']
menu-order: 5
open-graph-type: article
og-img: documentation.jpg
toc: true
---

## Basics

If a weaviate [is empty](../misc/empty.html), you can truncate the schema.

## Schema Truncate

You can truncate a weaviate by running:

```bash
$ weaviate-cli schema-truncate
```

Additional commands:

```markdown
usage: weaviate-cli schema-truncate [-h] [--force]

positional arguments:
  schema-truncate

optional arguments:
  -h, --help       show this help message and exit
  --force          Force the truncation of the schema
```

## More Resources

{% include support-links.html %}