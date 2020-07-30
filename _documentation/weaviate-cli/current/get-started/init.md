---
layout: layout-documentation
product: weaviate-cli
sub-menu: Get started
product-order: 3
title: Initiate
intro: Initiate the CLI tool
description: Weaviate-cli initiate
tags: ['weaviate-cli', 'initiate']
menu-order: 2
open-graph-type: article
og-img: documentation.jpg
toc: true
---

## Basics

A weaviate-cli is always attached to a running Weaviate. If a Weaviate has [OpenID enabled](/documentation/weaviate/current/setup/authenticate.html) the CLI tool will automatically request the necessary information from the Weaviate instance.

## Initiation

You can initiation the weaviate-cli tool by running

```bash
$ weaviate-cli init
```

Additional commands:

```markdown
usage: weaviate-cli init [-h] [--url URL] [--email EMAIL]
                         [--auth-clientsecret AUTH_CLIENTSECRET]

positional arguments:
  init

optional arguments:
  -h, --help            show this help message and exit
  --url URL             What is the path to the Weaviate?
  --email EMAIL         What is the path to the Weaviate?
  --auth-clientsecret AUTH_CLIENTSECRET
                        What is the OAuth client_secret?
```

## More Resources

{% include support-links.html %}