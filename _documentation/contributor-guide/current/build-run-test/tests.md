---
layout: layout-documentation
solution: contributor-guide
sub-menu: Build, Run, Test
solution-order: 1
title: Tests
intro: This page introduces the test philosophy of Weaviate. It provides guidance on how we differentiate between test levels and how to make sure we achieve the most gain from our tests.
description: Test philosophy and instructions on how to run tests
tags: ['contributor-guide', 'item']
menu-order: 1
open-graph-type: article
og-img: documentation.jpg
toc: true
---

## Philosophy

### Test Pyramid

Weaviate Core follows a typical [Test
Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html)
approach. As Weaviate itself contains no graphical user interface (GUI), the
highest level tests test the user journeys at an API level.

The tests are grouped into the following three levels:

#### Unit tests

Unit tests test the smallest possible unit, mostly one "class" (usually a
`struct` in golang) with its methods. Unit tests are designed the validate the
business logic and not the internals.

Unit tests are stateless and do not depend on any external programs or runtime
other than the Golang-built tools. (Note: We do make use of the
[stretchr/testify](https://github.com/stretchr/testify) packages. However, they
are installed with any other code-level dependency and don't require running
dedicated software).

This makes tests fast to execute, easy to adadpt and easy to run with
third-party tools like code watchers.

#### Integration tests

Integration tests tests anything that crosses a boundary. A boundary could be
the dependence on an external party (e.g. a third-party database) or an
independent custom tool, such as the contextionary.

With the [custom-db](../custom-db/migration-status.html) feature we also make
use of integration tests to test disk access. As outlined above, unit tests are
meant to be stateless. We consider accessing the filesystem from the code a
boundary in the sense that they should be an integration test.

Integration tests may require third-party dependencies which can be spun up
using docker. Convenience scripts are provided, see below.

#### Journey tests

The highest level tests are journey tests. As the top of the pyramid those
tests come with the highest execution cost. There should thus be few. At the
same time they provide a lot of value as they make sure all components play
together. Journey tests don't usually care about edge cases, but rather about
validating that a user journey is possible.

Journey-tests are black-box tests. This means the test code is completely
unaware of any of the internals of Weaviate. Compare this to the unit or
integration tests which tests snippets of (Golang) code. The journey test test
an application. The only way for the journey test to interact with the
application is through means that are also avaliable to users, such as the
public APIs. Our Journey tests are written in Golang to keep the
context-switching to a minimum for developers, but the fact that they only test
APIs and not code means that they could technically be written in any language.

This makes sure that the UX for our users is great and the most important
features are always working as intended. As a downside they come with the
highest execution cost because journey tests need to compile and run the
application before being able to run the tests themselves. In addition any
runtime [backing service](https://12factor.net/backing-services) must also be
present in a test scenario. To make this easy for developers, we provide
convenience scripts which build both the application and all backing services
and runs them in `docker-compose`.

Backing services are always ephemeral and will be created solely for the tests.
Weaviate will never require a test runtime that it does not create itself. This
makes clean up easy and our tests very portable. New contributors should be
able to run the entire test pipeline locally within seconds after first cloning
the repository.

### Test coverage

We aim to have the highest useful test coverage possbile. In some cases this
might mean 100% test coverages, in other scenarios this might be considerably
less. Golang is very explicit about it's error handling. Especially as errors
are wrapped (or "annotated") you will find a lot of `if err != nil { ... }`
statements. Each of those if statements is a code branch that - if left
untested - will reduce the overall coverage. Whether each error case should
have an explicit test case is something that you should decide based upon how
much value such a test adds. Not necessarily on coverage numbers alone.

Nevertheless, you should aim to always make sure that your contribution does
not lower the overall test coverage. We have `codecov` installed in our CI
pipeline to prevent you from accidentally contributing something that would
lower the coverage.

### Cross-repository dependencies

There are various ways to interact with the Weaviate API. You can send HTTP
requests directly or you could use a client, such as the [python
client](../../../weaviate/current/client-libs/python.html) to interact with
Weaviate. In the weaviate core repository we have chosen not to use any of our
own clients. This has the goal to minimize dependencies and allow indepednent
development by different teams.

As a result all journey tests in Weaviate core either use the go client (which
is auto-generated from swagger) or plain HTTP.

## How to run tests

### Run the whole pipeline

There is a convenience script available which runs the entire test pipeline in
the same fashion that it is run on CI. It only requires a correctly setup
Golang environment, as well as `docker-compose` to be set up on your machine.

You can run the entire pipeline using:

```sh
$ test/run.sh
```

### Unit tests

As outlined in the Philosophy, unit tests have no dependencies other than the
vendored code dependencies. You can thus run them with pure `go test` commands.
For example to run all unit tests, simply run:

```sh
$ go test ./...
```

### Integration Tests
As outline in the Philosophy, integration tests require backing services to be
run. We have a convenience script available which starts all required services
in `docker-compose` and runs the tests against it:

```sh
$ test/integration/run.sh
```

Since all integration tests are set up in a fashion where they clean up after
themselves, you can run them in succession without having to restart the
dependencies. For this you can append the `--no-restart` option like so:

```sh
$ test/integration/run.sh --no-restart
```

### Journey tests
As outline in the Philosophy, journey tests require the application to be
compiled as well as all backing services to be running. We have a convenience
script available which starts all required services in `docker-compose` and
runs the tests against it.

The script is part of the overall pipeline script, but you can configure it to
run only the journey tests like so:

```
$ test/run.sh --acceptance-only
```

## More Resources

{% include support-links.html %}
