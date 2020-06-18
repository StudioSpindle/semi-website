---
layout: layout-documentation
product: weaviate
sub-menu: More resources
product-order: 1
title: FAQ
description: Frequently Asked Questions.
tags: ['FAQ', 'Help']
menu-order: 1
open-graph-type: article
og-img: documentation.jpg
---

# Frequently Asked Questions

{% include badges.html %}

Aha, you have a question! We hope that you can find the answer here, but if you don't, you can reach us via [Stackoverflow](https://stackoverflow.com/tags/weaviate/) (make sure to tag your question with weaviate), [Github](https://github.com/semi-technologies/weaviate/issues), or [Twitter](https://twitter.com/SeMI_tech). If your question serves a general-purpose, we will add it to this page.

### Q: Why would I use Weaviate as my search graph engine?

A: Our goal is three-folded. Firstly, we want to make it as easy as possible for others to create their own semantic systems or search graphs (hence, we are API based). Secondly, we have a strong focus on the semantic element (the "knowledge" in "search graph," if you will). Our ultimate goal is to have Weaviate help you manage, index, and "understand" your data so that you can build newer, better, and faster applications. And thirdly, we want you to be able to run it everywhere. This is the reason why Weaviate comes containerized.

### Q: Do you offer Weaviate as a managed service?

A: Yes, soon, we will release the Weaviate Cluster Service! [Sign up for our newsletter](/newsletter/) to get a ping when it's live!

### Q: Can I train my own contextionary?

A: No, but the good news is. You don't have to. The [function of the contextionary](../about/philosophy.html#about-the-contextionary) within a Weaviate is that it allows a Weaviate to interpret your data semantically. By adding data through the RESTful API endpoints, a Weaviate already has enough context based on your data. You just have to [run the Weaviate containers](../get-started/install.html) in a language of choice, and you are good to go!

### Q: Why is the contextionary created using GloVe?

A: There are many natural language processing vectorization models available. The reason we choose GloVe at the root of the model is that we rely on the spacial element that GloVe brings. Weaviate aims to _index data objects based on their semantics_ therefore, we need to calculate where the data object will be located in the vector space. Bidirectional models (e.g., BERT, ELMo, and co) don't provide a unique representation and are therefore not suited for our case.

### Q: Why does Weaviate have a schema and not an ontology?

A: We use a schema because it focusses on the representation of your data (in our case in the GraphQL API) but you can use a Weaviate schema to express an ontology. One of Weaviate's core features is that it semantically interprets your schema (and with that your ontology) so that you can search for concepts rather than formally defined entities.

### Q: Can I use Weaviate to create a traditional search graph.

A: Yes, you can! Weaviate support ontology, RDF like definitions in its schema, and it runs out of the box. It is scalable, and the GraphQL API will allow you to query through your search graph easily. But now you are here. We like to suggest you really try its semantic features. After all, you are creating a _knowledge_ graph 😉.

### Q: Why isn't there a contextionary in my language?

A: Because you are probably one of the first that needs one! Ping us [here on Github](https://github.com/semi-technologies/weaviate/issues), and we will make sure in the next iteration it will become available (unless you want it in [Silbo Gomero](https://en.wikipedia.org/wiki/Silbo_Gomero) or another language which is whistled).

### Q: How to deal with custom terminology?

A: Sometimes, users work with custom terminology, which often comes in the form of abbreviations or jargon. We are currently working on an additional API endpoint, which allows you to add custom synonyms. You can find the state of the implementation [here](https://github.com/semi-technologies/weaviate/issues/946). You can also signup for our [newsletter](/newsletter/) to receive an update when it is ready.

### Q: How can you index data near-realtime without losing semantic meaning?

A: Every data object [gets its vector representation](../about/philosophy.html#about-the-contextionary) based on its semantic meaning. In a nutshell, we calculate the vector position of the data object based on the words and concepts used in the data object. The existing model in the contextionary gives already enough context. If you want to get in the nitty-gritty, you can [browse the code here](https://github.com/semi-technologies/contextionary/tree/master/server), but you can also ask a [specific question on Stackoverflow](https://stackoverflow.com/tags/weaviate/) and tag it with Weaviate.

### Q: How do you deal with words that have multiple meanings?

A: How can Weaviate interpret that you mean a company, as in business, and not as the division of the army? We do this based on the structure of the schema and the data you add. A schema in Weaviate might contain a company class with the property name and the value Apple. This simple representation (company, name, apple) is already enough to gravitate the vector position of the data object towards businesses or the iPhone. You can read [here](../about/philosophy.html) how we do this, or you can ask a specific question on [Stackoverflow](https://stackoverflow.com/tags/weaviate/) and tag it with Weaviate.

### Q: Why did you use GraphQL instead of SPARQL?

A: Two words, user experience. We want to make it as simple as possible to integrate Weaviate into your stack, and we believe that GraphQL is the answer to this. The community and client libraries around GraphQL are enormous, and you can use almost all of them with Weaviate.

### Q: Can I request a feature in Weaviate?

A: Sure (also, feel free to [issue a pull request](https://github.com/semi-technologies/weaviate/pulls) 😉) you can [add those requests here](https://github.com/semi-technologies/weaviate/issues). The only thing you need is a Github account, and while you're there, make sure to give us a star 😇.

### Q: Does Weaviate require NFS volumes on Kubernetes?

A: By default, no NFS volumes are active. In a production setting, we recommend turning etcd disaster recovery on which requires an NFS volume. However, [the helm docs](https://www.semi.technology/documentation/weaviate/current/get-started/install.html#how-can-i-turn-it-on) contain instructions on how to deploy an nfs-provisioner. For more details, see also this [stack overflow answer](https://stackoverflow.com/a/60505796/5322199).