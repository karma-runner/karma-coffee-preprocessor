'use strict'

module.exports = (grunt) => {
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
        'gruntfile.js'
      ]
    },
    karma: {
      options: {
        singleRun: true
      },
      simple: {
        configFile: 'examples/simple/karma.conf.js'
      }
    }
  })

  require('load-grunt-tasks')(grunt)

  grunt.registerTask('test', ['karma'])
  grunt.registerTask('default', ['eslint', 'test'])

  grunt.registerTask('release', 'Bump the version and publish to NPM.', (type) => {
    grunt.task.run([
      'npm-contributors',
      'bump-only:' + (type || 'patch'),
      'conventionalChangelog',
      'bump-commit',
      'npm-publish'
    ])
  })
}
