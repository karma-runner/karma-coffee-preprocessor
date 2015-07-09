var changelog = require('conventional-changelog')
var Promise = require('bluebird')
var fs = require('fs')

var tags = [
  'v0.0.2',
  'v0.0.3',
  'v0.0.4',
  'v0.1.0',
  'v0.1.1',
  'v0.1.2',
  'v0.1.3',
  'v0.2.0',
  'v0.2.1'
]

Promise.all(tags.map(function (tag, i) {
  var options = {
    repository: 'https://github.com/karma-runner/karma-coffee-preprocessor',
    version: tag.replace(/^v/, ''),
    from: '80d7e13bd6b08ef330c5347d2c942865dbd86178',
    to: tag
  }
  if (i > 0) {
    options.from = tags[i - 1]
  }

  return new Promise(function (resolve, reject) {
    changelog(options, function (err, res) {
      if (err) return reject(err)
      console.log('Tag %s', options.version)
      resolve(res)
    })
  })
}))
.then(function (logs) {
  fs.writeFileSync('CHANGELOG.md', logs.reverse().join('\n'))
})
