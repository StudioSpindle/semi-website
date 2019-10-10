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

{% for page in site.news %}
{% if page.url != "/news/index" %}
- [{{ page.title }}](https://semi.technology{{ page.url }}) ({{ page.pubdate }})
{% endif %}
{% endfor %}

Keep up to date by signing up to our [newsletter](/newsletter/).