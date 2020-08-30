---
bodyclass: ["page--solutions", " ", "page--solutions-index"]
layout: layout-solution
title: Weaviate Cloud Service
description: "SeMI now offers a fully managed Weaviate service in beta. You can create Weaviate instances on the SeMI network and integrate them directly into your software stack.<p><a class=\"button--cta\" type=\"submit\" href=\"https://console.semi.technology/\">Create a free Weaviate Cluster</a></p>"
SEOdescription: SeMI now offers a fully managed Weaviate service in beta. You can create Weaviate instances on the SeMI network and integrate them directly into your software stack.
og-img: solutions.jpg
image: /img/cloud-service.svg
imageCard: /img/cloud-service.svg
imageMobile: /img/cloud-service.svg
imageAlt: Weaviate Cloud Service
redirect_from:
    - /products/weaviate-cloud-service/index.html
---

{% include molecule-section-heading.html
    title='Weaviate Console'
%}

<section class="layout layout--double">
    <div class="layout__column">
        <p>
            The Weaviate Console allows you to create managed Weaviate instances on the fly without needing to run it yourself. Currently, the Weaviate Console is in beta and you can create a free Weaviate Cluster to experiment with Weaviate.
        </p>
        <p>
            <a class="button--cta" type="submit" href="https://console.semi.technology/">Login to join the beta program</a>
        </p>
    </div>
    <div class="layout__column">
        <img src="/img/cloud-console.png"  alt="Weaviate Cloud Console" />
    </div>
</section>

{% include molecule-section-heading.html
    title='Cloud Partners'
%}

<section class="layout layout--double-reverse">
    <div class="layout__column">
        <p>
            Weaviate is available through the Google Cloud Marketplace. With the click of a button you can spin-up a version of Weaviate within minutes.
        </p>
        <p>
            <a class="button--cta" type="submit" href="#">Get started with Weaviate on Google Cloud</a>
        </p>
    </div>
    <div class="layout__column">
        <img src="/img/Google_Cloud_Platform-Logo.svg"  alt="Weaviate on Google Cloud Platform" />
    </div>
</section>

{% include molecule-section-heading.html
    title='Pricing'
%}

{% include pricing-table.html
    type='cloud'
%}