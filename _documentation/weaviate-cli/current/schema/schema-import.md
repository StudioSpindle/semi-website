---
layout: layout-documentation
product: weaviate-cli
sub-menu: Schema
product-order: 3
title: Import
intro: Import using the CLI tool
description: Import a schema
tags: ['weaviate-cli', 'schema', 'import']
menu-order: 5
open-graph-type: article
og-img: documentation.jpg
---

## Basics

The weaviate-cli tool can be used to import a schema into Weaviate from a JSON file or URL location.

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

## Getting a schema

### Getting the schema from a running Weaviate

You can request a schema from a running Weaviate like this:

```bash
$ curl http://localhost:8080/v1/schema
```

You can save this schema as a JSON file.

### Creating a schema file

You can follow the schema formatting as [described here](/documentation/weaviate/current/add-data/define_schema.html).

## Simple schema example

An example of a schema template looks as follows:

```json
{
	"actions": {
		"classes": [],
		"type": "action"
	},
	"things": {
		"classes": [{
			"class": "Company",
			"description": "A description of the company class",
			"properties": [{
				"cardinality": "atMostOne",
				"dataType": [
					"string"
				],
				"description": "A name of the company",
				"keywords": [{
					"keyword": "identifier",
					"weight": 1.0
				}],
				"name": "name"
			}]
		}]
	}
}
```

## More Resources

{% include support-links.html %}