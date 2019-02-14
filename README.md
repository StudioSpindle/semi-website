# SeMI-Website ![Travis Build](https://travis-ci.org/SeMI-network/semi-website.svg?branch=master "Logo Travis Build")

Dependencies:
- [Bundler](https://bundler.io/)
- [npm](https://www.npmjs.com/)

Make sure both (Bundler and npm) are installed on your system before you proceed. For more information on how to install check above links.

## Local development

To start a project first install Bundler as described [in the Bundler documentation](https://bundler.io/).

To install the dependencies (used for jekyll page generation) run: 

```bash
$ bundle install
``` 

Also install npm dependencies:

```bash
$ npm install
```

To build and start the **local development** website:

```bash
$ npm run local
```

