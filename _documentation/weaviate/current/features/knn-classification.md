---
layout: layout-documentation
product: weaviate
sub-menu: Features
product-order: 1
title: KNN Classification
description: How to perform KNN classification for properties of data objects.
tags: ['KNN Classification', 'Data', 'Modify']
menu-order: 2
open-graph-type: article
og-img: documentation.jpg
---

# KNN Classification Guide

{% include badges.html %}

Perform [k-nearest neighbors](https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm) classifications through the RESTapi to enhance your dataset. 

## Index

- [Basics](#basics)
- [Introduction](#introduction)
    - [Requirements](#requirements)
- [How to use](#how-to-use)
    - [Start a Classification](#start-a-classification)
    - [See the Status of a Classification](#see-the-status-of-a-classification)
    - [Get Classification Meta Information of Data Objects](#get-classification-meta-information-of-data-objects)
- [Example](#example)
- [Tips and Best Practices](#tips-and-best-practices)
    - [Training Data](#training-data)
    - [Optimal Value for kNN](#optimal-value-for-knn)
- [More resources](#more-resources)

## Basics

- Reference properties of data objects can be classified with a kNN approach.
- Use the RESTful api queries `v1/classification/` for classification.
- Classification meta information of data objects can be requested by setting `?meta=true` in `GET /things/{kinds}/{id}` requests for things and actions.

## Introduction

Weaviate's classification features allows you to classify data objects. Cross-references will be predicted, after a model has been trained on your own data with existing references. You need to have at least two schema classes and one cross-reference between both classes in your schema. This is done kNN-based.

### Requirements

- A schema with at least two classes and a cross-reference between both classes.
- Some training data, which are data objects in the class with a reference (you want to predict for other objects) to another class already made.

## How to use

Classification can be performed via the `v1/classification/` endpoint on the RESTful API. There are two operations possible. To start a classification job, send a `POST` request to `v1/classification/`. To view previously created classifications, send a `GET` request to `v1/classification/{classificationId}`.

### Start a Classification

To start a classification, send a `POST` request to `v1/classification/` with the following body:

```js
POST /v1/classifications

{
  "class": "className",
  "classifyProperties": ["<property1>", "<property2>"],
  "basedOnProperties": ["<property3>"],
  "type": "knn", // optional, default is knn
  "k": 3 // optional, default to 3
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
    "completed": "<timestamp>" || null,
    "count": 147,
    "countSucceeded": 140,
    "countFailed": 7
  },
  "type": "knn",
  "k": 3
}
```

### See the Status of a Classification

The ID returned in the POST request can be used to request information about the classification process, by performing a `GET` on `v1/classification/{classificationId}`. A similar result as above will be returned, containing information about the classification. The status of the classification van 

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
    "completed": "<timestamp>" || null,
    "count": 147,
    "countSucceeded": 140,
    "countFailed": 7
  },
  "type": "knn",
  "k": 3
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
              "distanceWinning": float,
              "distanceLosing": float,
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

When a property value of a reference property is filled by classification, then `classification` information will appear in the `meta` field of this property. It contains information about `distanceWinning` and `distanceLosing`, which gives information about how the reference has been classified. The float numbers are a normalized distance (between 0 and 1), where 0 means equal and 1 would mean a perfect opposite. In kNN classification, the classification decision is based on vectors of the classes around a guessed vector. 

For example, if the kNN is set to 3, the closest 3 objects to the computed vector are taken into consideration. Let's say these 3 objects are of 2 different classes, then we classify the data object as the class of the majority. These two objects are "winning", and the other 1 object is "losing" in the classification. The distance of the winning data objects to the computed vector of the 'to be classified' data object is averaged and normalized. The same will be done to the losing data objects (in this case only 1). 

`distanceWinning` and `distanceLosing` are a good indicators if you set the amount of k nearest neighbours right. For example if the `distanceLosing` is way smaller than the `distanceWinning`, than the set k values was too high because many their where many classifications to the same, but far group, and only one or a few classifications to a near group. Less abstract, this means that the 'to be classified' property is classified as a class that many other -not so similar- data objects have (winning but far away), and not as class of, losing, more similar data objects because they were in minority. In this case, the kNN was perhaps set too high, and a lower amount of kNN might lead to better classification.

Then, additional meta information about the classication of this data object is shown in the last `meta` field on a higher level.

## Example

To explain how to use the API calls to perform classification less abstract, let's go into an example. Let's say we want to classify in which Country Companies are based in, using the schema of previous examples in the documentation. We have the following information:
- A schema class `Country`, with a property `name`.
- A schema class `Company`, with at least the properties `name` and `description`, and `inCountry` which refers to `Country`. (`Company(name, description) --> inCountry --> Country(name)`).
- Data objects of the class `Country(name)`. For example `Country` objects `name: Netherlands`, `name: England` and `name: Finland`.
- Data objects of the class `Company`, with the reference property `inCountry` filled with a beacon referring to data objects of the class `Country`. For example `name: NPO, description: national broadcasting company in the Netherlands, inCountry: reference to beacon of class Netherlands`, and `name: BBC, description: broadcasting company in England, inCountry: reference to beacon of class England`
- Data objects of the class `Company`, with the reference property `inCountry` not filled yet. For example `name: YLE, description: Finnish broadcasting company.`

We can now send `POST` request with the following body to `/v1/classification`:

```json
{
  "class": "Country",
  "classifyProperties": ["inCountry"],
  "basedOnProperties": ["description"],
  "type": "knn",
  "k": 3
}
```

which will return the following `meta` information:

```json
{
  "id": "ee722219-b8ec-4db1-8f8d-5150bb1a9e0c",
  "class": "Company",
  "classifyProperties": [
    "inCountry"
  ],
  "basedOnProperties": [
    "description"
  ],
  "status": "running",
  "meta": {
    "started": "2017-07-21T17:32:28Z",
    "completed": null,
    "count": 147,
    "countSucceeded": 140,
    "countFailed": 7
  },
  "type": "knn",
  "k": 3
}
```

If we later check the status by performing a GET request to `v1/classification/ee722219-b8ec-4db1-8f8d-5150bb1a9e0c`, we will get the following information if the classification has finished.

```json
{
  "id": "ee722219-b8ec-4db1-8f8d-5150bb1a9e0c",
  "class": "Company",
  "classifyProperties": [
    "inCountry"
  ],
  "basedOnProperties": [
    "description"
  ],
  "status": "completed",
  "meta": {
    "started": "2017-07-21T17:32:28Z",
    "completed": "2017-07-21T17:56:23Z",
    "count": 304,
    "countSucceeded": 296,
    "countFailed": 8
  },
  "type": "knn",
  "k": 3
}
```

If we later want to know to which `Country` the `Company(name:YLE)` refers to, we can send the following `GET` request to `/v1/things/c370fd85-c2d8-4321-80c4-ae6744abe671/?meta=true`, which will return:

```json
{
  "class": "Company",
  "id": "c370fd85-c2d8-4321-80c4-ae6744abe671",
  "schema": {
    "name": "YLE",
    "description": "Finnish broadcasting company.",
    "inCountry": [
      {
         "beacon": "<beaconToCountryWithNameFinland>",
         "meta": {
            "classification": {
              "distanceWinning": 0.5,
              "distanceLosing": 0.6,
            },
          }
      }
    ]
  },
  "meta": {
    "classification": {
      "id": "ee722219-b8ec-4db1-8f8d-5150bb1a9e0c",
      "completed": "2017-07-21T17:56:23Z",
      "classifiedFields": ["inCountry"],
      "scope": ["inCountry"],
      "basedOn": ["name", "description"]
    }
  }
}
```

## Tips and Best Practices

### Training Data

- The more training data, the higher the performance of the classification. There is no rule for a minimum amount of training data, but the more the better (and more computationally intensive). The amount of training data can roughly be chosen by the amount of features `n`, using the formula: `1e[1, 2]+n`.
- In addition, the training data should be representative for the data to be classified. The model should have relevant information to learn from. For example, it is hard to classify data for persons of age 60-70 when all persons in the training data are 18-25 years old.

### Optimal Value for kNN

There is no one optimal value for kNN. The optimal value is different for every classification problem, and depends on a lot of factors. There are however some tips to find a good k value:
- Large `k` values will result in classification to the most probably class around in a large space, which also makes it more computationally intensive.
- Small `k` values will result in a more unstable classification. Small changes in the training set and noise will result in large changes in classification.
- `k` is usually chosen not too high. This depends also on the amount of classes. A good start is taking `k` between 3 and 7 (3 <= k <=7). 
- Check the `distanceWinning` and `distanceLosing` values of individual classified data objects. If `distanceWinning` is way larger than `distanceLosing`, then the `k` could be set too high. `k` can be optimized just like every other hyper parameter in other ML-algorithms just by plotting the overall validation error against k.

## More Resources

{% include support-links.html %}