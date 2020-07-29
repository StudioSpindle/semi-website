---
layout: layout-documentation
product: contributor-guide
sub-menu: Custom DB
product-order: 1
title: Status
description: Custom DB Migration Status, Features and Limitations
tags: ['contributor-guide', 'item']
menu-order: 1
open-graph-type: article
og-img: documentation.jpg
---

# Custom DB Status

{% include badges.html %}

"Custom DB" is the working title of an ongoing migration away from third-party databases to an integrated database solution into Weaviate. This page lists the current status of which features are already available, as well as limitations.

## Global Limits

|Area|Limit|Reason|Mitigation|
|--|--|--|--|
|HNSW object limit| `10,000` | The index is created with a fixed size as opposed to dynamically growing it | [#1219](https://github.com/semi-technologies/weaviate/issues/1219) |
|Index object limit| `ca 4M` | Currently only one shard is supported, the shard uses uint32 as internal ids, so we can't add more than the maximum number| [#1219](https://github.com/semi-technologies/weaviate/issues/1219) |

## Feature Overview

* **CRUD objects**
  * {% include white-check-mark.html %} Post Object
  * {% include cross-mark.html %} Batch Add Objects
  * {% include cross-mark.html %} Update (put) Object
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
  * {% include cross-mark.html %} Cross-References

* **Cross-References**
  * {% include cross-mark.html %} add 
  * {% include cross-mark.html %} batch add 
  * {% include cross-mark.html %} update 
  * {% include cross-mark.html %} delete
  * {% include cross-mark.html %} merge

* **Filters**
  * {% include white-check-mark.html %} on supported props (see above)
  * {% include white-check-mark.html %} Simple unchained filters
  * {% include cross-mark.html %} Filters chained with And/Or/Not
  * {% include cross-mark.html %} Filters on ref props

* **Classifications (KNN, contextual)**
  * {% include cross-mark.html %}requires Cross-ref support
  * {% include cross-mark.html %}requires specific methods (e.g. get all where ref is not set)

## More Resources

{% include support-links.html %}
