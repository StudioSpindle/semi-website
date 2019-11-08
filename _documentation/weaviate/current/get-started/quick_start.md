---
layout: layout-documentation
bodyclass: ["page--guides", " "]
product: weaviate
sub-menu: Get started
product-order: 1
title: Quick start
description: Getting started with Weaviate
tags: ['introduction', 'Weaviate', 'Contextionary']
menu-order: 1
open-graph-type: article
og-img: documentation.jpg
---

# Quick start quide

{% include badges.html %}

This quick start guide will give you a 10-minute tour of Weaviate. In it you will;
- Set up your Weaviate through the managed cluster service or Docker.
- Add a simple dataset with news articles.
- Browse through the dataset with the Weaviate Playground.

## Index

- [Video tutorial](#video-tutorial)
- [Run Weaviate with a demo dataset](#run-weaviate-with-a-demo-dataset)
  - [Weaviate Cluster Service (WCS)](#)
  - [Docker compose](#docker-compose)
- [Validate via the RESTful API](#validate-via-the-restful-api)
- [Query the dataset with GraphQL](#query-the-dataset-with-graphql)
- [Next steps](#next-steps)
- [FAQ](#frequently-asked-questions)

## Video tutorial

This guide in video format.

<p><iframe width="560" height="315" src="https://www.youtube.com/embed/S7SLep244ss" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>

## Run Weaviate with a demo dataset

There are many different ways how you can run Weaviate, from local development setups up to large scale Kubernetes environments or hosted and managed Weaviate clusters. For this quick start guide you can choose between;

- Using the Weaviate Cluster Service (WPC) where you can create a free cluster that contains the demo dataset. Or;
- Using the Docker compose setup where you can run Weaviate on your local machine to which we will add the demo dataset.

### Weaviate Cluster Service (WCS)

The quickest way to get started is using the Weaviate Cluster Service (WPC).

Take the following steps;

0. Go to the WPC beta page [here](/weaviate-cluster/).
0. Fill in your details and **make sure to select the Newspublications demo dataset**.
0. Collect your Weaviate URL on the SeMI network that looks something like https://xxxx.semi.network

If the import is finished, you are all set for the [next step](#query-the-dataset-with-graphql).

### Docker compose

If you want to run Weaviate on a location of your choice, you can use Docker-compose. 

Take the following steps;

0. Follow the three installation steps outlined [here](open_datasets.html#weaviate-with-an-english-contextionary). **Make sure that you install Weaviate with the English contextionary.**
0. Because you are using the Docker compose setup, you need to define the `WEAVIATE_HOST` and `WEAVIATE_NETWORK` variables. You can learn how to do this [here](open_datasets.html#running-on-the-localhost).
0. You can now add the demo dataset by running the docker command mentioned [here](open_datasets.html#news-publications). Make sure you use the command that consumes both the  `WEAVIATE_HOST` and `WEAVIATE_NETWORK` variables.

If the import is finished, you are all set for the [next step](#query-the-dataset-with-graphql).

## Validate via the RESTful API

You will always use Weaviate via its HTTP API interface. The interface consists of two different interfaces;
The RESTful API, which is mostly used to add and manipulate data.
The GraphQL API (which also runs over HTTP) to query data.

We will first check if Weaviate runs correctly, if the schema is added successfully, and if the data is available. You will do the via three HTTP API calls. You can run these calls via the command line with [jq](https://stedolan.github.io/jq/), in your browser, a HTTP-API tool like [Postman](https://www.getpostman.com/) or in your code.

In the example below, we will show you how to do it from the command line with jq.

First, we want to check if Weaviate is running correctly by inspecting the `/v1/meta` endpoint.

_Note: make sure to replace `{WEAVIATE}` with the location of your Weaviate._

```bash
$ curl -s http://{WEAVIATE}/v1/meta | jq .
```

The output will look something like this:

```json
{
  "contextionaryVersion": "en0.8.0-v0.3.3",
  "contextionaryWordCount": 211170,
  "hostname": "http://[::]:8080",
  "version": "{{ site.weaviate_version }}"
}
```

This validates that your Weaviate is running correctly.

Next, we want to check if the news publication schema was added correctly, we can do this by inspecting the `/v1/schema` endpoint.

```bash
$ curl -s http://{WEAVIATE}/v1/schema | jq .
```

The output will look something like this but significantly longer:

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
            "cardinality": "many",
            "dataType": [
              "Article"
            ],
            "description": "The articles this publication has",
            "name": "hasArticles"
          }
        ]
      }
    ]
  }
}
```

You should be able to identify three classes; `Publication`, `Author` and, `Article`.

Lastly, we will validate if all data was added correctly, we will do this via the `/v1/things` endpoint.

```bash
$ curl -s http://{WEAVIATE}/v1/things | jq .
```

The output will look something like this but significantly longer:

```json
{
    "things": [
        {
            "class": "Article",
            "creationTimeUnix": 1573143373633,
            "id": "02c4dc2b-6941-3a77-a54d-5f51a1926d22",
            "lastUpdateTimeUnix": 1573143373633,
            "schema": {
                "hasAuthors": [
                    {
                        "beacon": "weaviate://localhost/things/75479bb9-5871-3395-b49d-eb6037fb8082"
                    },
                    {
                        "beacon": "weaviate://localhost/things/dedd462a-23c8-32d0-9412-6fcf9c1e8149"
                    }
                ],
                "inPublication": [
                    {
                        "beacon": "weaviate://localhost/things/7e9b9ffe-e645-302d-9d94-517670623b35"
                    }
                ],
                "summary": "The result is a movie of a cynicism so vast and pervasive as to render the viewing experience even emptier than its slapdash aesthetic does. In between these two events, Arthur is seated on a city bus that’s crowded with passengers. In “Joker,” Arthur is quickly seen to be mentally ill, and he knows it—he takes seven medications and wants more. “Joker” is a wannabe movie that also wants to be all things to all viewers, that imitates the notion of adding substance while only subtracting it. “Joker” is a viewing experience of a rare, numbing emptiness.",
                "title": "“Joker” Is a Viewing Experience of Rare, Numbing Emptiness",
                "url": "https://www.newyorker.com/culture/the-front-row/joker-is-a-viewing-experience-of-rare-numbing-emptiness",
                "wordCount": 1794
            }
        }
    ]
}
```

## Query the dataset with GraphQL

...

## Next steps

...

## Frequently Asked Questions

{% include support-links.html %}