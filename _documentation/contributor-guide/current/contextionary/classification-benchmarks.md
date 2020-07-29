---
layout: layout-documentation
product: contributor-guide
sub-menu: Contextionary
product-order: 1
title: Classification Benchmarks
description: Testing various classification datasets against each other
tags: ['contributor-guide', 'item']
menu-order: 1
open-graph-type: article
og-img: documentation.jpg
---

# Classification Benchmarks

{% include badges.html %}

This page contains various released and unreleased contextionary versions run
through classification benchmarks. This is meant to give an initial impression
of where the strengths and weeknesses of various versions lie.

## Index


## Model Version Details

Benchmarks on this page reference to a specific model version, details about
each version are contained here:

| model version | training algo | input sources |  input size | dimensions | window size |
|--|--|--|--|--|--|
| en0.14.0 | GloVe | Wiki | `~14G` | 600 | 15 |
| en0.16.0 | GloVe | Wiki, CommonCrawl | `~1000G` | 300 | 15 |
| en0.17.0 | fasttext | Wiki | `~14G` | 300 | 15 |

## Benchmarks (KNN)

### Enron Emails (Subset `kaminski-v`)

* Source Repo: [semi-technologies/enron-email-classification](https://github.com/semi-technologies/enron-email-classification)
* Current best: `en0.14.0` at `k=1`

| contextionary | dimensions | k=1 | k=3 | k=5 | k=8 | k=13 | k=21 |
|---------------|------------|-----|-----|-----|-----|------|------|
| en0.14.0-v0.4.9 | 600 | **74%** | 72% | 71% | 70% | 67% | 63% |
| en0.16.0-v0.4.9 | 300 | 72% | 70% | 69% | 69% | 65% | 64% |
| en0.17.0-v0.4.15 | 300 | 68% | 68% | 67% | 64% | 63% | 60%  |
| en0.17.1-v0.4.15 | 300 | 70% | 68% | 68% | 66% | 64% | 62%  |

### 20 Newsgroups

* Size: 60 per category
* Source Repo [semi-technologies/20news-classification](https://github.com/semi-technologies/20news-classification)

#### Main Category (6 Categories)

* Current best: `en0.16.0` at `k=1`

| contextionary | dimensions | k=1 | k=3 | k=5 | k=8 | k=13 | k=21 |
|---------------|------------|-----|-----|-----|-----|------|------|
| en0.14.0-v0.4.15 | 600 | 76% | 73% | 72% | 74% | 74% | 70% |
| en0.16.0-v0.4.15 | 300 | **83%** | 82% | 80% | 82% | 82% | 82% |
| en0.17.0-v0.4.15 | 300 | 78% | 80% | 77% | 77% | 73% | 72% |
| en0.17.1-v0.4.15 | 300 | 77% | 77% | 78% | 77% | 73% | 73% |

#### Fine Category (20 Categories)

* Current best: `en0.16.0` at `k=1`

| contextionary | dimensions | k=1 | k=3 | k=5 | k=8 | k=13 | k=21 |
|---------------|------------|-----|-----|-----|-----|------|------|
| en0.14.0-v0.4.15 | 600 | 57% | 53% | 53% | 50% | 48% | 46% |
| en0.16.0-v0.4.15 | 300 | **62%** | 60% | 57% | 60% | 61% | 59% |
| en0.17.0-v0.4.15 | 300 | 57% | 57% | 56% | 56% | 56% | 51% |
| en0.17.1-v0.4.15 | 300 | 56% | 54% | 55% | 58% | 54% | 53% |

## Benchmarks (contextual)

### 20 Newsgroups

* Size: 60 per category
* Source Repo [semi-technologies/20news-classification](https://github.com/semi-technologies/20news-classification)

#### Main Category (6 Categories)

* Current best: `en0.14.0`

| contextionary | dimensions | result |
|---------------|------------|-----|
| en0.14.0-v0.4.15 | 600 | **54%** |
| en0.16.0-v0.4.15 | 300 | 50% |
| en0.17.0-v0.4.15 | 300 | 50% |
| en0.17.1-v0.4.15 | 300 | 50% |

#### Fine Category (20 Categories)

* Current best: `en0.16.0`

| contextionary | dimensions | result |
|---------------|------------|-----|
| en0.14.0-v0.4.15 | 600 | 44% |
| en0.16.0-v0.4.15 | 300 | **56%** |
| en0.17.0-v0.4.15 | 300 | 44% |
| en0.17.0-v0.4.15 | 300 | 43% |


## More Resources

{% include support-links.html %}
