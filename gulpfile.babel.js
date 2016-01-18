'use strict';

import source from 'vinyl-source-stream';
import gulp from 'gulp';
import browserify from 'browserify';
import babelify from 'babelify';
import run from 'run-sequence';
import rimraf from 'rimraf';
import shell from 'gulp-shell';
import server from 'gulp-live-server';
import babel from 'gulp-babel';

const paths = {
  src: './src',
  publicSrc: './public/js',
  dest: './app',
  bundle: 'bundle.js',
  bundleDest: './app/public/js',
  mainJs: './public/js/index'
};
//Catch the server instance
let express;

gulp.task('default', cb => {
  run('server', 'build', 'watch', cb);
});

gulp.task('build', cb =>{
  run('clean', 'babel', 'client', 'restart', cb);
});

//build when a file has changed
gulp.task('watch', cb => {
    gulp.watch([
      `${paths.src}/**.js`,
      `${paths.publicSrc}/**.jsx`
    ], ['build']);
});

/*
  Server
*/
gulp.task('server', () => {
  express = server.new(paths.dest);
});

gulp.task('restart', () =>{
  express.start.bind(express)();
});

//Clean the app destination, to prepare for new files
gulp.task('clean', cb => {
  rimraf(paths.dest, cb);
});

//Transform back-end ES6 to ES5
//only transform features not supported by node v5
gulp.task('babel', cb => {
  return gulp.src(`${paths.src}/**/*.js`)
  .pipe(babel({
    presets: ['es2015-node5', 'stage-0']
  }))
  .pipe(gulp.dest(paths.dest));
});

/*
  Client
*/
//Transform client ES6 to ES5
//With react support
gulp.task('client', cb => {
    return browserify({entries: paths.mainJs, extensions: ['.jsx'], debug: true})
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle()
        .pipe(source(paths.bundle))
        .pipe(gulp.dest(paths.bundleDest));
});
