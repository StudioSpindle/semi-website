---
layout: layout-documentation
product: weaviate
sub-menu: Query data
product-order: 1
title: Filters
description: How to filter queries to weaviate.
tags: ['Query', 'GraphQL', 'Filter']
menu-order: 6
open-graph-type: article
og-img: documentation.jpg
---

# Filter

{% include badges.html %}

Filters can be set to order or sort your dataset or to find specific data objects. Some filters are available in multiple functions where others are only available in specific ones.

## Index

- [Basics](#basics)
- [Introduction](#introduction)
- [Where filter](#where-filter)
  - [Operator filter](#operator-filter)
  - [Multiple operator filters](#multiple-operator-filters)
  - [Like operator](#like-operator)
  - [Beacon filters operator](#like-operator)
  - [Filter by count](#filter-by-count)
- [GeoCoordinates filter](#geocoordinates-filter)
- [Limit filter](#limit-filter)
- [Explore filter](#explore-filter)
  - [Get function](#get-function)
- [Group filter](#group-filter)
  - [Grouping Best Practices](#grouping-best-practices)
- [GroupBy filter](#groupby-filter)
- [More resources](#more-resources)

## Basics

- Weaviate filters are always used inside one of the following functions:
  - [`Get{}`](./get.html)
  - [`Explore{}`](./explore.html)
  - [`Aggregate{}`](./aggregate.html)
- Some filters can be used with multiple functions.

## Introduction

Filters can be set to order or sort your dataset or to find specific data objects. Some filters are available in multiple functions where others are only available in specific ones.

## Where filter

Supported by the `Get{}` and `Aggregate{}` function.

The `where` filter is an [algebraic object](https://en.wikipedia.org/wiki/Algebraic_structure), which takes the following arguments:

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
- `valueDate`: The date (ISO 8601 timestamp, formatted as [RFC3339](https://tools.ietf.org/html/rfc3339)) value that the `Path`'s last property name should be compared to.

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

### Operator filter

You can create operator filters by setting the `where` key. You always need to include the GraphQL property path, the operator type, and the valueType plus a value. You can read more about the type definitions [here](#where-filter).

For example, this filter selects articles from the class Article with a wordcount higher than 1000.

```graphql
{
  Get {
    Things {
      Article(where: {
            path: ["wordCount"],    # Path to the property that should be used
            operator: GreaterThan,  # operator
            valueInt: 1000          # value (which is always = to the type of the path property)
        }) {
        title
      }
    }
  }
}
```
{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get+%7B%0D%0A++++Things+%7B%0D%0A++++++Article%28where%3A+%7B%0D%0A++++++++++++path%3A+%5B%22wordCount%22%5D%2C++++%23+Path+to+the+property+that+should+be+used%0D%0A++++++++++++operator%3A+GreaterThan%2C++%23+operator%0D%0A++++++++++++valueInt%3A+1000++++++++++%23+value+%28which+is+always+%3D+to+the+type+of+the+path+property%29%0D%0A++++++++%7D%29+%7B%0D%0A++++++++title%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %}

### Multiple operator filters

You can set multiple operands by providing an array.

For example, these filters select based on the class Article with a wordCount higher than 1000 and who are published before January 1st 2020. Note that you can filter a date and time just similar to numbers, with the `valueDate` given as `string`. Note that the `valueDate` should be formatted according to standard [RFC3339](https://tools.ietf.org/html/rfc3339).

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
            valueDate: "2020-01-01T00:00:00Z"
          }]
        }) {
        title
      }
    }
  }
}
```
{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get+%7B%0D%0A++++Things+%7B%0D%0A++++++Article%28where%3A+%7B%0D%0A++++++++operator%3A+And%2C%0D%0A++++++++operands%3A+%5B%7B%0D%0A++++++++++++path%3A+%5B%22wordCount%22%5D%2C%0D%0A++++++++++++operator%3A+GreaterThan%0D%0A++++++++++++valueInt%3A+1000%0D%0A++++++++++%7D%2C+%7B%0D%0A++++++++++++path%3A+%5B%22publicationDate%22%5D%2C%0D%0A++++++++++++operator%3A+LessThan%2C%0D%0A++++++++++++valueDate%3A+%222020-01-01T00%3A00%3A00Z%22%0D%0A++++++++++%7D%5D%0D%0A++++++++%7D%29+%7B%0D%0A++++++++title%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %}

### Like operator

Using the `Like` operator allows you to do string searches based on partial match. For example, wildcard searches are possible: 

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

{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get+%7B%0D%0A++++Things+%7B%0D%0A++++++Publication%28where%3A+%7B%0D%0A++++++++++++path%3A+%5B%22name%22%5D%2C%0D%0A++++++++++++operator%3A+Like%2C%0D%0A++++++++++++valueString%3A+%22New+%2A%22%0D%0A++++++++%7D%29+%7B%0D%0A++++++++name%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %}

This query should return both the publications with the name `New Yorker`, `New York Times` and `New Scientist` if they are present in the Weaviate instance.

### Filter by count

If a value is an `integer` or `float` you can now filter them based on the existing compare operators (`Equal`, `LessThan`, `LessThanEqual`, `GreaterThan`, `GreaterThanEqual`)

``` graphql
{
 Get {
   Things {
     Author(
       where:{
         valueInt: 2
         operator:GreaterThanEqual
         path: ["WroteArticles"]
       }
     ) {
       name
       WroteArticles {
         ... on Article {
           title
         }
       }
     }
   }
 }
}
```

{% include molecule-gql-demo.html encoded_query='%7B%0D%0A+Get+%7B%0D%0A+++Things+%7B%0D%0A+++++Author%28%0D%0A+++++++where%3A%7B%0D%0A+++++++++valueInt%3A+2%0D%0A+++++++++operator%3AGreaterThanEqual%0D%0A+++++++++path%3A+%5B%22WroteArticles%22%5D%0D%0A+++++++%7D%0D%0A+++++%29+%7B%0D%0A+++++++name%0D%0A+++++++WroteArticles+%7B%0D%0A+++++++++...+on+Article+%7B%0D%0A+++++++++++title%0D%0A+++++++++%7D%0D%0A+++++++%7D%0D%0A+++++%7D%0D%0A+++%7D%0D%0A+%7D%0D%0A%7D' %}

### Beacon filters

You can also search for the value of the property of a beacon.

For example, these filters select based on the class Article but who have `inPublication` set to New Yorker.

```graphql
{
  Get {
    Things {
      Article(where: {
          path: ["inPublication", "Publication", "name"],
          operator: Equal,
          valueString: "New Yorker"
        }) {
        title
        InPublication{
          ... on Publication{
            name
          }
        }
      }
    }
  }
}
```
{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get+%7B%0D%0A++++Things+%7B%0D%0A++++++Article%28where%3A+%7B%0D%0A++++++++++path%3A+%5B%22inPublication%22%2C+%22Publication%22%2C+%22name%22%5D%2C%0D%0A++++++++++operator%3A+Equal%2C%0D%0A++++++++++valueString%3A+%22New+Yorker%22%0D%0A++++++++%7D%29+%7B%0D%0A++++++++title%0D%0A++++++++InPublication%7B%0D%0A++++++++++...+on+Publication%7B%0D%0A++++++++++++name%0D%0A++++++++++%7D%0D%0A++++++++%7D%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %}

You can also combine all filters into one request.

For example, these filters select based on the class Article with a wordcount higher then 1000, published before January 1st 2020 and who have `inPublication` set to New Yorker.

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
            valueDate: "2020-01-01T00:00:00Z"
          },{
            path: ["inPublication", "Publication", "name"],
            operator: Equal,
            valueString: "New Yorker"
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
{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get+%7B%0D%0A++++Things+%7B%0D%0A++++++Article%28where%3A+%7B%0D%0A++++++++operator%3A+And%2C%0D%0A++++++++operands%3A+%5B%7B%0D%0A++++++++++++path%3A+%5B%22wordCount%22%5D%2C%0D%0A++++++++++++operator%3A+GreaterThan%0D%0A++++++++++++valueInt%3A+1000%0D%0A++++++++++%7D%2C+%7B%0D%0A++++++++++++path%3A+%5B%22publicationDate%22%5D%2C%0D%0A++++++++++++operator%3A+LessThan%2C%0D%0A++++++++++++valueDate%3A+%222020-01-01T00%3A00%3A00Z%22%0D%0A++++++++++%7D%2C%7B%0D%0A++++++++++++path%3A+%5B%22inPublication%22%2C+%22Publication%22%2C+%22name%22%5D%2C%0D%0A++++++++++++operator%3A+Equal%2C%0D%0A++++++++++++valueString%3A+%22New+Yorker%22%0D%0A++++++++++%7D%5D%0D%0A++++++++%7D%29+%7B%0D%0A++++++++name%0D%0A++++++++inPublication%7B%0D%0A++++++++++...+on+Publication%7B%0D%0A++++++++++++name%0D%0A++++++++++%7D%0D%0A++++++++%7D%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %}

## GeoCoordinates filter

Supported by the `Get{}` function.

If you've set the [geoCoordinates](../add-data/define_schema.html#property-types) property type, you can search in an area based on kilometers.

For example, this curious returns all in a radius of 2KM around a specific geo-location:

```graphql
{
  Get {
    Things {
      Publication(where: {
        operator: WithinGeoRange,
        valueGeoRange: {
          geoCoordinates: {
            latitude: 51.51,    # latitude
            longitude: -0.09    # longitude
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
{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get+%7B%0D%0A++++Things+%7B%0D%0A++++++Publication%28where%3A+%7B%0D%0A++++++++operator%3A+WithinGeoRange%2C%0D%0A++++++++valueGeoRange%3A+%7B%0D%0A++++++++++geoCoordinates%3A+%7B%0D%0A++++++++++++latitude%3A+51.51%2C++++%23+latitude%0D%0A++++++++++++longitude%3A+-0.09++++%23+longitude%0D%0A++++++++++%7D%2C%0D%0A++++++++++distance%3A+%7B%0D%0A++++++++++++max%3A+2000+++++++++++%23+distance+in+meters%0D%0A++++++++++%7D%0D%0A++++++++%7D%2C%0D%0A++++++++path%3A+%5B%22headquartersGeoLocation%22%5D+%23+property+needs+to+be+of+geoLocation+type.%0D%0A++++++%7D%29+%7B%0D%0A++++++++name%0D%0A++++++++headquartersGeoLocation+%7B%0D%0A++++++++++latitude%0D%0A++++++++++longitude+%0D%0A++++++++%7D%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %}

## Limit filter

Supported by the `Get{}`, `Explore{}` and `Aggregate{}` function.

A limit filter limits the number of results.

An example of a stand-alone limit filter:

```graphql
{
  Get {
    Things {
      Article(limit:5) {
        title
      }
    }
  }
}
```
{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get+%7B%0D%0A++++Things+%7B%0D%0A++++++Article%28limit%3A5%29+%7B%0D%0A++++++++title%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %}

## Explore filter

Supported by the `Get{}` and `Explore{}` function.

You can use an explore filter to find concepts in your dataset.

There are three ways to define the `concepts` array argument in the Explore filter.

- `["New York Times"]` = one vector position is determined based on the occurences of the words
- `["New", "York", "Times"]` = all concepts have a similar weight.
- `["New York", "Times"]` = a combination of the two above.

Practical example: `concepts: ["beatles", "John Lennon"]`

### Get function

The `explore{}` filter is structured as follows for the `Get{}` function:

```json
{
  Get{
    <SematicKind>{
      <Class>(
        explore: {
          concepts: [<String>]!   # Required; an array of concepts.
          moveAwayFrom: {         # Concepts the user wants to move away from.
            concepts: [<String>]! # Required; an array of concepts.
            force: <Float>!       # Required; a force between 0 and 1.0 that moves away from the core concept.
          },
          moveTo: {               # Concepts the user wants to move towards.
            concepts: [<String>]! # Required; an array of concepts.
            force: <Float>!       # Required; a force between 0 and 1.0 that moves away from the core concept.
          }
        }
      ){
        <property>
      }
    }
  }
}
```

Note that all words in the `concepts` argument array should be present in the Contextionary.

An example query:

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
      }
    }
  }
}
```
{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get%7B%0D%0A++++Things%7B%0D%0A++++++Publication%28%0D%0A++++++++explore%3A+%7B%0D%0A++++++++++concepts%3A+%5B%22fashion%22%5D%2C%0D%0A++++++++++certainty%3A+0.7%2C%0D%0A++++++++++moveAwayFrom%3A+%7B%0D%0A++++++++++++concepts%3A+%5B%22finance%22%5D%2C%0D%0A++++++++++++force%3A+0.45%0D%0A++++++++++%7D%2C%0D%0A++++++++++moveTo%3A+%7B%0D%0A++++++++++++concepts%3A+%5B%22haute+couture%22%5D%2C%0D%0A++++++++++++force%3A+0.85%0D%0A++++++++++%7D%0D%0A++++++++%7D%0D%0A++++++%29%7B%0D%0A++++++++name%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %}

## Group filter

Supported by the `Get{}` function.

You can use a group filter to combine similar concepts (aka _entity merging_). There are two ways of grouping objects with a semantic similarity together.

- `closest`, which shows the one result closest to the others.
- `merge`, which merges all results into one.

The `group{}` filter is structured as follows for the `Get{}` function:

```json
{
  Get{
    <SematicKind>{
      <Class>(
        group: {
          type: <String>  # "closest" or "merge"
          force: <Number> # percentage as float (0.75 = 75%) how closely merge items should be related       
        }
      ){
        <property>
      }
    }
  }
}
```

Note that all words in the `concepts` argument array should be present in the Contextionary.

An example query:

```graphql
{
  Get {
    Things {
      Publication(
        group:{
          type: merge
          force:0.05
        }
      ) {
        name
      }
    }
  }
}
```
{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get+%7B%0D%0A++++Things+%7B%0D%0A++++++Publication%28%0D%0A++++++++group%3A%7B%0D%0A++++++++++type%3A+merge%0D%0A++++++++++force%3A0.05%0D%0A++++++++%7D%0D%0A++++++%29+%7B%0D%0A++++++++name%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %}

### Grouping best practices

- The grouping/merging is done internally based on vector distance. It is thus important that the items to be merged are as close to each other as possible. If your items use a lot of words which are not recognized by the contextionary, those words do not influence the vector position. In this case consider extending the contextionary using the REST API (/c11y/extensions), so that it understands more words from your object.
- You get the best possible results if noise is removed in vectorization, we thus strongly recommend setting `vectorizeClassName: false` and `vectorizePropertyName: false` for each property.

## GroupBy filter

Supported by the `Aggregate{}` function.

You can use a groupBy filter to get meta information about groups of dataobjects.

The `group{}` filter is structured as follows for the `Get{}` function:

```json
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

In the following example, the articles are grouped by the property `isAccessible`, where one group contains accessible artibles, and the second group contains articles of which the `isAccessible` property is set to False.

```graphql
{
  Aggregate {
    Things {
      Article (groupBy:["isAccessible"]) {
        meta {
          count
        }
        wordCount {
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
{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Aggregate+%7B%0D%0A++++Things+%7B%0D%0A++++++Article+%28groupBy%3A%5B%22isAccessible%22%5D%29+%7B%0D%0A++++++++meta+%7B%0D%0A++++++++++count%0D%0A++++++++%7D%0D%0A++++++++wordCount+%7B%0D%0A++++++++++mean%0D%0A++++++++%7D%0D%0A++++++++groupedBy+%7B%0D%0A++++++++++value%0D%0A++++++++++path%0D%0A++++++++%7D%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %}

## More Resources

{% include support-links.html %}