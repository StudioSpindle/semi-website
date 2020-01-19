---
layout: layout-documentation
product: weaviate
sub-menu: Datasets
product-order: 1
title: News publications
description: Datasets.
tags: ['Datasets', 'News publications', 'Help']
menu-order: 1
open-graph-type: article
og-img: documentation.jpg
---

# Dataset News Publications

{% include badges.html %}

This dataset contains +/- 1000 random news articles from; Financial Times, New York Times, Guardian, Wallstreet Journal, CNN, Fox News, The Economist, New Yorker, Wired, Vogue, Game Informer.

This dataset can be used to easily demo all Weaviate's features.

- [Run with the Weaviate Cluster Service](#run-with-the-weaviate-cluster-service)
- [Run with Docker Compose](#run-with-docker-compose)
- [Run manually with Docker](#run-manually-with-docker)

### Run with the Weaviate Cluster Service

The easiest way is to run this dataset is with the Weaviate Cluster service.

Click [here](/weaviate-cluster/) and select the "news publications" dataset.

### Run with Docker Compose

If you want to run this dataset locally, you can run it in one go with Docker Compose.

```bash
# download the config file
$ curl -O https://raw.githubusercontent.com/semi-technologies/DEMO-datasets/master/newspublications/config.yaml
# download the Docker Compose file
$ curl -O https://raw.githubusercontent.com/semi-technologies/DEMO-datasets/master/newspublications/docker-compose.yml
# Run docker
$ docker-compose up
```

Weaviate will be available and preloaded with the newsarticle demo dataset on:

- `http://localhost:8080/`
- [Via the Playground](http://playground.semi.technology/?weaviateUri=http%3A%2F%2Flocalhost%3A8080%2Fv1%2Fgraphql)

### Run manually with Docker

Usage with Docker on **external** host or localhost **without** Docker Compose;

```bash
# WEAVIATE HOST (e.g., https://foobar.semi.network), note paragraph basics for setting the local IP
$ export WEAVIATE_HOST=WEAVIATE HOST
# Make sure to replace YOUR_HOST with the Weaviate host as mentioned in the basics above
$ docker run -i -e weaviate_host=$WEAVIATE_HOST semitechnologies/weaviate-demo-newspublications:latest
```

Usage with Docker on **local** host **with** Docker Compose;

_Note: run this from the same directory where the Weaviate Docker-compose files are located_

{% raw %}
```bash
# WEAVIATE HOST (e.g., http://localhost:8080), note the paragraph "basics" for setting the local IP
$ export WEAVIATE_HOST="http://$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' ${PWD##*/}_weaviate_1):8080"
# WEAVIATE NETWORK (see paragraph: Running on the localhost)
$ export WEAVIATE_NETWORK=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.NetworkID}}{{end}}' ${PWD##*/}_weaviate_1)
# Run docker
$ docker run -i --network=$WEAVIATE_NETWORK -e weaviate_host=$WEAVIATE_HOST semitechnologies/weaviate-demo-newspublications:latest
```
{% endraw %}