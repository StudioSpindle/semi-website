---
layout: layout-documentation
product: weaviate
sub-menu: Query data
product-order: 1
title: Filter
description: How to filter queries to weaviate.
tags: ['Query', 'GraphQL', 'Filter']
menu-order: 2
open-graph-type: article
og-img: documentation.jpg
---

# Where filter

{% include badges.html %}

You can directly query the Weaviate smart graph. Finding concepts in the smart graph based on the Contextionary can be done through [exploring](explore.html).

_Note: You can mix [explore](explore.html) functions with regular query functions._

## Index

- [Basics](#basics)
- [Introduction](#introduction)
- [Where filter](#where-filter)
- [Simple filter](#simple-filter)
- [Multiple filters](#multiple-filters)
- [Beacon filter](#beacon-filter)
- [Multiple filters and beacon filter](#multiple-filters-and-beacon-filter)
<<<<<<< HEAD:_documentation/weaviate/current/query-data/filter.md
- [Geo coordinates](#geo-coordinates-filter)
- [Group filter](#group-filter)
- [Explore filter](#explore-filter)
=======
- [Geo coordinates filter](#geo-coordinates-filter)
- [Limit filter](#limit-filter)
>>>>>>> gh-423: general doc updates:_documentation/weaviate/current/query-data/where-filter.md
- [FAQ](#frequently-asked-questions)


## Basics

- Weaviate's query language is [GraphQL](https://graphql.org/).
- You can query a Weaviate after you've created a [schema](../add-data/define_schema.html) and [populated it](../add-data/add_and_modify.html) with data.
- You can easily query a Weaviate by using the GraphQL interface inside a [Weaviate Playground](http://playground.semi.technology).

## Introduction

You can query Weaviate for semantic kinds based on standard GraphQL queries. The examples below only contain the GraphQL query. You can POST a GraphQL query to Weaviate as follows:

```bash
$ curl http://localhost/v1/graphql -X POST -H 'Content-type: application/json' -d '{GraphQL query}'
```

## Where filter
Weaviate comes with a variety of available filters. The `where` filter is an algebraic object, which takes the following arguments:

- `Operator` (which takes one of the following values)
  - `And`
  - `Or`
  - `Equal`
  - `NotEqual`
  - `GreaterThan`
  - `GreaterThanEqual`
  - `LessThan`
  - `LessThanEqual`
  - `Like`
- `Operands`: Is a list of filter objects of this same structure.
- `Path`: Is a list of strings indicating the property name of the class. If the property is a beacon (i.e., cross-reference), the path should be followed to the property of the beacon which should be specified as a list of strings.
- `valueInt`: The integer value where the `Path`'s last property name should be compared to.
- `valueBoolean`: The boolean value that the `Path`'s last property name should be compared to.
- `valueString`: The string value that the `Path`'s last property name should be compared to.
- `valueNumber`: The number (float) value that the `Path`'s last property name should be compared to.
- `valueDate`: The date (ISO 8601 timestamp) value that the `Path`'s last property name should be compared to.

```graphql
{
  Get {
    <SematicKind> {
      <Class>(where: {
          operator: <operator>,
          operands: [{
            path: [path],
            operator: <operator>
            <valueType>: <value>
          }, {
            path: [<matchPath>],
            operator: <operator>,
            <valueType>: <value>
          }]
        }) {
        <propertyWithBeacon> {
          <property>
          ... on <ClassOfWhereBeaconGoesTo> {
            <propertyOfClass>
          }
        }
      }
    }
  }
}
```

### Like operator

As mentioned in the list of possible `operator` values, `Like` is one of them. Using the `Like` operator allows you to do string searches based on partial match. For example, wildcard searches are possible: 

``` graphql
{
  Get {
    Things {
      Publication(where: {
            path: ["name"],
            operator: Like,
            valueString: "New *"
        }) {
        name
      }
    }
  }
}
```

{% include molecule-gql-demo.html %}

This query would return both the publications with the name `New Yorker` and `New York Times` if they are present in the Weaviate instance.

## Simple filter

You can create simple filters by setting the `where` key. You always need to include the GraphQL property path, the operator type, and the valueType plus a value. You can read more about the type definitions [here](#where-filter).

For example, this filter selects articles from the class Article with a wordcount higher than 1000.

```graphql
{
  Get {
    Things {
      Article(where: {
            path: ["wordCount"],
            operator: GreaterThan,
            valueInt: 1000
        }) {
        name
      }
    }
  }
}
```
{% include molecule-gql-demo.html %}

## Multiple filters

You can set multiple operands by providing an array.

For example, these filters select based on the class Article with a wordCount higher than 1000 and who are published before January 1st 2020. Note that you can filter a date and time just similar to numbers, with the `valueDate` given as `string`. 

```graphql
{
  Get {
    Things {
      Article(where: {
        operator: And,
        operands: [{
            path: ["wordCount"],
            operator: GreaterThan
            valueInt: 1000
          }, {
            path: ["publicationDate"],
            operator: LessThan,
            valueDate: "2020-01-01T00:00:00"
          }]
        }) {
        name
      }
    }
  }
}
```
{% include molecule-gql-demo.html %}

## Beacon filter

You can also search for the value of the property of a beacon.

For example, these filters select based on the class Article but who have `inPublication` set to The New Yorker.

```graphql
{
  Get {
    Things {
      Article(where: {
          path: ["inPublication", "Publication", "name"],
          operator: Equal,
          valueString: "The New Yorker"
        }) {
        name
        inPublication{
          ... on Publication{
            name
          }
        }
      }
    }
  }
}
```
{% include molecule-gql-demo.html %}

## Multiple filters and beacon filter

You can also combine all filters into one request.

For example, these filters select based on the class Article with a wordcount higher then 1000, published before January 1st 2020 and who have `inPublication` set to The New Yorker.

```graphql
{
  Get {
    Things {
      Article(where: {
        operator: And,
        operands: [{
            path: ["wordCount"],
            operator: GreaterThan
            valueInt: 1000
          }, {
            path: ["publicationDate"],
            operator: LessThan,
            valueDate: "2020-01-01T00:00:00"
          },{
            path: ["inPublication", "Publication", "name"],
            operator: Equal,
            valueString: "The New Yorker"
          }]
        }) {
        name
        inPublication{
          ... on Publication{
            name
          }
        }
      }
    }
  }
}
```
{% include molecule-gql-demo.html %}

## Geo Coordinates filter

If you've set the [geo location](../add-data/define_schema.html#property-types) property type, you can search in an area based on kilometers.

For example, this curious returns all in a radius of 2KM around a specific geo-location:

```graphql
{
  Get {
    Things {
      Publication(where: {
        operator: WithinGeoRange,
        valueGeoRange: {
          geoCoordinates: {
            latitude: 52.4,   # latitude
            longitude: 4.9    # longitude
          },
          distance: {
            max: 2000           # distance in meters
          }
        },
        path: ["headquartersGeoLocation"] # property needs to be of geoLocation type.
      }) {
        name
        headquartersGeoLocation {
          latitude
          longitude 
        }
      }
    }
  }
}
```
{% include molecule-gql-demo.html %}

## Limit filter

A limit filter limits the number of results.

An example of a stand-alone limit filter:

```graphql
{
  Get {
    Things {
      Article(limit:5) {
        name
      }
    }
  }
}
```

An example of a combination of filters and a limit filter:

```graphql
{
  Get {
    Things {
      Article(where: {
        operator: WithinGeoRange,
        valueGeoRange: {
          geoCoordinates: {
            latitude: 52.4,
            longitude: 4.9},
          distance: {
            max:2.0
          }
        },
        path: ["headquartersGeoLocation"]
      },
      limit: 5) { # limit to max 5 results
        name
        geolocation {
          latitude
          longitude 
        }
      }
    }
  }
}
```
{% include molecule-gql-demo.html %}

## Group filter


## Explore filter

Click [here](./explore.html#explore-filter) for more information about the explore filter.

## Frequently Asked Questions

{% include support-links.html %}