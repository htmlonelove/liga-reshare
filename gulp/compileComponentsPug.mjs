import gulp from 'gulp';
import plumber from 'gulp-plumber';
import pug from 'gulp-pug';
import cached from 'gulp-cached';

const compileComponentsPug = () => {
  return gulp.src(([
    'source/components/**/component-demo.pug']))
    .pipe(plumber())
    .pipe(pug({ pretty: true }))
    .pipe(cached('pug'))
    .pipe(gulp.dest('build/components'));
};

export default compileComponentsPug;
