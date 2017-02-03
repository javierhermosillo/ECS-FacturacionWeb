const gulp = require("gulp");
const del = require("del");
const tsc = require("gulp-typescript");
//const minify = require("gulp-minify");
const uglify = require("gulp-uglify");
const sourcemaps = require('gulp-sourcemaps');
const tsProject = tsc.createProject("tsconfig.json");
const tslint = require('gulp-tslint');
var pump = require('pump');


/**
 * Remove build directory.
 */
gulp.task('clean', function(cb) {
    return del(["build"], cb);
});

/**
 * Compile TypeScript sources and create sourcemaps in build directory.
 */
gulp.task("compile", function() {
    var tsResult = gulp.src("app/**/*.ts")
        .pipe(sourcemaps.init())
        .pipe(tsc(tsProject));
    return tsResult.js
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("build/app"));
});

/**
 * Copy all resources that are not TypeScript files into build directory.
 */
gulp.task("resources", function(data) {
    pump([
        gulp.src(["app/**/*", "!app/**/*.ts"]),
        //uglify(),
        gulp.dest("build/app")
    ],data);    
});
gulp.task("resources-root", function() {
    return gulp.src(['*.*', '.*'])
        .pipe(gulp.dest("build"))
});
gulp.task("resources-index", function() {
    return gulp.src(["index.html"])
        .pipe(gulp.dest("build"))
});
gulp.task("resources-images", function() {
    return gulp.src(["!app/**/*.ts","images/**/*"])
        .pipe(gulp.dest("build/Images"))
});
gulp.task("resources-styles", function () {
    return gulp.src(["!app/**/*.ts","styles/**/*"])
        .pipe(gulp.dest("build/Styles"))
});
gulp.task("resources-fonts", function() {
    return gulp.src(["!app/**/*.ts","fonts/**/*"])
        .pipe(gulp.dest("build/Fonts"))
});

/**
 * Copy all required libraries into build directory.
 */
gulp.task("libs", function() {
    return gulp.src([
            'core-js/client/shim.min.js',
            'core-js/client/shim.min.js.map',
            'systemjs/dist/system-polyfills.js',
            'systemjs/dist/system.src.js',
            'reflect-metadata/Reflect.js',
            'reflect-metadata/Reflect.js.map',
            'rxjs/**',
            'lodash/**',
            'zone.js/dist/**',
            'ng2-toastr/**',
            '@angular/**',
            'angular2-text-mask/**',
            'Bootstrap/dist/js/**',
            'angular2-jwt/angular2-jwt.js',
            'angular2-jwt/angular2-jwt.js.map',
            'jquery/dist/jquery.min.js'
        ], {cwd: "node_modules/**"}) /* Glob required here. */
        .pipe(gulp.dest("build/node_modules"));
});

/**
 * Build the project.
 */
gulp.task("build", ['compile', 'resources','resources-root', 'resources-index','resources-images','resources-fonts','resources-styles', 'libs'], function() {
    console.log("Building the project ...")
});