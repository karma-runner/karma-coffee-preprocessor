# karma-coffee-preprocessor

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/karma-runner/karma-coffee-preprocessor)
 [![npm version](https://img.shields.io/npm/v/karma-coffee-preprocessor.svg?style=flat-square)](https://www.npmjs.com/package/karma-coffee-preprocessor) [![npm downloads](https://img.shields.io/npm/dm/karma-coffee-preprocessor.svg?style=flat-square)](https://www.npmjs.com/package/karma-coffee-preprocessor)

[![Build Status](https://img.shields.io/travis/karma-runner/karma-coffee-preprocessor/master.svg?style=flat-square)](https://travis-ci.org/karma-runner/karma-coffee-preprocessor) [![Dependency Status](https://img.shields.io/david/karma-runner/karma-coffee-preprocessor.svg?style=flat-square)](https://david-dm.org/karma-runner/karma-coffee-preprocessor) [![devDependency Status](https://img.shields.io/david/dev/karma-runner/karma-coffee-preprocessor.svg?style=flat-square)](https://david-dm.org/karma-runner/karma-coffee-preprocessor#info=devDependencies)

> Preprocessor to compile CoffeeScript on the fly.

## Installation

The easiest way is to keep `karma-coffee-preprocessor` as a devDependency. You can simply do it by:

```sh
npm install karma-coffee-preprocessor --save-dev
```

This package requires `karma` and `coffeescript` as peer dependencies. If your package manager doesn't install peer dependencies automatically, you will need to install them together:

```sh
npm install karma-coffee-preprocessor karma coffeescript --save-dev
```

## Configuration

Following code shows the default configuration

```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    preprocessors: {
      '**/*.coffee': ['coffee']
    },

    coffeePreprocessor: {
      // options passed to the coffee compiler
      options: {
        bare: true,
        sourceMap: false
      },
      // transforming the filenames
      transformPath: function(path) {
        return path.replace(/\.coffee$/, '.js')
      }
    },

    // make sure to include the .coffee files not the compiled .js files
    files: [
      '**/*.coffee'
    ]
  })
}
```

If you set the `sourceMap` coffee compiler option to `true` then the generated source map will be inlined as a data-uri.

Note that paths like "**/*.coffee" inside your "preprocessor" list will not match files where you are traversing up a directory (like "../app/*.coffee" inside your "files" list) or where your basePath goes up a directory. If you need to match these, use something like `preprocessors: { '../**/*.coffee': ['coffee'] }`.
----

For more information on Karma see the [homepage].


[homepage]: http://karma-runner.github.com
