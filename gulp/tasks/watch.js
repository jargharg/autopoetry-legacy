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
	
	watch("./index.html", function() {
		browserSync.reload()
	})
	
	watch("./app/css/**/*.css", function(){
		gulp.start("cssInject")
	})

	watch("./app/js/**/*.js", function(){
		gulp.start("scriptsRefresh")
	})
})

gulp.task("cssInject", ["styles"], function(){
	return gulp.src("./dist/css/styles.css")
	.pipe(browserSync.stream())
})

gulp.task("scriptsRefresh", ["scripts"], function(){
	browserSync.reload()
})