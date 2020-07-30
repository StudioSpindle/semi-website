---
layout: layout-documentation
product: weaviate-cli
sub-menu: Cluster
product-order: 3
title: Remove a cluster
intro: Remove a Weaviate cluster
description: Weaviate cluster create
tags: ['weaviate-cli', 'cluster', 'remove']
menu-order: 5
open-graph-type: article
og-img: documentation.jpg
---

## Basics

- You can remove a cluster related to your email address.

## Remove a single cluster

You can remove an individual cluster by running;

```bash
$ weaviate-cli cluster-remove
```
Additional commands:

```markdown
usage: weaviate-cli cluster-remove [-h] [--asyncr] [--nodefault] [--all]
                                   [--force]

positional arguments:
  cluster-remove

optional arguments:
  -h, --help      show this help message and exit
  --asyncr        Asynchronous in the background
  --nodefault     Do not set as default Weaviate url
  --all           Remove all clusters
  --force         Force deletion
```

## Remove all clusters

You can also remove all clusters related to your email address

```bash
$ weaviate-cli cluster-remove --all
```

## More Resources

{% include support-links.html %}