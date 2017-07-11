var gulp = require('gulp');
var db = require('./db/dynamoDB');
var mocha = require('gulp-mocha');

gulp.task('default', ['createTable', 'deleteTable', 'taskThree']);

gulp.task('createTable', function() {
  console.log('creating Table');
  db.dbCreateTable();
});

gulp.task('deleteTable', function() {
  console.log('deleting Table');
  db.dbDeleteTable();
});

gulp.task('taskThree', function() {
  console.log('taskThree');
});

gulp.task('test', () =>
  gulp.src('./test/*.test.js', {read: false})
      // gulp-mocha needs filepaths so you can't have any plugins before it
    .pipe(mocha({
      reporter: 'nyan',
      timeout: 60000
    }))
);