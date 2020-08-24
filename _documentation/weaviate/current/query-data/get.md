---
layout: layout-documentation
solution: weaviate
sub-menu: Query data
solution-order: 1
title: Get
intro: The Get{} function is Weaviate's bread and butter. It is the most direct way to access data.
description: How to query weaviate.
tags: ['Query', 'GraphQL']
menu-order: 1
open-graph-type: article
og-img: documentation.jpg
toc: true
---

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
            _<underscore-property>
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

## Filters

`Get{}` functions can be extended with search filters (both semantic filters as traditional filters). Because the filters work on multiple core functions (like `Aggregate{}`) there is a [specific documentation page dedicated to filters](filters.html).

## Underscore Properties

For every Get{} request you can get additional information about the returned data object(s) by using underscore-properties. You can recognize these properties because they are prefixed with an underscore and can be added to any GraphQL request.

Below you find an overview of available underscore-properties.

### Semantic Path

The semantic path returns an array of concepts from the query to the data object. This allows you to see which steps Weaviate took and how the query and data object are interpreted.

| Property | Description |
| `concept` | the concept that is found in this step. |
| `distanceToNext` | the distance to the next step (null for the last step). |
| `distanceToPrevious` | this distance to the previous step (null for the first step). |
| `distanceToQuery` | the distance of this step to the query. |
| `distanceToResult` | the distance of the step to this result. |

_Note: Building a semantic path is only possible if an [explore: {} parameter](./filters.html#explore-filter) is set. As the explore term represents the beginning of the path and each search result represents the end of the path. Since explore:{} queries are currently exclusively possible in GraphQL, the _semanticPath is therefore not available in the REST API._

Example: showing a semantic path without edges.

```graphql
{
  Get{
    Things{
      Publication(
        explore: {
          concepts: ["fashion"],
          certainty: 0.7,
          moveAwayFrom: {
            concepts: ["finance"],
            force: 0.45
          },
          moveTo: {
            concepts: ["haute couture"],
            force: 0.85
          }
        }
      ){
        name
        _semanticPath{
          path {
            concept
            distanceToNext
            distanceToPrevious
            distanceToQuery
            distanceToResult
          }
        }
      }
    }
  }
}
```
{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get%7B%0D%0A++++Things%7B%0D%0A++++++Publication%28%0D%0A++++++++explore%3A+%7B%0D%0A++++++++++concepts%3A+%5B%22fashion%22%5D%2C%0D%0A++++++++++certainty%3A+0.7%2C%0D%0A++++++++++moveAwayFrom%3A+%7B%0D%0A++++++++++++concepts%3A+%5B%22finance%22%5D%2C%0D%0A++++++++++++force%3A+0.45%0D%0A++++++++++%7D%2C%0D%0A++++++++++moveTo%3A+%7B%0D%0A++++++++++++concepts%3A+%5B%22haute+couture%22%5D%2C%0D%0A++++++++++++force%3A+0.85%0D%0A++++++++++%7D%0D%0A++++++++%7D%0D%0A++++++%29%7B%0D%0A++++++++name%0D%0A++++++++_semanticPath%7B%0D%0A++++++++++path+%7B%0D%0A++++++++++++concept%0D%0A++++++++++++distanceToNext%0D%0A++++++++++++distanceToPrevious%0D%0A++++++++++++distanceToQuery%0D%0A++++++++++++distanceToResult%0D%0A++++++++++%7D%0D%0A++++++++%7D%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %}

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

### Nearest Neighbors

The nearest neighbors' underscore property displays the nearest concepts to the object in the search results. You can use it in combination will all other search filters but you don't have to. 

```graphql
{
  Get{
    Things{
      Article(
        explore: { # <== optional, set the explore function
          concepts:["music"]
          moveTo: {
            concepts: ["beatles"]
            force: 0.5
          }
        }
      ){
        title
        _nearestNeighbors{
          neighbors {
            concept
            distance
          }
        }
      }
    }
  }
}
```
{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get%7B%0D%0A++++Things%7B%0D%0A++++++Article%28%0D%0A++++++++explore%3A+%7B+%23+%3C%3D%3D+optional%2C+set+the+explore+function%0D%0A++++++++++concepts%3A%5B%22music%22%5D%0D%0A++++++++++moveTo%3A+%7B%0D%0A++++++++++++concepts%3A+%5B%22beatles%22%5D%0D%0A++++++++++++force%3A+0.5%0D%0A++++++++++%7D%0D%0A++++++++%7D%0D%0A++++++%29%7B%0D%0A++++++++title%0D%0A++++++++_nearestNeighbors%7B%0D%0A++++++++++neighbors+%7B%0D%0A++++++++++++concept%0D%0A++++++++++++distance%0D%0A++++++++++%7D%0D%0A++++++++%7D%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %}

### Feature Projection

Because Weaviate stores all data in a vector space, you can visualize the results according to the results of your query. The feature projection is intended to reduce the dimensionality of the object's vector into something easily suitable for visualizing, such as 2d or 3d. The underlying algorithm is exchangeable, the first algorithm to be provided is [t-SNE](https://en.wikipedia.org/wiki/T-distributed_stochastic_neighbor_embedding).

To tweak the feature projection optional paramaters (currently GraphQL-only) can be provided. The values and their defaults are:

| Parameter | Type | Default | Implication |
|--|--|--|--|
| `dimensions` | `int` | `2` | Target dimensionality, usually `2` or `3` | 
| `algorithm` | `string` | `tsne` | Algorithm to be used, currently supported: `tsne` |
| `perplexity` | `int` | `min(5, len(results)-1)` | The `t-SNE` perplexity value, must be smaller than the `n-1` where `n` is the number of results to be visualized |
| `learningRate` | `int` | `25` | The `t-SNE` learning rate |
| `iterations` | `int` | `100` | The number of iterations the `t-SNE` algorithm runs. Higher values lead to more stable results at the cost of a larger response time |

An example with default settings:

```graphql
{
  Get{
    Things{
      Article(
        explore: { # <== optional, set the explore function
          concepts:["music"]
          moveTo: {
            concepts: ["beatles"]
            force: 0.5
          }
        }
        limit: 12
      ){
        title
        _featureProjection{
          vector
        }
      }
    }
  }
}
```
{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get%7B%0D%0A++++Things%7B%0D%0A++++++Article%28%0D%0A++++++++explore%3A+%7B+%23+%3C%3D%3D+optional%2C+set+the+explore+function%0D%0A++++++++++concepts%3A%5B%22music%22%5D%0D%0A++++++++++moveTo%3A+%7B%0D%0A++++++++++++concepts%3A+%5B%22beatles%22%5D%0D%0A++++++++++++force%3A+0.5%0D%0A++++++++++%7D%0D%0A++++++++%7D%0D%0A++++++++limit%3A+12%0D%0A++++++%29%7B%0D%0A++++++++title%0D%0A++++++++_featureProjection%7B%0D%0A++++++++++vector%0D%0A++++++++%7D%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %}

The above result can be plotted as follows (where the result in red is the first result):

![Weaviate T-SNE example](/img/plot-noSettings.png?i=1 "Weaviate T-SNE example")

The same example with the `dimensions` property for a 3D visualisation:

```graphql
{
  Get{
    Things{
      Article(
        explore: { # <== optional, set the explore function
          concepts:["music"]
          moveTo: {
            concepts: ["beatles"]
            force: 0.5
          }
        }
        limit: 12
      ){
        title
        _featureProjection(
          dimensions: 3
        ){
          vector
        }
      }
    }
  }
}
```
{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get%7B%0D%0A++++Things%7B%0D%0A++++++Article%28%0D%0A++++++++explore%3A+%7B+%23+%3C%3D%3D+optional%2C+set+the+explore+function%0D%0A++++++++++concepts%3A%5B%22music%22%5D%0D%0A++++++++++moveTo%3A+%7B%0D%0A++++++++++++concepts%3A+%5B%22beatles%22%5D%0D%0A++++++++++++force%3A+0.5%0D%0A++++++++++%7D%0D%0A++++++++%7D%0D%0A++++++++limit%3A+12%0D%0A++++++%29%7B%0D%0A++++++++title%0D%0A++++++++_featureProjection%28%0D%0A++++++++++dimensions%3A+3%0D%0A++++++++%29%7B%0D%0A++++++++++vector%0D%0A++++++++%7D%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %}

## Get RESTful Function

Underscore properties also have RESTful equivalents that can be retrieved by setting the `_include=` argument.

| underscore property | returns |
| ------------------- | ------- |
| `?include=_classification` | Classification information |
| `?include=_vector` | The vector how the dataobject is vectorized information |
| `?include=_nearestNeighbors` | Display information about the neighboring concepts of an object | 
| `?include=_featureProjection` | A feature projection intended to reduce the dimensionality of the object's vector into something easily suitable for visualizing | 

## More Resources

{% include support-links.html %}