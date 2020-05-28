---
layout: layout-documentation
product: weaviate
sub-menu: Transfer learning
product-order: 1
title: Custom embeddings
description: How to add custom synonyms to the contextionary.
tags: ['Contextionary', 'Synonyms']
menu-order: 3
open-graph-type: article
og-img: documentation.jpg
---

# Custom embeddings

{% include badges.html %}

## Index

- [Basics](#basics)
- [Introduction](#introduction)
- [Usage](#usage)
- [More resources](#more-resources)

## Basics

- Custom words or abbreviations (i.e., "concepts") can be added to Weaviate directly by extending the contextionary.
- [Transfer learning](https://en.wikipedia.org/wiki/Transfer_learning) allows you to extend Weaviate in real-time.
- A `POST` request to the RESTful endpoint `/c11y/extensions` is for extending the contextionary with custom concepts.
- a `GET` request to the RESTful endpoint `/c11y/concepts/{}` returns if a concept is part of the Contextionary. 

## Introduction

If you have a use case which contains particular words or abbreviations that Weaviate's contextionary does not know, you can use the "extensions" endpoint to teach Weaviate the concepts in real-time.

Note that you need to learn Weaviate the new concepts before adding data.

## Usage

An example of using the `/v1/c11y/extensions` endpoint to add or overwrite concepts:

```js
POST /v1/c11y/extensions

{
  "concept": "buried lede",
  "definition": "The central element of an article mistakenly appearing deep in the text",
  "weight": 1
}
```

You can always check if a concept exists in the Contextionary:

```js
GET /v1/c11y/concepts/{concept}
```

For example: 
```bash
curl http://localhost:8080/v1/c11y/concepts/buriedLede
```

## More Resources

{% include support-links.html %}