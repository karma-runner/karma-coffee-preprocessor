module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],

    files: [
      '*.coffee'
    ],

    browsers: ['Firefox'],

    coffeePreprocessor: {
      options: {
        sourceMap: true
      }
    },

    preprocessors: {
      '**/*.coffee': 'coffee'
    },

    reporters: ['dots'],
    logLevel: 'INFO',

    plugins: [require('../../'), 'karma-jasmine', 'karma-firefox-launcher']
  })
}
