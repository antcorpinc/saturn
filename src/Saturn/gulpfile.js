/// <binding BeforeBuild='default' Clean='clean' />
/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/
var path = require('path');
var gulp = require('gulp');
var del = require('del');
var eventStream = require('event-stream');
var typescript = require('gulp-typescript');
var inlineNg2Template = require('gulp-inline-ng2-template');
var sourcemaps = require('gulp-sourcemaps');

var project = require("./project.json");
var webroot = "./wwwroot/";

var config = {
    libBase: 'node_modules',
    lib: [
        
        require.resolve('systemjs/dist/system.src.js'),
        //ToOD :This needs to be changed to use the latest angular 2 RC instead of the beloe beta
        require.resolve('angular2/bundles/angular2.dev.js'),
        require.resolve('angular2/bundles/router.dev.js'),
        require.resolve('angular2/bundles/http.dev.js')

        //ToOD :This needs to be changed to use the latest angular 2 RC instead of the beloe beta
    ]
};


gulp.task('build.lib', function () {
    return gulp.src(config.lib, { base: config.libBase })
        .pipe(gulp.dest(webroot + 'lib'));
});

gulp.task('build-prod', ['build.lib'], function () {
    var tsProject = typescript.createProject('./tsconfig.json', { typescript: require('typescript') });
    var tsSrcInlined = gulp.src([webroot + '**/*.ts'], { base: webroot })
        .pipe(inlineNg2Template({ base: webroot }));
    return eventStream.merge(tsSrcInlined, gulp.src('Typings/**/*.ts'))
        .pipe(sourcemaps.init())
        .pipe(typescript(tsProject))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(webroot));
});


gulp.task('build-dev', ['build.lib'], function () {

});

gulp.task('clean', function () {
    return del([webroot + 'lib']);
});

gulp.task('default', ['build-dev']);