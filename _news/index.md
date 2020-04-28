---
layout: layout-blog-article
title: News
description: An overview of news items. You can also sign up to our newsletter or follow us on LinkedIn or Twitter. 
tags: ['News', 'Blogs']
video-link:
video-caption:
menu-order: 999
open-graph-type: article
---

{% assign newsItem = site.news | sort: 'pubdate' | reverse %}
{% for page in newsItem %}
{% if page.url != "/news/index" %}
- [{{ page.title }}]({{ page.url }}) ({{ page.pubdate | date_to_long_string }})
{% endif %}
{% endfor %}

Keep up to date by signing up to our [newsletter](/newsletter/).