---
layout: layout-guide
product: weaviate-cli
product-order: 3
title: Initiation
description: Initiate the Weaviate-CLI tool
tags: ['weaviate-cli', 'Initiation']
video-link:
video-caption:
menu-order: 4
---

# Initiation Guide

{% include badges.html %}

## Index

- [Basics](#basics)
- [Initiation](#initiation)

## Basics

A weaviate-cli is always attached to a running Weaviate. If a Weaviate has [OpenID enabled](/guides/weaviate/current/authentication.html) the CLI tool will automatically request the necessary information from the Weaviate instance.

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

## Frequently Asked Questions

{% include support-links.html %}