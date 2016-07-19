/* ------------------------------------------------------------------------------
 *
 *  # Gulp file
 *
 *  Basic Gulp tasks for Limitless template
 *
 *  Version: 1.0
 *  Latest update: Dec 2, 2015
 *
 * ---------------------------------------------------------------------------- */


// Include gulp
var
    gulp = require('gulp'),

// Include our plugins
    run = require('run-sequence'),
    debug = require('gulp-debug'),
    newer= require('gulp-newer'),
    watch = require('gulp-watch'),
    gutil = require('gulp-util'),
    changed = require('gulp-changed'),
    jshint = require('gulp-jshint'),
    less = require('gulp-less'),
    minifyCss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync').create(),
    Promise = require('es6-promise').Promise
;

//var $ = require('gulp-load-plugins')();

// Lint task
gulp.task('lint', function() {
    return new Promise(function(resolve, reject){
        setTimeout(function(){
         gulp
            .src('src/main/webapp/static/js/controllers/**/*.js')                 // lint core JS file. Or specify another path
            .pipe(jshint())
            .pipe(jshint.reporter('default'));

            resolve();

        }, 10);
    });
});

var lessSrc = 'src/main/webapp/static/less/_main/';
var lessDest = 'src/main/webapp/static/css';

// Compile our less files
gulp.task('less', function() {
    return new Promise(function(resolve, reject){
        setTimeout(function(){

        gulp
            .src(lessSrc+'/*.less', {base: lessSrc})              // locate /less/ folder root to grab 4 main files
            .pipe(changed( lessDest, {extension: '.less'}))
            .pipe(debug())
            .pipe(less())                                 // compile
            .pipe(gulp.dest(lessDest))                // destination path for normal CSS
            .pipe(minifyCss({                             // minify CSS
                keepSpecialComments: 0                    // remove all comments
            }))
            .pipe(rename({                                // rename file
                suffix: ".min"                            // add *.min suffix
            }))
            .pipe(gulp.dest(lessDest));              // destination path for minified CSS
            //.pipe(debug())

        resolve();

        }, 10);
    });
});


// Concatenate & minify JS (uncomment if you want to use)
/*gulp.task('concatenate', function() {
 return gulp
 .src('assets/js/*.js')                        // path to js files you want to concat
 .pipe(concat('all.js'))                       // output file name
 .pipe(gulp.dest('assets/js'))                 // destination path for normal JS
 .pipe(rename({                                // rename file
 suffix: ".min"                            // add *.min suffix
 }))
 .pipe(uglify())                               // compress JS
 .pipe(gulp.dest('assets/js'));                // destination path for minified JS
 });*/


// Minify template's core JS file
gulp.task('minify_core', function() {
    return new Promise(function(resolve, reject){
        setTimeout(function(){
     gulp
        .src('src/main/webapp/static/js/core/app.js')                 // path to app.js file
        .pipe(uglify())                               // compress JS
        .pipe(rename({                                // rename file
            suffix: ".min"                            // add *.min suffix
        }))
        .pipe(gulp.dest('src/main/webapp/static/js/core/'));          // destination path for minified file
            resolve();

        }, 10);
    });
});


// Default task
gulp.task('default', [                                // list of default tasks
    'lint',                                           // lint
    'less',                                           // less compile
    'concatenate',                                  // uncomment if in use
    //'minify_core',                                    // compress app.js
    'watch'                                           // watch for changes
],function(){
    return new Promise(function(resolve, reject){
        setTimeout(function(resolve, reject){
            resolve();
        },10)
    })
});

var
    sourceStatic = './src/main/webapp/static',
//	destinationStatic = '/home/vr/sts-bundle/pivotal-tc-server-developer-3.1.3.SR1/base-instance/webapps/CuberootWeb/static',
    //destinationStatic = '/home/vr/tomcat/webapps/CuberootWeb/static',// old tomcat path
    destinationStatic = '/home/vr/apache-tomcat-7.0.64/webapps/CuberootWeb/static',

    sourceViews = './src/main/webapp/WEB-INF/views',
//	destinationViews = '/home/vr/sts-bundle/pivotal-tc-server-developer-3.1.3.SR1/base-instance/webapps/CuberootWeb/WEB-INF/views'
    //destinationViews = '/home/vr/tomcat/webapps/CuberootWeb/WEB-INF/views' // old tomcat path
    destinationViews = '/home/vr/apache-tomcat-7.0.64/webapps/CuberootWeb/WEB-INF/views'
    ;

gulp.task('copyStatic', function() {

    return new Promise(function(resolve, reject){
        setTimeout(function(){
            gulp.src(sourceStatic + '/**/*', {base: sourceStatic})
                .pipe(newer(destinationStatic))
                .pipe(debug())
                .pipe(gulp.dest(destinationStatic));

        resolve();

    }, 10);

    });
});

gulp.task('copyViews', function() {

    return new Promise(function(resolve, reject){
        setTimeout(function(){
            gulp.src(sourceViews + '/**/*', {base: sourceViews})
                .pipe(newer(destinationViews))
                .pipe(debug())
                .pipe(gulp.dest(destinationViews));
            resolve();

        }, 10);
    });

});

gulp.task('copy',
     [
      //'less',
	  'copyViews',
	  'copyStatic'
    ],function(){
        return new Promise(function(resolve, reject){
            setTimeout(function(){
                resolve();
            },10)
        })
    });


// Watch files for changes
gulp.task('watch',
    function() {
        return new Promise(function(resolve, reject){
            console.log('Watch started.')
            setTimeout(function(){
                gulp.watch('src/main/webapp/**/*.less',[
                    'less'
                ]).on('error', function() {console.log("got an error in less")});
                gulp.watch('src/main/webapp/**/*',[
                    'copy'
                ]).on('error', function() {console.log("got an error in copy")});
                resolve();

            }, 10);
        });
});


gulp.task('watchless',function(){
    gulp.watch('src/main/webapp/!**!/!*.less',[
        'less',
        'copy'
    ]);
});
