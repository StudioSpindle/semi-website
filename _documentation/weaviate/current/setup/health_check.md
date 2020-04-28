---
layout: layout-documentation
product: weaviate
sub-menu: Setup
product-order: 1
title: Health checks 
description: Live and readiness checks endpoints.
tags: ['Health Check', 'Endpoint']
menu-order: 6
open-graph-type: article
og-img: documentation.jpg
---

# Health checks

{% include badges.html %}

With calling the health check endpoints, the Weaviate instance will let you know if it is alive and/or ready for data exchange.

## Index

- [Live and Readiness Endpoints](#live-and-readiness-endpoints)
- [More resources](#more-resources)

## Live and Readiness Endpoints

There are two different endpoints for checking the health, which will both return `204 No Content` in positive cases:
- `/v1/.well-known/live`, to determine if the application is alive.
- `/v1/.well-known/ready`, to determine if the application is ready to receive traffic. This endpoint will return 503 in case the application is currently not able to receive traffic. If other horizontal replicas of weaviate are available and they are capable of receving traffic, all traffic should be redirected there instead.


## More Resources

{% include support-links.html %}