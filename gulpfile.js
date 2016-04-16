var gulp = require('gulp'),
	// sass = require('gulp-sass'),
	compass = require('gulp-compass'),
	useref = require('gulp-useref'),
	uglify = require('gulp-uglify'),
	gulpIf = require('gulp-if'),
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


gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: 'app'
		},
	});
});

gulp.task('useref', function() {
	return gulp.src('app/*.html')
		.pipe(useref())
		// Minifies only if it's a JavaScript file
		.pipe(gulpIf('*.js', uglify()))
		.pipe(gulp.dest('dist'))
});