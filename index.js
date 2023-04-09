const { compile } = require('coffeescript')
const { basename } = require('path')

const createCoffeePreprocessor = function (args, logger, helper, config = {}) {
  const log = logger.create('preprocessor.coffee')

  const defaultOptions = {
    bare: true,
    sourceMap: false
  }
  const options = helper.merge(defaultOptions, args.options || {}, config.options || {})

  const transformPath = args.transformPath || config.transformPath || function (filepath) {
    return filepath.replace(/\.coffee$/, '.js')
  }

  return function (content, file, done) {
    const { originalPath } = file
    log.debug('Processing "%s".', originalPath)
    const path = transformPath(originalPath)
    file.path = path

    // Clone the options because coffee.compile mutates them
    const opts = Object.assign({}, options)

    let result
    try {
      result = compile(content, opts)
    } catch (e) {
      log.error('%s\n  at %s:%d', e.message, originalPath, e.location.first_line)
      return done(e, null)
    }

    const { js, v3SourceMap } = result
    if (v3SourceMap) {
      const map = JSON.parse(v3SourceMap)
      map.sources[0] = basename(originalPath)
      map.sourcesContent = [content]
      map.file = basename(path)
      file.sourceMap = map
      const data = Buffer.from(JSON.stringify(map)).toString('base64')
      const datauri = `data:application/json;charset=utf-8;base64,${data}`
      done(null, `${js}\n//# sourceMappingURL=${datauri}\n`)
    } else {
      done(null, js || result)
    }
  }
}

createCoffeePreprocessor.$inject = ['args', 'logger', 'helper', 'config.coffeePreprocessor']

// PUBLISH DI MODULE
module.exports = {
  'preprocessor:coffee': ['factory', createCoffeePreprocessor]
}
