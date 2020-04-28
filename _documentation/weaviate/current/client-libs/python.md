---
layout: layout-documentation
product: weaviate
sub-menu: Client libs
product-order: 1
title: Python
description: Weaviate Python client library.
tags: ['Python', 'Library']
menu-order: 1
open-graph-type: article
og-img: documentation.jpg
---

# Python Client Library Guide

{% include badges.html %}

## Index

- [Basics](#basics)
  - [Install](#install)
  - [Create schema](#create-schema)
  - [Create things or actions](#create-things-or-actions)
  - [Batching](#batching)
  - [Authentication](#authentication)
  - [Query](#query)
- [More resources](#more-resources)

# Basics

- A python native weaviate client makes using the Weaviate API easier.
- An overview of all functions can be found [here](https://semi-technologies.github.io/weaviate-python-client/html/index.html).

## Install

The package can be easily installed using pip. The client is developed and tested for python 2.7 and 3.7. 

```sh
pip install weaviate-client
```

## Create schema

First make sure that weaviate is running. See the [installation guide](/documentation/weaviate/current/get-started/install.html) on how to start weaviate.

Before we can load data we need to create a client and load a schema. You can learn how to create a schema [here](/documentation/weaviate/current/add-data/define_schema.html).

```python
import weaviate
client = weaviate.Client("http://localhost:8080")
client.create_schema("https://raw.githubusercontent.com/semi-technologies/weaviate-python-client/master/documentation/getting_started/people_schema.json")
```

A schema can be provided as a URL, file or a dict.

## Create Things or Actions

Things can be created like this:

```python
client.create_thing({"name": "John von Neumann"}, "Person", "b36268d4-a6b5-5274-985f-45f13ce0c642")
client.create_thing({"name": "Alan Turing"}, "Person", "1c9cd584-88fe-5010-83d0-017cb3fcb446")
client.create_thing({"name": "Legends"}, "Group", "2db436b5-0557-5016-9c5f-531412adf9c6")
```

Actions can be created in a similar fashion like this:

```python
client.create_action({"description": "John von Neumann's book"}, "Buy")
```

You can add cross-references through:

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

## Batching

You can also execute [batch requests](/documentation/weaviate/current/add-data/batching.html) which allows you to add large sets of data in one API call.

You can batch load things or actions as follows

```python
i = 1

# create a ThingsBatchRequest for adding things
batch = weaviate.ThingsBatchRequest()

# create a ReferenceBatchRequest for adding references
batchRefs = weaviate.ReferenceBatchRequest()

for author, publication in authors.items():

    # empty author object
    authorObj = {}

    # author obj
    authorObj = {
        'name': author,
        'writesFor': [
            {
                'beacon': 'weaviate://localhost/things/' + publication
            }
        ]
    }

    # add every 1000 by taking the modus of 999 (counter starts at 0)
    if (i % 999) == 0:
        # Send the batch to Weaviate
        CLIENT.create_things_in_batch(batch)
        
        # Create an empty batch
        batch = weaviate.ThingsBatchRequest()
        
        # Send the ref batch to Weaviate
        CLIENT.add_references_in_batch(batchRefs)
        
        # Create an empty ref batch
        batchRefs = weaviate.ReferenceBatchRequest()

    # Add the thing to the batch request queue
    batch.add_thing(authorObj, 'Author', str(uuid.uuid3(uuid.NAMESPACE_DNS, author)))
    
    # Add a reference to the batch request queue
    batchRefs.add_reference("Publication", obj['publicationId'], "hasArticles", articleId)    
    
    i += 1

# Send the batch to Weaviate
CLIENT.create_things_in_batch(batch)

# Create an empty ref batch
CLIENT.add_references_in_batch(batchRefs)
```

## Authentication

A weaviate instance that uses authentication can also be accessed using the client. Simply create an authentication secret and pass it to the client.

```python
import weaviate

auth = weaviate.AuthClientPassword(<user>, <password>)
client = weaviate.Client(<weaviate URL>, auth)
```

Currently the floowing grand types are currently supported:
 - password \
 `weaviate.AuthClientPassword(<user>, <password>)`
 - client credentials \
 `weaviate.AuthClientCredentials(<token>)`

## Query

The client allows to send simple GraphQL queries in the for of strings. Lets create a simple class `Person` and some add some people.

```python
import weaviate

w = weaviate.Client("http://localhost:8080")

schema = {
    "actions": {"classes": [],"type": "action"},
    "things": {"classes": [{
        "class": "Person",
        "description": "A person such as humans or personality known through culture",
        "properties": [
            {
                "cardinality": "atMostOne",
                "dataType": ["text"],
                "description": "The name of this person",
                "name": "name"
            }
        ]}],
        "type": "thing"
    }
}
w.create_schema(schema)

w.create_thing({"name": "Andrew S. Tanenbaum"}, "Person")
w.create_thing({"name": "Alan Turing"}, "Person")
w.create_thing({"name": "John von Neumann"}, "Person")
w.create_thing({"name": "Tim Berners-Lee"}, "Person")
```

Now we define a query for all `Person` objects.
```python
query = """
{
  Get {
    Things {
      Person {
        name
      }
    }
  }
}
"""
```

Finally we can run the query unsing the clients query function.

```python
import json

query_result = w.query(query)
# Pretty print the result of the query
print(json.dumps(query_result, indent=4, sort_keys=True))
```

When creating new things it can take up to 2 seconds until weaviate has indexed the newley added data. Therefore the query might not return all the previously added things during that time frame. 

To create complex GraphQL query please consider a GraphQL python client. 
Be cautios of query injections when generating string based queries.

Please find the [full client documentation here](https://semi-technologies.github.io/weaviate-python-client/html/index.html).

## More Resources

{% include support-links.html %}