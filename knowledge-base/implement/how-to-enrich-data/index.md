---
layout: article-start
title: Enriching of Data
description: Sometimes data tells a lot more than the information you have at hand. In this article you will learn how to best enrich your data with meta-data.
topic: Implement
tags: ['technology', 'onboarding']
video-link: 
video-caption: 
menu-order: 2
---

An ontology schema describes all classes and properties of meta information of your own dataset. The schema (e.g. fields, names, keywords, columns etc) of your dataset are not the only indicators for your schema components. Data values of the original dataset can contain valuable (meta) information about the instance, which could be assigned to classes or property value of classes.
An example is a description of a bank transaction. In this transaction, sometimes the name of a place, product or company is stated. This could be extracted from the description field and be linked to the location, product or company classes. This way, more meta information about objects and actions can be revealed.
The [SeMI-tool](semi-tool/semi-tool) helps to extract entities like locations and organizations using Named Entity Recognition and Classification methods. 