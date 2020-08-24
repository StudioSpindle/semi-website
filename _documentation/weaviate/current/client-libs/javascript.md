---
layout: layout-documentation
solution: weaviate
sub-menu: Client libs
solution-order: 1
title: Javascript (beta)
intro: A Javascript library
description: Weaviate Javascript client library.
tags: ['Javascript', 'Library']
menu-order: 1
open-graph-type: article
og-img: documentation.jpg
toc: true
---

# Basics

- A javascript weaviate client makes using the Weaviate API easier.
- This package is still in beta, please leave issues or feature requests [here](https://github.com/semi-technologies/weaviate-javascript-client/issues).

## Install

The package can be easily installed using [npm](https://www.npmjs.com/package/weaviate-client).

```sh
npm install weaviate-client -S
```

You can now include Weaviate like:

```javascript
const weaviate = require('weaviate-client')({
    scheme: 'https',
    host: 'www.host.com',
    headers: { // <== headers are optional
        Authorization: 'Bearer ' + token
    }
});
```

## Query

The client allows to send simple GraphQL queries in the form of strings. You can learn how to format your GraphQL queries [here](../query-data/get.html#get-function).

```javascript
weaviate
    .graphql(`{
        Get {
            Things {
                Article {
                    title
                    url
                    wordCount
                }
            }
        }
    }`)
    .then(function (result) {
        console.log(result.data)
    })`
```

## More Resources

{% include support-links.html %}