---
layout: layout-documentation
product: weaviate
sub-menu: Weaviate Cluster Service
product-order: 1
title: Authentication
description: How to use authentication with WCS
tags: ['Installation', 'Authentication', 'WCS', 'WCS Auth']
menu-order: 7
open-graph-type: article
og-img: documentation.jpg
---

# Authentication with WCS Auth Service

{% include badges.html %}

If you are using the Weaviate Cluster Service (WCS) you can protect your cluster with [OpenID Connect](https://openid.net/connect/) (OIDC) Authentication.

## Index

- [Basics](#basics)
- [OIDC details](#oidc-details)
- [Obtain a token with the password grant](#obtain-a-token-with-the-password-grant)
- [Login to the playground](#login-to-the-playground)
- [More resources](#more-resources)

## Basics

- You need to set `"requiresAuthentication": true` when requesting a cluster.
- After creating a setup with the Weaviate Cluster Serivce (WCS), your instance
  is protected with OIDC Authentication.
- An email was sent to the email address you used on registration with a
  request to set a password.
- Those credentials can be used to obtain a token. The token must be sent on
  each request to weaviate, as it will authenticate you.
- If you are not using the Weaviate Cluster Service, this guide is not
  applicable. To see how to use Weaviate with OIDC in general, see
  [Authentication](../setup/authenticate.html).

## OIDC Details

The WCS Auth Service is a fully OIDC-compliant identity server. You can use any
OIDC grant to obtain a token. The OIDC discovery page can be found at:

[https://auth.wcs.api.semi.technology/auth/realms/SeMI/.well-known/openid-configuration](https://auth.wcs.api.semi.technology/auth/realms/SeMI/.well-known/openid-configuration)

If you are obtaining a token programmatically, make sure to use the above URI
to discovery all further endpoints, such as the `authorization_endpoint` or
`token_endpoint`. In this guide, we will obtain a token using the `password
grant` with `curl`, as well as log into the Playground frontend with the
browser.

## Obtain a token with the password grant

For the following example, we will assume that we used the email address
`janedoe@semi.technology` and configured the password to `fun_withS3mI`.

To obtain a token, you can send a request to the token endpoint which we have
discovered through the OIDC discovery endpoint
(`/.well-known/openid-configuration`) mentioned above.

```sh
curl --fail --silent -X POST \
  -d grant_type=password \
  -d client_id=wcs \
  -d username="janedoe@semi.technology" \
  -d password="fun_withS3mI" \
  https://auth.wcs.api.semi.technology/auth/realms/SeMI/protocol/openid-connect/token
```

The response will look something like the following:
```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR...ahw",
  "expires_in": 60,
  "refresh_expires_in": 1800,
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR...vIA",
  "token_type": "bearer",
  "not-before-policy": 0,
  "session_state": "0ec139ea...cd",
  "scope": "profile email"
}
```

The field `access_token` contains the token which you need to attach to your
requests to Weaviate. In the next step we will obtain the token again, extract
it using `jq` and save it into an environment variable:

```sh
export TOKEN=$(curl --fail --silent -X POST \
  -d grant_type=password \
  -d client_id=wcs \
  -d username="janedoe@semi.technology" \
  -d password="fun_withS3mI" \
  https://auth.wcs.api.semi.technology/auth/realms/SeMI/protocol/openid-connect/token | jq -r .access_token)
```

We can now attach the token to a request to Weaviate like so:

```sh
curl -H "authorization: Bearer $TOKEN" https://[your-cluster-id].semi.network/v1/meta
```
You should see a response similar to the following:

```json
{"contextionaryVersion":"en0.10.0-v0.4.6","contextionaryWordCount":211170,"hostname":"http://[::]:8080","version":"0.22.0"}
```

## Login to the Playground

If you want to connect the [Playground](http://playground.semi.technology),
with your instance, simply enter the GraphQL endpoint of your cluster (e.g.
`https://[your-cluster-id].semi.network/v1/graphql`) into the Playground app in
your browser.

If OIDC Authentication is configured on your cluster it will immediately
redirect you to the login page. Enter your user credentials and you will be
returned to the playground.

*Note: You might have to renter your graphql endpoint after you have been
redirected, this is a known issue and will be addressed soon.*

## More Resources

{% include support-links.html %}
