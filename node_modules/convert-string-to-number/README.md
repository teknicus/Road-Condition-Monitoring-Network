# convert-string-to-number

[![npm](https://img.shields.io/npm/v/convert-string-to-number.svg?style=flat-square)](https://www.npmjs.com/package/convert-string-to-number)
[![Travis branch](https://img.shields.io/travis/aichbauer/node-convert-string-to-number/master.svg?style=flat-square)](https://travis-ci.org/aichbauer/node-convert-string-to-number)
[![Codecov branch](https://img.shields.io/codecov/c/github/aichbauer/node-convert-string-to-number/master.svg?style=flat-square)](https://codecov.io/gh/aichbauer/node-convert-string-to-number)

> Convert a string to its numerical value (float or integer)

## Table of Contents

* [Why?](#why)
* [Installation](#installation)
* [Functions](#functions)
* [Usage](#usage)
* [License](#license)

## Why?

I needed a simple way to parse string numbers to its matching numerical value, for parsing csv formatted files.

## Installation

```sh
$ npm i convert-string-to-number -S
```

or

```sh
$ yarn add convert-string-to-number
```

## Functions

Take a look into the [usage section](#usage) for a detailed example.

### convertStringToNumber

> Note: you can also use the default export.

This function converts a string to its numerical value (float, int, or NaN).

#### Syntax

Returns a number or NaN.

```js
const number = convertStringToNumber(value);
```

##### Parameters

* **value**: a string

## Usage

An example how to use it.

```js
const { convertStringToNumber } = require('convert-string-to-number'); // named export
const converter = require('convert-string-to-number'); // default export

const int = convertStringToNumber('2'); // => 2
const float = converter('2.2'); // => 2.2
const notANumber = converter('franz'); // => NaN
```

## License

MIT © Lukas Aichbauer
