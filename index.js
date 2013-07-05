var coffee = require('coffee-script');

var createCoffeePreprocessor = function(args, config, logger, helper) {
  config = config || {};

  var log = logger.create('preprocessor.coffee');
  var defaultOptions = {
    bare: true
  };
  var options = helper.merge(defaultOptions, args.options || {}, config.options || {});

  var transformPath = args.transformPath || config.transformPath || function(filepath) {
    return filepath.replace(/\.coffee$/, '.js');
  };

  return function(content, file, done) {
    var processed = null;

    log.debug('Processing "%s".', file.originalPath);
    file.path = transformPath(file.originalPath);

    try {
      processed = coffee.compile(content, options);
    } catch (e) {
      log.error('%s\n  at %s', e.message, file.originalPath);
    }

    done(processed);
  };
};

createCoffeePreprocessor.$inject = ['args', 'config.coffeePreprocessor', 'logger', 'helper'];

// PUBLISH DI MODULE
module.exports = {
  'preprocessor:coffee': ['factory', createCoffeePreprocessor]
};
