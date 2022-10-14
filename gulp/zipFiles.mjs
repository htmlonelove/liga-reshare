import gulp from 'gulp';
import zip from 'gulp-zip';
import fs from 'fs';
import path from 'path';
import merge from 'merge-stream';

const componentsPath = 'build/components';

const getFolders = (dir) => {
  return fs.readdirSync(dir).filter(function (file) {
    return fs.statSync(path.join(dir, file)).isDirectory();
  });
};

const zipFiles = () => {
  const folders = getFolders(componentsPath);
  if (folders.length) {
    const tasks = folders.map(function (folder) {
      return gulp
        .src(`${componentsPath}/${folder}/**`)
        .pipe(zip(`${folder}.zip`))
        .pipe(gulp.dest('build/zip-components'));
    });
    return merge(tasks);
  }
};

export default zipFiles;
