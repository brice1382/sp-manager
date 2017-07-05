//jshint strict: false
module.exports = function(config) {
    config.set({

        // Base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: './dist',

        // List of files / patterns to load in the browser
        files: [
            '../bower_components/angular/angular.js',
            '../bower_components/angular-mocks/angular-mocks.js',
            'sp-manager.js'
        ],

        // List of files to exclude
        exclude: [
        ],

        // Enable / Disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // Frameworks to use during testing
        frameworks: ['mocha', 'chai-jquery', 'jquery-3.2.1', 'sinon-chai'],

        // Start this/these web browsers
        browsers: ['Chrome'],

        plugins: [
            'karma-mocha',
            'karma-chai',
            'karma-sinon-chai',
            'karma-chrome-launcher',
            'karma-jquery',
            'karma-chai-jquery',
            'karma-mocha-reporter'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        },

        port: 6969,

        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        colors: true,

        // If false, Continuous Integration mode
        // If true, Karma captures browsers, runs the tests and exits
        singleRun: false
    });
};