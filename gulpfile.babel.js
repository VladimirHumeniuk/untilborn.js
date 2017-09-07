import path from 'path';
import gulp from 'gulp';
import del from 'del';
import runSequence from 'run-sequence';
import browserSync from 'browser-sync';
import gulpLoadPlugins from 'gulp-load-plugins';
import {output as pagespeed} from 'psi';
import pkg from './package.json';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

gulp.task('lint', () =>
  gulp.src(['app/scripts/**/*.js','!node_modules/**'])
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.if(!browserSync.active, $.eslint.failAfterError()))
);


gulp.task('styles', () => {
  const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ];

  return gulp.src([
    'app/styles/**/*.scss',
    'app/styles/**/*.css'
  ])
    .pipe($.newer('app/styles/**/*.scss'))
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      precision: 10
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest('.tmp/styles'))
    .pipe($.concat('main.min.css'))

    .pipe($.if('*.css', $.cssnano()))
    .pipe($.size({title: 'styles'}))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('dist/styles'))
    .pipe(gulp.dest('.tmp/styles'));
});

gulp.task('scripts', () =>
    gulp.src([
      './app/scripts/main.js'
    ])
    .pipe($.newer('.tmp/scripts/**/*.js'))
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/scripts'))
    .pipe($.concat('main.min.js'))
    .pipe($.uglify({preserveComments: 'some'}))

    .pipe($.size({title: 'scripts'}))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(gulp.dest('.tmp/scripts'))
);

gulp.task('pug', () =>
  gulp.src('app/pug/*.pug')
    .pipe($.pug({
        pretty: '\t'
    }))
    .pipe(gulp.dest('app/'))
);

gulp.task('html', () => {
  return gulp.src('app/**/*.html')
    .pipe($.useref({
      searchPath: '{.tmp,app}',
      noAssets: true
    }))

    .pipe($.if('*.html', $.htmlmin({
      removeComments: false,
      collapseWhitespace: false,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: false,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      removeOptionalTags: false
    })))

    .pipe($.if('*.html', $.size({title: 'html', showFiles: true})))
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', () => del(['.tmp', 'dist/*', '!dist/.git'], {dot: true}));

gulp.task('serve', ['pug', 'scripts', 'styles'], () => {
  browserSync({
    notify: false,
    logPrefix: 'WSK',
    scrollElementMapping: ['main', '.mdl-layout'],
    server: ['.tmp', 'app'],
    port: 3000
  });

  gulp.watch(['app/components/**/*.{scss,pug}'], ['styles', 'pug', reload]);
  gulp.watch(['app/pug/**/*.pug'], ['pug', reload]);
  gulp.watch(['app/**/*.html'], reload);
  gulp.watch(['app/styles/**/*.{scss,css}'], ['styles', reload]);
  gulp.watch(['app/scripts/**/*.js'], ['lint', 'scripts', reload]);
  gulp.watch(['app/images/**/*'], reload);
});

gulp.task('serve:dist', ['default'], () =>
  browserSync({
    notify: false,
    logPrefix: 'WSK',
    scrollElementMapping: ['main', '.mdl-layout'],
    server: 'dist',
    port: 3001
  })
);

gulp.task('default', ['clean'], cb =>
  runSequence(
    'styles',
    ['lint', 'pug', 'html', 'scripts'],
    cb
  )
);
