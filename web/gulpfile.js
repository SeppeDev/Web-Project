var gulp    	= require("gulp");
var cssNano 	= require("gulp-cssnano");
var concat  	= require("gulp-concat"); 
var batch       = require("gulp-batch");

gulp.task("css", function () {
    gulp.src(["assets/styles/*.css"])
        .pipe(concat("styles.min.css"))        
        .pipe(cssNano())
        .pipe(gulp.dest("dist/css"))
})

gulp.task("watch", function () {
	gulp.watch(["assets/styles/*.css"], batch(function(events, done) {
		gulp.start("css", done);
	}));
});

gulp.task("init", function () {
    gulp.start("css");
    gulp.start("watch");
});
