let gulp = require('gulp');
let sass = require('gulp-sass');
let del = require('del');
let concat = require('gulp-concat');
let rev = require('gulp-rev');
let revCollector = require('gulp-rev-collector');
let revDel = require('gulp-rev-delete-original');
let zip = require('gulp-zip');
let gulpif = require('gulp-if');
let postcss = require('gulp-postcss');
let autoprefixer = require('autoprefixer');
let cssnano = require('cssnano');
let sourcemaps = require('gulp-sourcemaps');

let prod = process.env.NODE_ENV === 'production' ? true : false;

let assetsPath = 'assets/';

gulp.task('clean', function () {
    return del([
        'assets/js/**/*',
        'assets/css/**/*',
    ]);
});


gulp.task('scss:top', function () {
    return gulp.src([
        'resources/scss/top.scss',
    ])
        .pipe(sass({
            noCache: true,
            style: 'compressed',
            includePaths: []
        }))
        .pipe(concat('top.min.css'))
        .pipe(gulp.dest(assetsPath + 'css'));
});

gulp.task('scss:main', function () {
    return gulp.src([
        'resources/scss/styles.scss',
    ])
        .pipe(gulpif(!prod, sourcemaps.init()))
        .pipe(sass({
            noCache: true,
            style: 'compressed',
            includePaths: []
        }))
        .pipe(concat('styles.min.css'))
        .pipe(gulpif(!prod, sourcemaps.write('.')))
        .pipe(gulp.dest(assetsPath + 'css'));
});

gulp.task('scss:pageloader', function () {
    return gulp.src([
        'resources/scss/pageloader.scss',
    ])
        .pipe(gulpif(!prod, sourcemaps.init()))
        .pipe(sass({
            noCache: true,
            style: 'compressed',
            includePaths: []
        }))
        .pipe(concat('pageloader.min.css'))
        .pipe(gulpif(!prod, sourcemaps.write('.')))
        .pipe(gulp.dest(assetsPath + 'css'));
});

gulp.task('scss', gulp.parallel('scss:top', 'scss:main', 'scss:pageloader'));

gulp.task('fonts', gulp.series(function () {
    return gulp.src([
        'node_modules/@fortawesome/fontawesome-free-webfonts/webfonts/*'
    ])
        .pipe(gulp.dest(assetsPath + 'fonts'));
}));

gulp.task('watch',  gulp.parallel(function () {
    gulp.watch('resources/scss/**/*', { usePolling: false }, gulp.parallel('scss'));
}));

gulp.task('build', gulp.series('scss', 'fonts'));

gulp.task('default', gulp.series('build'));
