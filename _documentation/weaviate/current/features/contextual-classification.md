---
layout: layout-documentation
product: weaviate
sub-menu: Features
product-order: 1
title: Contextual Classification
description: How to perform Contextual classification for properties of data objects.
tags: ['Contextual Classification', 'Data', 'Modify']
menu-order: 1
open-graph-type: article
og-img: documentation.jpg
---

# Contextual Classification Guide

{% include badges.html %}

Perform contextual classifications through the RESTapi to enhance your dataset. 

## Index

- [Basics](#basics)
- [Introduction](#introduction)
- [When to use](#when-to-use)
  - [Example use case](#example-use-case)
- [How to use](#how-to-use)
    - [Start a Classification](#start-a-classification)
    - [See the Status of a Classification](#see-the-status-of-a-classification)
    - [Get Classification Meta Information of Data Objects](#get-classification-meta-information-of-data-objects)
- [Example](#example)
- [More resources](#more-resources)

## Basics

- Reference properties of data objects can be classified with contextual classification.
- There is no training data in contextual classification.
- Use the RESTful api queries `v1/classifications` for classification.
- Classification meta information of data objects can be requested by setting `?meta=true` in `GET /things/{kinds}/{id}` requests for things and actions.
- No labeled data (training data) is needed

## Introduction

Weaviate's classification features allows you to classify data objects by predicting cross-references based on the semantic meaning of the data objects. Make sure to check the "[when to use](#when-to-use)" section on this page or check out the [other](knn-classification.html) algorithm.

## When to use

If you don't have any training data and want to classify how similar a source item is to a potential target item, contextual classification is the right pick. Especially when there is a strong semantic relation in your data (e.g., `The Landmark Eifel Tower` and `The City Paris`)

### Example use case

Imagine you have a dataset comprised of Magazine Articles (sources). You don’t know what each article is about, but you know that each article falls into one of three categories (targets): “politics,” “fashion,” or “technology.” There are no additional business rules involved, and you don’t have any training data. This is a good fit for a “contextual” classification. In such a classification, each Article will be analyzed, and the most important words will be extracted. These words are then compared - using their vector space distance - to one of the three targets. For example, in an article about “technology,” Weaviate has found the words “computer, “macintosh,” and “hardware” to be the most important words. These three words are closer in the vector space to “technology” than they are to “fashion” or “politics.” Weaviate will thus put them in the “technology” category. Each article is treated independently. How many articles have already been categorized into a specific category does not influence future articles.

## How to use

Classification can be performed via the `v1/classifications` endpoint on the RESTful API. There are two operations possible. To start a classification job, send a `POST` request to `v1/classifications`, and specify the `type` of the classification to `contextual` in the body (see below). The field `basedOnProperties` currently accepts only one property of the class, but all other properties of the class are also taken into account, since the vector representation of the whole object in the class is taken. The field property must be of the datatype `text`. 
To view previously created classifications, send a `GET` request to `v1/classifications/{classificationId}`.

### Start a Classification

To start a classification, send a `POST` request to `v1/classifications/` with the following body:

```js
POST /v1/classifications

{
  "class": "className",
  "classifyProperties": ["<property1>", "<property2>"],
  "basedOnProperties": ["<property3>"],  // This field must be specified, but the current implementation takes the whole vector of the class (objects) into account
  "type": "contextual"
}

// returns GET response + Header 'Location: /v1/classifications/<classificationId>'
```

Which returns a body like the following if the classification was successfully started:

```json
{
  "id": "<classificationId>",
  "class": "<className>",
  "classifyProperties": [
    "<property1>", "<property3>"
  ],
  "basedOnProperties": [
    "<property3>"
  ],
  "status": "running",
  "meta": {
    "started": "<timestamp>",
    "completed": "<timestamp>"
  },
  "type": "contextual"
}
```

### See the Status of a Classification

The ID returned in the POST request can be used to request information about the classification process, by performing a `GET` on `v1/classifications/{classificationId}`. A similar result as above will be returned, containing information about the classification. The status of the classification van 

```json
GET /v1/classifications/<classificationID>

{
  "id": "<classificationId>",
  "class": "<className>",
  "classifyProperties": [
    "<property1>", "<property3>"
  ],
  "basedOnProperties": [
    "<property3>"
  ],
  "status": "running",
  "meta": {
    "started": "<timestamp>",
    "completed": "<timestamp>",
    "count": 147,
    "countSucceeded": 140,
    "countFailed": 7
  },
  "type": "contextual"
}
```

### Get Classification Meta Information of Data Objects 

After the classification is completed, the concerning reference properties data objects in the Weaviate instance are updated according to the classification. These data objects will be represented similarly to other data objects. When you perform a `GET` request to a specific `Thing` or `Action`, no additional information about classifiction will be shown, unless you specifically add a parameter `meta=true` to the request:
 
```json
GET /v1/things/<id>/?meta=true

{
  "class": "<className>",
  "id": "<uuid>",
  "schema": {
    "<property1>": [
      {
         "beacon": "...",
         "meta": null  <----- indicates this has not been classified, but set by a user
      }
    ],
    "<property2>": [
      {
         "beacon": "...",
         "meta": {
            "classification": {
              "winningDistance": float
            },
          },
      }
    ],
    "<property3>": [
      {
         "beacon": "...",
         "meta": null  <----- indicates this has not been classified, but set by a user
      }
    ],
  },
  "meta": {
    "classification": {
      "id": "<classificationId>",
      "completed": "<timestamp>",
      "classifiedFields": ["<property2>"],
      "scope": ["<property1>", "<property2>"]  <----- note that the scope was to classify both fields, but since the user had already set <property1> the actual classified Fields (see one row up) is only a single field (<property2>),
      "basedOn": ["<property3>"],
    }
  }
}
```

This returned information does not only show the values of the properties of the requested `Thing`, but also `meta` information about how the property values are obtained. If a property value is obtained by user input, not by classification, then the `meta` fields in the property schema will be `null`. This is the case for `<property1>` and `<property3>`. 

When a property value of a reference property is filled by classification, then `classification` information will appear in the `meta` field of this property. It contains information about `distanceWinning`, which gives information about how the reference has been classified. The float number are a normalized distance (between 0 and 1), where 0 means equal and 1 would mean a perfect opposite.

Then, additional meta information about the classication of this data object is shown in the last `meta` field on a higher level.

## Example

To explain how to use the API calls to perform classification less abstract, let's go into an example. Let's say we want to classify to which Category Articles belong to, using the schema of previous examples in the documentation. We have the following information:
- A schema class `Category`, with a property `name`.
- A schema class `Article`, with at least the properties `summary` and `ofCategory` which refers to `Category`. (`Article(summary) --> ofCategory --> Category(name)`).
- Data objects of the class `Category`, with the `name` property filled.
- Data objects of the class `Article`, with the reference property `ofCategory` not filled yet.

We can now send `POST` request with the following body to `/v1/classifications`:

```json
{
  "class": "Article",
  "classifyProperties": ["ofCategory"],
  "basedOnProperties": ["summary"],
  "type": "contextual"
}
```

which will return the following `meta` information:

```json
{
    "basedOnProperties": [
        "summary"
    ],
    "class": "Article",
    "classifyProperties": [
        "ofCategory"
    ],
    "id": "853c5eb4-6785-4a95-9a30-9cc70ea21fd8",
    "meta": {
        "completed": null,
        "started": "20-01-26T13:25:32.427Z"
    },
    "status": "running",
    "type": "contextual"
}
```

If we later check the status by performing a GET request to `v1/classifications/853c5eb4-6785-4a95-9a30-9cc70ea21fd8`, we will get the following information if the classification has finished.

```json
{
    "basedOnProperties": [
        "summary"
    ],
    "class": "Article",
    "classifyProperties": [
        "ofCategory"
    ],
    "id": "853c5eb4-6785-4a95-9a30-9cc70ea21fd8",
    "meta": {
        "completed": "2020-01-26T13:26:20.453Z",
        "count": 1310,
        "countSucceeded": 1310,
        "started": "2020-01-26T13:25:32.427Z"
    },
    "status": "completed",
    "type": "contextual"
}
```

If we later want to know to which `Category` the `Article` refers to, we can send the following `GET` request to `/v1/things/c370fd85-c2d8-4321-80c4-ae6744abe671/?meta=true`, which will return:

```json
{
    "class": "Article",
    "creationTimeUnix": 1580044437155,
    "id": "c9094d69-d45b-3508-85e5-23445cfb5f9f",
    "meta": {
        "classification": {
            "basedOn": null,
            "classifiedFields": [
                "ofCategory"
            ],
            "completed": "2020-01-26T13:25:34.230Z",
            "id": "853c5eb4-6785-4a95-9a30-9cc70ea21fd8",
            "scope": [
                "ofCategory"
            ]
        }
    },
    "schema": {
        "hasAuthors": [
            {
                "beacon": "weaviate://localhost/things/18c65463-f425-3bd3-9d8d-548208966f9b"
            },
            {
                "beacon": "weaviate://localhost/things/b451a0af-4b28-35e0-808a-de7784fbece8"
            },
            {
                "beacon": "weaviate://localhost/things/16476dca-59ce-395e-b896-050080120cd4"
            }
        ],
        "inPublication": [
            {
                "beacon": "weaviate://localhost/things/16476dca-59ce-395e-b896-050080120cd4"
            }
        ],
        "ofCategory": [
            {
                "beacon": "weaviate://localhost/things/8fe49280-5d2e-3d73-9b0f-7b76e2f23c65",
                "meta": {
                    "classification": {
                        "winningDistance": 0.20993641018867493
                    }
                }
            }
        ],
        "summary": "A New Mexico state senator was reportedly convicted on misdemeanor aggravated drunken driving and reckless driving charges Tuesday -- nearly six months after he rear-ended a driver stopped at a red light in the state. Third, the consequences,” Mark Probasco, a special prosecutor with the state attorney general’s office said, according to The Journal. — Mark Probasco, special prosecutor with New Mexico state attorney general’s officeMartinez originally told officers he had only “a beer or two,” but later admitted he had multiple glasses of wine. The officer who arrested Martinez said the senator was slurring his speech and had alcohol on his breath. CLICK HERE TO GET THE FOX NEWS APPA former Republican state senator in New Mexico was defeated last year after she was convicted for DUI in 2018, The Journal reported.",
        "title": "New Mexico Democrat's DUI conviction could cost him panel chairmanship, state party leaders warn",
        "url": "https://www.foxnews.com/politics/new-mexico-democratic-state-senator-convicted-of-dui-reckless-driving-in-june-crash",
        "wordCount": 377
    }
}
```

## More Resources

{% include support-links.html %}