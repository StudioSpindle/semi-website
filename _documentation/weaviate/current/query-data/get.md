---
layout: layout-documentation
product: weaviate
sub-menu: Query data
product-order: 1
title: Get
description: How to query weaviate.
tags: ['Query', 'GraphQL']
menu-order: 1
open-graph-type: article
og-img: documentation.jpg
---

# Get Guide

{% include badges.html %}

The `Get{}` function is Weaviate's bread and butter. It is the most direct way to access data.

## Index

- [Basics](#basics)
- [Introduction](#introduction)
  - [Define a query](#define-a-query)
  - [Work with graph beacons](#work-with-graph-beacons)
- [Get{} Function](#get-function)
- [Underscore Properties](#underscore-properties)
  - [Classification](#classification)
  - [Interpretation](#interpretation)
- [Get RESTful Function](#get-restful-function)
- [More resources](#more-resources)

## Basics

- Weaviate's query language is [GraphQL](https://graphql.org/).
- You can query a Weaviate after you've created a [schema](../add-data/define_schema.html) and [populated it](../add-data/add_and_modify.html) with data.
- You can easily query a Weaviate by using the GraphQL interface inside a [Weaviate Playground](http://playground.semi.technology).
- Some functions have (semantic) [filters](./filters.html) available.
- An individual semantic kind (i.e., data object) can be collected through the [RESTful API]() as well.

## Introduction

The `Get{}` function is the most straight-ahead function Weaviate has. It is the most direct wat to collect data from a weaviate. Especially when you combine them with [filters](./filters.html), you can easily browse your Weaviate.

### Define a query

You can query Weaviate for semantic kinds based on standard GraphQL queries. The examples below only contain the GraphQL query. You can POST a GraphQL query to Weaviate as follows:

```bash
$ curl http://localhost/v1/graphql -X POST -H 'Content-type: application/json' -d '{GraphQL query}'
```

A GraphQL JSON object is defined as:

```json
{
    "query": "{ # GRAPHQL QUERY }"
}
```

# Get{} Function

### Get{} query structure and syntax

The `Get{}` function is always defined based on the following principle:

```graphql
{
  Get {
    <SematicKind> {
      <Class> {
        <property>
        <PropertyWithReference>
          ... on <ClassOfBeacon> {
            <property>
            _<meta-property>
          }
      }
    }
  }
}
```

A `Get{}` function is always based on the schema. For example, if you've created a schema with a class `Articles` which has the properties `name` and `publicationDate`, you can query it as follows:

```graphql
{
  Get {
    Things {
      Article {
        title
        url
        wordCount
      }
    }
  }
}
```
{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get+%7B%0D%0A++++Things+%7B%0D%0A++++++Article+%7B%0D%0A++++++++title%0D%0A++++++++url%0D%0A++++++++wordCount%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %}

The above query will result in something like the following:

```json
{
  "data": {
    "Get": {
      "Things": {
        "Article": [{
          "title": "“Joker” Is a Viewing Experience of Rare, Numbing Emptiness",
          "url": "https://www.newyorker.com/culture/the-front-row/joker-is-a-viewing-experience-of-rare-numbing-emptiness",
          "wordCount": 1794
        }]
      }
    }
  }
}
```

### Work with graph beacons

If you've set a [beacon reference](../about/philosophy.html#basic-terminology) in the schema, you can query it as follows:

```graphql
{
  Get {
    Things {
      Article {
        title
        url
        wordCount
        InPublication {           # the reference
          ... on Publication {    # you always set the destination class
            name                  # the property related to target class
          }
        }
      }
    }
  }
}
```
{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get+%7B%0D%0A++++Things+%7B%0D%0A++++++Article+%7B%0D%0A++++++++title%0D%0A++++++++url%0D%0A++++++++wordCount%0D%0A++++++++InPublication+%7B+++++++++++%23+the+reference%0D%0A++++++++++...+on+Publication+%7B++++%23+you+always+set+the+destination+class%0D%0A++++++++++++name++++++++++++++++++%23+the+property+related+to+target+class%0D%0A++++++++++%7D%0D%0A++++++++%7D%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %}

Note that if you've set the [cardinality](../add-data/define_schema.html#property-object) to `many`, you might have multiple data types. For example:

```graphql
{
  Get {
    Things {
      Article {
        title
        url
        wordCount
        HasAuthors {
          ... on Author {
            name
          }
          ... on Publication {
            name
          }
        }
      }
    }
  }
}
```
{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get+%7B%0D%0A++++Things+%7B%0D%0A++++++Article+%7B%0D%0A++++++++title%0D%0A++++++++url%0D%0A++++++++wordCount%0D%0A++++++++HasAuthors+%7B%0D%0A++++++++++...+on+Author+%7B%0D%0A++++++++++++name%0D%0A++++++++++%7D%0D%0A++++++++++...+on+Publication+%7B%0D%0A++++++++++++name%0D%0A++++++++++%7D%0D%0A++++++++%7D%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %}

## Underscore Properties

For every Get{} request you can get additional information about the returned data object(s) by using underscore-properties. You can recognize these properties because they are prefixed with an underscore and can be added to any GraphQL request.

Below you find an overview of available underscore-properties.

### Classification

When a data-object has been subjected to classification, you can get additional information about how the object was classified by running the following command:

```graphql
{
  Get {
    Things {
      Article {
        _classification {
          basedOn
          classifiedFields
          completed
          id
          scope
        }
      }
    }
  }
}
```
{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get+%7B%0D%0A++++Things+%7B%0D%0A++++++Article+%7B%0D%0A++++++++_classification+%7B%0D%0A++++++++++basedOn%0D%0A++++++++++classifiedFields%0D%0A++++++++++completed%0D%0A++++++++++id%0D%0A++++++++++scope%0D%0A++++++++%7D%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %}

### Interpretation

When Weaviate vectorizes your data-object, it normalizes the data so that the contextionary can interpret it. With the `_interpretation` underscore property you can request how Weaviate indexed your data-object.

```graphql
{
  Get {
    Things {
      Article {
        _interpretation {
          source {
            concept
            occurrence
            weight
          }
        }
        summary
      }
    }
  }
}
```
{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get+%7B%0D%0A++++Things+%7B%0D%0A++++++Article+%7B%0D%0A++++++++_interpretation+%7B%0D%0A++++++++++source+%7B%0D%0A++++++++++++concept%0D%0A++++++++++++occurrence%0D%0A++++++++++++weight%0D%0A++++++++++%7D%0D%0A++++++++%7D%0D%0A++++++++summary%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %}

## Get RESTful Function

Underscore properties also have RESTful equivalents that can be retrieved by setting the `_include=` argument.

| underscore property | returns |
| ------------------- | ------- |
| `_include=_classification` | Classification information |
| `_include=_vector` | The vector how the dataobject is vectorized information |

## More Resources

{% include support-links.html %}