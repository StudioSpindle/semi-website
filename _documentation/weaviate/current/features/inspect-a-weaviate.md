---
layout: layout-documentation
product: weaviate
sub-menu: Features
product-order: 1
title: Inspect a Weaviate
description: How to inspect a Weaviate.
tags: ['Contextionary', 'Inspect']
menu-order: 4
open-graph-type: article
og-img: documentation.jpg
---

# Inspect a Weaviate

{% include badges.html %}

## Index

- [Basics](#basics)
- [Introduction](#introduction)
- [Weaviate Structure](#weaviate-structure)
- [Get Metadata](#get-metadata)
  - [Weaviate Schema Metadata](#weaviate-schema-metadata)
- [More resources](#more-resources)

## Basics

- You can use the GraphQL `__type` filters to inspect the structure of a Weaviate.
- Handy if you want to integrate Weaviate features into a front-end application.

## Introduction

If you want to inspect your Weaviate, i.e., understanding its structure and available functionalities, you can use the `__type` GraphQL query. It allows you to understand how your Weaviate is structured.

## Weaviate Structure

Weaviate uses the following GraphQL structure.

```md
{
  {
    Explore (
      network: <Boolean>,
      concepts: [<String>]!,
      limit: <Int>,
      certainty: <Float>,
      moveTo: {
        concepts: [<String>]!,
        force: <Float>!
      },
      moveAwayFrom: {
        concepts: [<String>]!,
        force: <Float>!
      }
    ) {
      beacon
      certainty
      className
    }
  }
  Get {
    <SematicKind> {
      <Class>(
        explore: {
          concepts: [<String>]!
          moveAwayFrom: {
            concepts: [<String>]!
            force: <Float>!
          },
          moveTo: {
            concepts: [<String>]!
            force: <Float>!concept.
          }
        },
        limit: <Int>,
        where: {
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
        <property>
        <PropertyWithReference>
          ... on <ClassOfBeacon> {
            <property>
          }
      }
    }
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
}
```

## Get Metadata

Within Weaviate, GraphQL objects are retrievable by their name. At the root, there is the `WeaviateObj` object. You can retrieve all the metadata with the following query:

```graphql
{
  __type(name: "WeaviateObj") {
    name
    description
    fields {
      name
      description
      type {
        name
        description
      }
    }
    kind
    possibleTypes {
      name
      description
    }
    ofType {
      name
      description
    }
    inputFields {
      description
      defaultValue
    }
    interfaces {
      name
      description
    }
    enumValues {
      description
      deprecationReason
    }
  }
}
```

{% include molecule-gql-demo.html encoded_query='%7B%0A%20%20__type%28name%3A%20%22WeaviateObj%22%29%20%7B%0A%20%20%20%20name%0A%20%20%20%20description%0A%20%20%20%20fields%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20description%0A%20%20%20%20%20%20type%20%7B%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20description%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%20%20kind%0A%20%20%20%20possibleTypes%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20description%0A%20%20%20%20%7D%0A%20%20%20%20ofType%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20description%0A%20%20%20%20%7D%0A%20%20%20%20inputFields%20%7B%0A%20%20%20%20%20%20description%0A%20%20%20%20%20%20defaultValue%0A%20%20%20%20%7D%0A%20%20%20%20interfaces%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20description%0A%20%20%20%20%7D%0A%20%20%20%20enumValues%20%7B%0A%20%20%20%20%20%20description%0A%20%20%20%20%20%20deprecationReason%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D' %}

If you want to explore the GraphQL tree further, you can use one of the names (`name` field) in the `type` object of the `fields` array.

For example, to get an overview of the `Get{}` function you can collect the data like this:

```graphql
{
  __type(name: "GetObj") { # 'name' of 'type' in the 'fields' array
    name
    description
    fields {
      name
      description
      type {
        name
        description
      }
    }
    kind
    possibleTypes {
      name
      description
    }
    ofType {
      name
      description
    }
    inputFields {
      description
      defaultValue
    }
    interfaces {
      name
      description
    }
    enumValues {
      description
      deprecationReason
    }
  }
}
```

{% include molecule-gql-demo.html encoded_query='%7B%0A%20%20__type%28name%3A%20%22GetObj%22%29%20%7B%0A%20%20%20%20name%0A%20%20%20%20description%0A%20%20%20%20fields%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20description%0A%20%20%20%20%20%20type%20%7B%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20description%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%20%20kind%0A%20%20%20%20possibleTypes%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20description%0A%20%20%20%20%7D%0A%20%20%20%20ofType%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20description%0A%20%20%20%20%7D%0A%20%20%20%20inputFields%20%7B%0A%20%20%20%20%20%20description%0A%20%20%20%20%20%20defaultValue%0A%20%20%20%20%7D%0A%20%20%20%20interfaces%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20description%0A%20%20%20%20%7D%0A%20%20%20%20enumValues%20%7B%0A%20%20%20%20%20%20description%0A%20%20%20%20%20%20deprecationReason%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D' %}

### Weaviate Schema Metadata

To get an overview of the available user-defined Weaviate schema you can use the following queries.

#### Things

```graphql
{
  __type(name: "GetThingsObj") {
    name
    description
    fields {
      name
      description
      type {
        name
        description
      }
    }
    kind
    possibleTypes {
      name
      description
    }
    ofType {
      name
      description
    }
    inputFields {
      description
      defaultValue
    }
    interfaces {
      name
      description
    }
    enumValues {
      description
      deprecationReason
    }
  }
}
```

{% include molecule-gql-demo.html encoded_query='%7B%0A%20%20__type%28name%3A%20%22GetThingsObj%22%29%20%7B%0A%20%20%20%20name%0A%20%20%20%20description%0A%20%20%20%20fields%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20description%0A%20%20%20%20%20%20type%20%7B%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20description%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%20%20kind%0A%20%20%20%20possibleTypes%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20description%0A%20%20%20%20%7D%0A%20%20%20%20ofType%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20description%0A%20%20%20%20%7D%0A%20%20%20%20inputFields%20%7B%0A%20%20%20%20%20%20description%0A%20%20%20%20%20%20defaultValue%0A%20%20%20%20%7D%0A%20%20%20%20interfaces%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20description%0A%20%20%20%20%7D%0A%20%20%20%20enumValues%20%7B%0A%20%20%20%20%20%20description%0A%20%20%20%20%20%20deprecationReason%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D' %}

#### Actions

```graphql
{
  __type(name: "GetActionsObj") {
    name
    description
    fields {
      name
      description
      type {
        name
        description
      }
    }
    kind
    possibleTypes {
      name
      description
    }
    ofType {
      name
      description
    }
    inputFields {
      description
      defaultValue
    }
    interfaces {
      name
      description
    }
    enumValues {
      description
      deprecationReason
    }
  }
}
```

{% include molecule-gql-demo.html encoded_query='%7B%0A%20%20__type%28name%3A%20%22GetActionsObj%22%29%20%7B%0A%20%20%20%20name%0A%20%20%20%20description%0A%20%20%20%20fields%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20description%0A%20%20%20%20%20%20type%20%7B%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20description%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%20%20kind%0A%20%20%20%20possibleTypes%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20description%0A%20%20%20%20%7D%0A%20%20%20%20ofType%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20description%0A%20%20%20%20%7D%0A%20%20%20%20inputFields%20%7B%0A%20%20%20%20%20%20description%0A%20%20%20%20%20%20defaultValue%0A%20%20%20%20%7D%0A%20%20%20%20interfaces%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20description%0A%20%20%20%20%7D%0A%20%20%20%20enumValues%20%7B%0A%20%20%20%20%20%20description%0A%20%20%20%20%20%20deprecationReason%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D' %}

## More Resources

{% include support-links.html %}