---
layout: layout-documentation
product: weaviate
sub-menu: Add data
product-order: 1
title: Define schema
description: How to define a weaviate schema.
tags: ['Schema']
menu-order: 1
open-graph-type: article
og-img: documentation.jpg
---

# Schema Guide

{% include badges.html %}

A Weaviate schema is used to define what kind of [semantic kinds](../about/philosophy.html#basic-terminology) you will be adding to a Weaviate. It will function as the overall data model.

## Index

- [Basics](#basics)
- [Introduction](#introduction)
  - [Concepts and their Structures](#concepts-and-their-structures)
  - [Classes](#classes)
  - [Properties](#properties)
  - [Keywords](#keywords)
  - [Weaviate Schema versus Ontology](#weaviate-schema-versus-ontology)
- [Defining Objects](#defining-objects)
  - [Schema Object](#schema-object)
  - [Property Object](#property-object)
  - [Concatenate Classes and Properties](#concatenate-classes-and-properties)
  - [Stopwords](#stopwords)
    - [What stopwords are and why they matter](#what-stopwords-are-and-why-they-matter)
    - [Behavior around stop words](#behavior-around-stop-words)
    - [How does weaviate decide wether a word is a stop word or not?](#how-does-weaviate-decide-wether-a-word-is-a-stop-word-or-not)
  - [Property Types](#property-types)
    - [Date Type](#date-type)
    - [Geo Coordinates Type](#geo-coordinates-type)
    - [Cross Reference Type](#cross-reference-type)
    - [Cardinality](#cardinality)
- [Using the Schema API](#using-the-schema-api)
  - [Create a schema item](#create-a-schema-item)
    - [Regulate Indexing](#regulate-indexing)
  - [Get the schema](#get-the-schema)
  - [Delete a schema item](#delete-a-schema-item)
  - [Add a property to a schema item](#add-a-property-to-a-schema-item)
  - [Delete a property from a schema item](#delete-a-property-from-a-schema-item)
- [Full schema example](#full-schema-example)
- [More resources](#more-resources)

## Basics

- A schema consists of classes and properties.
- Things are distinguished from Actions in schema classes.
- Words used in the schema must be part of the [contextionary](../about/philosophy.html#about-the-contextionary).
- The schema can be modified through the RESTful API.
- You can import and export complete schemas with the [weaviate-cli](/documentation/weaviate-cli/current/schema/schema-import.html) tool.
- A class or property in Weaviate becomes immutable, but you can always be extend.

## Introduction

<<<<<<< HEAD
<<<<<<< HEAD
When you startup an empty Weaviate, you need to define a schema to explain what kind of data you will add. Because Weaviate is a search graph, the linguistic element plays an important role. When creating concepts, Weaviate will validate if it can understand the schema concepts you want to add based on the [contextionary](../about/philosophy.html#about-the-contextionary). You might notice that a lot of definitions are related to the everyday language we use. And this is the first best practice to bear in mind. When defining the schema, you should do this in the form like you would explain it to another person, not like tables and columns you would add to a traditional data solution.
=======
When you startup an empty Weaviate, you need to define a schema to explain what kind of data you will add. Because Weaviate is a smart graph, the linguistic element plays an important role. When creating concepts, Weaviate will validate if it can understand the schema concepts you want to add based on the [contextionary](../about/philosophy#about-the-contextionary). You might notice that a lot of definitions are related to the everyday language we use. And this is the first best practice to bear in mind. When defining the schema, you should do this in the form like you would explain it to another person, not like tables and columns you would add to a traditional data solution.
>>>>>>> gh-423: updates to product pages
=======
When you startup an empty Weaviate, you need to define a schema to explain what kind of data you will add. Because Weaviate is a search graph, the linguistic element plays an important role. When creating concepts, Weaviate will validate if it can understand the schema concepts you want to add based on the [contextionary](../about/philosophy.html#about-the-contextionary). You might notice that a lot of definitions are related to the everyday language we use. And this is the first best practice to bear in mind. When defining the schema, you should do this in the form like you would explain it to another person, not like tables and columns you would add to a traditional data solution.
>>>>>>> gh-000: update to latest version

### Concepts and their Structures

Within Weaviate you will work with **concepts**. A concept refers to something which can be **things** or **actions**. The way you will define things or actions is always the same, but conceptually, they are different.

### Classes

A concept definition is what we call a **class** and a class is always written with a **capital first character**. A class for a thing describes what it is in the form of a noun (e.g., *Person*, *Product*, *Timezone*, etcetera). For actions, this would be a verb (e.g., *Move*, *Buy*, *Eat*, etcetera). Bear in mind that Weaviate always validates if it contextually understands the words. If you add a thing or action that it can't recognize, it will not accept the schema.

Examples expressed in YAML might look like this:

```yaml
Publication
Article
Author
```

### Properties

Every class has properties, which are always written with a **lower case first character**. For example, the class **Publication** might have the property **name**.

Examples expressed in YAML might look like this:

```yaml
Publication
  name
Article
  title
Author
  name
```

### Keywords

Keywords give context to a class or property. They help a Weaviate instance to interpret different words that are spelled the same way (so-called homographs). A good example of this is the word seal. Do you mean a stamp or the sea animal? You can define this by setting keywords. The weights determine how important the keyword is. Setting low values is often already enough to determine the context of a thing or action.

```yaml
class: Publication
description: A publication with an online source
keywords:
- keyword: newspaper
  weight: 1.0
- keyword: magazine
  weight: 1.0
```

### Weaviate Schema versus Ontology

<<<<<<< HEAD
Because Weaviate uses the [Contextionary](../about/philosophy.html#about-the-contextionary) to index data, the use of the schema becomes fuzzy. This means that a reference formatted like this: `{Class} {property} {value}` (e.g., `a Publication with the name New Yorker`) is semantically similar to `a Magazine with the label New Yorker`.
=======
Because Weaviate uses the [Contextionary](../about/philosophy#about-the-contextionary) to index data, the use of the schema becomes fuzzy. This means that a reference formatted like this: `{Class} {property} {value}` (e.g., `a Publication with the name New Yorker`) is semantically similar to `a Magazine with the label New Yorker`.
>>>>>>> gh-423: general doc updates

Within Weaviate, the schema is _only_ used to define the query and explore syntax.

## Defining objects

Objects are defined as classes with nested properties. In this chapter, you can find all the individual parts that make a Weavite schema. A complete example can be found [here](#full-schema-example).

### Schema object

A schema object is defined as follows;

```js
{
  "class": "string",              // The name of the class in string format
  "description": "string",        // A description for your reference
  "vectorizeClassName": "boolean",// vectorize the class true or false?
  "keywords": [                   // An array of keywords that Weaviate uses when a classname is ambigious
    {
      "keyword": "string",        // A keyword in string format. For example, with the class "Company" you might want to add the keyword "business"
      "weight": 0.0               // The importance of the keyword. Min 0.0 and max 1.0
    }
  ],
  "properties": [                 // An array of the properties you are adding, same as a Property Object
    {
      "dataType": [               // The data type of the object as described above, When creating cross references, a property can have multiple dataTypes.
        "string"
      ],
      "name": "string",           // The name of the property
      "vectorizePropertyName": "boolean", // vectorize the property true or false?
      "keywords": [               // An array of keywords that Weaviate uses when a property is ambigious
        {
          "keyword": "string",    // A keyword in string format.
          "weight": 0.0           // The importance of the keyword. Min 0.0 and max 1.0
        }
      ],
      "cardinality": "atMostOne OR many", // Only used with cross references. Will there only be one refference made (e.g., "bornIn") or multiple ones (e.g., "hasProducts")
      "description": "string",            // A description for your reference
      "index": true                       // Optional, default is true. By default each property is fully indexed both for full-text, as well as vector-search. You can ignore properties in searches by explicitly setting index to false.
    }
  ]
}
```

### Property Object

A property object is defined as follows;

```js
{
  "dataType": [ // The data type of the object as described above, When creating cross refferences, a property can have multiple dataTypes.
    "string"
  ],
  "name": "string", // The name of the property
  "vectorizePropertyName": "boolean" // vectorize the property true or false?
  "keywords": [     // An array of keywords that Weaviate uses when a property is ambigious
    {
      "keyword": "string", // A keyword in string format.
      "weight": 0.0        // The importance of the keyword. Min 0.0 and max 1.0
    }
  ],
  "cardinality": "atMostOne OR many", // Only used with cross references. Will there only be one refference made (e.g., "bornIn") or multiple ones (e.g., "hasProducts")
  "description": "string"             // A description for your reference
  "index": true                       // Optional, default is true. By default each property is fully indexed both for full-text, as well as vector-search. You can ignore properties in searches by explicitly setting index to false.
}
```

### Concatenate Classes and Properties

Sometimes you might want to use multiple words to set as a class or property definition. For example, the year a person is born in, you might want to define with the two words: `born` and `in`. You can do this by capitalizing per word (CamelCase), for example, `bornIn`. Weaviate will validate both words in the Contextionary.

Examples expressed in YAML might look like this:

```yaml
Publication
  name
  hasArticles
Article
  title
  summary
  wordCount
  url
  hasAuthors
  inPublication
  publicationDate
Author
  name
  wroteArticles
  writesFor
```

[Keywords](#keywords) cannot be chained, they have to match exactly one word. However, there is no limit on the amount of keywords per class or per class property.

### Stopwords

Note that stopwords automatically removed from camelCased and CamelCased names.

#### What stopwords are and why they matter

Stopwords are words that don't add semantic meaning to your concepts and are
extremely common in texts across different contexts. For example, the sentence
"a car is parked on the street" contains the following stopwords: "a", "is",
"on", "the". If we look at the sentence "a banana is lying on
the table", you would find the exact same stop words. So in those two sentences
over 50% of the words overlap. Therefore they would be considered somewhat
similar (based on the overall vector position).

However, if we remove stopwords from both sentences, they become "car parked
street" and "banana lying table". Suddently there are 0% identical words in the
sentences, so it becomes easier to perform vector comparisons. Note at this
point we cannot say whether both sentences are related or not. For this we'd
need to know how close the vector position of the sentence "car parked street"
is to the vector position of "banana lying table". But we do know that the
result can now be calculated with a lot less noise.

#### Behavior around stop words

Stopwords are useful for humans, so we don't want to encourage you to leave
them out completely. Instead weaviate will remove them whenever your schema
information is translated to vector positions.

In most cases you won't even notice that this happens in the background,
however, there are a few edge cases that might cause a validation error:

* If your camelCased class or property name consists **only** of stopwords,
  validation will fail. Example: `TheInA` is not a valid class name, however,
  `TheCarInAField` is (and would internally be represented as `CarField`).

* If your keyword list contains stop words, they will be removed. However, if
  every single keyword is a stop word, validation will fail.

#### How does weaviate decide wether a word is a stop word or not?

The list of stopwords is derived from the contextionary version used and is
published alongside the contextionary files.

Check the [contextionary](../about/contextionary.html) or a list of stopwords using
the desired language and version. For example, to see the stopwords used in the
english language contextionary version 0.5.0, check
[https://c11y.semi.technology/0.5.0/en/stopwords.json](https://c11y.semi.technology/0.5.0/en/stopwords.json).

### Property Types

When creating a property, Weaviate needs to know what type of data you will give it. Weaviate accepts the following types:

| Weaviate Type | Exact Data Type | Formatting |
| ---------|--------|-----------|
| string   | string | `string` |
| int      | int64  | `0` |
| boolean  | boolean | `true`/`false` |
| number   | float64 | `0.0` |
| date     | string | [more info](#date-type) |
| text     | text   | `string` |
| geoCoordinates | string | [more info](#geo-coordinates-type) |
| phoneNumber | string | [more info](#phone-number-type) |
| CrossRef | string | [more info](#cross-reference-type) |

#### Date Type

Weaviate requires an [RFC 3339](https://tools.ietf.org/html/rfc3339) formatted date that includes the time and the offset.

For example:

- `1985-04-12T23:20:50.52Z`.
- `1996-12-19T16:39:57-08:00`
- `1990-12-31T23:59:60Z`
- `1990-12-31T15:59:60-08:00`
- `1937-01-01T12:00:27.87+00:20`

#### Geo Coordinates Type

Weaviate allows you to store geo-coordinates related to a thing or action. When querying Weaviate, you can use this type to find items in a radius around this area.

An example of how geo coordinates are defined as:

```json
{
  "City": {
    "location": {
      "latitude": 52.366667,
      "longitude": 4.9
    }
  }
}
```

#### Phone Number Type

There is a special, primitive data type `phoneNumber`. When a phone number is added to this field, the input will be normalized and validated, unlike the single fields as `number` and `string`. The data field is an object, as opposed to a flat type similar to `geoCoordinates`. The object has multiple fields:

```json
{
  "phoneNumber": {
    "input": "020 1234567",                       // Raw input in string format
    "defaultCountry": "nl",                       // Optional, required if only a national number is provided, ISO 3166-1 alpha-2 country code. Only set if explicitly set by the user.
    "internationalFormatted": "+31 20 1234567",   // Read-only string
    "countryCode": 31,                            // Read-only unsigned integer, numerical country code
    "national": 201234567,                        // Read-only unsigned integer, numerical represenation of the national number
    "nationalFormatted": "020 1234567",           // Read-only string
    "valid": true                                 // Read-only boolean. Whether the parser recognized the phone number as valid
  }
}
```

There are two fields that accept input. `input` must always be set, while `defaultCountry` must only be set in specific situations. There are two scenarios possible:
- When you entered an international number (e.g. `"+31 20 1234567"`) to the `input` field, no `defaultCountry` needs to be entered. The underlying parser will automatically recognize the number's country.
- When you entered a national number (e.g. `"020 1234567"`), you need to specify the country in `defaultCountry` (in this case, `"nl"`), so that the parse can correctly convert the number into all formats. The string in `defaultCountry` should be an [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code. 

As you can see in the code snippet above, all other fields are read-only. These fields are filled automatically, and will appear when reading back a field of type `phoneNumber`. 

#### Cross Reference Type

The cross-reference type is the graph element of Weaviate. When setting a data type, you can set multiple classes.

The following example is seen as a valid set of datatypes.

```json
{
  "properties": [
    {
      "dataType": [
        "Article"
      ]
    }
  ]
}
```

### Cardinality 

A property's `dataType` is always set as one (`atMostOne`) meaning that it can
have only one type (or class) to direct to. However, when setting cross-references, you
sometimes want to be able to point to multiple things or action classes.

For example, the class `Company` might have the property `hasCustomer` which can be
a cross-reference to other compannies as well as businesses and individual persons. When using GraphQL to retrieve data
from the graph, the cardinality will determine how the query is constructed.

```json
{
  "class": "Article",
  "description": "Normalised types",
  "keywords": [],
  "properties": [
    {
      "name": "hasAuthors",
      "dataType": [
         "Author", 
         "Publication"
      ],
      "cardinality": "many",
      "description": "authors this article has"
    }
  ]
}
```

## Using the Schema API

- Weaviate uses a full RESTful API.
- Examples are described in YAML and curl, but you can use it in any application.
- The examples assume that Weaviate runs on port 80 on the localhost without authentication.
- The entry point to a Weaviate is always `/v1`.

## Create a Schema Item

Adding a schema can be done by POSTing a [schema object](#schema-object) to the `/v1/schema/{semantic kind}` endpoint.

An example of creating a schema item of the semantic kind _Thing_ might look like this:

<<<<<<< HEAD
```js
POST /v1/schema/things

{
=======
```bash
$ curl http://localhost:8080/v1/schema/things -X POST -H 'Content-type: application/json' -d \
'{
>>>>>>> gh-423: general doc updates
  "class": "Publication",
  "description": "A publication with an online source",
  "vectorizeClassName": false,
  "keywords": [
    {
      "keyword": "newspaper",
      "weight": 1.0
    },
    {
      "keyword": "magazine",
      "weight": 1.0
    }
  ],
  "properties": [
    {
      "dataType": [
        "string"
      ],
      "name": "name",
      "description": "Name of the publication"
    }
  ]
}
```

An example of creating a schema item of the semantic kind _Action_ might look like this. Note that the properties `fromCompany` and `toCompany` are cross-references to the class `Company`:

```JS
POST /v1/schema/actions

{
  "class": "Payment",
  "description": "A payment that happened",
  "properties": [
    {
      "dataType": [
        "date"
      ],
      "description": "date of the payment",
      "name": "transactionDate"
    },
    {
      "cardinality": "many",
      "dataType": [
        "Company"
      ],
      "description": "the company that receives the payment",
      "name": "toCompany"
    },
    {
      "cardinality": "atMostOne",
      "dataType": [
        "Company"
      ],
      "description": "the company that sends the payment",
      "name": "fromCompany"
    },
    {
      "dataType": [
        "boolean"
      ],
      "description": "was the payment succesful?",
      "name": "success",
      "index": false
    }
  ]
}
```

#### Regulate Indexing

By default, all properties of a schema item will be both for full-text, as well as vector-search. But in some cases you want to be able to regulate specific parts of the schema to optimise indexing.

For example, a data object with the following schema:

```yaml
Article:
  title: Cows lose their jobs as milk prices drop
  content: As his 100 diary cows lumberred over for their Monday...
```

which will be vectorized as:

```md
article, title, cows, lose, their,
jobs, as, milk, prices,drop, content,
as, his, diary, cows, lumberred,
over, for, their, monday
```

There are three ways how you can regulate the indexing.

**1. Index the Class**

You can disable indexing of the class name by adding `vectorizeClassName` to the class definition.

For example: to disable the indexing of the word "Article" (which is the class name) of the data object, you can set is like this:

```js
{
  "class": "Article",
  "vectorizeClassName": false,
  // etcetera
```

which will be vectorized as:

```md
title, cows, lose, their,
jobs, as, milk, prices,drop, content,
as, his, diary, cows, lumberred,
over, for, their, monday
```

**2. Indexing the property**

You can disable indexing of the class name by adding `vectorizePropertyName` to a property definition.

For example: to disable the indexing of the word "title" (which is the property name of the data object):

```js
{
  "class": "Article",
  "properties": [{
    "name": "title"
    "vectorizePropertyName": false
  // etcetera
```

which will be vectorized as:

```md
article, cows, lose, their,
jobs, as, milk, prices,drop, content,
as, his, diary, cows, lumberred,
over, for, their, monday
```

**3. Indexing the value**

You can disable indexing of a property value by adding `index` to a property definition.

For example: to disable the indexing of the values of "content":

```js
{
  "class": "Article",
  "properties": [{
    "name": "content"
    "index": false
  // etcetera
```

which will be vectorized as:

```md
article, title, cows, lose, their,
jobs, as, milk, prices, drop, content
```

## Get the Schema

The current schema can be viewed as follows:

```js
GET /v1/schema
```

A download of the schema can be used in the [weaviate-cli](/documentation/weaviate-cli/current/) client or [python client](../client-libs/python.html) library to import a schema.

## Delete a schema item

Deleting a schema class can be done by sending a DELETE request to `/v1/schema/{semantic kind}/{class name}` endpoint.

An example of deleting a schema class item of the semantic kind _Thing_ might look like this:

```JS
DELETE /v1/schema/things/Company
```

An example of deleting a schema class item of the semantic kind _Action_ might look like this:

```JS
DELETE /v1/schema/actions/Payment
```

## Add a property to a Schema item

Adding a schema can be done by POSTing a [property object](#property-object) to the `/v1/schema/{semantic kind}/{class name}/properties` endpoint.

An example of adding a schema item of the semantic kind _Thing_ might look like this:

```js
POST /v1/schema/things/Company/properties 

{
  "dataType": [
    "geoCoordinates"
  ],
  "name": "location",
  "keywords": [
    {
      "keyword": "geoLocation",
      "weight": 0.8
    }
  ],
  "description": "The location of the company"
}
```

An example of adding a schema item of the semantic kind _Action_ might look like this:

```js
POST /v1/schema/actions/Payment/properties

{
  "dataType": [
    "number"
  ],
  "name": "amount",
  "keywords": [
    {
      "keyword": "value",
      "weight": 0.8
    }
  ],
  "description": "The amount paid"
}
```

## Delete a property from a schema item

Deleting a schema property can be done by sending a DELETE request to `/v1/schema/{semantic kind}/{class name}/properties/{property name}` endpoint.

An example of deleting a property item of the semantic kind _Thing_ might look like this:

```js
DELETE /v1/schema/things/Company/properties/name
```

An example of deleting a property item of the semantic kind _Action_ might look like this:

```js
DELETE /v1/schema/actions/Payment/properties/transactionDate
```

## Full schema example

When using schema import tool like the [Weaviate CLI]() or the Weavite Console. You need to provide a complete schema that is generated by visiting the `/v1/schema` endpoint.

An example result ([online demo example](https://demo.dataset.playground.semi.technology/v1/schema)):

```json
{
    "actions": {
        "classes": [],
        "type": "action"
    },
    "things": {
        "classes": [
            {
                "class": "Publication",
                "description": "A publication with an online source",
                "properties": [
                    {
                        "cardinality": "atMostOne",
                        "dataType": [
                            "string"
                        ],
                        "description": "Name of the publication",
                        "name": "name"
                    },
                    {
                        "cardinality": "atMostOne",
                        "dataType": [
                            "geoCoordinates"
                        ],
                        "description": "Geo location of the HQ",
                        "name": "headquartersGeoLocation"
                    },
                    {
                        "cardinality": "many",
                        "dataType": [
                            "Article"
                        ],
                        "description": "The articles this publication has",
                        "name": "hasArticles"
                    }
                ]
            },
            {
                "class": "Author",
                "description": "Normalised types",
                "properties": [
                    {
                        "cardinality": "atMostOne",
                        "dataType": [
                            "string"
                        ],
                        "description": "Name of the author",
                        "name": "name"
                    },
                    {
                        "cardinality": "many",
                        "dataType": [
                            "Article"
                        ],
                        "description": "Articles this author wrote",
                        "name": "wroteArticles"
                    },
                    {
                        "cardinality": "many",
                        "dataType": [
                            "Publication"
                        ],
                        "description": "The publication this author writes for",
                        "name": "writesFor"
                    }
                ]
            },
            {
                "class": "Article",
                "description": "Normalised types",
                "properties": [
                    {
                        "cardinality": "atMostOne",
                        "dataType": [
                            "text"
                        ],
                        "description": "title of the article",
                        "name": "title"
                    },
                    {
                        "cardinality": "atMostOne",
                        "dataType": [
                            "string"
                        ],
                        "description": "url of the article",
                        "name": "url"
                    },
                    {
                        "cardinality": "atMostOne",
                        "dataType": [
                            "text"
                        ],
                        "description": "summary of the article",
                        "name": "summary"
                    },
                    {
                        "cardinality": "atMostOne",
                        "dataType": [
                            "date"
                        ],
                        "description": "date of publication of the article",
                        "name": "publicationDate"
                    },
                    {
                        "cardinality": "atMostOne",
                        "dataType": [
                            "int"
                        ],
                        "description": "Words in this article",
                        "name": "wordCount"
                    },
                    {
                        "cardinality": "many",
                        "dataType": [
                            "Author",
                            "Publication"
                        ],
                        "description": "authors this article has",
                        "name": "hasAuthors"
                    },
                    {
                        "cardinality": "atMostOne",
                        "dataType": [
                            "Publication"
                        ],
                        "description": "publication this article is in",
                        "name": "inPublication"
                    },
                    {
                        "cardinality": "atMostOne",
                        "dataType": [
                            "Category"
                        ],
                        "description": "category this article is of",
                        "name": "ofCategory"
                    },
                    {
                        "cardinality": "atMostOne",
                        "dataType": [
                            "boolean"
                        ],
                        "description": "whether the article is currently accessible through the url",
                        "name": "isAccessible"
                    }
                ]
            },
            {
                "class": "Category",
                "description": "Category an article is a type off",
                "properties": [
                    {
                        "cardinality": "atMostOne",
                        "dataType": [
                            "text"
                        ],
                        "description": "category name",
                        "name": "name"
                    }
                ]
            }
        ],
        "type": "thing"
    }
}
```

## More Resources

{% include support-links.html %}