###Getting started with ES6, Gulp, Babel, Browserify, React!


This repo was created to resolve the following issue:

http://stackoverflow.com/questions/34848085/react-es6-compiling-with-browserify-babel-and-gulp-issue-importing-components

You should be good just doing:

***npm install***

***gulp***

Props for Henrik Andersson who came up with [the solution](http://stackoverflow.com/a/34862442/2161256):

> You're creating multiple entry points for your app in your gulpfile.babel.js (Basically, you're creating two bundles).
> ```javascript
const paths = {
  src: './src',
  publicSrc: './public/js',
  dest: './app',
  bundle: 'bundle.js',
  bundleDest: './app/public/js',
  publicEntries: [
    './public/js/index',
    './public/js/components/test' <--- Remove this line.
  ]
};
```
> Browserify traverses all of your require calls (Babel transforms the import ... to require) and pieces them together when producing the bundle. Having multiple entry points are only used if you want to have one bundle for url /x and another bundle for /y.

