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
        require.resolve('rxjs/Rx.js'),
        //ToOD :This needs to be changed to use the latest angular 2 RC instead of the beloe beta
  //      require.resolve('angular2/bundles/angular2.dev.js'),
   //     require.resolve('angular2/bundles/router.dev.js'),
   //     require.resolve('angular2/bundles/http.dev.js'),

        //ToOD :This needs to be changed to use the latest angular 2 RC instead of the beloe beta
        
        // Polyfill Libraries
        require.resolve('es6-shim/es6-shim.min.js'),
        require.resolve('es6-shim/es6-shim.map'),
        require.resolve('zone.js/dist/zone.js'),
        require.resolve('reflect-metadata/Reflect.js'),
        require.resolve('reflect-metadata/Reflect.js.map'),
        
        
        
        //Angular 2 files
        require.resolve('@angular/common/index.js'),
        require.resolve('@angular/compiler/index.js'),
        require.resolve('@angular/core/index.js'),
        require.resolve('@angular/http/index.js'),
        require.resolve('@angular/platform-browser/index.js'),
        require.resolve('@angular/platform-browser-dynamic/index.js'),
        require.resolve('@angular/router/index.js')
        
        
    ]
};

// ToDO: Need to refactor this build.lib to have only the files that are required .
gulp.task('build.lib', function () {
 //   return gulp.src(config.lib, { base: config.libBase })
//  return gulp.src('./node_modules/**/*.js', { base: config.libBase })
//  return gulp.src(['./node_modules/**/*.js','./node_modules/**/*.map','./node_modules/**/*.css'], { base: config.libBase })
// Get only those modules that are defined as dependencies in the package.json instead of all node_modules
//TODO: Can be refactored further to get only the files needed -- may be dist folder 
return gulp.src([
    './node_modules/@angular/**/*.js*','./node_modules/@angular/**/*.map',
    './node_modules/systemjs/**/*.js','./node_modules/systemjs/**/*.map',
    './node_modules/es6-shim/**/*.js','./node_modules/es6-shim/**/*.map',
    './node_modules/reflect-metadata/**/*.js','./node_modules/reflect-metadata/**/*.map',
    './node_modules/rxjs/**/*.js','./node_modules/rxjs/**/*.map',
    './node_modules/zone.js/**/*.js','./node_modules/zone.js/**/*.map',
    './node_modules/bootstrap/**/*.js','./node_modules/bootstrap/**/*.map',
    './node_modules/bootstrap/**/*.css'],
     { base: config.libBase })
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