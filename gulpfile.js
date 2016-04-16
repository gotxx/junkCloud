'use strict';

var gulp = require('gulp'),
	// sass = require('gulp-sass'),
	compass = require('gulp-compass'),
	useref = require('gulp-useref'),
	gulpIf = require('gulp-if'),
	uglify = require('gulp-uglify'),
	cssnano = require('gulp-cssnano'),
	imagemin = require('gulp-imagemin'),
	cache = require('gulp-cache'),
	del = require('del'),
	runSequence = require('run-sequence'),
	browserSync = require('browser-sync').create();

// sass tasks
/*gulp.task('sass', function() {
	return gulp.src('app/assets/scss/style.scss')
		.pipe(sass()) //Converts Sass to CSS with gulp-sass
		.pipe(gulp.dest('app/assets/css'));
});*/

//compass compilation task
gulp.task('compass', function() {
	return gulp.src('app/assets/scss/**/*.scss')
		.pipe(compass({
			config_file: 'app/config.rb',
			css: 'app/assets/css',
			sass: 'app/assets/scss'
		}))
		.pipe(gulp.dest('app/assets/temp'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

//compass watch task
gulp.task('watch', ['browserSync','compass'], function() {
	gulp.watch('app/assets/scss/**/*.scss', ['compass']); 
	gulp.watch('app/*.html', browserSync.reload); 
	gulp.watch('app/assets/js/**/*.js', browserSync.reload);
});

//lunch server from app folder
gulp.task('browserSync', function() {
	return browserSync.init({
		server: {
			baseDir: 'app'
		},
	});
});

/*gulp.task('useref', function() {
	return gulp.src('app/*.html')
		.pipe(useref())
		// Minifies only if it's a JavaScript file
		.pipe(gulpIf('*.js', uglify()))
		.pipe(gulp.dest('dist'))
});*/

//minify js and css
gulp.task('useref', function(){
	return gulp.src('app/*.html')
		.pipe(useref())
		.pipe(gulpIf('app/*.js', uglify()))
		// Minifies only if it's a CSS file
		.pipe(gulpIf('app/*.css', cssnano()))
		.pipe(gulp.dest('dist'))
});

//minify images
gulp.task('images', function(){
	return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
		// Caching images that ran through imagemin
		.pipe(cache(imagemin({
			interlaced: true
		})))
		.pipe(gulp.dest('dist/images'))
});

//copy fonts
gulp.task('fonts', function() {
  	return gulp.src('app/assets/fonts/**/*')
  		.pipe(gulp.dest('dist/assets/fonts'))
})

//clear dist
gulp.task('clean:dist', function() {
  	return del.sync('dist');
})

//clear cache
gulp.task('cache:clear', function (callback) {
	return cache.clearAll(callback)
})

//build
gulp.task('build', function (callback) {
  console.log('Building files');
  runSequence('clean:dist', 
    ['compass', 'useref', 'images', 'fonts'],
    callback
  )
})

//default watch with sync
gulp.task('default', function (callback) {
  runSequence(['compass','browserSync', 'watch'],
    callback
  )
})