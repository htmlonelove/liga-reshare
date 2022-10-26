import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import gcmq from 'gulp-group-css-media-queries';

const sass = gulpSass(dartSass);

const compileComponentsStyles = () =>
  gulp.src('source/components/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(sass())
      .pipe(postcss([autoprefixer({
        grid: true,
      })]))
      .pipe(gcmq()) // выключите, если в проект импортятся шрифты через ссылку на внешний источник
      .pipe(gulp.dest('build/components'));

export default compileComponentsStyles;
