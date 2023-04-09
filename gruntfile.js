module.exports = function (grunt) {
  grunt.initConfig({
    pkgFile: 'package.json',
    'npm-contributors': {
      options: {
        commitMessage: 'chore: update contributors'
      }
    },
    bump: {
      options: {
        commitMessage: 'chore: release v%VERSION%',
        pushTo: 'upstream',
        commitFiles: [
          'package.json',
          'CHANGELOG.md'
        ]
      }
    },
    conventionalChangelog: {
      release: {
        options: {
          changelogOpts: {
            preset: 'angular'
          }
        },
        src: 'CHANGELOG.md'
      }
    },
    eslint: {
      target: [
        'index.js',
        'gruntfile.js',
        'examples/plus/karma.conf.js'
      ]
    },
    karma: {
      example: {
        configFile: 'examples/plus/karma.conf.js'
      }
    }
  })

  require('load-grunt-tasks')(grunt)

  grunt.registerTask('default', ['eslint', 'karma'])

  grunt.registerTask('release', 'Bump the version and publish to NPM.', function (type) {
    grunt.task.run([
      'npm-contributors',
      'bump-only:' + (type || 'patch'),
      'conventionalChangelog',
      'bump-commit',
      'npm-publish'
    ])
  })
}
