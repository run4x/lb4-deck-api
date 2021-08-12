# deck-api
## Introduction

This project is a solution to Backend Programming Test written in Node.js Typescript.
It is an implementation of REST API to simulate deck of cards.
Deck API has the following methods to handle cards and decks:
- create a new deck
- open a deck
- draw card(s)

This application is generated using [LoopBack 4 CLI](https://loopback.io/doc/en/lb4/Command-line-interface.html) with the [initial project layout](https://loopback.io/doc/en/lb4/Loopback-application-layout.html).

## Installation

Do the following to clone and start the project.

In case you have Docker installed on your system, you can run `npm run docker:start` to download their images and start the servers. Otherwise, you can skip this command.

```sh
$ git clone https://github.com/run4x/lb4-deck-api.git
$ cd lb4-deck-api
$ npm i
$ npm run docker:start
$ npm start
```

## Usage

The main app will be running at http://localhost:3000 and the API Explorer at
http://localhost:3000/explorer

## Rebuild the project

To incrementally build the project:

```sh
npm run build
```

To force a full build by cleaning up cached artifacts:

```sh
npm run rebuild
```

## Tests

This repository comes with integration and acceptance tests.

```sh
npm test
```

### Acceptance

Using `DeckController` to:
- create new deck
- draw 3 cards from created deck
- open this deck
- draw card from deck that does not exist
- open unknown deck

### Integration

Using `DeckRepository` to:
- create new deck
- create a deck and shuffle cards
- draw 2 cards from first deck
- try to draw more cards when available from second deck

## Models

This app has the following models:

1. `Deck` - representing the deck of cards.
2. `Card` - representing a card.

## Controllers

Controllers expose API endpoints for interacting with the models.

In this app, there are two controllers:

1. `ping` - a simple controller to checking the status of the app.
2. `deck` - controller for creating new deck, opening a deck and drawing card(s).
