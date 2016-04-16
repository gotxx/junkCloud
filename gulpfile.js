var gulp = require('gulp'),
	// sass = require('gulp-compass'),
	compass = require('gulp-compass');

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
    .pipe(gulp.dest('app/assets/temp'));
});

//compass watch task
gulp.task('watch', function() {
	gulp.watch('app/assets/scss/**/*.scss', ['compass']); 
});
