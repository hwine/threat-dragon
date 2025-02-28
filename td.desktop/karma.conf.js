module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'browserify'],

    // list of files / patterns to load in the browser
    files: [
      { pattern: 'node_modules/babel-polyfill/browser.js', instrument: false},
        'node_modules/angular/angular.js',
        'node_modules/angular-mocks/angular-mocks.js',
        'test/**/*.js'
    ],

    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'app/**/*.html': ['ng-html2js'],
        'app/**/*.json': ['browserify'],
        'test/**/*.js': ['browserify'],
        'test/**/*.json': ['browserify']
    },

    browserify: {
      transform: [
        require("browserify-istanbul")({
          ignore: '**/core/**',
          debug: true
        }),
        [
          'babelify', {
            presets: ['@babel/preset-env'],
            global: true,
            ignore: [/\/node_modules\/(?!jsonpath-plus\/)/]
          }
        ]
      ],
      debug: true
    },

    // test results reporter to use
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec', 'coverage', 'threshold'],

    //config for coverage reporter
    coverageReporter: {
        reporters: [{ type: 'lcov' }]
    },

    //config for threshhold reporter
    thresholdReporter: {
      statements: 80,
      branches: 70,
      functions: 75,
      lines: 80
    },

    //config for ngHtml2JsPreprocessor
    ngHtml2JsPreprocessor: {
    },

    // web server port
    port: 5858,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Electron'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
