var gulp = require("gulp"),
	del = require("del"),
	usemin = require("gulp-usemin"),
	rev = require("gulp-rev"),
	cssnano = require("gulp-cssnano"),
	uglify = require("gulp-uglify"),
	browserSync = require("browser-sync").create()

gulp.task("previewDocs", function() {
	browserSync.init({
		notify: false,
		server: {
			baseDir: "docs"
		}
	})
})

gulp.task("deleteDocsFolder", function() {
	return del("./docs")
})

gulp.task("copyGeneralFiles", ["deleteDocsFolder"], function() {
	var pathsToCopy = [
		"./app/**/*",
		"!./app/index.html",
		"!./app/assets/js",
		"!./app/assets/js/**",
		"!./app/assets/css",
		"!./app/assets/css/**",
		"!./app/temp",
		"!./app/temp/**"
	]
	return gulp.src(pathsToCopy).pipe(gulp.dest("./docs"))
})

gulp.task("useminTrigger", ["deleteDocsFolder"], function() {
	gulp.start("usemin")
})

gulp.task("usemin", ["styles", "scripts"], function() {
	return gulp
		.src("./app/index.html")
		.pipe(
			usemin({
				css: [
					function() {
						return rev()
					},
					function() {
						return cssnano()
					}
				],
				js: [
					function() {
						return rev()
					},
					function() {
						return uglify()
					}
				]
			})
		)
		.pipe(gulp.dest("./docs"))
})

gulp.task("build", ["deleteDocsFolder", "useminTrigger", "copyGeneralFiles"])
