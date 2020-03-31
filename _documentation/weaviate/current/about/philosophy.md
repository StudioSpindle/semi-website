---
layout: layout-documentation
bodyclass: ["page--guides", " "]
product: weaviate
sub-menu: About
product-order: 1
title: Philosophy
description: Learn more about the philosophy behind Weaviate.
tags: ['introduction', 'Weaviate', 'Contextionary', 'Philosohpy']
menu-order: 1
open-graph-type: article
og-img: documentation.jpg
---

# Philosophy behind Weaviate

{% include badges.html %}

Weaviate is an open-source, GraphQL and RESTful API-enabled, smart graph based on a word vector storage mechanism called the Contextionary.

## Index

- [Video tutorial](#video-tutorial)
- [Why Weaviate?](#why-weaviate)
- [Features](#features)
  - [Core features](#core-features)
  - [Additional features](#additional-features)
- [Basic Terminology](#basic-terminology)
- [Contextionary](#about-the-contextionary)
- [About Classification](#about-classification)
- [About Weaviate Knowledge Networks](#about-weaviate-knowledge-networks)
- [Miscellaneous](#miscellaneous)
- [More resources](#more-resources)

## Demo and Overview

Concept and demo presented at FOSDEM 2020;

<p><iframe width="560" height="315" src="https://www.youtube.com/embed/3NfcAF4qm2k" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>

## Why Weaviate?

> We aim to allow anyone, anywhere, any time to create their own smart graph or knowledge network.

In almost any situation where you work with data, you store information related to something in the real world. This can be data about transactions, cars, airplanes, products; you name it. The challenge with current databases is that it is difficult for the software to grasp the context of the entity you refer to in your datasets. Do the characters "Apple" refer to the company or the fruit?

![real world entities](/img/guides/entities.jpg "real world entities")

The Weaviate smart graph aims to solve this problem. Every time you store data to the smart graph, Weaviate indexes the data based on the linguistical context through a feature called The Contextionary. For example, when you store data about a _Company called Apple_, Weaviate automatically contextualizes the data related to an iPhone.

If you want to learn how the Contextionary does this, you can read more about our [Contextionary](#about-the-contextionary) here. We don't just want to store the data, but also the information and its context so that **knowledge** can be derived from it.

Because most data is related to something (e.g., Amsterdam _is the capital of_ The Netherlands) we store not only the concept itself but also the relation to other concepts (e.g., "the city Amsterdam" to "the country The Netherlands"). This means that the data you add to a Weaviate instance creates a network of knowledge, better known as a **graph**.

![why Weaviate is a smart graph](/img/guides/knowledge-graph.jpg "why Weaviate is a smart graph")

## Features

Weaviate has four core features and a variety of additional features.

### Core features

Weaviate consists of four core features;

![weaviate smart graph USPs](/img/guides/USPs.png "weaviate smart graph USPs")

1. The contextionary (c11y) is a vector index which stores _all_ data object based on their semantic meaning. This allows users to now only directly search and retrieve data, but also to search for its concepts.
2. We believe that [GraphQL](https://graphql.org/) combined with a RESTful API, provides the best user experience to query Weaviate.
3. Weaviate can automatically build its own graph relations through conceptual classification.
4. With Weaviate you can create a semantic Knowledge Network based on a P2P network of Weaviates.

### Additional features

- Weaviate is completely containerized with Docker and Kubernetes.
- Weaviate scales to support super-large graph sizes.
- Fast vector space querying.

## Basic Terminology

| Terminology | Description |
| --- | --- |
| **Schema** | In Weaviate, a schema is used to define the types of data you will be adding and querying. You can learn more about it [here](../add-data/define_schema.html). |
| **Semantic Kinds** | Because of Weaviates semantic nature, we make a distinction in _semantic kinds_. Weaviate distinct two different kinds: *Things* and *Actions*. When creating a Weaviate Schema, you need to explain what Semantic Kind a data object entails. |
| **Thing** | A thing is a **semantic kind**, referring to an object (e.g., car, rocketship, product). The easiest way to think about Things is in the form of nouns. |
| **Action** | An action is a **semantic kind**, referring to an action (e.g., walking, dancing, buying). The easiest way to think about Things is in the form of verbs. |
| **Class** | A class is a definition of a semantic kind. E.g., the Class Company or the Class Move. In Weaviate, classes can be recognized because they always have a capitalized first character. You can set as many classes with a naming you choose. |
| **Property** | All classes have properties. E.g., the class Company might have the property _name_. In Weaviate, properties can be recognized because they always have a lowercase first character. |
| **Entity** | An entity refers to something -often- in the world around us. E.g., _a Company with the name Apple_ refers to an entity with a relation to _a Product with the name iPhone_. Weaviate's Contextionary tries to find as many entities in your data as possible. |
| **Concept** | Concepts are related to entities. Often you will use concepts to search in your datasets. If your dataset has data about _An Actor with the name Arnold Schwarzenegger_ and _an Actor with the name Al Pacino_, the concepts _Movie_ and _Terminator_ will find a closer relation to the first actor rather than the latter. |
| **Beacon** | A beacon is a reference to a particular data object in Weaviate or inside the knowledge network, this data object in turn has a position in the contextionary. Often defined as follows: `weaviate://{peerName}/{semanticKind}/{UUID}`
| **Knowledge Network** | A peer to peer (P2P) network of Weaviates |
| **Fuzzy** | Opposed to most other data solutions, Weaviate uses [fuzzy logic](https://en.wikipedia.org/wiki/Fuzzy_logic) to interpret a query. The upside of this is that it might find answers to queries where a traditional data solution migth not. |
| **C11y** | Abbreviation of Contextionary. |
| **Weaviate Cluster** | A managed Weaviate cluster |
| **Weaviate Cluster Service (WCS)** | A managed services that hosts Weaviate clusters on the SeMI Network |
| **Weaviate Knowledge Network (WKN)** | A network of Weaviates |

## About the Contextionary

The Contextionary (derived from **dictionary**, aka `C11Y`) gives context to the language used in your dataset (there is an individual Contextionary per language). At the root, the Contextionary is based on the [*Global Vectors for Word Representation*](https://nlp.stanford.edu/projects/glove/) concept. When running a Weaviate instance, it comes with an out of the box Contextionary which is trained on Wikipedia and the Wiktionary. In principle, you never have to create a manual Contextionary. We aim to make the C11Y available for use cases in any domain, regardless if they are business-related, academic or other.

The Contextionary doesn't use a traditional storage and indexing mechanism, but it uses vector positions to place data into a 600-dimensional space. When you run a Weaviate, it comes with a pre-trained Contextionary (you never have to do any training yourself) that contains the contextual representation that allows Weaviate to store data based on its contextual meaning.

An empty Weaviate could be envisioned like this:

![empty Weaviate](/img/guides/c11y-empty.jpg "empty Weaviate")

When using Weaviate's [RESTful API](../add-data/add_and_modify.html) to add data, the Contextionary calculates the position in the vector space that represents the real-world entity.

The process from a data object to a vector position is calculated based on the centroid of the words weighted by the occurrences of the individual words in the original training text-corpus (e.g., the word `the` is seen as less important than the word `apple`).

![how the Contextionary calculates a vector](/img/guides/object-to-vector.jpg "how the Contextionary calculates a vector")

When a new class object is created, it will be added to a Weaviate.

![Weaviate with data](/img/guides/c11y-with-data.jpg "Weaviate with data")

When using the [GraphQL interface](../query-data/get.html), you can target a thing or action directly, or by searching for a nearby concept. E.g., the `company Apple` from the previous illustration, can be found by searching for the concept `iphone`.

## About Classification

Because Weaviate converts all data objects in a vector position based on their semantic meaning, data object get a logical distance from each other. This allows for a variety of automated classification tasks Weaviate can perform in near-realtime.

### Example of a classification task

Inside the Weaviate below, there are three data objects stored, a country, and two cities.

![Weaviate with "Weaviate classification task, without relation](/img/guides/c11y-class1.jpg "Weaviate classification task, without relation")

The country has a property called `hasCapital` of which the reference is unset. We can now request Weaviate to connect the most likely candidate as the capital. Because Weaviate -through the schema- knows that the value of `hasCapital` must be a `City` it can choose from both Amsterdam and New York. Because of the semantic relation of Amsterdam to The Netherlands, a decision can be made.

![Weaviate with "Weaviate classification task, with relation](/img/guides/c11y-class2.jpg "Weaviate classification task, with relation")

When creating automatic classification tasks, the user is able to define how certain Weaviate needs to be of the connection. During querying, the user can see if the relation was made automatically or manually.

## About Weaviate Knowledge Networks

_Coming soon! Sign up for our [newsletter](/newsletter) to be informed about release dates._

Because Weaviate allows for fuzzy schema definitions (e.g., a "Company with the name Apple" is seen as semantically similar to a "Business with the identifier Apple Incorporated.") you can find beacons not only in your local Weaviate but also over a network of Weaviates. Allow creating a completely decentralized network of smart graphs, aka the knowledge network.

## Miscellaneous

- The Contextionary is limited to a single language per Weaviate instance (i.e., English Contextionary, Spanish Contextionary, etcetera).

## More Resources

{% include support-links.html %}