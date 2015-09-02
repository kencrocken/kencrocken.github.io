// npm install gulp-util gulp-jshint gulp-uglify gulp-image-optimization gulp-rename gulp-concat gulp-notify imagemin-pngquant del browser-sync --save-dev

var gulp         = require('gulp'),
    gutil        = require('gulp-util'),
    sass         = require('gulp-ruby-sass'),
    sourcemaps   = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer')
    jshint       = require('gulp-jshint'),
    uglify       = require('gulp-uglify'),
    imageop      = require('gulp-image-optimization'),
    pngquant     = require('imagemin-pngquant'),
    svgmin       = require('gulp-svgmin'),
    svgSymbols   = require('gulp-svg-symbols'),
    rename       = require('gulp-rename'),
    concat       = require('gulp-concat'),
    notify       = require('gulp-notify'),
    del          = require('del'),
    browserSync  = require('browser-sync');

var format = ['./img/**/*.png','./img/**/*.jpg','./img/**/*.gif','./img/**/*.jpeg'],
    jekyllFiles = ['./_includes/**.*','./_layouts/**.*','./_posts/**.*', './_data/**.*'],
    reload = browserSync.reload;

gulp.task('bourbon', function() {
    gulp.src('./bower_components/fontawesome/scss/**/*.scss') 
        .pipe(gulp.dest('./sass/fontawesome'))
    gulp.src('./bower_components/bourbon/dist/**/*.scss') 
        .pipe(gulp.dest('./sass/bourbon'))
    gulp.src('./bower_components/neat/app/assets/stylesheets/**/*.scss') 
        .pipe(gulp.dest('./sass/neat'));
});

//  Compile sass
gulp.task('sass', function () {
    return sass('sass/main.scss', {

            sourcemap: true,
            loadPath: [
                './bower_components/fontawesome/scss',
                './bower_components/bourbon/dist',
                './bower_components/neat/app/assets/stylesheets',
                './bower_components/onepage-scroll'
            ]

        })
        .on("error", notify.onError(function (error) {
                 return "Error: " + error.message;
         }))
        .pipe(autoprefixer({
            browsers: [
              'last 2 versions',
              'ie 9',
              'ios 6',
              'android 4'
            ],
            cascade: true
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('css/'))
        .pipe(browserSync.stream());
});

// Concat vendor scripts
gulp.task('js', function() {

  // create 1 vendor.js file from all vendor plugin code
    gulp.src([
        './bower_components/jquery/dist/jquery.js',  
        './bower_components/scrollReveal.js/dist/*.js',
        './bower_components/underscore/underscore.js',
        './bower_components/headroom.js/dist/headroom.js',
        './bower_components/onepage-scroll/jquery.onepage-scroll.js',    
        './bower_components/angular/angular.js',
        './bower_components/angular-scroll/angular-scroll.js',
        './bower_components/ngSmoothScroll/angular-smooth-scroll.js',
        './bower_components/headroom.js/dist/angular.headroom.js',      
        ])
    .pipe(concat("vendor.js"))
    .pipe(gulp.dest('./scripts'))
    .pipe( notify({ message: "Vendor libraries complete."}));
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

// SVG SPRITES
gulp.task('sprites', function () {
  return gulp.src('./svg/**/*.svg')
    .pipe(svgmin({
            plugins: [{
                cleanupIDs: false
            }]
        }))
    .pipe(svgSymbols({
      templates: ['default-svg']
    })
        .on("error", notify.onError(function (error) {
                console.log(error);
                 return "Error: " + error.message;
         })))
    .pipe(gulp.dest('./_includes'));
});

// JEKYLL
// Start a `jekyll build` task
// From: http://stackoverflow.com/questions/21293999/use-jekyll-with-gulp
gulp.task('jekyll-build',function() {
    require('child_process').spawn('jekyll', ['build', '--config=_config.yml'], {stdio: 'inherit'});
});

// Start a `jekyll build --watch` task
gulp.task('jekyll-watch', function() {
    require('child_process').spawn('jekyll', ['build', '--watch', '--config=_config.yml'], {stdio: 'inherit'});
});

// Start a `jekyll serve` task
gulp.task('jekyll-serve', function() {
    require('child_process').spawn('jekyll', ['serve', '--config=_config.yml'], {stdio: 'inherit'});
});

// BROWSERSYNC
gulp.task('browser-sync', function(){
    browserSync({
        server: {
            baseDir: "./_site"
        },
        port: 3000,
        //proxy the jekyll server
        //proxy: "http://localhost:4000"
        //long delay needed to allow jekyll-build to complete
        reloadDelay: 1500,
        ghostMode: true,
    });
});

// BUILD
gulp.task('build', ['sass', 'js', 'icons', 'images'], function(){
    gulp.start('jekyll-build');
});

// CLEAN
// gulp.task('clean', function(cb) {
//     del(['./css/main.css', './js', './images'], cb)
// });

// RELOAD
gulp.task('site-reload', ['jekyll-build'], function(){
    gulp.start(reload);
});

// WATCH - on change; complie, build, reload
gulp.task('watch', function() {

    // Watch Sass files
    gulp.watch('./sass/**/*',['sass']);
    gulp.watch('./css/**/*', ['jekyll-build'], reload);
    // Watch JS files
    gulp.watch('./scripts/**/*', ['js']);
    gulp.watch('./scripts/**/*.coffee', ['jekyll-build'], reload);
    // Watch _site files
    gulp.watch(jekyllFiles, ['site-reload']);
    // gulp.watch('./_site/**/*', ['site-reload']);

});

// DEFAULT
gulp.task('default', ['browser-sync','build'], function() {
    gulp.start('watch');
});


