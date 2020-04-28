---
layout: layout-documentation
product: weaviate-cli
sub-menu: Cluster
product-order: 3
title: Create a cluster
description: Weaviate cluster create
tags: ['weaviate-cli', 'cluster', 'create']
menu-order: 5
open-graph-type: article
og-img: documentation.jpg
---

# Create a Weaviate Cluster

{% include badges.html %}

## Index

- [Basics](#basics)
- [Create cluster](#create-cluster)
- [List all clusters](#list-all-clusters)

## Basics

- You can create Weaviate Clusters through the Weaviate Cluster Service (WCS).
- Weaviate Clusters are managed weaviates.
- Clusters are currently free and have a two week lifetime.

## Create Cluster

You can create an individual cluster by running;

```bash
$ weaviate-cli cluster-create
```
Additional commands:

```markdown
usage: weaviate-cli cluster-create [-h] [--email EMAIL] [--asyncr]
                                   [--nodefault] [--replace]

positional arguments:
  cluster-create

optional arguments:
  -h, --help      show this help message and exit
  --email EMAIL   Asynchronous in the background
  --asyncr        Asynchronous in the background
  --nodefault     Do not set as default Weaviate url
  --replace       Replace and delete the current cluster if set?
```


## List all Clusters

You can list all clusters related to the current email address (change email address with the (`init` argument)[./init.html])

```bash
$ weaviate-cli cluster-list
```

Additional commands:

```markdown
usage: weaviate-cli cluster-list [-h]

positional arguments:
  cluster-list

optional arguments:
  -h, --help    show this help message and exit
```

## More Resources

{% include support-links.html %}