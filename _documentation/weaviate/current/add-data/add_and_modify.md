---
layout: layout-documentation
product: weaviate
sub-menu: Add data
product-order: 1
title: Add and modify data
description: How to fill a weaviate with data.
tags: ['Add', 'Data']
menu-order: 2
open-graph-type: article
og-img: documentation.jpg
---

# Adding Data Guide

{% include badges.html %}

When a Weaviate [schema](./define_schema.html) is created, you can populate this Weaviate with data.

## Index

- [Basics](#basics)
- [Introduction](#introduction)
- [Data Object](#data-object)
  - [Add a data object](#add-a-data-object)
    - [Influence Vector Weights](#influence-vector-weights)
  - [Update a data object](#update-a-data-object)
  - [Get a data object](#get-a-data-object)
  - [Delete a data object](#delete-a-data-object)
- [References guide](#references-guide)
  - [Add individual references](#add-individual-references)
  - [Replace all references](#replace-all-references)
  - [Delete individual references](#delete-individual-references)
- [More resources](#more-resources)

## Basics

- Data is added through the RESTful API.
<<<<<<< HEAD
- Individual [semantic kinds](.././about/philosophy.html#basic-terminology) can be collected or listed. However, there are seperate documentation pages for [querying](.././query-data/get.html) and [exploring](.././query-data/explore.html).
=======
- Individual [semantic kinds](.././about/philosophy#basic-terminology) can be collected or listed. However, there are seperate documentation pages for [querying](.././query-data/get.html) and [exploring](.././query-data/explore.html).
>>>>>>> gh-423: general doc updates
- The examples assume that Weaviate runs on port 80 on the localhost without authentication.
- The entry point to a Weaviate is always `/v1`.

## Introduction

Adding data to Weaviate is very similar to filling traditional graph databases with data. The two differentiating factors within Weaviate are:

1. The ability to make direct and indirect references to nodes in the graph.
2. Realtime semantic indexing in the [Contextionary](.././about/philosophy.html#about-the-contextionary).

## Data Object

A data object syntax is defined as follows:

```js
{
  "class": "string",  // as defined during schema creation
  "id": "{UUID}",     // optional, should be in UUID format.
  "schema": {
    "property": "defined as datatypes", // defined as datatypes # as defined during schema creation
  }
}
```

## Add a data object

A concept data object can be added to a Weaviate via the following endpoint:

```js
POST /v1/{semanticKind}

{
  DATA
}
```

- `{semanticKind}` = _things_ or _actions_ ([more info](.././about/philosophy.html#basic-terminology)).
- `{contentType}` = JSON or YAML.
- `{data}` = [data object](#data-object).

Example of adding a _Thing_:

```js
POST /v1/things

{
  "class": "Publication",
  "id": "f81bfe5e-16ba-4615-a516-46c2ae2e5a80",
  "schema": {
    "name": "New York Times"
  }
}
```

Example of adding an _Action_, with a [direct](#direct-references) reference:

```js
POST /v1/actions

{
  "class": "Payment",
  "id": "22cc3380-ef73-48f8-9e3c-c603fae0f4b0",
  "schema": {
    "date": "2019-03-24T14:25:57Z",
    "toCompany": [
      {
        "beacon": "weaviate://localhost/things/f81bfe5e-16ba-4615-a516-46c2ae2e5a80"
      }
    ]
  }
}
```

- _Note, it is assumed that the beacon f81bfe5e-16ba-4615-a516-46c2ae2e5a80 exsists_


### Influence Vector Weights

When adding objects, a vector is created based on the words in the object. The algorithm of the [Contextionary](../about/contextionary.html) gives weights to words based on their general occurence of the word in its original training data. The underlying assumption is that a rare word should take more precedence over a very common word, similar to [tf-idf](https://en.wikipedia.org/wiki/Tf%E2%80%93idf).

This works well in most cases, but in some use-case specific domain languages common words get a new meaning and therefore their importance should change. Imagine the words "far" and "near". They are quite common in overall language, so - especially when mixed with rarer words - they wouldn't get a great weight. However, now assume you're in the domain of optometry or manufacturing glasses. In the terms "far-sighted" and "near-sighted", the words "near" and "far" make a very important distinction. If you want to successfully classify objects based on these terms, more relative importance should be given to them. You can influence, or completely override, the weights of individual words in objects when creating vectors.

To do so, the field `vectorWeights` was introduced to the `Thing` and `Action` objects. The field is a key-value map where both the keys and the values must be strings. The keys are the words you want to influence and the value is a mathematical expression to set the new weight. You can use additions, subtractions, multiplications, divisions or simply overwrite the weight with a fixed number. To reference the original weights, use the single-letter variable `w`. Some examples:

- `"vectorWeights": {"far": "10 * w"}`.
Give the word "far" 10 times its original weight.

- `"vectorWeights": {"far": "w + 0.5", "near": "w - 0.5"}`.
Give the word "far" an absolute boost of 0.5, while penalizing the word "near" by 0.5.

- `"vectorWeights": {"sighted": "0.7", "glasses": "2 - 4 * w"}`.
Let the word "sighted" have a fixed weight of 0.7 whereas the word "glasses" is calculated by subtracting 4 times the original weight from the number 2.

#### Important notes to keep in mind 

- For this feature to work you need a Contextionary version of at least `...v0.4.7`.
- Spaces in math expressions have no meaning.
- A word that is not referenced in `"vectorWeights"` will simply use its original weight as returned by the Contextionary.
- Custom `vectorWeights` only affect the object which they are set on, there is no option to globally manipulate a specific word. If the same vectorWeights are required for multiple objects, simply attach them to all objects where needed.
- Whenever the mathematical expression is not a fixed number (such as `"17"`) an operator must be present. It is not valid to use implicit operators, such as `"2w"` which would mean "two times the original weight". In this case explicitly use the multiplication operator, e.g. `"2 * w"` or `"w*2"`.
- The weights can be modified when creating the object, or with a `PUT` or `PATCH` update.

#### Full example

Here's a full example for importing a `Thing` object.

`POST /v1/things`

``` jsos
{
 "class": "Glasses",
 "schema": {
   "description": "These glasses are meant for far-sighted people"
 },
 "vectorWeights": {
   "far": "5 * w",
   "near": "5 * w"
 }
}
```

The above example will boost the words "far" or "near" by a factor of 5. Note that the object does not contain the word "near", so only the word "far" is boosted. The other unreferenced words maintain their original weights.


## Update a data object

### PUT

A concept data object can be updated inside a Weaviate via the following endpoint:

```js
PUT /v1/{semanticKind}/{semanticKindUUID}

{
  DATA
}
```

- `{semanticKind}` = _things_ or _actions_ ([more info](.././about/philosophy.html#basic-terminology)).
- `{semanticKindUUID}` = the UUID that points to a concept.
- `{contentType}` = JSON or YAML.
- `{data}` = [data object](#data-object).

Example of updating a _Thing_.

```js
PUT /v1/things/f81bfe5e-16ba-4615-a516-46c2ae2e5a80

{
  "class": "Publication",
  "schema": {
    "name": "New York Times Corporation"
  },
  "id": "f81bfe5e-16ba-4615-a516-46c2ae2e5a80"
}
```

### PATCH

Alternatively to the `PUT` request, a `PATCH` request can be made to update a `Thing` or `Action` based on its `UUID` using patch semantics. `PATCH` requests suppoort json-merge style patch semantics defined by [RFC 7396](https://tools.ietf.org/html/rfc7396). 

- The body of the request (the `{data}` object) is either a `Thing` or an `Action` object.
- The `class` field in the body is required and immutable.  It is therefore not possible to change the class of a specific object using `PATCH`.
- Any primitive schema property will be appended to the existing object or overwritten if it already existed.
- Any reference inside a reference property will be appended to the existing list of references. It is not possible to delete existing references using `PATCH`.
- A successful merge returns `204 No Content`.
- Properties explicitly set to `null` are ignored by `PATCH`. 
- Note that the `PATCH` endpoint uses the regular `application/json` header like all other endpoints. This is in contrast to what the official [RFC 7396](https://tools.ietf.org/html/rfc7396) requires (which is `content-type: application/merge-patch+json`).

The request can be used like this:

```js
PATCH /v1/{semanticKind}/{semanticKindUUID}

{
  DATA
}
```

For example with the (`{data}`) object filled, the request can look something this:

```bash
PATCH /v1/things/f81bfe5e-16ba-4615-a516-46c2ae2e5a80 

{
  "class": "Publication",
  "schema": {
    "name": ""New York Times Corporation""
  },
  "id": "f81bfe5e-16ba-4615-a516-46c2ae2e5a80"
}
```

## Get a data object

A concept data object can be retrieved from a Weaviate directly via the following endpoint:

```js
GET /v1/{semanticKind}/{semanticKindUUID}
```

- `{semanticKind}` = _things_ or _actions_ ([more info](.././about/philosophy.html#basic-terminology)).
- `{semanticKindUUID}` = the UUID that points to a concept.

Example of requesting a _thing_.

```js
GET /v1/things/f81bfe5e-16ba-4615-a516-46c2ae2e5a80
```

- _Note, the result will be in the form of a [data object](#data-object)._
- _Note, this endpoint is created the collect individual concepts directly, there are specific endpoints for [querying](.././query-data/get.html) and [exploring](.././query-data/explore.html)._

## Delete a data object

A concept data object can be deleted from a Weaviate directly via the following endpoint;

```js
DELETE /v1/{semanticKind}/{semanticKindUUID}
```

- `{semanticKind}` = _things_ or _actions_ ([more info](.././about/philosophy.html#basic-terminology)).
- `{semanticKindUUID}` = the UUID that points to a concept.

Example of deleting a _thing_.

```js
DELET /v1/things/f81bfe5e-16ba-4615-a516-46c2ae2e5a80
```

## References guide

Weaviate has two types of references:

1. Direct references which are references to nodes in the graph (like a traditional graph-DB).
2. Indirect references are references that are semantically similar to each other. _(coming soon)_

### Direct References

A direct reference connects a concept directly to another concept. The use case for this type of reference is that you want to want to make 100% sure that you make a correct reference. A `Company` to a `hasCEO` might be an example.

Direct references are always set like this:

```json
{
  "class": "Publication",
  "schema": {
    "name": "New York Times",
    "hasCeo": {
      "beacon": "weaviate://localhost/things/{concept ID}"
    }
  }
}
```

- _Note: for more information about setting references, see the documentation below._
- _Note: click [here](#cross-reference-location-url) for more information about CREF location definitions_

### Indirect References _(coming soon)_

Indirect references tap into the natural language processing part of Weaviate. You can set a reference to something that is _close enough_ for Weaviate to recognize it. The use case here is that if you have multiple data entries that describe the same thing, it will help Weaviate recognize the entry and make the relations for you.

Concider the following two entries that might be in you database:

```json
{
  "Company": {
    "name": "New York Times",
    "hasCeo": {
      "name": "Mark Thompson"
    }
  }
}
```

and

```json
{
  "Person": {
    "name": "Mark Thompson"
  }
}
```

Although the references are not identical, this is enough for Weaviate to conncet the two data items to eachother when searching.

Indirect references are always set like this:

```json
{
  "class": "Publication",
  "schema": {
    "name": "New York Times",
    "hasCeo": {
      "Person": {
        "name": "Mark Thompson"
      }
    }
  }
}
```

_Note: for more information about setting references, see the documentation below._

### Cross Reference Location (URL)

Weaviate uses it's own transportaion schema. A URL is always defined in the same way:

| schema | location | concept | UUID |
| ------ | -------- | ------- | ---- |
| `weaviate://` | `localhost` or `peername` | `/` `things` or `actions` | `/` UUID |

For example:

`weaviate://localhost/things/f81bfe5e-16ba-4615-a516-46c2ae2e5a80`

## Add individual references

Requests can be done to individual references if the cardinality of this property is set to `many`. If the cardinality is set to `atMostOne`, then this REST endpoint cannot be used for individual reference manipulations. 

An individual reference can be added to a concept data object as follows:

```js
POST /v1/{semanticKind}/{semanticKindUUID}/references/{propertyName}

{
  DATA
}
```

- `{semanticKind}` = _things_ or _actions_ ([more info](.././about/philosophy.html#basic-terminology)).
- `{semanticKindUUID}` = the UUID that points to a concept.
- `{propertyName}` = the name of the property related to this class.
- `{contentType}` = JSON or YAML.
- `{data}` = direct or indirect reference.

Example of adding a direct reference:

```js
POST /v1/actions/f81bfe5e-16ba-4615-a516-46c2ae2e5a80/references/toPublication

{
  "beacon": "weaviate://localhost/things/22cc3380-ef73-48f8-9e3c-c609bae0b4b0"
}
```

Example of adding an indirect reference _(coming soon)_:

```js
POST /v1/things/f81bfe5e-16ba-4615-a516-46c2ae2e5a80/references/hasCeo

{
  "name": "Mark Thompson",
  "bornIn": {
    "beacon": "weaviate://localhost/things/lo9...b2c"
  }
}
```

- _Note, you can only add multiple references if [the `cardinality` of the schema id set to `many`](.././add-data/define_schema.html#create-a-schema-item)_

## Replace all references

All references related to a property can be updated as follows:

```js
PUT /v1/{semanticKind}/{semanticKindUUID}/references/{propertyName}

{
  DATA
}
```

- `{semanticKind}` = _things_ or _actions_ ([more info](.././about/philosophy.html#basic-terminology)).
- `{semanticKindUUID}` = the UUID that points to a concept.
- `{propertyName}` = the name of the property related to this class.
- `{contentType}` = JSON or YAML.
- `{data}` = array of direct or indirect reference.

Example of replacing a direct reference:

```js
POST /v1/things/f81bfe5e-16ba-4615-a516-46c2ae2e5a80/references/hasCustomers

[
  {
    "beacon": "weaviate://localhost/things/lo9...b2c"
  },
  {
    "beacon": "weaviate://localhost/things/kjd...d8s"
  }
]
```

- _Note, you can only update multiple references if [the `cardinality` of the schema is set to `many`](.././add-data/define_schema.html#create-a-schema-item)_

## Delete individual references

You can delete a single reference that is given in the body from the list of references that this property has.

```js
DELETE /v1/{semanticKind}/{semanticKindUUID}/references/{propertyName}

{
  DATA
}
```

## More Resources

{% include support-links.html %}