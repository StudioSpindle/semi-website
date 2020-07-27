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
client.create_schema("https://raw.githubusercontent.com/semi-technologies/weaviate-python-client/master/documentation/getting_started/news-publications.json")
```

A schema can be provided as a URL, file or a dict.

## Create Things or Actions

Things can be created like this:

```python
# Create an entity from the Publication class
hq = {
    "name": "The New York Times",
    "headquartersGeoLocation": {
        "latitude": 40.7561454,
        "longitude": -73.9903298
    }
}
client.create(hq, "Publication", "2db436b5-0557-5016-9c5f-531412adf9c6")

# Create an Author
client.create({"name": "Jason Bailey"}, "Author", "b36268d4-a6b5-5274-985f-45f13ce0c642")
client.create({"name": "Alexander Burns"}, "Author", "1c9cd584-88fe-5010-83d0-017cb3fcb446")
# Let weaviate create the uuid
matt_id = client.create({"name": "Matt Flegenheimer"}, "Author")
print(f"UUID of Matt Flegenheimer: {matt_id}")
```

Actions can be created in a similar fashion like this:

```python
client.create({}, "Cite", semantic_type=weaviate.SEMANTIC_TYPE_ACTIONS)
```

You can add cross-references directly by using a beacon:

```python
# Create an Article
article = {
    "title": "Who’s Running for President in 2020?",
    "url": "https://www.nytimes.com/interactive/2019/us/politics/2020-presidential-candidates.html",
    "summary": "Former Vice President Joseph R. Biden Jr. is the presumptive Democratic nominee ...",
    # Reference the publication on creation
    "inPublication": [weaviate.util.generate_local_beacon("2db436b5-0557-5016-9c5f-531412adf9c6")]
}
client.create(article, "Article", "d412133d-75fc-4ad5-aaae-46465522f1c2")
article = {
    "title": "The 50 Best Movies on Netflix Right Now",
    "url": "https://www.nytimes.com/interactive/2020/arts/television/best-movies-on-netflix.html",
    "summary": "The sheer volume of films on Netflix — and the site’s less than ...",
    # Reference the publication on creation
    "inPublication": [weaviate.util.generate_local_beacon("2db436b5-0557-5016-9c5f-531412adf9c6")]
}
client.create(article, "Article", "23b9e00c-884c-4543-b68a-abf875c950c4")
```

Or add to an already existing entity:

```python
# Add a reference from the article to the authors
client.add_reference("d412133d-75fc-4ad5-aaae-46465522f1c2", "hasAuthors", "1c9cd584-88fe-5010-83d0-017cb3fcb446")
client.add_reference("d412133d-75fc-4ad5-aaae-46465522f1c2", "hasAuthors", matt_id)
client.add_reference("23b9e00c-884c-4543-b68a-abf875c950c4", "hasAuthors", "b36268d4-a6b5-5274-985f-45f13ce0c642")
# Add a reference from an action type to a thing type
client.add_reference(cite_id, "citation", "23b9e00c-884c-4543-b68a-abf875c950c4", from_semantic_type=weaviate.SEMANTIC_TYPE_ACTIONS)
```

*Note: Weaviate might need a short time to update its index after a new thing has been created.*

## Query

Look at the data using the simple query on the GraphQL endpoint:

```bash
curl http://localhost:8080/v1/graphql -X POST -H 'Content-type: application/json' -d '{"query": "{ Get { Things { Article { title HasAuthors { ... on Author { name } } InPublication { ... on Publication { name } } OfCategory { ... on Category { name } } } } }}"}' | jq .
```

Or query directly in python:

```python
gql_get_articles = """
{
  Get {
    Things {
      Article {
        title
        HasAuthors {
          ... on Author {
            name
          }
        }
        InPublication {
          ... on Publication {
            name
          }
        }
        OfCategory {
          ... on Category {
            name
          }
        }
      }
    }
  }
}
"""
query_result = client.query(gql_get_articles)
print("\nQuery results for articles:")
print(json.dumps(query_result, indent=4, sort_keys=True))
```

To create complex GraphQL query please consider a GraphQL python client. 
Be cautios of query injections when generating string based queries.

## Classification

Lets create two categories and classify the articles with them:

```python
client.create({"name": "entertainment"}, "Category")
client.create({"name": "politics"}, "Category")

client.create({"name": "entertainment"}, "Category")
client.create({"name": "politics"}, "Category")

# Give weaviate 2 seconds to update the index with the newly added categories
time.sleep(2.0)

classification_cfg = client.classification.get_contextual_config("Article", "summary", "ofCategory")
classification_status = client.classification.start_and_wait(classification_cfg)
print("\nClassification status:")
print(json.dumps(classification_status, indent=4, sort_keys=True))
```

You can query the articles again to see the newly added categories:
```python
query_result = client.query(gql_get_articles)
print("\nQuery results for articles after classification:")
print(json.dumps(query_result, indent=4, sort_keys=True))
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



Please find the [full client documentation here](https://semi-technologies.github.io/weaviate-python-client/html/index.html).
The full [example as a script](https://raw.githubusercontent.com/semi-technologies/weaviate-python-client/master/documentation/examples/news.py).

## More Resources

{% include support-links.html %}