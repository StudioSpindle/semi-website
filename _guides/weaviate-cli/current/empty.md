---
layout: layout-guide
product: weaviate-cli
product-order: 3
title: Empty Concepts
description: At it's root, Weaviate 
tags: ['Business', 'Summary', 'Blog']
video-link:
video-caption:
menu-order: 9
---

# Empty Concepts Guide

{% include badges.html %}

## Index

- [Basics](#basics)
- [Empty Concepts](#empty-concepts)

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

## Frequently Asked Questions

{% include support-links.html %}