// npm install gulpjs/gulp#4.0
'use strict';

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    //livereload = require('gulp-livereload'),
    //plumber = require('gulp-plumber'),
    path_sized = 'scripts/sized/',
    path_mini = path_sized+'mini';

gulp.task('scripts', function(){
    gulp.src(path_sized+'*.js')
        //.pipe(plumber())
        .pipe(uglify())
        .on('error', console.error.bind(console))
        .pipe(gulp.dest(path_mini));
});
gulp.task('styles', function(){
    gulp.src(path_sized+'*.css')
        .pipe(cssmin()).pipe(gulp.dest(path_mini))/*
        .pipe(livereload())*/;
});
gulp.task('copy', function(){
    gulp.src(path_mini+'/*').pipe(gulp.dest(path_sized+'copy'))
});

gulp.task('watch', function(){
    //livereload.listen();
    gulp.watch(path_sized+'*',['scripts', 'styles', 'copy']);
});
gulp.task('default', ['scripts', 'styles', 'copy', 'watch']);
// gulp.series is not a function
//gulp.task('default', gulp.series('scripts', 'styles', 'watch'));
//gulp.task('default', gulp.parallel('scripts', 'styles', 'watch'));
/*
gulp.task('default', function(){
    gulp.src(path_sized+'*.js')
        .pipe(uglify()).pipe(gulp.dest(path_mini));
    gulp.src(path_sized+'*.css')
        .pipe(cssmin()).pipe(gulp.dest(path_mini));
});*/
