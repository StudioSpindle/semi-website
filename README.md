# SeMI-Website ![Travis Build](https://travis-ci.org/SeMI-network/semi-website.svg?branch=master "Logo Travis Build")

Dependencies:
- [Bundler](https://bundler.io/)
- [npm](https://www.npmjs.com/)

Make sure both (Bundler and npm) are installed on your system before you proceed. For more information on how to install check above links.

## :rocket: Deployment

Google cloud sdk with nginx is used for production.

## :construction: Local development

### Using docker

If you only care about running the website quickly to verify your changes look
good before deployment, you can use the supplied Dockerfile. Simply run

```
docker build -t semi-website . && docker run -p 4000:4000 semi-website
```

from the root. You can then access the site at localhost:4000. There is no
live-reloading included. If you make changes you have to rebuild (and run) the
container. The layer caching is quite optimized though, so rebuilding should be
quite fast.

**Warning**: The docker image above is only meant for aiding with devleopment,
it uses `jekyll serve` and is therefore not suited for production use.

### Running everything locally

Alternatively, if you need full control over all resources, you can also setup
your local environment as described here.

To start a project first install Bundler as described [in the Bundler documentation](https://bundler.io/).

To install the dependencies (used for jekyll page generation) run:

```bash
$ bundle install
```

Also install npm dependencies:

```bash
$ npm install
```

To build the **local development** website:

```bash
$ npm run build
```

Build and watch the website

```bash
$ bundle exec jekyll serve
```

# Tests

Run eslint and prettier to see code formatting errors

```bash
$ npm run eslint
$ npm run prettier
```

Test the links

```bash
$ bundle exec jekyll build
$ bundle exec rake test
```

To rewrite prettier errors automatically run:

```bash
$ prettier --write ./js-src/modules/**
```
