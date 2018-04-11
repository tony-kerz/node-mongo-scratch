# node-mongo-scratch

this repository illustrates use of the the following packages to construct node based batch and rest-ful api elements backed by [mongodb](https://www.mongodb.com/):

* [node-mongo-data](https://github.com/the-watchmen/node-mongo-data)
* [node-mongo-rest](https://github.com/the-watchmen/node-mongo-rest)
* [node-mongo-batch](https://github.com/the-watchmen/node-mongo-batch)

[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

## Directions

1. git clone {this repo}
1. cd {this repo}
1. yarn
1. yarn start
1. visit http://localhost:3000 in browser

## database

> to run local mongo, easiest is via [docker](https://www.docker.com/):

```
docker rm -f mongo
docker run -d --name mongo -v $HOME/mongo:/data/db -p 27017:27017 mongo:<version>
```

> see [config](config)

## initial data setup

> see [data setup](doc/setup.md)

## security setup

> see [security](doc/security.md)

## batch example

> see [batch](doc/batch.md)

## build

1. `yarn build`

## tests

1. run one of the following yarn commands
1. `yarn test` (run all tests)
1. `yarn ava` (run all unit tests)
1. `yarn ava-one {path to test}` (run specific unit test)
1. `yarn cuke` (run all cucumber tests)
1. `yarn cuke-feature {path to feature}` (run tests for a specific cucumber feature)
   > e.g. `yarn cuke-feature test/features/widgets.feature`
1. `yarn cuke -- --name='{scenario name regex}'` (run a specific scenario)
   > e.g. `yarn cuke --name='create a client'`
