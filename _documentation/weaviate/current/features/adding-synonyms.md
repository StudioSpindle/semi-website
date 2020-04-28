---
layout: layout-documentation
product: weaviate
sub-menu: Features
product-order: 1
title: Adding synonyms
description: How to add custom synonyms to the contextionary.
tags: ['Contextionary', 'Synonyms']
menu-order: 3
open-graph-type: article
og-img: documentation.jpg
---

# Adding Synonyms Guide

{% include badges.html %}

## Index

- [Basics](#basics)
- [Introduction](#introduction)
- [Usage](#usage)
- [More resources](#more-resources)

## Basics

- Concepts in the Contextionary can be overwritten and new concepts can be added to the Contextionary.
- A `POST` request to the RESTful endpoint `/c11y/extensions` is for extending the contextionary with custom concepts.
- a `GET` request to the RESTful endpoint `/c11y/concepts/{}` returns if a concept is part of the Contextionary. 

## Introduction

Concepts in the Contextionary can be overwritten and new concepts can be added to the Contextionary. 

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