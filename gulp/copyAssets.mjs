import gulp from 'gulp';

const copySvg = () => gulp.src('source/img/**/*.svg', {base: 'source'}).pipe(gulp.dest('build'));

const copyImages = () => gulp.src('source/img/**/*.{png,jpg,webp}', {base: 'source'}).pipe(gulp.dest('build'));

const copy = () =>
  gulp
    .src(
      [
        'source/fonts/**',
        'source/img/**',
        'source/data/**',
        'source/favicon/**',
        'source/video/**',
        'source/downloads/**',
        'source/components/**/style/**',
        'source/components/**/js/**',
        'source/components/**/component-demo.pug',
        'source/components/**/*.php',
        'source/components/**/PHPMailer/**',
        'source/*.php',
      ],
      {
        base: 'source',
      },
    )
    .pipe(gulp.dest('build'));

export {copy, copyImages, copySvg};
