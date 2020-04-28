---
layout: layout-documentation
product: weaviate-cli
sub-menu: Get started
product-order: 3
title: Install
description: Weaviate-cli Install
tags: ['weaviate-cli', 'install']
menu-order: 1
open-graph-type: article
og-img: documentation.jpg
---

# Installation Guide

{% include badges.html %}

## Index

- [Basics](#basics)
- [Installation](#installation)

## Basics

The CLI tool is tested on Linux and macOS distributions.

## Installation

For installation, choose a directory where you want to install the CLI tool and make sure Git, Python 3 and PIP 3 are installed. And follow;

```bash
# clone the latest version from Github
$ git clone https://github.com/semi-technologies/weaviate-cli
# cd into the directory
$ cd weaviate-cli
# install the requirements
$ pip3 install -r requirements.txt
# make the command `weaviate-cli` globally available
$ sudo ln -s $(pwd)/bin/weaviate-cli /usr/local/bin/weaviate-cli
```

## More Resources

{% include support-links.html %}