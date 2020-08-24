---
layout: layout-documentation
solution: weaviate
sub-menu: Datasets
solution-order: 1
title: News publications
intro: This dataset contains +/- 1000 random news articles from; Financial Times, New York Times, Guardian, Wallstreet Journal, CNN, Fox News, The Economist, New Yorker, Wired, Vogue, Game Informer.
description: Weaviate dataset with news publications.
tags: ['Datasets', 'News publications', 'Help']
menu-order: 1
open-graph-type: article
og-img: documentation.jpg
toc: true
---

### Run with Docker Compose

If you want to run this dataset locally, you can run it in one go with Docker Compose.

The Docker Compose files below contain both Weaviate and the dataset.

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

### Run manually

If you have your own version of Weaviate running on an **external** host or localhost **without** Docker Compose;

```bash
# WEAVIATE ORIGIN (e.g., https://foobar.semi.network), note paragraph basics for setting the local IP
$ export WEAVIATE_ORIGIN=WEAVIATE_ORIGIN
# Make sure to replace WEAVIATE_ORIGIN with the Weaviate origin as mentioned in the basics above
$ docker run -i -e weaviate_host=$WEAVIATE_ORIGIN semitechnologies/weaviate-demo-newspublications:latest
```

Usage with Docker on **local with** Docker Compose;

_Note: run this from the same directory where the Weaviate Docker Compose files are located_

{% raw %}
```bash
# WEAVIATE ORIGIN (e.g., http://localhost:8080), note the paragraph "basics" for setting the local IP
$ export WEAVIATE_ORIGIN="http://$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' ${PWD##*/}_weaviate_1):8080"
# WEAVIATE NETWORK (see paragraph: Running on the localhost)
$ export WEAVIATE_NETWORK=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.NetworkID}}{{end}}' ${PWD##*/}_weaviate_1)
# Run docker
$ docker run -i --network=$WEAVIATE_NETWORK -e weaviate_host=$WEAVIATE_ORIGIN semitechnologies/weaviate-demo-newspublications:latest
```
{% endraw %}

## More Resources

{% include support-links.html %}