module.exports = function(config) {
  config.set({

    basePath: 'public/js',

    preprocessors: {
      '**/*.html': ['ng-html2js'],
      '!(angular|js-data)*/**/*.js': ['coverage']
    },

    frameworks: ['jasmine', 'sinon'],

    files: [
      '../../bower_components/jquery/dist/jquery.js',
      '../lib/angular/angular.js',
      '../lib/**/*.js',
      '../../bower_components/angular-mocks/angular-mocks.js',
      '../../test/karma.start.js',
      '../../test/*.js',

      '**/module.js',
      'app.js',

      '**/!(*-test).js',
      '**/*.html',
      '**/*-test.js'
    ],

    // Load templateUrls
    ngHtml2JsPreprocessor: {
      prependPrefix: '/js/',
      moduleName: 'templates'
    },

    reporters: ['dots'],

    coverageReporter: {
      reporters:[
        { type: 'text' },
        { type: 'text-summary' }
      ],
    },

    port: 9876,
    colors: true,

    logLevel: config.LOG_INFO,

    browsers: ['PhantomJS'],

    captureTimeout: 60000, // If browser does not capture in given timeout [ms], kill it
    reportSlowerThan: 500,

    autoWatch: true, // watch file and executing tests whenever any file changes

    singleRun: false
  });
};
