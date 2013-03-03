var coffee = require('coffee-script');

var createCoffeePreprocessor = function(logger, basePath) {
  var log = logger.create('preprocessor.coffee');

  return function(content, file, done) {
    var processed = null;

    log.debug('Processing "%s".', file.originalPath);
    file.path = file.originalPath.replace(/\.coffee$/, '.js');

    try {
      processed = coffee.compile(content, {bare: true});
    } catch (e) {
      log.error('%s\n  at %s', e.message, file.originalPath);
    }

    done(processed);
  };
};

createCoffeePreprocessor.$inject = ['logger', 'config.basePath'];

// PUBLISH DI MODULE
module.exports = {
  'preprocessor:coffee': ['factory', createCoffeePreprocessor]
};
