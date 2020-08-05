---
layout: layout-documentation
product: weaviate
sub-menu: Query data
product-order: 1
title: Explore
intro: You can explore the vector search engine based on the semantic meaning of the data concepts in a Weaviate using the GraphQL Explore{} function.
description: How to explore weaviate.
tags: ['Explore', 'GraphQL', 'Contextionary']
menu-order: 2
open-graph-type: article
og-img: documentation.jpg
toc: true
---

## Basics

- With the `Explore{}` query function, you can fuzzy search for data objects in Weaviate (in contrast to the [`explore filter`](./filters.html#explore-filter) in the Get{} function).
- Search results are based on given data, meta data and the `Contextionary` used in Weaviate.
- Some functions have (semantic) [filters](./filters.html) available.

## Introduction

You can explore (i.e., fuzzy) through the data in the Weaviate vector search engine using the GraphQL `Explore{}` function. Using arguments in the filters you are able to direct what concepts you are looking for. Classnames, [beacons](../about/philosophy.html#basic-terminology) and certainty levels of the results can be returned. Exploration can be done in your own local Weaviate, or in a network of Weaviate instances. Weaviate computes certainty levels of matching objects to your search results based on the `Contextionary`. It moves through the vector space of Weaviate, which is enriched with data objects. The data objects are positioned based on the available meta-information of these objects, like `className`, `keywords`, `properties`, `property values`, etc. Note that this function is for fuzzy search to data objects in Weaviate instances. When you know what you are looking for and want to retrieve exact data objects, try out the [`explore filter`](./filters.html#explore-filter) in the `Get{}` function.

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

### Calculation

Weaviate indexes and queries through the vector space in near-realtime (i.e., no training is needed). This allows to explore and search fast and efficiently. Calculations are based on the number of times the word occurs in the contextionary and the geographical centroid position in the vector space.

### CamelCase interpretation

Weaviate splits words based on CamelCase. For example, if a user wants to explore for the iPhone (the Apple device) they should use `iphone` rather than `iPhone` because the latter will be interpreted as `[i, phone]`.

### Moving

Because pagination is not possible in multidimensional storage, you can improve your results with additional explore functions which can move away from semantic concepts or towards semantic concepts. E.g., if you look for the concept 'New York Times' but don't want to find the city New York, you can use the  `moveAway{}` function by using the words 'New York'.

## Explore{} function

The Explore function can be used if a user doesn't know what to look for at all. For example, you might not be familiar with the exact class names of the concept you are looking for. The explore function will return everything it finds around a particular set of given concepts.

The `Explore{}` function is structured as follows:

```json
{
  Explore (
    network: <Boolean>,      # If set to True, peers on the P2P network will be included in the search
    concepts: [<String>]!,   # Required; an array of search items, which should be present in the Contextionary
    limit: <Int>,            # The maximum amount of objects to return
    certainty: <Float>,      # Minimal level of certainty, computed by normalized distance. See [Certainty](#certainty) for more information
    moveTo: {                # Giving directions to the search
      concepts: [<String>]!, # List of search items
      force: <Float>!        # The force to applu for a particular movement. Must be between 0 (no movement) and 1 (largest possible movement).
    },
    moveAwayFrom: {          # Giving directions to the search
      concepts: [<String>]!, # List of search items
      force: <Float>!        # The force to applu for a particular movement. Must be between 0 (no movement) and 1 (largest possible movement).
    }
  ) {
    beacon
    certainty                # certainty value based on a normalized distance calculation
    className
  }
}
```

Note that all words in the `concepts` argument array should be present in the Contextionary. More information about beacon interpretation can be found [here](../about/philosophy.html#basic-terminology).

An example query:

```graphql
{
  Explore (
    concepts: ["New Yorker"],
    certainty: 0.95,
    moveTo: {
      concepts: ["publisher", "articles"],
      force: 0.5
    },
    moveAwayFrom: {
      concepts: ["fashion", "shop"],
      force: 0.2
    }
  ) {
    beacon
    certainty
    className
  }
}
```
{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Explore+%28%0D%0A++++concepts%3A+%5B%22New+Yorker%22%5D%2C%0D%0A++++certainty%3A+0.95%2C%0D%0A++++moveTo%3A+%7B%0D%0A++++++concepts%3A+%5B%22publisher%22%2C+%22articles%22%5D%2C%0D%0A++++++force%3A+0.5%0D%0A++++%7D%2C%0D%0A++++moveAwayFrom%3A+%7B%0D%0A++++++concepts%3A+%5B%22fashion%22%2C+%22shop%22%5D%2C%0D%0A++++++force%3A+0.2%0D%0A++++%7D%0D%0A++%29+%7B%0D%0A++++beacon%0D%0A++++certainty%0D%0A++++className%0D%0A++%7D%0D%0A%7D' %}

### Concepts array function

There are three ways to define the `concepts` array argument in the Explore filter.

- `["New York Times"]` = one vector position is determined based on the occurences of the words
- `["New", "York", "Times"]` = all concepts have a similar weight.
- `["New York", "Times"]` = a combination of the two above.

Practical example: `concepts: ["beatles", "John Lennon"]`

## More Resources

{% include support-links.html %}