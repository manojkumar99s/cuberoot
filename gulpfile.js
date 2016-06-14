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
    newer= require('gulp-newer'),
    watch = require('gulp-watch'),
    gutil = require('gulp-util'),
    changed = require('gulp-changed'),
    jshint = require('gulp-jshint'),
    less = require('gulp-less'),
    minifyCss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename')
;


// Lint task
gulp.task('lint', function() {
    return gulp
        .src('src/main/webapp/static/js/controllers/**/*.js')                 // lint core JS file. Or specify another path
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


// Compile our less files
gulp.task('less', function() {
    return gulp
        .src('src/main/webapp/static/less/_main/*.less')              // locate /less/ folder root to grab 4 main files
        .pipe(less())                                 // compile
        .pipe(gulp.dest('assets/css'))                // destination path for normal CSS
        .pipe(minifyCss({                             // minify CSS
            keepSpecialComments: 0                    // remove all comments
        }))
        .pipe(rename({                                // rename file
            suffix: ".min"                            // add *.min suffix
        }))
        .pipe(gulp.dest('src/main/webapp/static/css'));               // destination path for minified CSS
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
    return gulp
        .src('src/main/webapp/static/js/core/app.js')                 // path to app.js file
        .pipe(uglify())                               // compress JS
        .pipe(rename({                                // rename file
            suffix: ".min"                            // add *.min suffix
        }))
        .pipe(gulp.dest('src/main/webapp/static/js/core/'));          // destination path for minified file
});


// Default task
gulp.task('default', [                                // list of default tasks
    'lint',                                           // lint
    'less',                                           // less compile
    'concatenate',                                  // uncomment if in use
    //'minify_core',                                    // compress app.js
    'watch'                                           // watch for changes
]);

var 
	sourceStatic = './src/main/webapp/static',  
//	destinationStatic = '/home/vr/sts-bundle/pivotal-tc-server-developer-3.1.3.SR1/base-instance/webapps/CuberootWeb/static',
    destinationStatic = '/home/vr/tomcat/webapps/CuberootWeb/static',

	sourceViews = './src/main/webapp/WEB-INF/views',
//	destinationViews = '/home/vr/sts-bundle/pivotal-tc-server-developer-3.1.3.SR1/base-instance/webapps/CuberootWeb/WEB-INF/views'
    destinationViews = '/home/vr/tomcat/webapps/CuberootWeb/WEB-INF/views'
;

gulp.task('copyStatic', function() {
	  gulp.src(sourceStatic + '/**/*', {base: sourceStatic})
      .pipe(newer(destinationStatic))
	    .pipe(gulp.dest(destinationStatic));
});

gulp.task('copyViews', function() {
	gulp.src(sourceViews + '/**/*', {base: sourceViews})
    .pipe(newer(destinationViews))
	.pipe(gulp.dest(destinationViews));
});

gulp.task('copy',	
     [
	  'copyViews',
	  'copyStatic'                                    
    ]
);

// Watch files for changes
gulp.task('watch',['copy'] ,function() {
    gulp.watch('src/main/webapp/**/*', [             // listen for changes in app.js file and automatically compress
        //'lint',                                       // lint
        //'concatenate',                              // concatenate & minify JS files (uncomment if in use)
        //'minify_core',                                 // compress app.js
        //'less',
        'copy'
    ]);
    //gulp.watch('src/main/webapp/static/less/**/*.less', ['less']);    // listen for changes in all LESS files and automatically re-compile
});

gulp.task('watchy', function() {

    // Add the newer pipe to pass through newer files only
    return gulp.src(sourceStatic)
        .pipe(newer(destinationStatic))
        .pipe(gulp.dest(destinationStatic));

});
