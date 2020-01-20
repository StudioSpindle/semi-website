---
layout: layout-documentation
product: weaviate
sub-menu: Query data
product-order: 1
title: Aggregate
description: How to work with Weaviate's Aggregate function.
tags: ['Aggregate', 'GraphQL']
menu-order: 3
open-graph-type: article
og-img: documentation.jpg
---

# Aggregation Guide

{% include badges.html %}

<<<<<<< HEAD
You can use Weaviate's `Aggregation{}` function to obtain meta information about collections of data.
=======
Data objects in Weaviate can be grouped, based on your filters. You can use GraphQL's `Aggregation{}` function to then obtain meta information about these groups. Direct data querying can be done by the [`Get{}`](./get.html) function, and exploration can be done by the [`Explore{}`](./explore.html) function.
>>>>>>> gh-423: general doc updates

## Index

- [Basics](#basics)
- [Introduction](#introduction)
  - [Define a query](#define-a-query)
- [Aggregate{} Function](#aggregate-function)
- [More resources](#more-resources)

## Basics

- You can use the `Aggregate{}` function to get meta information about filtered groups in the data.
- Some aggregate functions have (semantic) [filters](./filters.html) available.

## Introduction

The `Aggregate{}` function can be used if you want to obtain meta information about the dataobjects in a Weaviate instance. Metainformation can be queried over all objects in a class (see [Aggregate function](#aggregate-function)), or by groups in a class.

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

## Aggregate Function

The `Aggregate{}` function is structured the following:

```graphql
{
  Aggregate {
    <SematicKind> {
      <Class> {
        groupedBy {
            path
            value
        }
        meta {
          count
        }
        <propertyOfDatatypeString> {
            count
            type
            topOccurrences {
                value
                occurs
            }
        }
        <propertyOfDatatypeText> {
            count
            type
            topOccurrences {
                value
                occurs
            }
        }
        <propertyOfDatatypeNumberOrInteger> {
            count
            type
            minimum
            maximum
            mean
            median
            mode
            sum
        }
        <propertyOfDatatypeBoolean> {
            count
            type
            totalTrue
            totalFalse
            percentageTrue
            percentageFalse
        }
        <PropertyWithReference>
          pointingTo
          type
      }
    }
  }
}
```

An example query to obtain meta information about the data in the class `City` can be queried as follows. Note that the data is not grouped yet, the meta information is about all the data objects found with the class `City`.

```graphql
{
  Aggregate {
    Things {
      Article {
        meta {
          count
        }
        InPublication {
          pointingTo
<<<<<<< HEAD
=======
          type
        }
        name {
          count
>>>>>>> gh-423: general doc updates
          type
        }
        wordCount {
          count
          maximum
          mean
          median
          minimum
          mode
          sum
          type
        }
      }
    }
  }
}
```
<<<<<<< HEAD
{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Aggregate+%7B%0D%0A++++Things+%7B%0D%0A++++++Article+%7B%0D%0A++++++++meta+%7B%0D%0A++++++++++count%0D%0A++++++++%7D%0D%0A++++++++InPublication+%7B%0D%0A++++++++++pointingTo%0D%0A++++++++++type%0D%0A++++++++%7D%0D%0A++++++++wordCount+%7B%0D%0A++++++++++count%0D%0A++++++++++maximum%0D%0A++++++++++mean%0D%0A++++++++++median%0D%0A++++++++++minimum%0D%0A++++++++++mode%0D%0A++++++++++sum%0D%0A++++++++++type%0D%0A++++++++%7D%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %}

## More Resources
=======
{% include molecule-gql-demo.html %}

### Filters

#### GroupBy
If you want meta information about groups of dataobjects, you can group them using the `groupBy` filter in the `Aggregate` function. 

The stucture of this filter in the query is as follows:

```graphql
{
  Aggregate {
    <SematicKind> {
      <Class> ( groupBy: ["<propertyName>"] ) {
        groupedBy {
            path
            value
        }
        meta {
          count
        }
        <propertyName> {
          count
        }
      }
    }
  }
}
```

In the following example, the cities are grouped by the property `isCapital`, where one group contains capital cities, and the second group contains cities of which the property `isCapital` is set to `False`.

```graphql
{
  Aggregate {
    Things {
      Article (groupBy:["isCapital"]) {
        meta {
          count
        }
        population {
          mean
        }
        groupedBy {
          value
          path
        }
      }
    }
  }
}
```
{% include molecule-gql-demo.html %}

which might result in something like this result:

```json
{
  "data": {
    "Aggregate": {
      "Things": {
        "City": [
          {
            "groupedBy": {
              "path": [
                "isCapital"
              ],
              "value": "1"
            },
            "meta": {
              "count": 2
            },
            "population": {
              "mean": 9900000
            }
          },
          {
            "groupedBy": {
              "path": [
                "isCapital"
              ],
              "value": "0"
            },
            "meta": {
              "count": 2
            },
            "population": {
              "mean": 5500000
            }
          }
        ]
      }
    }
  },
  "errors": null
}
```

#### Where and Limit
In the `Aggregate{}` function, as well as the `Get{}` function, a `where` filter and `limit` filter can be used on class-level to filter data. A detailed explanation of these filters can be found on the `Query` page ([here for `where` filter](./where-filter.html#limit-filter), and [here for `limit` filter](./where-filter.html#limit-filter)).

In addition, the `limit` filter can be used on the `topOccurrences` fields.

### Example
``` graphql
{
  Aggregate {
    Things {
      City(groupBy: ["isCapital"]) {
        population {
          mean
        }
        groupedBy {
          value
        }
      }
    }
  }
}
```
{% include molecule-gql-demo.html %}

## Frequently Asked Questions
>>>>>>> gh-423: general doc updates

{% include support-links.html %}
