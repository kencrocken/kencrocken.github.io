// npm install gulp-util gulp-ruby-sass gulp-autoprefixer gulp-jshint gulp-uglify gulp-image-optimization gulp-rename gulp-concat gulp-notify imagemin-pngquant del browser-sync --save-dev

var gulp         = require('gulp'),
    gutil        = require('gulp-util'),
    sass         = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    jshint       = require('gulp-jshint'),
    uglify       = require('gulp-uglify'),
    imageop      = require('gulp-image-optimization'),
    pngquant     = require('imagemin-pngquant'),
    rename       = require('gulp-rename'),
    concat       = require('gulp-concat'),
    notify       = require('gulp-notify'),
    del          = require('del'),
    browserSync  = require('browser-sync');

var format = ['./img/**/*.png','./img/**/*.jpg','./img/**/*.gif','./img/**/*.jpeg'],
    reload = browserSync.reload;


// SASS
gulp.task('sass', function () {
  gulp.src('./sass/**/*.scss')
    .pipe(sass({
             style: 'nested',
             loadPath: [
                 './sass',
                 './bower_components/bourbon/dist',
                './bower_components/neat/app/assets/stylesheets',
                 './bower_components/fontawesome/scss',
             ]
         }) 
            .on("error", notify.onError(function (error) {
                 return "Error: " + error.message;
             }))) 
    // .pipe(autoprefixer('last 2 version', 'safari 5', 'ios 6', 'android 4'))
    .pipe(gulp.dest('./css'))
    .pipe(reload({stream: true}))
    .pipe(notify({
      message: "You just got super Sassy!"
    }));;
});


// UGLIFY
gulp.task('js', function() {
  // main app js file
  gulp.src(['./scripts/**/*.js' ])
  .pipe(jshint('.jshintrc'))
  .pipe(jshint.reporter('default'))
  .pipe(concat("main.js"))

  .pipe(gulp.dest('./js'))

  // create 1 vendor.js file from all vendor plugin code
    gulp.src([
        './bower_components/jquery/dist/jquery.js',  
        './bower_components/scrollReveal.js/dist/*.js',
        './bower_components/underscore/underscore.js',
        './bower_components/angular/angular.js',
        './bower_components/angular-animate/angular-animate.js'        
        ])
    .pipe(concat("vendor.js"))

    .pipe(gulp.dest('./js'))
    .pipe( notify({ message: "Javascript is now ugly!"}));
});

// ICONS
gulp.task('icons', function() { 
    return gulp.src('./bower_components/fontawesome/fonts/**.*') 
        .pipe(gulp.dest('./fonts'))
        .pipe( notify({ message: "You got fonts."}));
});

// IMAGES
gulp.task('images', function(cb) {
    gulp.src(format)
    .pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })
      .on("error", notify.onError(function (error) {
                 return "Error: " + error.message;
        }))) 
    .pipe(gulp.dest('./images')).on('end', cb).on('error', cb)
    .pipe(notify({ message: 'Images task complete' }));
});

// JEKYLL
// Start a `jekyll build` task
// From: http://stackoverflow.com/questions/21293999/use-jekyll-with-gulp
gulp.task('jekyll-build', function() {
    require('child_process').spawn('jekyll', ['build', '--config=_config.yml'], {stdio: 'inherit'});
});

// BROKEN TASK DO NOT USE Start a `jekyll build --watch` task
// gulp.task('jekyll-watch', function() {
//     require('child_process').spawn('jekyll', ['build', '--watch', '--config=_config.yml'], {stdio: 'inherit'});
// });

gulp.task('jekyll-serve', function() {
    require('child_process').spawn('jekyll', ['serve', '--config=_config.yml'], {stdio: 'inherit'});
});

// BROWSERSYNC
gulp.task('browser-sync', function(){
    browserSync({
        //proxy the jekyll server
        proxy: "http://localhost:4000",
        //long delay needed to allow jekyll-build to complete
        reloadDelay: 10000
    });
});

// BUILD
gulp.task('build', ['sass', 'js', 'icons', 'images'],function(){
    gulp.start('jekyll-build');
});

// CLEAN
gulp.task('clean', function(cb) {
    del(['./css/main.css', './js', './images'], cb)
});

// BUILD and RELOAD
gulp.task('site-reload', ['jekyll-build'], function(){
    gulp.start(reload);
});

// WATCH - on change; complie, build, reload
gulp.task('watch', function() {

  // Watch .scss files
    gulp.watch('./sass/**/*.scss', ['sass', 'site-reload']);

  // Watch .js files
    gulp.watch('./scripts/**/*.js', ['js', 'site-reload']);

  // Watch image files
    gulp.watch('./images/**/*', ['images', 'site-reload']);

    gulp.watch('./_includes/**/*', ['site-reload']);

    gulp.watch('./_layouts/**/*', ['site-reload']);
});

// DEFAULT
gulp.task('default', ['clean'], function() {
    gulp.start('build');
    gulp.start('browser-sync', 'watch');
});


