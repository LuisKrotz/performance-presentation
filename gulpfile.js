var LessAutoprefix = require('less-plugin-autoprefix'),
    gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    less = require('gulp-less'),
    cleanCSS = require('gulp-clean-css'),
    path = require('path'),
    extractMediaQuery = require('gulp-extract-media-query');

var autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });



// CSS
gulp.task('less', function () {
    return gulp.src(['./resources/assets/less/app.less'])
        .pipe(sourcemaps.init())
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')],
            plugins: [autoprefix]
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('minify-css', () => {
    return gulp.src(['./resources/vendor/css/*.css', 'public/css/app.css'])
        .pipe(concat('app.min.css'))
        .pipe(cleanCSS({ debug: true }, function (details) {
            console.log('');
            console.log('Uncompressed styles size:   ' + details.stats.originalSize);
            console.log('Compressed styles size:     ' + details.stats.minifiedSize);
            console.log('Stylesheet file name:       ' + details.name);
            console.log('');
            console.log('');
        }))
        .pipe(gulp.dest('public/css'));
});

gulp.task("build", function () {
    gulp.src("public/css/app.min.css")
        .pipe(extractMediaQuery({
            match: '(max-width: 320px)',
            postfix: '-320'
        }))
        .pipe(extractMediaQuery({
            match: '(max-width:375px)',
            postfix: '-375'
        }))
        .pipe(extractMediaQuery({
            match: '(max-width:640px)',
            postfix: '-640'
        }))
        .pipe(extractMediaQuery({
            match: '(max-width:767px)',
            postfix: '-767'
        }))
        .pipe(extractMediaQuery({
            match: '(max-width:1024px)',
            postfix: '-1024'
        }))
        .pipe(extractMediaQuery({
            match: '(max-width:1279px)',
            postfix: '-1279'
        }))
        .pipe(extractMediaQuery({
            match: '(max-width:1366px)',
            postfix: '-1366'
        }))
        .pipe(extractMediaQuery({
            match: '(max-width:1920px)',
            postfix: '-1920'
        }))
        .pipe(gulp.dest('./public/css/app'));
});



// Scripts
gulp.task('sw', function () {
    return gulp.src('./resources/assets/js/sw.js')
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(uglify())
        .pipe(gulp.dest('./public/'));
});

gulp.task('base', function () {
    return gulp.src(['./resources/assets/js/vendor/webfont-1.6.26.js',
            './resources/assets/js/vendor/modernizr 3.5.0.min.js',
            './resources/assets/js/minimal.js'
        ])
        .pipe(sourcemaps.init())
        .pipe(concat('base.min.js'))
        .pipe(sourcemaps.write())
        .pipe(uglify())
        .pipe(gulp.dest('./public/js/'));
});

gulp.task('scripts', function () {
    return gulp.src(['./resources/assets/js/vendor/blazy-1.8.2.min.js',
                    './resources/assets/js/analytics.js',
                    './resources/assets/js/app.js',
                    './resources/assets/js/components/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        .pipe(sourcemaps.write())
        .pipe(uglify())
        .pipe(gulp.dest('./public/js/'));
});


gulp.task('default', ['sw', 'base', 'scripts', 'less', 'minify-css', 'build']);

gulp.task('watch', function () {
    gulp.watch(['./resources/assets/less/*.less', './resources/assets/less/**/*.less', './resources/assets/js/*', './resources/assets/js/**/*'], ['default']);
});