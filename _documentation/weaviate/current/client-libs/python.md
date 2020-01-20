---
layout: layout-documentation
product: weaviate
sub-menu: Client libs
product-order: 1
title: Python
description: Python client library
tags: ['Python', 'Library']
menu-order: 1
open-graph-type: article
og-img: documentation.jpg
---

# Python Client Library Guide

{% include badges.html %}

## Index

- [Basics](#basics)
- [Usage](#usage)
- [More resources](#more-resources)

## Basics
- A python native weaviate client makes using the Weaviate API easier.

# Install

The package can be easily installed using pip. The client is developed and tested for python 3.7. 

```sh
pip install weaviate-client
```

# Usage

First make sure that weaviate is running. See the [installation guide](https://www.semi.technology/documentation/weaviate/current/get-started/install.html) on how to start weaviate.


Before we can load data we need to create a client and load a schema.

```python
import weaviate
client = weaviate.Client("http://localhost:8080")
client.create_schema("https://raw.githubusercontent.com/semi-technologies/weaviate-python-client/master/documentation/getting_started/people_schema.json")
```

A schema can be provided as an URL, file or a dict.
Now let's create some things.

```python
client.create_thing({"name": "John von Neumann"}, "Person", "b36268d4-a6b5-5274-985f-45f13ce0c642")
client.create_thing({"name": "Alan Turing"}, "Person", "1c9cd584-88fe-5010-83d0-017cb3fcb446")
client.create_thing({"name": "Legends"}, "Group", "2db436b5-0557-5016-9c5f-531412adf9c6")
```

We can simply add cross-references through:

```python
client.add_reference_to_thing("2db436b5-0557-5016-9c5f-531412adf9c6", "members", "b36268d4-a6b5-5274-985f-45f13ce0c642")
client.add_reference_to_thing("2db436b5-0557-5016-9c5f-531412adf9c6", "members", "1c9cd584-88fe-5010-83d0-017cb3fcb446")
```

*Note: Weaviate might need a short time to update its index after a new thing has been created.*

Look at the data using the simple query on the GraphQL endpoint:

```bash
curl http://localhost/v1/graphql -X POST -H 'Content-type: application/json' -d '
{
  Get {
    Things {
      Group {
        name
        uuid
        Members {
          ... on Person {
            name
            uuid
          }
        }
      }
    }
  }
}'
```

Please find the [full client documentation here](https://semi-technologies.github.io/weaviate-python-client/html/index.html).

## More Resources

{% include support-links.html %}