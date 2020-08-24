---
layout: layout-documentation
solution: weaviate
sub-menu: About
solution-order: 1
title: Contextionary
intro: Weaviate has a contextionary endpoint which you can call to see how it indexed words and concepts.
description: How to work with Weaviate's Contextionary.
tags: ['Explore', 'Contextionary', 'C11y']
menu-order: 2
open-graph-type: article
og-img: documentation.jpg
toc: true
---

## Basics

- The basics of the Contextionary can be found [here](philosophy.html#about-the-contextionary).
- You can use this functionality to see how Weaviate functions under the hood.
- All contextionary functionality is consolidated inside Weaviate itself, which means that in practice you will probably not need this end-point often.
- The more training data is available to create the contextionary the better, and the latest versions are trained on the following corpus-sizes;
    - English (8.7G en-corpus.txt)
    - German (3.8G de-corpus.txt)
    - Dutch (1.1G nl-corpus.txt)

## Find concepts

To find a concept you can run the following request.

```js
GET /v1/c11y/concepts/{CamelCasedWords}
```

Examples;

```js
GET /v1/c11y/concepts/apple
```

or

```js
GET /v1/c11y/concepts/appleIphone
```

which results in (depending on the current C11y) something like;

```json
{
    "concatenatedWord": {
        "concatenatedNearestNeighbors": [
            {
                "distance": 4.885435,
                "word": "apple"
            },
            {
                "distance": 5.6968684,
                "word": "ios"
            },
            {
                "distance": 6.4164195,
                "word": "app"
            },
            {
                "distance": 6.4438953,
                "word": "apps"
            },
            {
                "distance": 6.5316076,
                "word": "android"
            },
            {
                "distance": 7.006211,
                "word": "phones"
            },
            {
                "distance": 7.109171,
                "word": "utilizing"
            },
            {
                "distance": 7.294036,
                "word": "latest"
            },
            {
                "distance": 7.3058743,
                "word": "update"
            },
            {
                "distance": 7.31079,
                "word": "functionality"
            },
            {
                "distance": 7.3121843,
                "word": "downloaded"
            },
            {
                "distance": 7.3809056,
                "word": "newer"
            }
        ],
        "concatenatedVector": [
            -0.18344858,
            -0.052901156,
            -0.21017331,
            // etcetera
        ],
        "concatenatedWord": "appleIphone",
        "singleWords": [
            "apple",
            "iphone"
        ]
    },
    "individualWords": [
        {
            "inC11y": true,
            "info": {
                "nearestNeighbors": [
                    {
                        "word": "apple"
                    },
                    {
                        "distance": 8.790499,
                        "word": "latest"
                    },
                    {
                        "distance": 8.847318,
                        "word": "itunes"
                    },
                    {
                        "distance": 8.898178,
                        "word": "google"
                    },
                    {
                        "distance": 8.961852,
                        "word": "preview"
                    },
                    {
                        "distance": 9.029673,
                        "word": "updated"
                    },
                    {
                        "distance": 9.031538,
                        "word": "accompanying"
                    },
                    {
                        "distance": 9.135351,
                        "word": "commercially"
                    },
                    {
                        "distance": 9.185721,
                        "word": "instant"
                    },
                    {
                        "distance": 9.206276,
                        "word": "facebook"
                    },
                    {
                        "distance": 9.234765,
                        "word": "entirety"
                    },
                    {
                        "distance": 9.344083,
                        "word": "clip"
                    }
                ],
                "vector": [
                    0.056395,
                    -0.180568,
                    -0.204221,
                    // etcetera
                ]
            },
            "word": "apple"
        },
        {
            "inC11y": true,
            "info": {
                "nearestNeighbors": [
                    {
                        "word": "iphone"
                    },
                    {
                        "distance": 4.5720806,
                        "word": "ipad"
                    },
                    {
                        "distance": 5.5977497,
                        "word": "ipod"
                    },
                    {
                        "distance": 5.785391,
                        "word": "ios"
                    },
                    {
                        "distance": 5.8823743,
                        "word": "smartphone"
                    },
                    {
                        "distance": 6.169418,
                        "word": "smartphones"
                    },
                    {
                        "distance": 6.576888,
                        "word": "apps"
                    },
                    {
                        "distance": 6.6489735,
                        "word": "android"
                    },
                    {
                        "distance": 7.246277,
                        "word": "df4e38"
                    },
                    {
                        "distance": 7.250472,
                        "word": "m6v40"
                    },
                    {
                        "distance": 7.2750626,
                        "word": "touchscreen"
                    },
                    {
                        "distance": 7.6863537,
                        "word": "macos"
                    }
                ],
                "vector": [
                    -0.314191,
                    0.016692,
                    -0.213418,
                    // etcetera
                ]
            },
            "word": "iphone"
        }
    ]
}
```

## FAQ

{% include support-links.html %}