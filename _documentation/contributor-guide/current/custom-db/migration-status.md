---
layout: layout-documentation
product: contributor-guide
sub-menu: Custom DB
product-order: 1
title: Status
intro: Custom DB is the working title of an ongoing migration away from third-party databases to an integrated database solution into Weaviate. This page lists the current status of which features are already available, as well as limitations.
description: Custom DB Migration Status, Features and Limitations
tags: ['contributor-guide', 'item']
menu-order: 1
open-graph-type: article
og-img: documentation.jpg
toc: true
---

## Global Limits

|Area|Limit|Reason|Mitigation|
|--|--|--|--|
|HNSW object limit| `100,000` | The index is created with a fixed size as opposed to dynamically growing it | [#1219](https://github.com/semi-technologies/weaviate/issues/1219) |
|Index object limit| `ca 4M` | Currently only one shard is supported, the shard uses uint32 as internal ids, so we can't add more than the maximum number| [#1219](https://github.com/semi-technologies/weaviate/issues/1219) |

## Feature Overview

* **CRUD objects**
  * {% include white-check-mark.html %} Post Object
  * {% include white-check-.html %} Batch Add Objects
  * {% include cross-mark.html %} Batch Add references
  * {% include cross-mark.html %} Update (put) Object (Object itself will get updated, but neither inverted indices, nor hnsw index will get updated at the moment)
  * {% include cross-mark.html %} Merge Objects 
  * {% include cross-mark.html %} Delete Objects

* **Object Properties**
  * {% include white-check-mark.html %} string 
  * {% include white-check-mark.html %} text
  * {% include white-check-mark.html %} int
  * {% include white-check-mark.html %} number
  * {% include white-check-mark.html %} boolean
  * {% include cross-mark.html %} geoCoordinates
  * {% include cross-mark.html %} phoneNumber
  * {% include white-check-mark.html %} Cross-References

* **Cross-References**
  * {% include white-check-mark.html %} add 
  * {% include cross-mark.html %} batch add 
  * {% include cross-mark.html %} update 
  * {% include cross-mark.html %} delete
  * {% include cross-mark.html %} merge

* **Filters**
  * {% include white-check-mark.html %} on supported props (see above)
  * {% include white-check-mark.html %} Simple unchained filters
  * {% include white-check-mark.html %} Filters chained with And/Or/Not
  * {% include white-check-mark.html %} Filters on ref count
  * {% include white-check-mark.html %} Filters on vector searches
  * {% include cross-mark.html %} Filters on ref props
  * {% include cross-mark.html %} Filters on geoProps

* **Classifications (KNN, contextual)**
  * {% include white-check-mark.html %} kNN
  * {% include white-check-mark.html %} contextual

* **GraphQL Aggregate**
  * {% include cross-mark.html %} all capabilities

* **Other limitations**
  * {% include cross-mark.html %} contextionary extensions
  * {% include cross-mark.html %} remove dependency on etcd

## More Resources

{% include support-links.html %}
