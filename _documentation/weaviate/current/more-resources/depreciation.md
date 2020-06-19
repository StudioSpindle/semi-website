---
layout: layout-documentation
product: weaviate
sub-menu: More resources
product-order: 1
title: Deprecation messages
description: List of deprecation messages
tags: ['Deprecation messages']
menu-order: 1
open-graph-type: article
og-img: documentation.jpg
---

# Deprecation Messages

{% include badges.html %}

The list below contains deprecation messages:

<ul>
    {% for message in site.data.deprecations.deprecations %}
    <li>
        <a href="#{{ message.id }}" target="_self">{{ message.id }}</a> (v{{ message.sinceVersion }})
    </li>
    {% endfor %}
</ul>

{% for message in site.data.deprecations.deprecations %}

<h2 class="title-column" style="font-size:1.75rem" id="{{ message.id }}">{{ message.id }}</h2>

{{ message.msg }}

<table>
    <tr>
        <td>status</td>
        <td>{{ message.status }}</td>
    </tr>
    <tr>
        <td>API type</td>
        <td>{{ message.apiType }}</td>
    </tr>

    {% for location in message.locations %}

        <tr>
            <td>location</td>
            <td>{{ location }}</td>
        </tr>

    {% endfor %}

    <tr>
        <td>mitigation</td>
        <td>{{ message.mitigation | escape }}</td>
    </tr>

    <tr>
        <td>since version</td>
        <td>{{ message.sinceVersion }}</td>
    </tr>

    <tr>
        <td>since time</td>
        <td>{{ message.sinceTime | date_to_rfc822 }}</td>
    </tr>

    <tr>
        <td>planned removal version</td>
        <td>{{ message.plannedRemovalVersion }}</td>
    </tr>

    <tr>
        <td>removed in version</td>
        <td>{{ message.removedIn }}</td>
    </tr>

    <tr>
        <td>removed in date</td>
        <td>{{ message.removedTime | date_to_rfc822 }}</td>
    </tr>

</table>

<hr>

{% endfor %}