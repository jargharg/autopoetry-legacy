var gulp = require("gulp"),
	postcss = require("gulp-postcss"),
	autoprefixer = require("autoprefixer"),
	cssVars = require("postcss-simple-vars"),
	nested = require("postcss-nested"),
	cssImport = require("postcss-import"),
	mixins = require("postcss-mixins")

gulp.task("styles", function() {
	return gulp
		.src("./app/assets/css/styles.css")
		.pipe(postcss([cssImport, mixins, cssVars, nested, autoprefixer]))
		.on("error", function(info) {
			this.emit("end")
			console.log(info.toString())
		})
		.pipe(gulp.dest("./app/temp/assets/css"))
})
