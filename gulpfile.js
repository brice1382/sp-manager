var gulp       = require('gulp');
var karma      = require('karma').server;
var concat     = require('gulp-concat');
var uglify     = require('gulp-uglify');
var rename     = require('gulp-rename');
var ngAnnotate = require('gulp-ng-annotate');
var inject     = require('gulp-inject-string');
var cpy        = require('gulp-copy');
var sq         = require('gulp-sequence');
var bump        = require('gulp-bump');
var semver      = require('semver');
var fs         = require('fs');

gulp.task('build', function() {
    gulp.src('src/spManager/**/*.js')
        .pipe(concat('sp-manager.js'))
        .pipe(inject.wrap("(function() {\n\t'use strict';\n\n", "\n}());"))
        .pipe(ngAnnotate())
        .pipe(gulp.dest('./dist/'))
        .pipe(uglify())
        .pipe(rename('sp-manager.min.js'))
        .pipe(gulp.dest('./dist'))
});

gulp.task('note-builder', function() {
    var options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short',
        timeZone: 'America/New_York'
    };
    var date = ('\r\n' + 'Note Created On: ' + new Date().toLocaleString('en-US', options));
    gulp.src('notes.txt')
        .pipe(cpy('src-notes'))
        .pipe(gulp.dest('./dist'))
        .pipe(inject.wrap('', date))
        .pipe(inject.wrap("/** ", " */"))
        .pipe(rename('notes.js'))
        .pipe(gulp.dest('./dist/src-notes'))
        .pipe(uglify())
        .pipe(rename('sp-manager.min.js'))
        .pipe(gulp.dest('./dist/src-notes'))
});

gulp.task('test', function (done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done);
});

gulp.task('default', ['test', 'build']);

gulp.task('append-note', function () {
    gulp.src(['./dist/src-notes/notes.js', './dist/sp-manager.js'])
        .pipe(concat('sp-manager.js'))
        .pipe(gulp.dest('./dist/src-notes/'))
});

var getPackageJson = function () {
    return JSON.parse(fs.readFileSync('./package.json', 'utf8'));
};

gulp.task('bump', function () {
    var pkg = getPackageJson();
    var newVer = semver.inc(pkg.version, 'patch');

    return gulp.src(['./bower.json', './package.json'])
        .pipe(bump({ version: newVer }))
        .pipe(gulp.dest('./'));
});

gulp.task('bump-minor', function () {
    var pkg = getPackageJson();
    var newVer = semver.inc(pkg.version, 'minor');

    return gulp.src(['./bower.json', './package.json'])
        .pipe(bump({ version: newVer }))
        .pipe(gulp.dest('./'));
});

gulp.task('bump-major', function () {
    var pkg = getPackageJson();
    var newVer = semver.inc(pkg.version, 'major');

    return gulp.src(['./bower.json', './package.json'])
        .pipe(bump({ version: newVer }))
        .pipe(gulp.dest('./'));
});

gulp.task('prerelease', function () {
    var pkg = getPackageJson();
    var newVer = semver.inc(pkg.version, 'prerelease', 'beta');

    return gulp.src(['./bower.json', './package.json'])
        .pipe(bump({ version: newVer }))
        .pipe(gulp.dest('./'));
});

gulp.task('reminder', ['note-builder', 'append-note']);

gulp.task('build:production', sq(['build', 'bump']));

gulp.task('build:release', sq(['build', 'bump-minor']));

