var gulp = require("gulp"),
	watch = require("gulp-watch"),
	browserSync = require("browser-sync").create()

gulp.task("watch", function(){
	browserSync.init({
		notify: false,
		server: {
			baseDir: "."
		}
	})
	
	watch("./app/index.html", function() {
		browserSync.reload()
	})
	
	watch("./app/assets/css/**/*.css", function(){
		gulp.start("cssInject")
	})

	watch("./app/assets/js/**/*.js", function(){
		gulp.start("scriptsRefresh")
	})
})

gulp.task("cssInject", ["styles"], function(){
	return gulp.src("./app/temp/assets/css/styles.css")
	.pipe(browserSync.stream())
})

gulp.task("scriptsRefresh", ["scripts"], function(){
	browserSync.reload()
})