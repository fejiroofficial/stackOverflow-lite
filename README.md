# stackoverflow-lite

[![Build Status](https://travis-ci.com/fejiroofficial/stackoverflow-lite.svg?branch=develop)](https://travis-ci.com/fejiroofficial/stackoverflow-lite)
[![Coverage Status](https://coveralls.io/repos/github/fejiroofficial/stackoverflow-lite/badge.svg?branch=master)](https://coveralls.io/github/fejiroofficial/stackoverflow-lite?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/maintainability)](https://codeclimate.com/github/codeclimate/codeclimate/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/test_coverage)](https://codeclimate.com/github/codeclimate/codeclimate/test_coverage)

Andela developer challenge: Stack Overflow-lite is a platform where people can ask questions and provide answers.

## Features

* [x] Users can create an account and log in.
* [X] Users can view a list of recently asked questions on the platform.
* [X] Users can view a question with all the answers posted for it and add an answer. 
* [X] Users post a question. 


## Technologies Used

* [NodeJS](https://nodejs.org/en/)
* [ExpressJs](https://expressjs.com/)


## Installation

Install [`node`](https://nodejs.org/en/download/), version 8 or greater

Clone the repo:
```sh
git clone https://github.com/fejrooofficial/stackoverflow-lite.git
cd stackoverflow-lite
```

Start server:
```sh
npm start
```


## API Routes

|   HTTP VERB   | ENDPOINT                    | FUCTIONALITY                          |
| ------------- | ----------------------------| --------------------------------------|
| GET           | api/v1/questions            | Fetch all questions                   |
| GET           | api/v1/questions/:id        | Fetch a specific question             |
| POST          | api/v1/questions            | Add a question                        |
| POST          | api/v1/questions/:id/answers| Add an answer                         |


Api is hosted [`here`]()


## UI Templates

UI is hosted [here](https://fejiroofficial.github.io/Stack-Overflow-lite)

