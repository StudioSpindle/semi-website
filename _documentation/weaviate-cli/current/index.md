---
layout: layout-documentation
bodyclass: ["page--guides", " "]
product: weaviate-cli
sub-menu: index
product-order: 3
title: About
description: About
tags: ['index', 'Weaviate-cli']
menu-order: 1
open-graph-type: article
og-img: documentation.jpg
---

# Introduction to Weaviate-CLI

{% include badges.html %}

## Index

- [Basics](#basics)
- [Initiation](#initiation)

## Basics

- The weaviate-cli tool is used work with individual weaviates or the weaviate cluster service.

## Initiation

You can get an overview of available commands with the `--help` flag.

```bash
$ weaviate-cli --help
```

Overview of current commands:

```markdown
usage: weaviate-cli [-h]
                    {init,schema-import,schema-export,schema-truncate,empty,cluster-create,cluster-remove,cluster-list,ping,version}
                    ...

CLI tool to interact with Weaviate instances. Mre information:
https://semi.technology/documentation/weaviate-cli

positional arguments:
  {init,schema-import,schema-export,schema-truncate,empty,cluster-create,cluster-remove,cluster-list,ping,version}
    init                Initiate a Weaviate. This function is used to connect
                        the CLI to a Weaviate instance
    schema-import       The schema file should be in the same format as
                        the/weaviate/v1/schema RESTful output
    schema-export       Save a copy of the Weaviate's schema to disk
    schema-truncate     Truncate the schema, the Weaviate must be empty.
    empty               Empty the Weaviate (i.e., all concepts will be
                        removed)
    cluster-create      Create a Weaviate cluster on the SeMI network
    cluster-remove      Delete a cluster
    cluster-list        List all clusters connected to configured email
    ping                Validate if a Weaviate can be pinged with or without
                        authentication
    version             Get the current version number
    upgrade             Upgrade the cli to the current version on Github

optional arguments:
  -h, --help            show this help message and exit
```

## More Resources

{% include support-links.html %}
