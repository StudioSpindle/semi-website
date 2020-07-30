---
layout: layout-documentation
product: weaviate-cli
sub-menu: Misc
product-order: 3
title: Empty
intro: Empty a Weaviate
description: Empty a Weaviate
tags: ['weaviate-cli', 'empty']
menu-order: 5
open-graph-type: article
og-img: documentation.jpg
toc: true
---

## Basics

You can empty a Weaviate by running this command.

_Note: if you want to wipe a complete Weaviate, it might be faster to restart the server itself._

## Empty Concepts

You can empty a weaviate by running:

```bash
$ weaviate-cli empty
```

Additional commands:

```markdown
usage: weaviate-cli empty [-h] [--force]

positional arguments:
  empty

optional arguments:
  -h, --help  show this help message and exit
  --force     Force deletion
```

## More Resources

{% include support-links.html %}