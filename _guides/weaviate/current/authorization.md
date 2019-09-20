---
layout: layout-guide
product: weaviate
product-order: 1
title: Authorization
description: How to setup weaviate authorization.
tags: ['Installation', 'Authorization']
video-link:
video-caption:
menu-order: 5
open-graph-type: article
---

# Authorization Guide

{% include badges.html %}

Similar to our philosophy regarding database backends and the overall authentication scheme, authorization is also implemented in a pluggable fashion.

This means you can chose the plugin that fits your use case best. If you have only a few users and don't need to differentiate between their rights, the [`Admin List`](#admin-list) plugin is a perfect fit. If you need to control each user's permissions at a very fine-grained level however, you should opt to use the [`RBAC`](#rbac) plugin.

## Index

- [Video Guide](#video-guide)
- [Basics](#basics)
- [Admin List](#admin-list)
- [RBAC](#rbac)
- [FAQ](#frequently-asked-questions)

## Video Guide

If you prefer video over text, you can use the video edition of this guide.

<iframe width="560" height="315" src="https://www.youtube.com/embed/5bqpcIX2VDQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Basics

...

## Admin List

Admin List relies on the configured `Authentication Scheme` to correctly identify
the user. On each request a check against a pre-configured admin list is done.
If the user is contained on this list, they get all permissions. If they aren't
they get none. It's not possible to assign only some rights to a specific user
with the Admin List plugin.

### Read-Only list

Other than a list of admins, it is also possible to specify a list of read-only users.
Those users have permissions on all `get` and `list` operations, but no other
permissions.

If a subject is present on both the admin and read-only list, Weaviate will
error on startup due to the invalid configuration.

### Usage

Simply configure the admin plugin in the config yaml like so:

```yaml
authorization:
  admin_list:
    enabled: true
    users:
      - jane@doe.com
      - john@doe.com
    read_only_users:      
      - roberta@doe.com
```

The above would enable the plugin and make users `jane@doe.com` and
`john@doe.com` admins. Aadditionally, user `roberta@doe.com` will have read-only permissions.

Note that in the above example email ids are used to identify the user. This is not a requirement, in fact, any string can be used. This depends on what you configured in the authentication settings. For example, if you are using Open ID Connect authentication, you could set the `authentication.oidc.username_claim` to `email` to achieve the result shown above.

## RBAC

More fine-grained Role-Based Access Control (RBAC) coming soon. As of know the
only possible distinction is between Admins (CRUD), Read-Only Users and
entirely unauthorized users.

## Frequently Asked Questions

...

If you can't find the answer to your question here, please use the:
1. [Knowledge base of old issues](https://github.com/semi-technologies/weaviate/issues?utf8=%E2%9C%93&q=label%3Abug). Or,
2. For questions: [Stackoverflow](https://stackoverflow.com/questions/tagged/weaviate) . Or,
3. For issues: [Github](//github.com/semi-technologies/weaviate/issues).