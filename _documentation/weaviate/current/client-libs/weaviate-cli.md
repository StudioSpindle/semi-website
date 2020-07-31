---
layout: layout-documentation
product: weaviate
sub-menu: Client libs
product-order: 1
title: CLI tool
intro: A CLI tool to interact with an individual Weaviate
description: A CLI tool to interact with an individual Weaviate
tags: ['CLI', 'Library']
menu-order: 3
open-graph-type: article
og-img: documentation.jpg
toc: true
---

# Basics

- The CLI tool allows you to interact with a Weaviate via the commandline

# Setup

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

## Upgrade

Start the upgrade using the upgrade command

```bash
$ weaviate-cli upgrade
```

# Schema

## Schema Import

You can start a schema import by running

```bash
$ weaviate-cli schema-import
```

Additional commands:

```markdown
usage: weaviate-cli schema-import [-h] [--location LOCATION] [--force]

positional arguments:
  schema-import

optional arguments:
  -h, --help           show this help message and exit
  --location LOCATION  The schema file should be in the same format as
                       the/weaviate/v1/schema RESTful output
  --force              Overwrite classes and properties if found in Weaviate?
                       Important: ONLY use on a new Weaviate instance. Will
                       fail if things or actions are already in your Weaviate
```

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

# Weaviate Cluster Service

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

# Misc

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

## Ping

You can ping a Weaviate with the ping command

```bash
$ weaviate-cli ping
```

# More Resources

{% include support-links.html %}