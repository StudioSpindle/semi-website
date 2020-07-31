---
layout: layout-documentation
product: weaviate
sub-menu: Add data
product-order: 1
title: Batching
intro: Add many data objects with one API call.
description: How to add large datasets.
tags: ['Batching']
menu-order: 3
open-graph-type: article
og-img: documentation.jpg
toc: true
---

## Basics

- For larger datasets you can use batching to quickly import a lot of data.
- A batch can contain (whichever limit hits first):
  - Up to 1000 objects. Or
  - Max 1 MB

## Introduction

For larger datasets you can use batching to quickly import a lot of data. The concept is similar to adding individual objects, but with batching they will be added as an array.

## RESTful API

A bulk of objects can be added to Weaviate by using a batch POST. A seperate request should be done for the semantic kinds (`Things` or `Actions`). The definitions of the data objects is similar to adding [single data objects](./add_and_modify.html#add-a-data-object).

### Add Things

Example based on _things_:

```bash
POST /v1/batching/things 

{
  "fields": [
    "ALL"
  ],
  "things": [
    {
      "class": "Publication",
      "schema": {
        "name": "Wired Magazine"
      },
      "id": "0a85f1db-fbf3-4343-b45b-25c794c5419d"
    },
    {
      "class": "Publication",
      "schema": {
        "name": "New Yorker"
      },
      "id": "b0c18f80-d7c1-44bf-a745-14b9df5b1055"
    }
  ]
}
```

### Add Actions

Example based on _actions_:

```bash
POST /v1/batching/actions 

{
  "fields": [
    "ALL"
  ],
  "actions": [
    {
      "class": "Buy",
      "schema": {
        // data object
      },
    },
    {
      "class": "Buy",
      "schema": 
        // data object
      },
    }
  ]
}
```

### Add references

Batching references can be set in the following way:

- `from` = `weaviate://{peerName}/{semanticKind}/{nameOfClass}/{UUID}/{property}`
  - `peerName` = name of the Weaviate instance, often localhost.
  - `semanticKind` = Thing or Action.
  - `nameOfClass` = name of the class of the Thing or Action.
  - `UUID` = the UUID of the entity the references should be added to.
  - `property` = the property that should contain the link.
- `to` = `weaviate://{peerName}/{semanticKind}/{UUID}/`
  - `UUID` = the UUID of the entity the references should be added to.

Example:

```bash
POST /batching/references

[
  {
    "from": "weaviate://localhost/things/Buy/a5d09582-4239-4702-81c9-92a6e0122bb4/products",
    "to": "weaviate://localhost/things/97525810-a9a5-4eb0-858a-71449aeb007f"
  }
]
```

## More Resources

{% include support-links.html %}